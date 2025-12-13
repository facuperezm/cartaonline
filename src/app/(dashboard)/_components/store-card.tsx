import type { Store } from '@prisma/client'
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getRandomPatternStyle } from '@/lib/generate-pattern'
import { cn } from '@/lib/utils'

type StoreCardProps = {
  store: Store
  href: string
}

export function StoreCard({ store, href }: StoreCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={href}>
        <AspectRatio ratio={21 / 9}>
          <div
            className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50"
            style={getRandomPatternStyle(String(store.id))}
          />
          <div className="absolute top-2 right-2">
            <Badge
              className={cn(
                store.status === 'ACTIVE'
                  ? 'border-green-600/20 bg-green-50 text-green-700'
                  : 'border-red-600/10 bg-red-50 text-red-700',
              )}
              variant="secondary"
            >
              {store.status === 'ACTIVE' ? 'Activa' : 'Inactiva'}
            </Badge>
          </div>
        </AspectRatio>
        <CardHeader>
          <CardTitle className="line-clamp-1">{store.name}</CardTitle>
          <div className="flex items-center justify-between">
            <CardDescription className="line-clamp-1">
              {store.address}
            </CardDescription>
          </div>
        </CardHeader>
      </Link>
    </Card>
  )
}
