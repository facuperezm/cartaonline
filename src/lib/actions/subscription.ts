'use server'

import { auth } from '@clerk/nextjs/server'
import { PreApproval } from 'mercadopago'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { mercadopago } from '@/lib/mercadopago'

type ActionResult = { success: true } | { success: false; error: string }

export async function cancelSubscription(): Promise<ActionResult> {
  const { userId } = await auth()
  if (!userId) {
    return { success: false, error: 'No autorizado.' }
  }

  const subscription = await db.subscription.findUnique({
    where: { userId },
  })

  if (!subscription?.mpPreapprovalId) {
    return { success: false, error: 'No se encontró una suscripción activa.' }
  }

  if (subscription.status !== 'ACTIVE') {
    return {
      success: false,
      error: 'Esta suscripción no se puede cancelar en su estado actual.',
    }
  }

  try {
    await new PreApproval(mercadopago).update({
      id: subscription.mpPreapprovalId,
      body: { status: 'cancelled' },
    })

    // Optimistic local update; the webhook will confirm and refresh
    // currentPeriodEnd from the canonical MP state.
    await db.subscription.update({
      where: { id: subscription.id },
      data: { status: 'CANCELLED' },
    })

    revalidatePath('/dashboard/billing')
    return { success: true }
  } catch (error) {
    console.error('[CANCEL_SUBSCRIPTION_ERROR]', error)
    return {
      success: false,
      error: 'No se pudo cancelar la suscripción. Intentalo de nuevo.',
    }
  }
}
