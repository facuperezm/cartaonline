import type { Store } from '@prisma/client'
import {
  AlertTriangleIcon,
  EyeOffIcon,
  PowerIcon,
  Trash2Icon,
} from 'lucide-react'
import { LoadingButton } from '@/components/loading-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { deleteStore, updateStoreStatus } from '@/lib/actions/store'

type StoreDangerZoneProps = {
  store: Store
}

export function StoreDangerZone({ store }: StoreDangerZoneProps) {
  const isActive = store?.status === 'ACTIVE'

  return (
    <div className="space-y-6">
      {/* Warning Header */}
      <Alert
        className="border-destructive/50 bg-destructive/5"
        variant="destructive"
      >
        <AlertTriangleIcon className="size-4" />
        <AlertTitle>Zona de peligro</AlertTitle>
        <AlertDescription>
          Las acciones en esta sección pueden afectar la visibilidad de tu
          tienda o eliminarla permanentemente.
        </AlertDescription>
      </Alert>

      {/* Two-column layout on desktop */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Store Status Toggle */}
        <Card className="flex flex-col">
          <CardHeader className="flex-1">
            <div className="flex items-center gap-2">
              {isActive ? (
                <EyeOffIcon className="size-5 text-muted-foreground" />
              ) : (
                <PowerIcon className="size-5 text-emerald-600" />
              )}
              <CardTitle className="text-base">
                {isActive ? 'Desactivar tienda' : 'Activar tienda'}
              </CardTitle>
            </div>
            <CardDescription className="mt-2">
              {isActive
                ? 'Tu tienda dejará de ser visible para los clientes. Podrás reactivarla en cualquier momento.'
                : 'Tu tienda volverá a estar visible para todos los clientes.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <form>
              <input
                aria-hidden
                name="status"
                type="hidden"
                value={store?.status}
              />
              <LoadingButton
                action="update"
                className="w-full"
                formAction={updateStoreStatus.bind(null, store.id)}
                variant={isActive ? 'secondary' : 'default'}
              >
                {isActive ? 'Desactivar tienda' : 'Activar tienda'}
              </LoadingButton>
            </form>
          </CardContent>
        </Card>

        {/* Delete Store */}
        <Card className="flex flex-col border-destructive/30 bg-destructive/5">
          <CardHeader className="flex-1">
            <div className="flex items-center gap-2">
              <Trash2Icon className="size-5 text-destructive" />
              <CardTitle className="text-base text-destructive">
                Eliminar tienda
              </CardTitle>
            </div>
            <CardDescription className="mt-2">
              Esta acción es irreversible. Se eliminarán todos los productos,
              imágenes y configuraciones.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <form>
              <LoadingButton
                action="delete"
                className="w-full"
                formAction={deleteStore.bind(null, store.id)}
                variant="destructive"
              >
                Eliminar permanentemente
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
