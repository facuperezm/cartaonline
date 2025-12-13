import type { Product } from '@prisma/client'

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  // Group products by category
  const groupedProducts = products.reduce(
    (acc, product) => {
      const category = product.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(product)
      return acc
    },
    {} as Record<string, Product[]>,
  )

  return (
    <div className="space-y-12">
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div className="space-y-6" key={category}>
          <h3 className="font-semibold text-xl capitalize">{category}</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                className="group relative overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-md"
                key={product.id}
              >
                {/* {product.imageUrl && (
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )} */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">{product.name}</h4>
                      {product.description && (
                        <p className="line-clamp-2 text-muted-foreground text-sm">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <p className="font-semibold">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {/* {product.ingredients && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {product.ingredients}
                    </p>
                  )} */}
                  {/* {product.allergens && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.allergens.split(",").map((allergen) => (
                        <span
                          key={allergen}
                          className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {allergen.trim()}
                        </span>
                      ))}
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
