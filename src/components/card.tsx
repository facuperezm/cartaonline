import Link from "next/link";

import { Navigation } from "lucide-react";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";

export async function CategoryCard({
  src,
  city,
}: {
  src: string;
  city: string;
}) {
  return (
    <Link
      href={`/categories`}
      className="group relative overflow-hidden rounded-md border"
    >
      <AspectRatio ratio={16 / 9}>
        <div className="absolute inset-0 z-10 bg-zinc-950/70 transition-colors group-hover:bg-zinc-950/60" />
        <img
          src={src}
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
          fill
          priority={true}
        />
      </AspectRatio>
      <div className="absolute inset-4 z-20 flex flex-col">
        <div className="flex items-start justify-between space-x-4">
          <div
            className={cn(
              buttonVariants({
                size: "icon",
                className:
                  "pointer-events-none h-8 w-8 bg-zinc-100 text-zinc-950",
              }),
            )}
            aria-hidden="true"
          >
            <Navigation />
          </div>
          <p className="text-sm text-zinc-200">123 comercios</p>
        </div>
        <h3 className="mt-auto text-xl font-medium capitalize text-zinc-200">
          {city}
        </h3>
      </div>
      <span className="sr-only">{city}</span>
    </Link>
  );
}
