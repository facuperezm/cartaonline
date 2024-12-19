import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { type City } from "@prisma/client";

import { db } from "@/lib/db";
import { ProductList } from "@/app/(lobby)/_components/product-list";
import { ReserveButton } from "@/app/(lobby)/_components/reserve-button";
import { StoreHeader } from "@/app/(lobby)/_components/store-header";

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
