import { type Metadata } from "next";
import { AlertCircleIcon } from "lucide-react";

import {
  deleteStore,
  updateStore,
  updateStoreStatus,
} from "@/lib/actions/store";
import { db } from "@/lib/db";
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
import { columns } from "@/components/tables/columns";
import { DataTable } from "@/components/tables/data-table";

export const metadata: Metadata = {
  title: "Administrá tu tienda",
  description: "Modifica toda la información de tu tienda",
};

export default async function UpdateStorePage({
  params,
}: {
  params: { id: string };
}) {
  const storeId = Number(params.id);

  const storeWithProducts = await db.store.findFirst({
    where: {
      id: storeId,
    },
    include: {
      products: true,
    },
  });

  if (!storeWithProducts) {
    return (
      <div className="mx-auto flex h-dvh items-center font-bold">
        Store not found
      </div>
    );
  }

  return (
    <div className="mt-10">
      {storeWithProducts?.status === "ACTIVE" ? null : (
        <Alert variant="destructive" className="mb-5">
          <AlertCircleIcon className="size-4" />
          <AlertTitle>Aviso importante</AlertTitle>
          <AlertDescription>
            Tu tienda está inactiva, nadie puede verla. Activala para que todos
            puedan verla.
          </AlertDescription>
        </Alert>
      )}
      <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tighter">
        Actualizar tienda
      </h2>
      <form action={updateStore.bind(null, storeId)} className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="update-store-name">Nombre</Label>
          <Input
            id="update-store-name"
            aria-describedby="update-store-name"
            name="name"
            required
            minLength={3}
            maxLength={50}
            placeholder="Acá va el nombre de tu tienda."
            defaultValue={storeWithProducts.name ?? ""}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="update-store-address">Dirección</Label>
          <Input
            id="update-store-address"
            aria-describedby="update-store-address"
            name="address"
            minLength={3}
            maxLength={255}
            placeholder="Acá va tu dirección."
            defaultValue={storeWithProducts.address ?? ""}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="update-store-city">Ciudad</Label>
          <Select name="city" defaultValue={storeWithProducts?.city}>
            <SelectTrigger>
              <SelectValue placeholder="Elegí tu ciudad" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ciudad</SelectLabel>
                <SelectItem value="puerto_iguazu">Puerto Iguazú</SelectItem>
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
        <div className="flex flex-col gap-2 lg:flex-row">
          <LoadingButton action="update">
            Actualizar información
            <span className="sr-only">Actualizar</span>
          </LoadingButton>
          <LoadingButton
            formAction={deleteStore.bind(null, storeId)}
            variant="destructive"
            action="delete"
          >
            Borrar tienda
            <span className="sr-only">Borrar tienda</span>
          </LoadingButton>
        </div>
      </form>
      <div className="mx-auto pb-4 pt-10">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Lista de productos
        </h2>
        <DataTable
          storeId={storeWithProducts.id}
          columns={columns}
          data={storeWithProducts.products}
        />
      </div>
      <form className="mb-4">
        <Card className="flex flex-row items-center justify-between">
          <CardHeader>
            <CardTitle>
              Queres{" "}
              {storeWithProducts.status === "ACTIVE" ? "desactivar" : "activar"}{" "}
              tu tienda?
            </CardTitle>
            <CardDescription>
              <p>
                {storeWithProducts.status === "ACTIVE"
                  ? "Tu tienda no estará disponible."
                  : "Tu tienda estará disponible."}
              </p>
              <span>
                <input
                  type="hidden"
                  name="status"
                  value={storeWithProducts.status}
                  aria-hidden
                />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <LoadingButton
              variant={
                storeWithProducts.status === "ACTIVE"
                  ? "destructive"
                  : "default"
              }
              action="update"
              formAction={updateStoreStatus.bind(null, storeId)}
            >
              {storeWithProducts.status === "ACTIVE" ? "Desactivar" : "Activar"}
              <span className="sr-only">
                {storeWithProducts.status === "ACTIVE"
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
