import { type Metadata } from "next";
import { type City } from "@/types";

import { db } from "@/lib/db";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";
import { StoreLobbyCard } from "@/app/(lobby)/_components/store-lobby-card";

type Props = {
  params: { city: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // remove spaces and capitalize city name
  const city = params.city
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${city}`,
    description: `Los mejores restaurantes de ${city} | Esta página fue creada con Carta Online, crea tu carta online en minutos.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: { city: string | City | any };
}) {
  const stores = await db.store.findMany({
    where: {
      city: params.city,
      status: "ACTIVE",
    },
  });

  return stores.length > 0 ? (
    <Shell>
      <PageHeader
        id="subcategory-page-header"
        aria-labelledby="subcategory-page-header-heading"
      >
        <PageHeaderHeading size="sm">
          Estos son los mejores restaurants de la ciudad
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
