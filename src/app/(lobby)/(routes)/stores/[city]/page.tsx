import type { Metadata } from 'next'
import Link from 'next/link'
import { StoreLobbyCard } from '@/app/(lobby)/_components/store-lobby-card'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { Button } from '@/components/ui/button'
import { getStoresByCity } from '@/lib/queries/store'
import { normalizeCityName } from '@/lib/utils'

type CityPageProps = {
  params: Promise<{ city: string }>
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city } = await params
  const stores = await getStoresByCity(city)
  const cityName = normalizeCityName(city)

  return {
    title: `${cityName} | CartaOnline`,
    description: `Los mejores restaurantes de ${cityName} | Esta página fue creada con Carta Online, crea tu carta online en minutos.`,
    robots:
      stores.length === 0
        ? {
            index: false,
            follow: true,
          }
        : undefined,
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
            city={store.citySlug}
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
          Aún no hay tiendas registradas en esta ciudad
        </PageHeaderHeading>
        <PageHeaderDescription>
          {cityName} puede ser la próxima ciudad con cartas online.
        </PageHeaderDescription>
        <Button asChild className="mt-4 w-fit">
          <Link href="/sign-up">Crear tu carta gratis</Link>
        </Button>
      </PageHeader>
    </Shell>
  )
}
