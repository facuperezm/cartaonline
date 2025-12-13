import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { AddStoreForm } from '@/app/(dashboard)/(routes)/dashboard/stores/new/_components/add-store'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Nueva empresa',
  description: 'Agrega tu nueva empresa a Carta Online',
}

export default async function NewStorePage() {
  const { userId, redirectToSignIn } = await auth()

  if (!userId) return redirectToSignIn()

  return (
    <Shell variant="sidebar">
      <PageHeader
        aria-labelledby="new-store-page-header-heading"
        id="new-store-page-header"
      >
        <PageHeaderHeading>Nueva tienda</PageHeaderHeading>
        <PageHeaderDescription>
          Agregá una nueva tienda a tu cuenta
        </PageHeaderDescription>
      </PageHeader>
      <Card
        aria-labelledby="new-store-page-form-heading"
        as="section"
        id="new-store-page-form-container"
      >
        <CardContent className="mt-6">
          <AddStoreForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
