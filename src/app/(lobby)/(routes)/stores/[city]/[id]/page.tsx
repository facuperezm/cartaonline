import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { City } from "@prisma/client";

import { db } from "@/lib/db";
import { ProductList } from "@/app/(lobby)/_components/product-list";
import { ReserveButton } from "@/app/(lobby)/_components/reserve-button";
import { StoreHeader } from "@/app/(lobby)/_components/store-header";

interface Props {
  params: { city: string; id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = await db.store.findFirst({
    where: { id: parseInt(params.id) },
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

export default async function StorePage({ params }: Props) {
  // Validar que la ciudad sea válida
  const cityUpper = params.city.toUpperCase() as City;
  if (!Object.values(City).includes(cityUpper)) {
    notFound();
  }

  const store = await db.store.findFirst({
    where: {
      id: parseInt(params.id),
      city: cityUpper,
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
    <section className="flex flex-col gap-3">
      <StoreHeader
        bannerUrl={store.bannerUrl}
        name={store.name}
        address={store.address}
      />
      <ProductList products={store.products} />
      <ReserveButton phone={store.phone} />
    </section>
  );
}
