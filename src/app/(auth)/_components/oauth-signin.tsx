'use client'

import { useSignIn } from '@clerk/nextjs'
import type { OAuthStrategy } from '@clerk/types'
import * as React from 'react'
import { toast } from 'sonner'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

const oauthProviders = [
  { name: 'Google', strategy: 'oauth_google', icon: 'google' },
] satisfies {
  name: string
  icon: keyof typeof Icons
  strategy: OAuthStrategy
}[]

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null)
  const { signIn, isLoaded: signInLoaded } = useSignIn()

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return null
    try {
      setIsLoading(provider)
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard/stores',
      })
    } catch (error) {
      setIsLoading(null)

      const unknownError = 'Algo salió mal, porfavor probá denuevo.'

      if (error instanceof Error && error.message === 'User not found.') {
        toast.error(unknownError)
      } else {
        toast.error(String(error))
      }
      toast.error(unknownError)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            className="w-full bg-background sm:w-auto"
            disabled={isLoading !== null}
            key={provider.strategy}
            onClick={() => void oauthSignIn(provider.strategy)}
            variant="outline"
          >
            {isLoading === provider.strategy ? (
              <Icons.spinner
                aria-hidden="true"
                className="mr-2 h-4 w-4 animate-spin"
              />
            ) : (
              <Icon aria-hidden="true" className="mr-2 h-4 w-4" />
            )}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}
