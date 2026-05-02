import type { Banner, Logo, Store } from '@prisma/client'
import ClipboardShare from '@/app/(dashboard)/_components/clipboard-share'
import BannerBtn from '@/app/(dashboard)/_components/upload-btn-banner'
import UploadBtn from '@/app/(dashboard)/_components/upload-btn-logo'
import { LoadingButton } from '@/components/loading-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateStore } from '@/lib/actions/store'

type StoreInfoTabProps = {
  store: Store & {
    logo: Logo | null
    banner: Banner | null
  }
}

export function StoreInfoTab({ store }: StoreInfoTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Imágenes de la tienda</CardTitle>
          <CardDescription>
            Personaliza el aspecto de tu tienda con un logo y banner atractivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <UploadBtn storeId={store.id} storeLogo={store.logo?.url ?? ''} />
            <BannerBtn
              storeBanner={store.banner?.url ?? ''}
              storeId={store.id}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de la tienda</CardTitle>
          <CardDescription>
            Modifica la información básica de tu tienda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateStore.bind(null, store.id)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="update-store-name">Nombre</Label>
              <Input
                aria-describedby="update-store-name"
                defaultValue={store?.name ?? ''}
                id="update-store-name"
                maxLength={50}
                minLength={3}
                name="name"
                placeholder="Acá va el nombre de tu tienda."
                required
              />
            </div>
            <div className="flex pt-2">
              <LoadingButton action="update">
                Actualizar información
                <span className="sr-only">Actualizar</span>
              </LoadingButton>
            </div>
          </form>
          <div className="mt-6 rounded-md border p-4">
            <p className="font-medium text-sm">Dirección</p>
            <p className="mt-1">{store.address}</p>
          </div>
        </CardContent>
      </Card>

      <ClipboardShare storeId={store.id} />
    </div>
  )
}
