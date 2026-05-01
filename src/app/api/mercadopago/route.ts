import type { Prisma } from '@prisma/client'
import { PreApproval } from 'mercadopago'
import { revalidatePath } from 'next/cache'

import { serverEnv } from '@/env'
import { db } from '@/lib/db'
import {
  fetchAuthorizedPayment,
  mapMercadoPagoStatus,
  mercadopago,
  verifyMercadoPagoSignature,
} from '@/lib/mercadopago'

const parseDate = (value?: string | null) =>
  value ? new Date(value) : undefined

async function syncPreapprovalById(preapprovalId: string) {
  const preapproval = await new PreApproval(mercadopago).get({
    id: preapprovalId,
  })
  if (!preapproval?.id) {
    return
  }

  const status = mapMercadoPagoStatus(preapproval.status)
  const nextPaymentDate = parseDate(preapproval.next_payment_date)

  const updated = await db.subscription.updateMany({
    where: { mpPreapprovalId: preapproval.id },
    data: {
      status,
      ...(nextPaymentDate ? { nextPaymentDate } : {}),
    },
  })

  if (updated.count === 0 && preapproval.external_reference) {
    await db.subscription.updateMany({
      where: { userId: String(preapproval.external_reference) },
      data: {
        status,
        mpPreapprovalId: preapproval.id,
        ...(nextPaymentDate ? { nextPaymentDate } : {}),
      },
    })
  }
}

async function recordAuthorizedPayment(paymentId: string) {
  const payment = await fetchAuthorizedPayment(paymentId)
  const preapprovalId = payment.preapproval_id
  if (!(payment.id && preapprovalId)) {
    return
  }

  const subscription = await db.subscription.findUnique({
    where: { mpPreapprovalId: preapprovalId },
  })
  if (!subscription) {
    return
  }

  const paymentRecord = {
    status: payment.status ?? 'unknown',
    amount: Number(payment.transaction_amount ?? 0),
    currency: payment.currency_id ?? 'ARS',
    paymentMethod: payment.payment_method_id ?? null,
    rawPayload: payment as unknown as Prisma.InputJsonValue,
  }

  await db.payment.upsert({
    where: { paymentId: String(payment.id) },
    update: paymentRecord,
    create: {
      paymentId: String(payment.id),
      provider: 'mercadopago',
      userId: subscription.userId,
      subscriptionId: subscription.id,
      ...paymentRecord,
    },
  })

  if (payment.status !== 'approved') {
    return
  }

  // Recurring charge succeeded — refresh entitlement window from MP.
  const preapproval = await new PreApproval(mercadopago).get({
    id: preapprovalId,
  })
  const nextPaymentDate = parseDate(preapproval.next_payment_date)
  const periodStart = parseDate(payment.payment_date) ?? new Date()

  await db.subscription.update({
    where: { id: subscription.id },
    data: {
      status: 'ACTIVE',
      currentPeriodStart: periodStart,
      currentPeriodEnd: nextPaymentDate ?? subscription.currentPeriodEnd,
      nextPaymentDate: nextPaymentDate ?? subscription.nextPaymentDate,
    },
  })
}

export async function POST(request: Request) {
  const verification = verifyMercadoPagoSignature(
    request,
    serverEnv.MP_WEBHOOK_SECRET,
  )
  if (!verification.valid) {
    console.warn('[MP_WEBHOOK_INVALID_SIGNATURE]', verification.reason)
    return Response.json({ error: 'invalid-signature' }, { status: 401 })
  }

  if (!serverEnv.MP_ACCESS_TOKEN) {
    return Response.json({ ok: true })
  }

  const body = (await request.json().catch(() => null)) as {
    type?: string
    data?: { id?: string }
  } | null

  const type = body?.type
  const dataId = body?.data?.id
  if (!dataId) {
    return Response.json({ ok: true })
  }

  try {
    if (type === 'subscription_preapproval') {
      await syncPreapprovalById(dataId)
      revalidatePath('/dashboard/billing')
    } else if (type === 'subscription_authorized_payment') {
      await recordAuthorizedPayment(dataId)
      revalidatePath('/dashboard/billing')
    }
    return Response.json({ ok: true })
  } catch (error) {
    console.error('[MP_WEBHOOK_HANDLER_ERROR]', error)
    return Response.json({ error: 'internal' }, { status: 500 })
  }
}
