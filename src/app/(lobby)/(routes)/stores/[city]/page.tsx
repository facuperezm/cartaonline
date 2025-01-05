import { type Metadata } from "next";

import { db } from "@/lib/db";
import { normalizeCityName } from "@/lib/utils";
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
  const cityName = normalizeCityName(city);

  return {
    title: `${cityName} | CartaOnline`,
    description: `Los mejores restaurantes de ${cityName} | Esta página fue creada con Carta Online, crea tu carta online en minutos.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;

  const stores = await db.store.findMany({
    where: {
      city: {
        name: city,
      },
      status: "ACTIVE",
    },
    include: {
      city: true,
      banner: true,
      logo: true,
    },
  });

  const cityName = normalizeCityName(city);

  return stores.length > 0 ? (
    <Shell>
      <PageHeader
        id="subcategory-page-header"
        aria-labelledby="subcategory-page-header-heading"
      >
        <PageHeaderHeading>
          Estos son las mejores tiendas de {cityName}
        </PageHeaderHeading>
        <PageHeaderDescription>
          Descubri todo lo que tienen para ofrecer ✨
        </PageHeaderDescription>
      </PageHeader>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stores.map((store) => (
          <StoreLobbyCard
            banner={store.banner?.url}
            city={store.city.name}
            logoUrl={store.logo?.url}
            key={store.id}
            id={store.id}
            name={store.name}
            address={store.address}
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
