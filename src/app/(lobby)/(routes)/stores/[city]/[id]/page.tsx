import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { type City } from "@prisma/client";
import { Clock, MapPin, Phone, Share2, Star } from "lucide-react";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";
import { ProductList } from "@/app/(lobby)/_components/product-list";
import { ReserveButton } from "@/app/(lobby)/_components/reserve-button";

type PageProps = {
  params: Promise<{
    city: string;
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const store = await db.store.findFirst({
    where: { id: parseInt(id) },
  });

  if (!store) {
    return {
      title: "Tienda no encontrada",
      description: "La tienda que buscas no existe",
    };
  }

  return {
    title: store.name,
    description: `${store.description} | Esta página fue creada con Carta Online, crea tu carta online en minutos.`,
    openGraph: {
      title: store.name,
      description: store.description,
      images: [
        {
          url: store.bannerUrl ?? "/images/restaurant.webp",
          width: 800,
          height: 600,
          alt: store.name,
        },
      ],
    },
  };
}

export default async function StorePage({ params }: PageProps) {
  const { city, id } = await params;

  const store = await db.store.findFirst({
    where: {
      id: parseInt(id),
      city: city as City,
    },
    include: {
      products: {
        orderBy: {
          category: "asc",
        },
      },
    },
  });

  if (!store) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Banner */}
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
      {/* <StoreHeader store={store} /> */}
      {/* TODO: REMOVE THIS COMPONENT AND REFACTOR THE COMPONENT */}

      {/* Menu Section */}
      <Shell className="flex-1 py-6 md:py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Nuestro Menú</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Ordenar por
              </Button>
              <Button variant="outline" size="sm">
                Filtrar
              </Button>
            </div>
          </div>
          <ProductList products={store.products} />
        </div>
        <ReserveButton phone={store.phone} />
      </Shell>
    </div>
  );
}
