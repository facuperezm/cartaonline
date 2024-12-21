import { type Metadata } from "next";
import { type City } from "@prisma/client";

import { db } from "@/lib/db";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";
import { StoreLobbyCard } from "@/app/(lobby)/_components/store-lobby-card";

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = city
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());

  return {
    title: `${cityName}`,
    description: `Los mejores restaurantes de ${cityName} | Esta página fue creada con Carta Online, crea tu carta online en minutos.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const stores = await db.store.findMany({
    where: {
      city: city as City,
      status: "ACTIVE",
    },
  });

  const cityName = city
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());

  return stores.length > 0 ? (
    <Shell>
      <PageHeader
        id="subcategory-page-header"
        aria-labelledby="subcategory-page-header-heading"
      >
        <PageHeaderHeading size="sm">
          Estos son las mejores tiendas de {cityName}
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Descubri todo lo que tienen para ofrecer ✨
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stores.map((company) => (
          <StoreLobbyCard
            banner={company.bannerUrl}
            city={company.city}
            logoUrl={company.logoUrl}
            key={company.id}
            id={company.id.toString()}
            name={company.name}
            address={company.address}
          />
        ))}
      </div>
    </Shell>
  ) : (
    <Shell variant="default">
      <PageHeader
        id="subcategory-page-header"
        aria-labelledby="subcategory-page-header-heading"
      >
        <PageHeaderHeading className="text-balance">
          Estamos trabajando para traerte los mejores restaurants de la ciudad
        </PageHeaderHeading>
        <PageHeaderDescription>
          Mientras tanto podes ver los que tenemos disponibles en otras ciudades
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  );
}
