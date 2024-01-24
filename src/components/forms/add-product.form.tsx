"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { catchError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { trpc } from "@/app/_trpc/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const productSchema = z.object({
  name: z.string(),
  price: z.string(),
  category: z.enum(["Comida", "Bebida", "Postre"]),
});

type Inputs = z.infer<typeof productSchema>;

export function AddProductForm({
  setOpen,
  storeId,
}: {
  setOpen: (value: boolean) => void;
  storeId: number;
}) {
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
  });

  const { mutate: addProduct, isLoading } = trpc.createProduct.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("El producto se agregó correctamente.");
      setOpen(false);
      router.refresh();
    },
    onError: (err) => {
      const errorMessage = JSON.parse(err.message);
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0].message);
      } else {
        toast.error("Ocurrió un error, porfavor probá denuevo.");
      }
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        addProduct({ ...data, storeId });
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del producto</FormLabel>
              <FormControl>
                <Input placeholder="Empanadas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1200" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bebida">Bebida</SelectItem>
                    <SelectItem value="Postre">Postre</SelectItem>
                    <SelectItem value="Comida">Comida</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          className="mt-2 w-full transition-all"
          disabled={isPending || isLoading}
        >
          {isPending ||
            (isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ))}
          {isPending || isLoading ? "Agregando producto" : "Agregar producto"}
          <span className="sr-only">Agregar producto</span>
        </Button>
      </form>
    </Form>
  );
}
