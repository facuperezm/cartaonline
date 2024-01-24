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
  category: z.enum(["COMIDA", "BEBIDA", "POSTRE"]),
});

type Inputs = z.infer<typeof productSchema>;

export function AddProductForm({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) {
  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
  });

  const { mutate: addProduct, isLoading } = trpc.createProduct.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Product added successfully.");
      setOpen(false);
      router.refresh();
    },
    onError: (err) => {
      const errorMessage = err.message;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        addProduct(data);
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
                <Input placeholder="1200" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            console.log(field);
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
                    <SelectItem value="BEBIDA">Bebida</SelectItem>
                    <SelectItem value="POSTRE">Postre</SelectItem>
                    <SelectItem value="COMIDA">Comida</SelectItem>
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
