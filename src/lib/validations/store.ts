import * as z from "zod";

export const updateStoreSchema = z.object({
  name: z.string().min(3).max(50),
  address: z.string().optional(),
  description: z.string().optional(),
  city: z
    .enum([
      "puerto_iguazu",
      "posadas",
      "cordoba",
      "ushuaia",
      "corrientes",
      "buenos_aires",
    ])
    .optional(),
});

export const storeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  address: z.string().min(3, "Address must be at least 3 characters long."),
  phone: z.string().min(8, "Phone must be at least 8 characters long."),
  description: z.string(),
  city: z.string(),
});

export type Inputs = z.infer<typeof storeSchema>;
