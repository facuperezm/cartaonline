import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";

import { cn, normalizeCityName } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CityCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  src: string;
  city: string;
  disabled?: boolean;
  href?: string;
}

export async function CityCard({ src, city, disabled, href }: CityCardProps) {
  const normalizedCity = normalizeCityName(city);

  return disabled ? (
    <div className="group relative overflow-hidden rounded-3xl border-2 border-dashed border-muted-foreground/30 bg-card shadow-sm">
      <AspectRatio ratio={16 / 9}>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <Image
          src={src}
          className="object-cover blur-[2px] grayscale"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          fill
          alt={`${normalizedCity} image`}
        />
      </AspectRatio>
      <div className="absolute inset-4 z-20 flex flex-col justify-between">
        <div className="flex justify-end">
          <span className="flex items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Clock className="h-3 w-3" />
            Próximamente
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold capitalize text-white drop-shadow-md">
            {normalizedCity}
          </h3>
        </div>
      </div>
      <span className="sr-only">{normalizedCity}</span>
    </div>
  ) : (
    <Link
      prefetch={false}
      href={href ?? ""}
      className="group relative overflow-hidden rounded-3xl bg-card shadow-playful transition-all hover:-translate-y-1 hover:shadow-warm-lg"
    >
      <AspectRatio ratio={16 / 9}>
        <div
          className={cn(
            "absolute inset-0 z-10 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent transition-all",
            "group-hover:from-primary/80 group-hover:via-primary/30",
          )}
        />
        <Image
          src={src}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          fill
          alt={`${normalizedCity} image`}
        />
      </AspectRatio>
      <div className="absolute inset-4 z-20 flex flex-col justify-between">
        <div className="flex justify-end">
          <span className="flex items-center gap-1 rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-accent-foreground opacity-0 transition-opacity group-hover:opacity-100">
            <MapPin className="h-3 w-3" />
            Ver restaurantes
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-bold capitalize text-white drop-shadow-md transition-transform group-hover:translate-x-1">
            {normalizedCity}
          </h3>
        </div>
      </div>
      <span className="sr-only">{normalizedCity}</span>
    </Link>
  );
}
