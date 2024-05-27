import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shell";

type GroupedProducts = {
  [category: string]: Product[];
};

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  storeId: number;
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = await db.store.findFirst({
    where: { slug: params.slug },
  });
  return {
    title: store?.name,
    description: `${store?.description} | Esta página fue creada con Carta Online, crea tu carta online en minutos.`,
    openGraph: {
      description: `${store?.description} | Esta página fue creada con Carta Online, crea tu carta online en minutos.`,
    },
  };
}

export default async function SlugStorePage({
  params,
}: {
  params: { slug: string };
}) {
  const store = await db.store.findFirst({
    where: { slug: params.slug },
    include: { products: true },
  });

  if (!store) {
    return null;
  }

  const groupedProducts: GroupedProducts =
    store.products.reduce<GroupedProducts>((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});

  return (
    <>
      <section className="flex flex-col gap-3">
        <header className="relative rounded-md">
          <div className="absolute z-10 size-full bg-gradient-to-t from-stone-900 from-5% to-transparent to-90%"></div>
          <Image
            className="h-40 w-full object-cover md:h-72"
            src={store?.bannerUrl ?? "/images/restaurant.webp"}
            alt="this is a nice restaurant picture"
            width={800}
            height={1000}
          />
          <div className="absolute bottom-0 z-20 w-full">
            <h1 className="line-clamp-2 rounded-b-md px-4 text-2xl font-bold text-background md:mx-auto md:max-w-3xl md:pl-8">
              {store?.name ?? "Tienda"}
            </h1>
            <p className="px-4 pb-3 text-base text-muted md:mx-auto md:max-w-3xl md:pl-8">
              {store?.address ?? "Dirección"}
            </p>
          </div>
        </header>
        <Shell className="py-4 md:max-w-3xl md:pb-14">
          {store.products.length > 0 ? (
            Object.keys(groupedProducts).map((category) => (
              <div key={category}>
                <div className="mb-4">
                  <p className="text-2xl font-semibold">{category}</p>
                  <Separator />
                </div>
                <article className="space-y-2">
                  <ul className="space-y-3 text-base text-muted-foreground">
                    {groupedProducts[category].map((product) => (
                      <li key={product.id}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="line-clamp-2 text-balance text-xl font-medium capitalize text-foreground/80">
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
              </div>
            ))
          ) : (
            // eslint-disable-next-line tailwindcss/no-custom-classname
            <div className="border-foreground-muted space-y-2 rounded-lg border px-14 py-32 text-center">
              <p className="mb-1 text-xl font-medium tracking-tight">
                No hay productos
              </p>
              <p className="text-sm [&_p]:leading-relaxed">
                Pronto habrá productos disponibles.
              </p>
            </div>
          )}
        </Shell>
        <Link
          className="sticky bottom-5 z-20 mx-auto mb-6 max-w-3xl gap-2 rounded-3xl bg-lime-500 p-2 px-4 text-center text-white shadow-md transition-all hover:bg-lime-500/90"
          href={`https://wa.me/${store?.phone}?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20realizar%20una%20reserva`}
        >
          <div className="flex gap-2">
            <Icons.whatsapp />

            <span>Reservar</span>
          </div>
        </Link>
      </section>
    </>
  );
}
