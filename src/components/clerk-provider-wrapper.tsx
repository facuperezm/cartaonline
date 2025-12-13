'use client'

import { ClerkProvider } from '@clerk/nextjs'

export function ClerkProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
          termsPageUrl: 'https://clerk.com/terms',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
