'use server'

import { auth } from '@clerk/nextjs/server'
import {
  unstable_noStore as noStore,
  revalidatePath,
  revalidateTag,
} from 'next/cache'
import { redirect } from 'next/navigation'

import { updateProductSchema } from '@/lib/validations/product'

import { db } from '../db'

export async function getProduct(id: string) {
  return db.product.findFirst({ where: { id } })
}

export async function deleteProduct({ productId }: { productId: string }) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('No autorizado. Por favor, inicia sesión.')
  }

  noStore()

  try {
    // Find product and verify ownership through store
    const product = await db.product.findFirst({
      where: {
        id: productId,
      },
      include: {
        store: true,
      },
    })

    if (!product) {
      throw new Error('Producto no encontrado.')
    }

    // Verify the user owns the store this product belongs to
    if (product.store.userId !== userId) {
      throw new Error('No tienes permiso para eliminar este producto.')
    }

    await db.product.delete({ where: { id: productId } })

    // Invalidate cache for the store's menu
    revalidateTag(`store-${product.storeId}`, 'max')

    revalidatePath('/dashboard/stores')
    redirect('/dashboard/stores')
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error('Ocurrió un error. Por favor, intenta de nuevo.')
  }
}

type ProductActionState = {
  errors?: Record<string, string[] | undefined>
  status: 'idle' | 'error' | 'success'
  message: string
}

export async function updateProduct(
  _state: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const { userId } = await auth()

  if (!userId) {
    return {
      status: 'error',
      message: 'No autorizado. Por favor, inicia sesión.',
    }
  }

  noStore()

  const input = updateProductSchema.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    category: formData.get('category'),
    description: formData.get('description'),
    id: formData.get('id'),
  })

  if (!input.success) {
    return {
      errors: input.error.flatten().fieldErrors,
      status: 'error',
      message: 'Error al editar el producto',
    }
  }

  // Verify ownership through store
  const product = await db.product.findFirst({
    where: { id: input.data.id },
    include: { store: true },
  })

  if (!product) {
    return {
      status: 'error',
      message: 'Producto no encontrado.',
    }
  }

  if (product.store.userId !== userId) {
    return {
      status: 'error',
      message: 'No tienes permiso para editar este producto.',
    }
  }

  await db.product.update({
    where: { id: input.data.id },
    data: {
      name: input.data.name,
      price: Number(input.data.price),
      category: input.data.category,
      description: input.data.description,
    },
  })

  // Invalidate cache for the store's menu
  revalidateTag(`store-${product.storeId}`, 'max')

  const path = `/dashboard/stores/${product.storeId}`
  revalidatePath(path)
  return {
    message: 'El producto se editó correctamente',
    status: 'success',
  }
}

type AddProductData = {
  name: string
  price: string | number
  category: 'Comida' | 'Bebida' | 'Postre'
  description: string
  storeId: string
}

export async function addProduct(data: AddProductData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('No autorizado. Por favor, inicia sesión.')
  }

  const { name, price, category, description, storeId } = data

  // Verify user owns the store before adding product
  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  })

  if (!store) {
    throw new Error(
      'Tienda no encontrada o no tienes permiso para agregar productos.',
    )
  }

  await db.product.create({
    data: { name, price: Number(price), category, description, storeId },
  })

  // Invalidate cache for the store's menu
  revalidateTag(`store-${storeId}`, 'max')

  revalidatePath(`/dashboard/stores/${storeId}`)
}
