import { AlertCircleIcon } from "lucide-react";

import {
  deleteStore,
  updateStore,
  updateStoreStatus,
} from "@/lib/actions/store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoadingButton } from "@/components/loading-button";
import ClipboardShare from "@/app/(dashboard)/_components/clipboard-share";
import { columns } from "@/app/(dashboard)/_components/tables/columns";
import { DataTable } from "@/app/(dashboard)/_components/tables/data-table";
import BannerBtn from "@/app/(dashboard)/_components/upload-btn-banner";
import UploadBtn from "@/app/(dashboard)/_components/upload-btn-logo";

interface StoreSettingsProps {
  store: any;
  storeWithProducts: any;
}

export default function StoreSettings({
  store,
  storeWithProducts,
}: StoreSettingsProps) {
  return (
    <div className="space-y-6">
      {storeWithProducts?.status === "ACTIVE" ? null : (
        <Alert variant="destructive">
          <AlertCircleIcon className="size-4" />
          <AlertTitle>Aviso importante</AlertTitle>
          <AlertDescription>
            Tu tienda está inactiva, nadie puede verla. Activala para que todos
            puedan verla.
          </AlertDescription>
        </Alert>
      )}

      {/* Media Section */}
      <Card>
        <CardHeader>
          <CardTitle>Imágenes de la tienda</CardTitle>
          <CardDescription>
            Personaliza el aspecto de tu tienda con un logo y banner atractivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Logo de la tienda</Label>
                <span className="text-xs text-muted-foreground">
                  Recomendado: 400x400px
                </span>
              </div>
              <div className="flex justify-center">
                <UploadBtn
                  storeId={store.id}
                  storeLogo={storeWithProducts?.logoUrl ?? ""}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Banner de la tienda</Label>
                <span className="text-xs text-muted-foreground">
                  Recomendado: 1920x820px
                </span>
              </div>
              <BannerBtn
                storeId={store.id}
                storeBanner={storeWithProducts?.bannerUrl ?? ""}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la tienda</CardTitle>
          <CardDescription>
            Modifica la información básica de tu tienda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateStore.bind(null, store.id)} className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="update-store-name">Nombre</Label>
                <Input
                  id="update-store-name"
                  aria-describedby="update-store-name"
                  name="name"
                  required
                  minLength={3}
                  maxLength={50}
                  placeholder="Acá va el nombre de tu tienda."
                  defaultValue={storeWithProducts?.name ?? ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-store-slug">URL de la tienda</Label>
                <Input
                  id="update-store-slug"
                  aria-describedby="update-store-slug"
                  name="slug"
                  minLength={3}
                  maxLength={20}
                  placeholder="Acá va el url de tu tienda."
                  defaultValue={storeWithProducts?.slug ?? ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-store-address">Dirección</Label>
                <Input
                  id="update-store-address"
                  aria-describedby="update-store-address"
                  name="address"
                  minLength={3}
                  maxLength={255}
                  placeholder="Acá va tu dirección."
                  defaultValue={storeWithProducts?.address ?? ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-store-city">Ciudad</Label>
                <Select name="city" defaultValue={storeWithProducts?.city}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elegí tu ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ciudad</SelectLabel>
                      <SelectItem value="puerto_iguazu">
                        Puerto Iguazú
                      </SelectItem>
                      <SelectItem value="posadas">Posadas</SelectItem>
                      <SelectItem value="corrientes">Corrientes</SelectItem>
                      <SelectItem disabled value="cordoba">
                        Córdoba
                      </SelectItem>
                      <SelectItem disabled value="buenos_aires">
                        Buenos Aires
                      </SelectItem>
                      <SelectItem disabled value="ushuaia">
                        Ushuaia
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4 lg:flex-row">
              <LoadingButton action="update">
                Actualizar información
                <span className="sr-only">Actualizar</span>
              </LoadingButton>
              <LoadingButton
                formAction={deleteStore.bind(null, store.id)}
                variant="destructive"
                action="delete"
              >
                Borrar tienda
                <span className="sr-only">Borrar tienda</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Share Section */}
      {storeWithProducts?.slug && (
        <ClipboardShare
          slug={storeWithProducts.slug}
          storeId={storeWithProducts.id}
        />
      )}

      {/* Products Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Lista de productos
        </h2>
        <DataTable
          storeId={storeWithProducts.id}
          columns={columns}
          data={storeWithProducts.products}
        />
      </div>

      {/* Store Status */}
      <form>
        <Card className="flex flex-row items-center justify-between">
          <CardHeader>
            <CardTitle>
              Queres{" "}
              {storeWithProducts?.status === "ACTIVE"
                ? "desactivar"
                : "activar"}{" "}
              tu tienda?
            </CardTitle>
            <CardDescription>
              <p>
                {storeWithProducts?.status === "ACTIVE"
                  ? "Tu tienda no estará disponible."
                  : "Tu tienda estará disponible."}
              </p>
              <span>
                <input
                  type="hidden"
                  name="status"
                  value={storeWithProducts?.status}
                  aria-hidden
                />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <LoadingButton
              variant={
                storeWithProducts?.status === "ACTIVE"
                  ? "destructive"
                  : "default"
              }
              action="update"
              formAction={updateStoreStatus.bind(null, store.id)}
            >
              {storeWithProducts?.status === "ACTIVE"
                ? "Desactivar"
                : "Activar"}
              <span className="sr-only">
                {storeWithProducts?.status === "ACTIVE"
                  ? "Desactivar"
                  : "Activar"}
              </span>
            </LoadingButton>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
