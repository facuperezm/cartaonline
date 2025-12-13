import type { Metadata } from 'next'
import { StoreLobbyCard } from '@/app/(lobby)/_components/store-lobby-card'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { getStoresByCity } from '@/lib/queries/store'
import { normalizeCityName } from '@/lib/utils'

type CityPageProps = {
  params: Promise<{ city: string }>
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city } = await params
  const cityName = normalizeCityName(city)

  return {
    title: `${cityName} | CartaOnline`,
    description: `Los mejores restaurantes de ${cityName} | Esta página fue creada con Carta Online, crea tu carta online en minutos.`,
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params

  const stores = await getStoresByCity(city)
  const cityName = normalizeCityName(city)

  return stores.length > 0 ? (
    <Shell>
      <PageHeader
        aria-labelledby="subcategory-page-header-heading"
        id="subcategory-page-header"
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
            address={store.address}
            banner={store.banner?.url}
            city={store.city.name}
            id={store.id}
            key={store.id}
            logoUrl={store.logo?.url}
            name={store.name}
          />
        ))}
      </div>
    </Shell>
  ) : (
    <Shell variant="default">
      <PageHeader
        aria-labelledby="subcategory-page-header-heading"
        id="subcategory-page-header"
      >
        <PageHeaderHeading className="text-balance">
          Estamos trabajando para traerte los mejores restaurants de la ciudad
        </PageHeaderHeading>
        <PageHeaderDescription>
          Mientras tanto podes ver los que tenemos disponibles en otras ciudades
        </PageHeaderDescription>
      </PageHeader>
    </Shell>
  )
}
