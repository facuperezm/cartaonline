import * as z from 'zod'

import { CITY_NAMES } from '@/lib/constants/cities'

// Use centralized city constants - single source of truth
const cityEnum = z.enum(CITY_NAMES)

export const updateStoreSchema = z.object({
  name: z.string().min(3).max(50),
  address: z.string().optional(),
  description: z.string().optional(),
  city: cityEnum.optional(),
})

export const storeSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  address: z.string().min(3, 'La dirección debe tener al menos 3 caracteres.'),
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 caracteres.'),
  description: z.string(),
  city: cityEnum,
})

export type Inputs = z.infer<typeof storeSchema>
