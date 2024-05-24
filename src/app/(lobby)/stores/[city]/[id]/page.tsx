import Image from "next/image";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { Shell } from "@/components/shell";

export default async function StorePage({
  params,
}: {
  params: { id: string };
}) {
  const store = await db.store.findFirst({
    where: { id: Number(params.id) },
    include: { products: true },
  });

  if (!store) {
    return null;
  }

  return (
    <>
      <section className="flex flex-col gap-3">
        <header className="relative rounded-md">
          <div className="absolute z-10 size-full bg-gradient-to-t from-stone-900 from-5% to-transparent to-90%"></div>
          <Image
            className="h-56 w-full object-cover md:h-72"
            src={store?.bannerUrl ?? "/images/restaurant.webp"}
            alt="this is a nice restaurant picture"
            width={800}
            height={1000}
          />
          <div className="absolute bottom-0 z-20 w-full">
            <h1 className="line-clamp-1 rounded-b-md px-4 pl-8 text-2xl font-bold text-background md:mx-auto md:max-w-3xl">
              {store?.name ?? "Tienda"}
            </h1>
            <p className="px-4 pb-3 pl-8 text-base text-muted md:mx-auto md:max-w-3xl">
              {store?.address ?? "Dirección"}
            </p>
          </div>
        </header>
        <Shell className="pb-12 pt-4 md:max-w-3xl md:pb-14">
          <div>
            <p className="text-2xl font-semibold">Comidas</p>
            <Separator />
          </div>
          <article className="space-y-2">
            <ul className="space-y-3 text-base text-muted-foreground">
              {store?.products.map((product) => (
                <li key={product.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="line-clamp-1 text-balance text-xl font-medium capitalize text-foreground/80">
                      {product.name}
                    </span>
                    <span className="font-medium">
                      {product.price.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </span>
                  </div>
                  <p className="line-clamp-6 text-pretty font-light">
                    {product.description}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        </Shell>
      </section>
    </>
  );
}
