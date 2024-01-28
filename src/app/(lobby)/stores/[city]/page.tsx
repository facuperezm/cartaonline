import { type City } from "@/types";

import { db } from "@/lib/db";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { Shell } from "@/components/shell";

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
          <ProductCard
            city={company.city}
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
