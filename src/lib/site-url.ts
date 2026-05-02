const TRAILING_SLASH_REGEX = /\/$/

export function getSiteUrl() {
  const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? vercelUrl ?? 'http://localhost:3000'

  return baseUrl.replace(TRAILING_SLASH_REGEX, '')
}
