import { db } from "@/lib/db";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { Shell } from "@/components/shell";

export default async function ComapniesPage() {
  const stores = await db.store.findMany();
  console.log(stores);
  return (
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
            id={company.id}
            key={company.id}
            name={company.name}
            address={company.address}
          />
        ))}
      </div>
    </Shell>
  );
}