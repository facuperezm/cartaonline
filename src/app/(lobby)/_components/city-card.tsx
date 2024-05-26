import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CityCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  src: string;
  city: string;
  disabled?: boolean;
  href?: string;
  amountOfStores?: number;
}

export async function CityCard({
  src,
  city,
  disabled,
  href,
  amountOfStores,
}: CityCardProps) {
  if (!amountOfStores) {
    amountOfStores = 1;
  }

  return disabled ? (
    <div className="group relative overflow-hidden rounded-md border">
      <AspectRatio ratio={16 / 9}>
        <div className="absolute inset-0 z-10 bg-zinc-950/70" />
        <Image
          src={src}
          className="object-cover blur-[1px] grayscale"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          fill
          alt="this is a placeholder"
        />
      </AspectRatio>
      <div className="absolute inset-4 z-20 flex flex-col">
        <div className="flex flex-row-reverse">
          <p className="text-sm text-zinc-200">Próximamente...</p>
        </div>
        <h3 className="mt-auto text-xl font-medium capitalize text-zinc-200">
          {city}
        </h3>
      </div>
      <span className="sr-only">{city}</span>
    </div>
  ) : (
    <Link
      href={href!}
      className="group relative overflow-hidden rounded-md border"
    >
      <AspectRatio ratio={16 / 9}>
        <div
          className={cn(
            "absolute inset-0 z-10 bg-zinc-950/70",
            disabled ?? "transition-colors group-hover:bg-zinc-950/60",
          )}
        />
        <Image
          src={src}
          className={cn(
            disabled
              ? "object-cover grayscale"
              : "object-cover transition-transform group-hover:scale-105",
          )}
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          fill
          alt="this is a placeholder"
        />
      </AspectRatio>
      <div className="absolute inset-4 z-20 flex flex-col">
        <div className="flex items-start justify-between space-x-4">
          <p className="text-sm text-zinc-200">{disabled && "Próximamente"}</p>
        </div>
        <h3 className="mt-auto text-xl font-medium capitalize text-zinc-200">
          {city}
        </h3>
      </div>
      <span className="sr-only">{city}</span>
    </Link>
  );
}
