import { z } from "zod";

export const productsSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  category: z.string(),
});

export const updateProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  category: z.enum(["COMIDA", "BEBIDA", "POSTRE"]),
});

export type Products = z.infer<typeof productsSchema>;
