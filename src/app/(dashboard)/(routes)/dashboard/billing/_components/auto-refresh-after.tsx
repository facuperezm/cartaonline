'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * One-shot router.refresh() after `delayMs`. Used on the billing page
 * when the user just returned from MP and the subscription is still
 * PENDING locally — gives the webhook a few seconds and then re-fetches
 * the server component to surface the updated state.
 */
export function AutoRefreshAfter({ delayMs }: { delayMs: number }) {
  const router = useRouter()

  useEffect(() => {
    const id = setTimeout(() => router.refresh(), delayMs)
    return () => clearTimeout(id)
  }, [delayMs, router])

  return null
}
