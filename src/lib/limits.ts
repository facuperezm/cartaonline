import 'server-only'

import { db } from '@/lib/db'
import { getActivePlan } from '@/lib/subscription'

export class PlanLimitError extends Error {
  code = 'PLAN_LIMIT' as const

  constructor(message: string) {
    super(message)
    this.name = 'PlanLimitError'
  }
}

export async function ensureCanCreateStore(userId: string): Promise<void> {
  const [storeCount, subscription] = await Promise.all([
    db.store.count({ where: { userId } }),
    db.subscription.findUnique({ where: { userId } }),
  ])

  const plan = getActivePlan(subscription)

  if (storeCount >= plan.storeLimit) {
    const word = plan.storeLimit === 1 ? 'tienda' : 'tiendas'
    throw new PlanLimitError(
      `Llegaste al límite del plan ${plan.name} (${plan.storeLimit} ${word}). Suscribite a Pro para crear más.`,
    )
  }
}

export async function ensureCanCreateProducts(
  userId: string,
  storeId: string,
  count = 1,
): Promise<void> {
  const [productCount, subscription] = await Promise.all([
    db.product.count({ where: { storeId } }),
    db.subscription.findUnique({ where: { userId } }),
  ])

  const plan = getActivePlan(subscription)

  if (plan.productLimit === null) {
    return
  }

  if (productCount + count > plan.productLimit) {
    const remaining = Math.max(0, plan.productLimit - productCount)
    throw new PlanLimitError(
      `Llegaste al límite del plan ${plan.name} (${plan.productLimit} productos). Te quedan ${remaining} cupos. Suscribite a Pro para tener productos ilimitados.`,
    )
  }
}
