'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { db } from '@/lib/db'

import { storeSchema, updateStoreSchema } from '../validations/store'

export async function deleteStore(storeId: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('No autorizado. Por favor, inicia sesión.')
  }

  try {
    // Verify ownership before deletion
    const store = await db.store.findFirst({
      where: {
        id: storeId,
        userId, // Only allow deletion if user owns the store
      },
      include: {
        city: true,
      },
    })

    if (!store) {
      throw new Error(
        'Tienda no encontrada o no tienes permiso para eliminarla.',
      )
    }

    await db.product.deleteMany({
      where: {
        storeId,
      },
    })
    await db.store.delete({ where: { id: storeId } })

    // Invalidate cache for the city's store list
    revalidateTag(`stores-city-${store.city.name}`, 'max')

    redirect('/dashboard/stores')
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error('Ocurrió un error. Por favor, intenta de nuevo.')
  }
}

export async function updateStore(storeId: string, fd: FormData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('No autorizado. Por favor, inicia sesión.')
  }

  try {
    // Verify ownership before update and get current city
    const existingStore = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
      include: {
        city: true,
      },
    })

    if (!existingStore) {
      throw new Error('Tienda no encontrada o no tienes permiso para editarla.')
    }

    const oldCityName = existingStore.city.name

    const input = updateStoreSchema.parse({
      name: fd.get('name'),
      address: fd.get('address'),
      city: fd.get('city'),
    })

    const storeWithSameName = await db.store.findFirst({
      where: {
        name: input.name,
        id: {
          not: storeId,
        },
      },
    })

    if (storeWithSameName) {
      throw new Error('Ya existe una tienda con ese nombre.')
    }

    await db.store.update({
      where: {
        id: storeId,
      },
      data: {
        name: input.name,
        address: input.address,
        city: {
          connect: {
            name: input.city,
          },
        },
      },
    })

    // Invalidate cache for this store and city listings
    revalidateTag(`store-${storeId}`, 'max')
    revalidateTag(`stores-city-${oldCityName}`, 'max')
    if (input.city !== oldCityName) {
      revalidateTag(`stores-city-${input.city}`, 'max')
    }

    redirect('/dashboard/stores')
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error('Ocurrió un error. Por favor, intenta de nuevo.')
  }
}

export async function updateStoreStatus(storeId: string, fd: FormData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('No autorizado. Por favor, inicia sesión.')
  }

  try {
    // Verify ownership before status change
    const store = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
      include: {
        city: true,
      },
    })

    if (!store) {
      throw new Error(
        'Tienda no encontrada o no tienes permiso para modificarla.',
      )
    }

    const status = fd.get('status')

    await db.store.update({
      where: {
        id: storeId,
      },
      data: {
        status: status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      },
    })

    // Invalidate cache for this store and city listing (status affects visibility)
    revalidateTag(`store-${storeId}`, 'max')
    revalidateTag(`stores-city-${store.city.name}`, 'max')

    redirect('/dashboard/stores')
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error('Ocurrió un error. Por favor, intenta de nuevo.')
  }
}

export async function updateStoreSlug(storeId: string, newSlug: string) {
  try {
    if (!newSlug.trim()) {
      throw new Error('El slug no puede estar vacío')
    }

    // Validar formato del slug
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(newSlug)) {
      throw new Error(
        'El slug solo puede contener letras minúsculas, números y guiones',
      )
    }

    // Verificar si el slug ya existe
    const existingStore = await db.store.findFirst({
      where: {
        slug: newSlug,
        id: {
          not: storeId,
        },
      },
    })

    if (existingStore) {
      throw new Error('Este slug ya está en uso')
    }

    // Actualizar el slug
    await db.store.update({
      where: {
        id: storeId,
      },
      data: {
        slug: newSlug,
      },
    })

    // Invalidate cache for this store
    revalidateTag(`store-${storeId}`, 'max')

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error al actualizar el slug',
    }
  }
}

type CreateStoreState = {
  success: boolean
  error: string
  message: string
  formData?: Record<string, FormDataEntryValue>
}

export async function createStore(
  _prevState: CreateStoreState,
  formData: FormData,
): Promise<CreateStoreState> {
  try {
    const validatedFields = storeSchema.parse({
      name: formData.get('name'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      description: formData.get('description'),
      city: formData.get('city'),
    })

    const { userId } = await auth()

    if (!userId) {
      return {
        success: false,
        error: 'Usuario no autenticado. Por favor, inicia sesión nuevamente.',
        message: '',
        formData: Object.fromEntries(formData),
      }
    }

    // Check if store name already exists for this user
    const existingStore = await db.store.findFirst({
      where: {
        name: validatedFields.name,
        userId,
      },
    })

    if (existingStore) {
      return {
        success: false,
        error:
          'Ya tienes una tienda con este nombre. Por favor, elige otro nombre.',
        message: '',
        formData: Object.fromEntries(formData),
      }
    }

    // Check if city exists
    const city = await db.city.findUnique({
      where: {
        name: validatedFields.city,
      },
    })

    if (!city) {
      return {
        success: false,
        error:
          'La ciudad seleccionada no es válida. Por favor, elige una ciudad de la lista.',
        message: '',
        formData: Object.fromEntries(formData),
      }
    }

    // Ensure User exists in database (upsert to handle first-time users)
    const clerkUser = await currentUser()

    if (!clerkUser) {
      return {
        success: false,
        error: 'No se pudo obtener información del usuario.',
        message: '',
        formData: Object.fromEntries(formData),
      }
    }

    await db.user.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
        name: clerkUser.fullName || clerkUser.username || 'Usuario',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        imageUrl: clerkUser.imageUrl || '',
      },
    })

    await db.store.create({
      data: {
        name: validatedFields.name,
        address: validatedFields.address,
        description: validatedFields.description,
        phone: validatedFields.phone,
        status: 'ACTIVE',
        city: {
          connect: {
            name: validatedFields.city,
          },
        },
        user: {
          connect: {
            userId,
          },
        },
      },
    })

    // Invalidate cache for the city's store list
    revalidateTag(`stores-city-${validatedFields.city}`, 'max')

    redirect('/dashboard/stores')
  } catch (error: unknown) {
    // Allow Next.js redirect to propagate
    if (
      error &&
      typeof error === 'object' &&
      'digest' in error &&
      typeof (error as any).digest === 'string' &&
      (error as any).digest.startsWith('NEXT_REDIRECT')
    ) {
      throw error
    }

    console.error('Store Creation Error:', error)

    // Handle Zod validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as {
        issues: Array<{ path: string[]; message: string }>
      }
      const fieldErrors = zodError.issues
        .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        .join(', ')
      return {
        success: false,
        error: `Error de validación: ${fieldErrors}`,
        message: '',
        formData: Object.fromEntries(formData),
      }
    }

    // Handle database errors
    if (error instanceof Error) {
      let errorMessage = 'Error al crear la tienda. '

      if (error.message.includes('Foreign key constraint')) {
        errorMessage +=
          'La ciudad seleccionada no existe. Por favor, selecciona una ciudad válida.'
      } else if (error.message.includes('Unique constraint')) {
        errorMessage += 'Ya existe una tienda con este nombre.'
      } else {
        errorMessage += error.message
      }

      return {
        success: false,
        error: errorMessage,
        message: '',
        formData: Object.fromEntries(formData),
      }
    }

    return {
      success: false,
      error:
        'Ocurrió un error inesperado al crear la tienda. Por favor, inténtalo de nuevo.',
      message: '',
      formData: Object.fromEntries(formData),
    }
  }
}

export async function createBanner(data: { key: string; storeId: string }) {
  try {
    const { key, storeId } = data
    const { userId } = await auth()

    if (!userId) {
      throw new Error('No autorizado. Por favor, inicia sesión.')
    }

    // Fixed: added await to properly check store ownership
    const store = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    })

    if (!store) {
      throw new Error(
        'Tienda no encontrada o no tienes permiso para modificarla.',
      )
    }

    await db.banner.upsert({
      where: {
        key,
      },
      create: {
        key,
        name: key,
        url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
        status: 'SUCCESS',
        storeId,
      },
      update: {
        storeId,
        url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
      },
    })

    // Invalidate cache for this store (banner is part of store data)
    revalidateTag(`store-${storeId}`, 'max')

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Banner Creation Error:', error.stack)
    } else {
      console.error('Banner Creation Error:', error)
    }
    return { success: false, error: 'Error al crear el banner' }
  }
}

export async function createLogo(data: { key: string; storeId: string }) {
  try {
    const { key, storeId } = data
    const { userId } = await auth()

    if (!userId) {
      throw new Error('No autorizado. Por favor, inicia sesión.')
    }

    // Fixed: added await to properly check store ownership
    const store = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    })

    if (!store) {
      throw new Error(
        'Tienda no encontrada o no tienes permiso para modificarla.',
      )
    }

    await db.logo.upsert({
      where: {
        key,
      },
      create: {
        key,
        name: key,
        url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
        status: 'SUCCESS',
        storeId,
      },
      update: {
        storeId,
        url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
      },
    })

    // Invalidate cache for this store (logo is part of store data)
    revalidateTag(`store-${storeId}`, 'max')

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Logo Creation Error:', error.stack)
    } else {
      console.error('Logo Creation Error:', error)
    }
    return { success: false, error: 'Error al crear el logo' }
  }
}
