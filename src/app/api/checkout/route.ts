import { auth, currentUser } from '@clerk/nextjs/server'
import { PreApproval } from 'mercadopago'
import { z } from 'zod'

import { PAYABLE_PLAN_TYPES, type PayablePlanType, PLANS } from '@/config/plans'
import { clientEnv, serverEnv } from '@/env'
import { db } from '@/lib/db'
import { mercadopago } from '@/lib/mercadopago'

const checkoutSchema = z.object({
  email: z.string().email().optional(),
  planType: z.enum(PAYABLE_PLAN_TYPES),
})

const parseDate = (value?: string | null) =>
  value ? new Date(value) : undefined

class CheckoutError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

const ensureAccessToken = () => {
  if (!serverEnv.MP_ACCESS_TOKEN) {
    throw new CheckoutError('MercadoPago no está configurado', 500)
  }
}

const getPayload = async (request: Request) => {
  const payload = await request.json().catch(() => null)
  const parsed = checkoutSchema.safeParse(payload)

  if (!parsed.success) {
    throw new CheckoutError('Datos inválidos', 400)
  }

  return parsed.data
}

const getPlan = (planType: PayablePlanType) => {
  const plan = PLANS.find((item) => item.planType === planType)

  if (!plan) {
    throw new CheckoutError('Plan inválido', 400)
  }

  return plan
}

const getPayerEmail = (
  email: string | undefined,
  clerkUser: Awaited<ReturnType<typeof currentUser>>,
) => {
  const payerEmail = email ?? clerkUser?.emailAddresses[0]?.emailAddress ?? null

  if (!payerEmail) {
    throw new CheckoutError('Email requerido', 400)
  }

  return payerEmail
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new CheckoutError('No autorizado', 401)
    }

    ensureAccessToken()

    const { planType, email } = await getPayload(request)
    const plan = getPlan(planType)
    const clerkUser = await currentUser()
    const payerEmail = getPayerEmail(email, clerkUser)

    const name = clerkUser?.fullName || clerkUser?.username || 'Usuario'
    const userEmail = clerkUser?.emailAddresses[0]?.emailAddress || payerEmail
    const imageUrl = clerkUser?.imageUrl || ''

    await db.user.upsert({
      where: { userId },
      update: { name, email: userEmail, imageUrl },
      create: { userId, name, email: userEmail, imageUrl },
    })

    // Charge at authorization time. Without start_date, MP defaults to
    // "first of next month" — effectively a free first cycle. We add a
    // small future cushion so clock skew between us and MP can't make
    // the timestamp land in the past (which MP rejects with 400).
    const startDate = new Date(Date.now() + 60_000).toISOString()

    const preapproval = await new PreApproval(mercadopago).create({
      body: {
        back_url: `${clientEnv.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
        reason: `Suscripción ${plan.name}`,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: plan.priceArs,
          currency_id: 'ARS',
          start_date: startDate,
        },
        payer_email: payerEmail,
        status: 'pending',
        external_reference: userId,
      },
    })

    if (!(preapproval.id && preapproval.init_point)) {
      throw new CheckoutError('No se pudo crear la suscripción', 500)
    }

    await db.subscription.upsert({
      where: { userId },
      update: {
        planType,
        status: 'PENDING',
        mpPreapprovalId: preapproval.id,
        nextPaymentDate: parseDate(preapproval.next_payment_date),
      },
      create: {
        userId,
        planType,
        status: 'PENDING',
        mpPreapprovalId: preapproval.id,
        nextPaymentDate: parseDate(preapproval.next_payment_date),
      },
    })

    return Response.json({ initPoint: preapproval.init_point })
  } catch (error) {
    if (error instanceof CheckoutError) {
      return Response.json({ error: error.message }, { status: error.status })
    }
    console.error('[MP_CHECKOUT_ERROR]', error)
    return Response.json(
      { error: 'Error al crear la suscripción' },
      { status: 500 },
    )
  }
}
