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

//store schema
const storeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  address: z.string().min(3, "Address must be at least 3 characters long."),
});

type Inputs = z.infer<typeof storeSchema>;

export function AddStoreForm() {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const { mutate, isLoading } = trpc.createStore.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Store added successfully.");
      router.push("/dashboard/stores");
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
        mutate(data);
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la tienda</FormLabel>
              <FormControl>
                <Input placeholder="Empanadas Argentas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direccion</FormLabel>
              <FormControl>
                <Input
                  placeholder="Av. Corrientes 1234, CABA, Argentina"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-fit transition-all"
          disabled={isPending || isLoading}
        >
          {isPending ||
            (isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ))}
          {isPending || isLoading ? "Agregando tienda" : "Agregar tienda"}
          <span className="sr-only">Agregar tienda</span>
        </Button>
      </form>
    </Form>
  );
}
