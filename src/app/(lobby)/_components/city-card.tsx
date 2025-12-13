import { Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn, normalizeCityName } from '@/lib/utils'

interface CityCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  src: string
  city: string
  disabled?: boolean
  href?: string
}

export async function CityCard({ src, city, disabled, href }: CityCardProps) {
  const normalizedCity = normalizeCityName(city)

  return disabled ? (
    <div className="group relative overflow-hidden rounded-3xl border-2 border-muted-foreground/30 border-dashed bg-card shadow-sm">
      <AspectRatio ratio={16 / 9}>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <Image
          alt={`${normalizedCity} image`}
          className="object-cover blur-[2px] grayscale"
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          src={src}
        />
      </AspectRatio>
      <div className="absolute inset-4 z-20 flex flex-col justify-between">
        <div className="flex justify-end">
          <span className="flex items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 font-medium text-secondary-foreground text-xs">
            <Clock className="h-3 w-3" />
            Próximamente
          </span>
        </div>
        <div>
          <h3 className="font-bold text-2xl text-white capitalize drop-shadow-md">
            {normalizedCity}
          </h3>
        </div>
      </div>
      <span className="sr-only">{normalizedCity}</span>
    </div>
  ) : (
    <Link
      className="group hover:-translate-y-1 relative overflow-hidden rounded-3xl bg-card shadow-playful transition-all hover:shadow-warm-lg"
      href={href ?? ''}
      prefetch={false}
    >
      <AspectRatio ratio={16 / 9}>
        <div
          className={cn(
            'absolute inset-0 z-10 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent transition-all',
            'group-hover:from-primary/80 group-hover:via-primary/30',
          )}
        />
        <Image
          alt={`${normalizedCity} image`}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          src={src}
        />
      </AspectRatio>
      <div className="absolute inset-4 z-20 flex flex-col justify-between">
        <div className="flex justify-end">
          <span className="flex items-center gap-1 rounded-full bg-accent/90 px-3 py-1 font-medium text-accent-foreground text-xs opacity-0 transition-opacity group-hover:opacity-100">
            <MapPin className="h-3 w-3" />
            Ver restaurantes
          </span>
        </div>
        <div>
          <h3 className="font-bold text-2xl text-white capitalize drop-shadow-md transition-transform group-hover:translate-x-1">
            {normalizedCity}
          </h3>
        </div>
      </div>
      <span className="sr-only">{normalizedCity}</span>
    </Link>
  )
}
