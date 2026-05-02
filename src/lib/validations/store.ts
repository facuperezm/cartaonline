import * as z from 'zod'

export const updateStoreSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  description: z.string().optional(),
  mapboxId: z.string().min(1).optional(),
  sessionToken: z.string().min(1).optional(),
})

export const storeSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 caracteres.'),
  description: z.string(),
  mapboxId: z.string().min(1, 'Seleccioná una dirección de la lista.'),
  sessionToken: z.string().min(1, 'La sesión de búsqueda expiró.'),
})

export type Inputs = z.infer<typeof storeSchema>
