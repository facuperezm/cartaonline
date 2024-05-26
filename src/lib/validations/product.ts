import { z } from "zod";

export const AddProductsSchema = z.object({
  // id: z.string(),
  name: z.string(),
  price: z.string(),
  description: z.string(),
  category: z.enum(["Comida", "Bebida", "Postre"]),
});

export type Inputs = z.infer<typeof AddProductsSchema>;

export const updateProductSchema = z.object({
  id: z.string({
    invalid_type_error: "El id debe ser un texto",
  }),
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
  description: z.string({
    invalid_type_error: "La descripción debe ser un texto",
  }),
  category: z.enum(["Comida", "Bebida", "Postre"]),
});
