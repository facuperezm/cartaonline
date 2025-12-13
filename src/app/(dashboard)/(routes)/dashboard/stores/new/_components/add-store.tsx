"use client";

import { useActionState, useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

import { createStore } from "@/lib/actions/store";
import { CITIES } from "@/lib/constants/cities";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
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

const initialState = {
  success: false,
  error: "",
  message: "",
  formData: undefined as Record<string, FormDataEntryValue> | undefined,
};

export function AddStoreForm() {
  const [state, action, isPending] = useActionState(createStore, initialState);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
    city: "",
  });

  // Restore form data if there was an error
  useEffect(() => {
    if (state?.formData) {
      setFormData({
        name: (state.formData.name as string) || "",
        address: (state.formData.address as string) || "",
        phone: (state.formData.phone as string) || "",
        description: (state.formData.description as string) || "",
        city: (state.formData.city as string) || "",
      });
    }
  }, [state?.formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      city: value,
    });
  };

  return (
    <form className="grid w-full max-w-xl gap-5" action={action}>
      {state?.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al crear la tienda</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      
      {state?.success && state?.message && (
        <Alert className="border-green-500 text-green-700">
          <AlertTitle>¡Éxito!</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <Label htmlFor="name" className="flex flex-col gap-2">
        Nombre de la tienda
        <Input
          placeholder="Empanadas Argentas"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </Label>
      <Label htmlFor="address" className="flex flex-col gap-2">
        Dirección
        <Input
          placeholder="Av. Corrientes 1234, CABA, Argentina"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </Label>
      <Label htmlFor="phone" className="flex flex-col gap-2">
        Teléfono
        <Input
          placeholder="Tu número de WhatsApp con 54 y la característica (543757123456)"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </Label>
      <Label htmlFor="description" className="flex flex-col gap-2">
        Descripción del negocio
        <Textarea
          autoComplete="false"
          placeholder="El mejor restaurant de empanadas del planeta tierra"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </Label>
      <Label htmlFor="city" className="flex flex-col gap-2">
        Ciudad
        <Select
          value={formData.city}
          onValueChange={handleSelectChange}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Elegí tu ciudad" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ciudad</SelectLabel>
              {CITIES.map((city) => (
                <SelectItem
                  key={city.name}
                  value={city.name}
                  disabled={!city.active}
                >
                  {city.displayName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Hidden input to submit the city value with the form */}
        <input type="hidden" name="city" value={formData.city} />
      </Label>
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
