"use client";

import { useActionState } from "react";

import { createStore } from "@/lib/actions/store";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";

const initialState = {
  message: "",
  success: false,
};

export function AddStoreForm() {
  const [state, action, isPending] = useActionState(createStore, initialState);

  return (
    <form className="grid w-full max-w-xl gap-5" action={action}>
      <Label htmlFor="name" className="flex flex-col gap-2">
        Nombre de la tienda
        <Input placeholder="Empanadas Argentas" name="name" />
      </Label>
      <Label htmlFor="address" className="flex flex-col gap-2">
        Dirección
        <Input
          placeholder="Av. Corrientes 1234, CABA, Argentina"
          name="address"
        />
      </Label>
      <Label htmlFor="phone" className="flex flex-col gap-2">
        Teléfono
        <Input
          placeholder="Tu número de WhatsApp con 54 y la característica (543757123456)"
          name="phone"
          type="tel"
        />
      </Label>
      <Label htmlFor="description" className="flex flex-col gap-2">
        Descripción del negocio
        <Textarea
          autoComplete="false"
          placeholder="El mejor restaurant de empanadas del planeta tierra"
          name="description"
        />
      </Label>
      <Label htmlFor="city" className="flex flex-col gap-2">
        Ciudad
        <Select name="city">
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
      </Label>
      {state.message && <p className="text-red-500">{state.message}</p>}
      <Button
        className="w-fit transition-all"
        disabled={isPending}
        type="submit"
      >
        {isPending ? (
          <>
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />{" "}
            Creando tienda....
          </>
        ) : (
          <>
            Crear tienda
            <span className="sr-only">Agregar tienda</span>
          </>
        )}
      </Button>
    </form>
  );
}
