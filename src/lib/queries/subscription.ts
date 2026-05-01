import 'server-only'

import { auth } from '@clerk/nextjs/server'
import { PreApproval } from 'mercadopago'

import { db } from '@/lib/db'
import { mapMercadoPagoStatus, mercadopago } from '@/lib/mercadopago'

const parseDate = (value?: string | null) =>
  value ? new Date(value) : undefined

/**
 * Eager-fetch a preapproval from MP and reflect it in the local DB.
 * Used when the user lands on /dashboard/billing right after paying
 * (MP appends `?preapproval_id=...` to back_url) so we don't sit on
 * a stale PENDING while waiting for the webhook to fire.
 *
 * Silently no-ops if the preapproval doesn't belong to the current user
 * — never trust the URL param alone.
 */
export async function refreshSubscriptionFromPreapproval(
  preapprovalId: string,
): Promise<void> {
  const { userId } = await auth()
  if (!userId) {
    return
  }

  const subscription = await db.subscription.findFirst({
    where: { userId, mpPreapprovalId: preapprovalId },
  })
  if (!subscription) {
    return
  }

  try {
    const preapproval = await new PreApproval(mercadopago).get({
      id: preapprovalId,
    })
    if (!preapproval?.id) {
      return
    }

    await db.subscription.update({
      where: { id: subscription.id },
      data: {
        status: mapMercadoPagoStatus(preapproval.status),
        nextPaymentDate:
          parseDate(preapproval.next_payment_date) ??
          subscription.nextPaymentDate,
      },
    })
  } catch (error) {
    // Webhook will catch up; never block render on this.
    console.error('[REFRESH_SUBSCRIPTION_ERROR]', error)
  }
}
