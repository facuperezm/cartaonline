import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { db } from '@/lib/db'

import { Billing } from './_components/billing'

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Administra tu suscripción y plan',
}

export default async function BillingPage() {
  const { userId, redirectToSignIn } = await auth()

  if (!userId) {
    return redirectToSignIn()
  }
  const stores = await db.store.findMany({
    where: {
      userId,
    },
  })

  if (stores.length === 0) {
    redirect('/dashboard/stores')
  }

  const subscription = await db.subscription.findUnique({
    where: {
      userId,
    },
  })

  const currentPlan = subscription?.planType ?? 'BASIC'
  const subscriptionStatus = subscription?.status ?? 'INACTIVE'
  const storeCount = stores.length

  return (
    <Shell className="overflow-hidden" variant="sidebar">
      <PageHeader>
        <PageHeaderHeading>Pagos</PageHeaderHeading>
        <PageHeaderDescription>Administra tu suscripción</PageHeaderDescription>
      </PageHeader>
      <Billing
        currentPlan={currentPlan}
        storeCount={storeCount}
        subscriptionStatus={subscriptionStatus}
      />
    </Shell>
  )
}
