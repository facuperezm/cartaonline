import {
  AlertCircleIcon,
  CheckCircle2Icon,
  PackageIcon,
  QrCodeIcon,
  SettingsIcon,
  ShieldAlertIcon,
} from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { QRCodeCustomizer } from '@/app/(dashboard)/_components/qr-code-customizer'
import { StoreDangerZone } from '@/app/(dashboard)/_components/store-danger-zone'
import { StoreInfoTab } from '@/app/(dashboard)/_components/store-info-tab'
import { StoreProductsTab } from '@/app/(dashboard)/_components/store-products-tab'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCities } from '@/lib/queries/city'
import { getStoreById } from '@/lib/queries/store'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const store = await getStoreById(id)

  if (!store) {
    return {
      title: 'CartaOnline - Tienda no encontrada',
      description: 'La tienda que estás buscando no existe.',
    }
  }

  return {
    title: `${store.name} - Settings`,
    description: `Manage ${store.name} settings`,
  }
}

export default async function StorePage({ params }: PageProps) {
  const { id } = await params
  const store = await getStoreById(id)

  if (!store) {
    notFound()
  }

  const cities = await getCities()

  const storeUrl = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/stores/${store.city.name.toLowerCase()}/${store.id}`

  const isActive = store.status === 'ACTIVE'

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex items-center gap-3">
          <PageHeaderHeading>{store.name}</PageHeaderHeading>
          <Badge
            className={cn(
              'gap-1.5',
              isActive && 'bg-emerald-600 hover:bg-emerald-600/90',
            )}
            variant={isActive ? 'default' : 'destructive'}
          >
            {isActive ? (
              <CheckCircle2Icon className="size-3" />
            ) : (
              <AlertCircleIcon className="size-3" />
            )}
            {isActive ? 'Activa' : 'Inactiva'}
          </Badge>
        </div>
        <PageHeaderDescription>
          Administra la configuración de tu tienda
        </PageHeaderDescription>
      </PageHeader>

      <Tabs className="space-y-6" defaultValue="products">
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger className="gap-2" value="products">
            <PackageIcon className="size-4" />
            Productos
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="store">
            <SettingsIcon className="size-4" />
            Tienda
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="qr">
            <QrCodeIcon className="size-4" />
            Código QR
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="danger">
            <ShieldAlertIcon className="size-4" />
            Avanzado
          </TabsTrigger>
        </TabsList>

        <TabsContent className="space-y-4" value="products">
          <StoreProductsTab products={store.products} storeId={store.id} />
        </TabsContent>

        <TabsContent className="space-y-4" value="store">
          <StoreInfoTab cities={cities} store={store} />
        </TabsContent>

        <TabsContent className="space-y-4" value="qr">
          <QRCodeCustomizer storeName={store.name} storeUrl={storeUrl} />
        </TabsContent>

        <TabsContent className="space-y-4" value="danger">
          <StoreDangerZone store={store} />
        </TabsContent>
      </Tabs>
    </Shell>
  )
}
