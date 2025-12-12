import type { Banner, City, Logo, Store } from "@prisma/client";

import { updateStore } from "@/lib/actions/store";
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
import BannerBtn from "@/app/(dashboard)/_components/upload-btn-banner";
import UploadBtn from "@/app/(dashboard)/_components/upload-btn-logo";

interface StoreInfoTabProps {
  store: Store & {
    logo: Logo | null;
    banner: Banner | null;
    city: City;
  };
  cities: City[];
}

export function StoreInfoTab({ store, cities }: StoreInfoTabProps) {
  return (
    <div className="space-y-6">
      {/* Two-column layout for media on larger screens */}
      <Card>
        <CardHeader>
          <CardTitle>Imágenes de la tienda</CardTitle>
          <CardDescription>
            Personaliza el aspecto de tu tienda con un logo y banner atractivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <UploadBtn
              storeId={store.id}
              storeLogo={store.logo?.url ?? ""}
            />
            <BannerBtn
              storeId={store.id}
              storeBanner={store.banner?.url ?? ""}
            />
          </div>
        </CardContent>
      </Card>

      {/* Store Information Form */}
      <Card>
        <CardHeader>
          <CardTitle>Información de la tienda</CardTitle>
          <CardDescription>
            Modifica la información básica de tu tienda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateStore.bind(null, store.id)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
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

            <div className="flex pt-2">
              <LoadingButton action="update">
                Actualizar información
                <span className="sr-only">Actualizar</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Share Section - belongs with store info */}
      <ClipboardShare storeId={store.id} />
    </div>
  );
}
