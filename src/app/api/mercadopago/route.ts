import { PreApproval } from 'mercadopago'
import { revalidatePath } from 'next/cache'

import { serverEnv } from '@/env'
import { db } from '@/lib/db'
import { mercadopago } from '@/lib/mercadopago'

const mapStatus = (status?: string) => {
  switch (status) {
    case 'authorized':
      return 'ACTIVE'
    case 'cancelled':
      return 'CANCELLED'
    case 'paused':
      return 'INACTIVE'
    case 'expired':
      return 'EXPIRED'
    default:
      return 'PENDING'
  }
}

const parseDate = (value?: string | null) =>
  value ? new Date(value) : undefined

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null)
    const type = payload?.type
    const dataId = payload?.data?.id

    if (type !== 'subscription_preapproval' || !dataId) {
      return Response.json({ ok: true })
    }

    if (!serverEnv.MP_ACCESS_TOKEN) {
      return Response.json({ ok: true })
    }

    const preapproval = await new PreApproval(mercadopago).get({ id: dataId })

    if (!preapproval?.id) {
      return Response.json({ ok: true })
    }

    const status = mapStatus(preapproval.status)
    const nextPaymentDate = parseDate(preapproval.next_payment_date)

    const updateResult = await db.subscription.updateMany({
      where: {
        mpPreapprovalId: preapproval.id,
      },
      data: {
        status,
        nextPaymentDate,
      },
    })

    if (updateResult.count === 0 && preapproval.external_reference) {
      await db.subscription.updateMany({
        where: {
          userId: String(preapproval.external_reference),
        },
        data: {
          status,
          mpPreapprovalId: preapproval.id,
          nextPaymentDate,
        },
      })
    }

    revalidatePath('/dashboard/billing')

    return Response.json({ ok: true })
  } catch (error) {
    console.error('[MP_WEBHOOK_ERROR]', error)
    return Response.json({ ok: true })
  }
}
