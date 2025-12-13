import { UtensilsCrossed } from 'lucide-react'
import Link from 'next/link'

import { siteConfig } from '@/config/site'

export function MainNav() {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link className="group flex items-center space-x-2" href="/">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-3 group-hover:scale-110">
          <UtensilsCrossed aria-hidden="true" className="h-5 w-5" />
        </div>
        <span className="inline-block font-bold text-xl tracking-tight">
          {siteConfig.name}
        </span>
        <span className="sr-only">Home</span>
      </Link>
    </div>
  )
}
