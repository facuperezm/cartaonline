import { Separator } from "@/components/ui/separator";
import { Shell } from "@/components/shell";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface GroupedProducts {
  [category: string]: Product[];
}

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const groupedProducts: GroupedProducts = products.reduce<GroupedProducts>(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {},
  );

  if (products.length === 0) {
    return (
      <Shell className="py-4 md:max-w-3xl md:pb-14">
        <div className="border-foreground-muted space-y-2 rounded-lg border px-14 py-32 text-center">
          <p className="mb-1 text-xl font-medium tracking-tight">
            No hay productos
          </p>
          <p className="text-sm [&_p]:leading-relaxed">
            Pronto habrá productos disponibles.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell className="py-4 md:max-w-3xl md:pb-14">
      {Object.keys(groupedProducts).map((category) => (
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
      ))}
    </Shell>
  );
}
