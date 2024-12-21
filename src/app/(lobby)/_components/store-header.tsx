import Image from "next/image";
import { type Store } from "@prisma/client";
import { Clock, MapPin, Phone, Share2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";

interface StoreHeaderProps {
  store: Pick<Store, "name" | "bannerUrl" | "address" | "phone">;
}

export function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <div className="relative h-[40vh] min-h-[300px] w-full">
      <div className="absolute inset-0">
        <Image
          src={store.bannerUrl ?? "/images/restaurant.webp"}
          alt={store.name}
          className="h-full w-full object-cover"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40" />
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <Shell>
          <div className="space-y-4 text-black">
            <div className="flex flex-wrap items-center gap-2 text-primary-foreground">
              <div className="rounded-full bg-primary px-3 py-1 text-sm font-medium">
                Abierto
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">11:00 - 23:00</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">4.8 (200+ reseñas)</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {store.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{store.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{store.phone}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="lg">
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>
            </div>
          </div>
        </Shell>
      </div>
    </div>
  );
}
