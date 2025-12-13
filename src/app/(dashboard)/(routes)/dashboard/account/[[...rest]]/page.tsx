import type { Metadata } from 'next'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { UserProfile } from './_components/user-profile'

export const metadata: Metadata = {
  title: 'Mi cuenta',
  description: 'Administra tu cuenta de usuario en Carta Online',
}

export default function AccountPage() {
  return (
    <Shell className="overflow-hidden" variant="sidebar">
      <PageHeader>
        <PageHeaderHeading>Cuenta</PageHeaderHeading>
        <PageHeaderDescription>
          Administra tu configuración de cuenta
        </PageHeaderDescription>
      </PageHeader>
      <ScrollArea className="w-full pb-3.5">
        <UserProfile />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Shell>
  )
}
