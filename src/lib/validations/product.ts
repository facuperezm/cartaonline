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
    error: "El id debe ser un texto",
  }),
  name: z
    .string({
      error: "El nombre debe ser un texto",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    }),
  price: z.string({
    error: "El precio debe ser un número",
  }),
  description: z.string({
    error: "La descripción debe ser un texto",
  }),
  category: z.enum(["Comida", "Bebida", "Postre"]),
});

// Schema for AI menu extraction
export const aiExtractedProductSchema = z.object({
  name: z.string().describe("Product name from the menu"),
  price: z
    .number()
    .describe("Product price as a number (without currency symbols)"),
  description: z
    .string()
    .describe(
      "Product description or ingredients in Spanish, not in English. Don't exceed 120 characters.",
    ),
  category: z
    .enum(["Comida", "Bebida", "Postre"])
    .describe(
      "Product category: Comida (food), Bebida (drink), or Postre (dessert)",
    ),
});

export const aiMenuExtractionSchema = z.object({
  products: z
    .array(aiExtractedProductSchema)
    .describe("Array of all menu items found in the image or PDF"),
});

export type AIExtractedProduct = z.infer<typeof aiExtractedProductSchema>;
export type AIMenuExtraction = z.infer<typeof aiMenuExtractionSchema>;
