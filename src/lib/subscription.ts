import type { Subscription } from '@prisma/client'

import { PLANS, type Plan } from '@/config/plans'

type SubscriptionLike =
  | Pick<Subscription, 'status' | 'planType' | 'currentPeriodEnd'>
  | null
  | undefined

const BASIC_PLAN = PLANS.find((p) => p.planType === 'BASIC')

if (!BASIC_PLAN) {
  throw new Error('BASIC plan missing from PLANS config')
}

export function getPlan(planType: Subscription['planType']): Plan {
  return PLANS.find((p) => p.planType === planType) ?? (BASIC_PLAN as Plan)
}

/**
 * The plan a user is entitled to right now. Cancelled subscriptions
 * stay on their paid plan until currentPeriodEnd (grace period).
 */
export function getActivePlan(subscription: SubscriptionLike): Plan {
  if (!subscription) {
    return BASIC_PLAN as Plan
  }

  const inGracePeriod =
    subscription.status === 'CANCELLED' &&
    subscription.currentPeriodEnd !== null &&
    subscription.currentPeriodEnd > new Date()

  const entitled = subscription.status === 'ACTIVE' || inGracePeriod

  return entitled ? getPlan(subscription.planType) : (BASIC_PLAN as Plan)
}

export function isProActive(subscription: SubscriptionLike): boolean {
  return getActivePlan(subscription).planType === 'PRO'
}

/**
 * Discriminated UI state for the billing page Pro card.
 */
export type SubscriptionUiState =
  | { kind: 'free' }
  | { kind: 'pending' }
  | { kind: 'active' }
  | { kind: 'cancelled-grace'; until: Date }
  | { kind: 'cancelled-expired' }

export function getSubscriptionUiState(
  subscription: SubscriptionLike,
): SubscriptionUiState {
  if (!subscription || subscription.status === 'INACTIVE') {
    return { kind: 'free' }
  }

  if (subscription.status === 'PENDING') {
    return { kind: 'pending' }
  }

  if (subscription.status === 'ACTIVE') {
    return { kind: 'active' }
  }

  if (subscription.status === 'CANCELLED' && subscription.currentPeriodEnd) {
    return subscription.currentPeriodEnd > new Date()
      ? { kind: 'cancelled-grace', until: subscription.currentPeriodEnd }
      : { kind: 'cancelled-expired' }
  }

  return { kind: 'free' }
}
