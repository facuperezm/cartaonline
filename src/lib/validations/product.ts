import { z } from "zod";

export const productsSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  category: z.enum(["Comida", "Bebida", "Postre"]),
});

export const updateProductSchema = z.object({
  name: z
    .string({
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    }),
  price: z.string({
    invalid_type_error: "El precio debe ser un número",
  }),
  category: z.enum(["Comida", "Bebida", "Postre"]),
  id: z.string({
    invalid_type_error: "El id debe ser un texto",
  }),
});

export type Products = z.infer<typeof productsSchema>;
