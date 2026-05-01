import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { db } from '@/lib/db'
import { refreshSubscriptionFromPreapproval } from '@/lib/queries/subscription'
import { getActivePlan, getSubscriptionUiState } from '@/lib/subscription'

import { Billing } from './_components/billing'

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Administra tu suscripción y plan',
}

type BillingPageProps = {
  searchParams: Promise<{ preapproval_id?: string | string[] }>
}

export default async function BillingPage({ searchParams }: BillingPageProps) {
  const { userId, redirectToSignIn } = await auth()

  if (!userId) {
    return redirectToSignIn()
  }

  const params = await searchParams
  const preapprovalParam = Array.isArray(params.preapproval_id)
    ? params.preapproval_id[0]
    : params.preapproval_id

  const justReturnedFromMp = Boolean(preapprovalParam)

  if (preapprovalParam) {
    await refreshSubscriptionFromPreapproval(preapprovalParam)
  }

  const [storeCount, subscription] = await Promise.all([
    db.store.count({ where: { userId } }),
    db.subscription.findUnique({ where: { userId } }),
  ])

  const activePlan = getActivePlan(subscription)
  const uiState = getSubscriptionUiState(subscription)

  return (
    <Shell className="overflow-hidden" variant="sidebar">
      <PageHeader>
        <PageHeaderHeading>Pagos</PageHeaderHeading>
        <PageHeaderDescription>Administra tu suscripción</PageHeaderDescription>
      </PageHeader>
      <Billing
        activePlan={activePlan}
        justReturnedFromMp={justReturnedFromMp}
        storeCount={storeCount}
        uiState={uiState}
      />
    </Shell>
  )
}
