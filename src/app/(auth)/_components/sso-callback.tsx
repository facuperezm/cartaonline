'use client'

import { useClerk } from '@clerk/nextjs'
import type { HandleOAuthCallbackParams } from '@clerk/types'
import * as React from 'react'

import { Icons } from '@/components/icons'

type SSOCallbackProps = {
  searchParams: HandleOAuthCallbackParams
}

export function SSOCallback({ searchParams }: SSOCallbackProps) {
  const { handleRedirectCallback } = useClerk()

  React.useEffect(() => {
    handleRedirectCallback(searchParams)
  }, [searchParams, handleRedirectCallback])

  return (
    <div className="flex items-center justify-center">
      <Icons.spinner aria-hidden="true" className="size-16 animate-spin" />
    </div>
  )
}
