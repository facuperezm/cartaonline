import Image from "next/image";
import Link from "next/link";
import { Navigation } from "lucide-react";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";

export async function CityCard({ src, city }: { src: string; city: string }) {
  const stores = await db.store.findMany();

  return (
    <Link
      href={`/stores`}
      className="group relative overflow-hidden rounded-md border"
    >
      <AspectRatio ratio={16 / 9}>
        <div className="absolute inset-0 z-10 bg-zinc-950/70 transition-colors group-hover:bg-zinc-950/60" />
        <Image
          src={src}
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          fill
          alt="this is a placeholder"
        />
      </AspectRatio>
      <div className="absolute inset-4 z-20 flex flex-col">
        <div className="flex items-start justify-between space-x-4">
          <div
            className={cn(
              buttonVariants({
                size: "icon",
                className:
                  "pointer-events-none h-8 w-8 bg-zinc-100/90 text-zinc-950",
              }),
            )}
            aria-hidden="true"
          >
            <Navigation strokeWidth={1.6} className="-translate-x-[0.07rem]" />
          </div>
          <p className="text-sm text-zinc-200">
            {stores?.length} {stores?.length > 1 ? "comercios" : "comercio"}
          </p>
        </div>
        <h3 className="mt-auto text-xl font-medium capitalize text-zinc-200">
          {city}
        </h3>
      </div>
      <span className="sr-only">{city}</span>
    </Link>
  );
}
