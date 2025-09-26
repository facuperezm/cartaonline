import type { Banner, City, Logo, Product, Store } from "@prisma/client";
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
import { DataTable } from "@/app/(dashboard)/_components/tables/data-table";
import BannerBtn from "@/app/(dashboard)/_components/upload-btn-banner";
import UploadBtn from "@/app/(dashboard)/_components/upload-btn-logo";

import { columns } from "./tables/columns";
import { Textarea } from "@/components/ui/textarea";
import {
  createPromotion,
  deletePromotion,
  togglePromotion,
} from "@/lib/actions/promotion";
import { Button } from "@/components/ui/button";

interface StoreSettingsProps {
  store: Store & {
    products: Product[];
    logo: Logo | null;
    banner: Banner | null;
    city: City;
    promotions?: Array<{
      id: string;
      title: string;
      description: string | null;
      discountType: "PERCENTAGE" | "FIXED";
      value: number;
      active: boolean;
      startDate: Date;
      endDate: Date | null;
    }>;
  };
  cities: City[];
}

export default function StoreSettings({ store, cities }: StoreSettingsProps) {
  return (
    <div className="space-y-6">
      {store?.status === "ACTIVE" ? null : (
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
                  storeLogo={store.logo?.url ?? ""}
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
                storeBanner={store.banner?.url ?? ""}
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
                  defaultValue={store?.name ?? ""}
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
                  defaultValue={store?.address ?? ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-store-city">Ciudad</Label>
                <Select name="city" defaultValue={store?.city.name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Elegí tu ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ciudad</SelectLabel>
                      {cities.map((city) => (
                        <SelectItem
                          key={city.id}
                          value={city.name}
                          disabled={!city.active}
                        >
                          {city.displayName}
                        </SelectItem>
                      ))}
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
      <ClipboardShare storeId={store.id} />

      {/* Products Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Lista de productos
        </h2>
        <DataTable
          storeId={store.id}
          columns={columns}
          data={store.products as Product[]}
        />
      </div>

      {/* Promotions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Promociones y descuentos</CardTitle>
          <CardDescription>
            Crea promos para eventos, feriados o campañas. Podés elegir monto fijo
            o porcentaje y definir las fechas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form action={createPromotion} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="storeId" value={store.id} />
            <div className="space-y-2">
              <Label htmlFor="promo-title">Título</Label>
              <Input id="promo-title" name="title" placeholder="Happy Hour" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo-discountType">Tipo de descuento</Label>
              <select
                id="promo-discountType"
                name="discountType"
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue="PERCENTAGE"
              >
                <option value="PERCENTAGE">Porcentaje (%)</option>
                <option value="FIXED">Monto fijo</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo-value">Valor</Label>
              <Input id="promo-value" name="value" type="number" min={1} placeholder="20" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo-startDate">Fecha de inicio</Label>
              <Input id="promo-startDate" name="startDate" type="datetime-local" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="promo-endDate">Fecha de fin (opcional)</Label>
              <Input id="promo-endDate" name="endDate" type="datetime-local" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="promo-description">Descripción (opcional)</Label>
              <Textarea id="promo-description" name="description" placeholder="2x1 en bebidas de 18 a 20 hs" />
            </div>
            <div className="md:col-span-2">
              <LoadingButton action="create">Crear promoción</LoadingButton>
            </div>
          </form>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Promos existentes</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {(((store.promotions ?? []) as Array<{
                id: string;
                title: string;
                description: string | null;
                discountType: "PERCENTAGE" | "FIXED";
                value: number;
                active: boolean;
                startDate: Date;
                endDate: Date | null;
              }>)).map((promo) => (
                <div key={promo.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {promo.active ? "Activa" : "Inactiva"}
                      </p>
                      <h4 className="text-xl font-semibold">{promo.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {promo.discountType === "PERCENTAGE" ? `${promo.value}%` : `$${promo.value}`}
                      </p>
                      {promo.description ? (
                        <p className="mt-1 text-sm">{promo.description}</p>
                      ) : null}
                      <p className="mt-2 text-xs text-muted-foreground">
                        Desde {new Date(promo.startDate).toLocaleString()} {promo.endDate ? `hasta ${new Date(promo.endDate).toLocaleString()}` : "(sin fecha de fin)"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <form
                        action={async () => {
                          "use server";
                          await togglePromotion(promo.id);
                        }}
                      >
                        <Button variant="outline" size="sm">
                          {promo.active ? "Desactivar" : "Activar"}
                        </Button>
                      </form>
                      <form
                        action={async () => {
                          "use server";
                          await deletePromotion(promo.id);
                        }}
                      >
                        <Button variant="destructive" size="sm">Eliminar</Button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Store Status */}
      <form>
        <Card className="flex flex-row items-center justify-between">
          <CardHeader>
            <CardTitle>
              Queres {store?.status === "ACTIVE" ? "desactivar" : "activar"} tu
              tienda?
            </CardTitle>
            <CardDescription>
              <p>
                {store?.status === "ACTIVE"
                  ? "Tu tienda no estará disponible."
                  : "Tu tienda estará disponible."}
              </p>
              <span>
                <input
                  type="hidden"
                  name="status"
                  value={store?.status}
                  aria-hidden
                />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <LoadingButton
              variant={store?.status === "ACTIVE" ? "destructive" : "default"}
              action="update"
              formAction={updateStoreStatus.bind(null, store.id)}
            >
              {store?.status === "ACTIVE" ? "Desactivar" : "Activar"}
              <span className="sr-only">
                {store?.status === "ACTIVE" ? "Desactivar" : "Activar"}
              </span>
            </LoadingButton>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
