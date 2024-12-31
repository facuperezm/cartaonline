"use client";

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import { updateProduct } from "@/lib/actions/product";
import { useProduct } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Icons } from "../../../../../../../components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../components/ui/select";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-2 w-full transition-all" disabled={pending}>
      {pending && (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      {pending ? "Editando producto" : "Editar producto"}
      <span className="sr-only">Editar producto</span>
    </Button>
  );
}

const initialState = {
  message: "",
  status: "",
};

export default function EditProductForm({ id }: { id: number }) {
  const { data: product } = useProduct(id.toString());
  const [openEdit, setOpenEdit] = React.useState(false);

  const [state, formAction] = useActionState(updateProduct, initialState);

  React.useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      setOpenEdit(false);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <Dialog onOpenChange={setOpenEdit} open={openEdit}>
      <DialogTrigger asChild>
        <Button
          className="relative flex h-8 w-full cursor-default select-none items-center justify-start rounded-sm px-2 text-left text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          variant="ghost"
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>Cambiar</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid w-full max-w-xl gap-3">
          <Label htmlFor="id" className="sr-only" />
          <Input
            name="id"
            type="hidden"
            className="mt-2"
            defaultValue={product?.id ?? ""}
          />
          <Label htmlFor="name">
            Nombre del producto
            <Input
              name="name"
              required
              minLength={3}
              maxLength={50}
              className="mt-2"
              placeholder="empanadas"
              defaultValue={product?.name ?? ""}
            />
          </Label>
          <Label htmlFor="price">
            Precio
            <Input
              name="price"
              required
              type="number"
              minLength={3}
              className="mt-2"
              maxLength={50}
              placeholder="1230"
              defaultValue={product?.price ?? ""}
            />
          </Label>
          <Label htmlFor="description">
            Descripción
            <Input
              name="description"
              required
              minLength={3}
              className="mt-2"
              maxLength={350}
              placeholder="1230"
              defaultValue={product?.description ?? ""}
            />
          </Label>
          <Label htmlFor="category">
            Categoría
            <Select name="category" defaultValue={product?.category || ""}>
              <SelectTrigger className="mt-2">
                <SelectValue
                  defaultValue={product?.category}
                  placeholder="Seleccionar categoría"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Comida">Comida</SelectItem>
                <SelectItem value="Bebida">Bebida</SelectItem>
                <SelectItem value="Postre">Postre</SelectItem>
              </SelectContent>
            </Select>
          </Label>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}
