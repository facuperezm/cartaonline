'use client'

import { useClerk } from '@clerk/nextjs'
import type { HandleOAuthCallbackParams } from '@clerk/types'
import * as React from 'react'

import { Icons } from '@/components/icons'

interface SSOCallbackProps {
  searchParams: HandleOAuthCallbackParams
}

export function SSOCallback({ searchParams }: SSOCallbackProps) {
  const { handleRedirectCallback } = useClerk()

  React.useEffect(() => {
    void handleRedirectCallback(searchParams)
  }, [searchParams, handleRedirectCallback])

  return (
    <div
      aria-describedby="loading-description"
      aria-label="Loading"
      className="flex items-center justify-center"
      role="status"
    >
      <Icons.spinner aria-hidden="true" className="size-16 animate-spin" />
    </div>
  )
}
