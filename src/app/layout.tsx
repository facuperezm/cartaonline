import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import { ClerkProviderWrapper } from '@/components/clerk-provider-wrapper'
import { siteConfig } from '@/config/site'
import { clientEnv } from '@/env'
import { cn } from '@/lib/utils'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Carta Online',
    'Menu digital',
    'Restaurantes',
    'Bares',
    'Cafeterias',
  ],
  authors: [
    {
      name: 'Facundo Perez Montalvo',
      url: 'https://github.com/facuperezm',
    },
  ],
  creator: 'Facundo Perez Montalvo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={cn('min-h-screen scroll-smooth antialiased', sora.variable)}
      lang="en"
    >
      <body className="font-sans">
        <Suspense fallback={null}>
          <ClerkProviderWrapper>{children}</ClerkProviderWrapper>
        </Suspense>
        <Toaster closeButton richColors />
      </body>
    </html>
  )
}
