import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductList } from '@/app/(lobby)/_components/product-list'
import { ReserveButton } from '@/app/(lobby)/_components/reserve-button'
import { StoreHeader } from '@/app/(lobby)/_components/store-header'
import { Shell } from '@/components/shell'
import { Button } from '@/components/ui/button'
import { getStoreById } from '@/lib/queries/store'

interface StorePageProps {
  params: Promise<{
    city: string
    id: string
  }>
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const { id } = await params
  const store = await getStoreById(id)

  if (!store) {
    return {
      title: 'Tienda no encontrada',
      description: 'La tienda que buscas no existe',
    }
  }

  return {
    title: store.name,
    description: `${store.description} | Esta página fue creada con Carta Online, crea tu carta online en minutos.`,
    openGraph: {
      title: store.name,
      description: store.description,
      images: [
        {
          url: store.banner?.url ?? '/images/restaurant.webp',
          width: 800,
          height: 600,
          alt: store.name,
        },
      ],
    },
  }
}

export default async function StorePage({ params }: StorePageProps) {
  const { id } = await params

  const store = await getStoreById(id)

  if (!store) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Banner */}
      <StoreHeader store={store} />

      {/* Menu Section */}
      <Shell className="flex-1 py-6 md:py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">Nuestro Menú</h2>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                Ordenar por
              </Button>
              <Button size="sm" variant="outline">
                Filtrar
              </Button>
            </div>
          </div>
          <ProductList products={store.products} />
        </div>
        <ReserveButton phone={store.phone} />
      </Shell>
    </div>
  )
}
