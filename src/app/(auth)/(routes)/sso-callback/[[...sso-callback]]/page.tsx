import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

import { Icons } from '@/components/icons'
import { Shell } from '@/components/shell'

export default function SSOCallbackPage() {
  return (
    <Shell className="max-w-lg place-items-center">
      <Icons.spinner aria-hidden="true" className="size-16 animate-spin" />
      <AuthenticateWithRedirectCallback />
    </Shell>
  )
}
