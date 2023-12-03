import { SSOCallback } from "@/components/auth/sso-callback"
import { Shell } from "@/components/shell"
import { type HandleOAuthCallbackParams } from "@clerk/types"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

export default function SSOCallbackPage({
  searchParams,
}: SSOCallbackPageProps) {
  return (
    <Shell className="max-w-lg">
      <SSOCallback searchParams={searchParams} />
    </Shell>
  )
}
