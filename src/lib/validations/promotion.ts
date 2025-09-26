import { z } from "zod";

export const promotionSchema = z.object({
  title: z
    .string({ invalid_type_error: "El título debe ser un texto" })
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z
    .string({ invalid_type_error: "La descripción debe ser un texto" })
    .optional(),
  discountType: z.enum(["PERCENTAGE", "FIXED"], {
    required_error: "Tipo de descuento requerido",
  }),
  value: z
    .string({ invalid_type_error: "El valor debe ser un número" })
    .regex(/^\d+$/, { message: "El valor debe ser un número entero" }),
  startDate: z.string({ required_error: "Fecha de inicio requerida" }),
  endDate: z.string().optional(),
  storeId: z.string({ required_error: "StoreId requerido" }),
});

export const updatePromotionSchema = z.object({
  id: z.string(),
  title: z
    .string({ invalid_type_error: "El título debe ser un texto" })
    .min(3, { message: "El título debe tener al menos 3 caracteres" }),
  description: z
    .string({ invalid_type_error: "La descripción debe ser un texto" })
    .optional(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  value: z
    .string({ invalid_type_error: "El valor debe ser un número" })
    .regex(/^\d+$/, { message: "El valor debe ser un número entero" }),
  startDate: z.string(),
  endDate: z.string().optional(),
  active: z.boolean().optional(),
});

export type PromotionInputs = z.infer<typeof promotionSchema>;

