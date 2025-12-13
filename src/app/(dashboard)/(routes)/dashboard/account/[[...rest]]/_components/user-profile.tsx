'use client'

import { UserProfile as ClerkUserProfile } from '@clerk/nextjs'
import type { Theme, UserProfileProps } from '@clerk/types'

const appearance: Theme = {
  variables: {
    borderRadius: '0.2rem',
  },
}

export function UserProfile({ ...props }: UserProfileProps) {
  return (
    <ClerkUserProfile
      appearance={{
        ...appearance,
        baseTheme: appearance.baseTheme,
        variables: {
          ...appearance.variables,
        },
      }}
      {...props}
    />
  )
}
