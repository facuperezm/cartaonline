import { type Metadata } from "next";

import { deleteStore, updateStore } from "@/lib/actions/store";
import { db } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/loading-button";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Manage Store",
  description: "Manage your store",
};

interface UpdateStorePageProps {
  params: {
    id: string;
  };
}
export const revalidate = 1;

export default async function UpdateStorePage({
  params,
}: UpdateStorePageProps) {
  const storeId = Number(params.id);

  const store = await db.store.findFirst({
    where: {
      id: storeId,
    },
  });

  const productsFromStore = await db.product.findMany({
    where: {
      storeId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
    },
  });

  if (!store) {
    return (
      <div className="mx-auto flex h-dvh items-center font-bold">
        Store not found
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-semibold leading-none tracking-tight">
        Actualizar tienda
      </h2>
      <form action={updateStore.bind(null, storeId)} className="grid gap-5">
        <div className="grid gap-2.5">
          <Label htmlFor="update-store-name">Nombre</Label>
          <Input
            id="update-store-name"
            aria-describedby="update-store-name"
            name="name"
            required
            minLength={3}
            maxLength={50}
            placeholder="Acá va el nombre de tu tienda."
            defaultValue={store.name ?? ""}
          />
        </div>
        <div className="grid gap-2.5">
          <Label htmlFor="update-store-address">Dirección</Label>
          <Textarea
            id="update-store-address"
            aria-describedby="update-store-address"
            name="address"
            minLength={3}
            maxLength={255}
            placeholder="Acá va tu dirección."
            defaultValue={store.address ?? ""}
          />
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
      <div className="mx-auto py-10">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Lista de productos
        </h2>
        <DataTable columns={columns} data={productsFromStore} />
      </div>
    </div>
  );
}
