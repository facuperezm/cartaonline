'use client'

import Image from 'next/image'
import Link from 'next/link'
import type * as React from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StoreLobbyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  address: string
  id: string
  city: string
  logoUrl?: string | null
  banner?: string | null
}

export function StoreLobbyCard({
  className,
  name,
  id,
  address,
  city,
  logoUrl,
  banner,
  ...props
}: StoreLobbyCardProps) {
  return (
    <Card
      className={cn('h-full overflow-hidden rounded-sm', className)}
      {...props}
    >
      <Link href={`/stores/${city.toLowerCase()}/${id}`}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={8 / 3}>
            <div
              aria-label="Placeholder"
              aria-roledescription="placeholder"
              className="relative flex h-full w-full items-center justify-center"
              role="img"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent opacity-80" />
              <Image
                alt="product"
                className="h-full w-full bg-gradient-to-r from-blue-500 object-cover"
                height={100}
                loading="lazy"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                src={banner ?? '/images/restaurantphoto.webp'}
                width={100}
              />
            </div>
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{name}</span>
        <CardContent className="flex flex-row items-center gap-2.5 p-3">
          <div className="h-12 w-12 overflow-hidden rounded-md">
            <Image
              alt="Company logo"
              className="h-full w-full object-cover"
              height={100}
              src={logoUrl || '/images/logo-company.webp'}
              width={100}
            />
          </div>
          <CardTitle className="line-clamp-2 font-bold text-lg capitalize">
            {name}
            <CardDescription className="line-clamp-2">
              {address}
            </CardDescription>
          </CardTitle>
        </CardContent>
      </Link>
    </Card>
  )
}
