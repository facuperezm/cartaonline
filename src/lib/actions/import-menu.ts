'use server'

import { openai } from '@ai-sdk/openai'
import { auth } from '@clerk/nextjs/server'
import { generateObject } from 'ai'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { aiMenuExtractionSchema } from '@/lib/validations/product'

export async function importMenuFromFile(formData: FormData) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: 'No autorizado' }
    }

    const storeId = formData.get('storeId') as string
    const file = formData.get('file') as File

    if (!storeId) {
      return { success: false, error: 'ID de tienda requerido' }
    }

    if (!file) {
      return { success: false, error: 'Archivo requerido' }
    }

    // Verify store ownership
    const store = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    })

    if (!store) {
      return { success: false, error: 'Tienda no encontrada' }
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const mimeType = file.type

    // Determine the correct data URL format
    let imageUrl: string
    if (mimeType === 'application/pdf') {
      imageUrl = `data:${mimeType};base64,${base64}`
    } else {
      imageUrl = `data:${mimeType};base64,${base64}`
    }

    // Call AI SDK to extract menu data
    const result = await generateObject({
      model: openai('gpt-4o-mini'),
      system:
        'You are a helpful assistant that extracts menu items from images/PDFs.' +
        'The menu items should be in Spanish, not in English.',
      schema: aiMenuExtractionSchema,
      schemaName: 'menu',
      schemaDescription: 'Menu items extracted from the image/PDF',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: "Extract all menu items from this image/PDF. For each item, provide the name, price (as a number without currency symbols), description, and category (Comida for food, Bebida for drinks, Postre for desserts). If you can't determine the category clearly, use Comida as default.",
            },
            {
              type: 'image',
              image: imageUrl,
            },
          ],
        },
      ],
    })

    const { products } = result.object

    if (!products || products.length === 0) {
      return {
        success: false,
        error: 'No se encontraron productos en el archivo',
      }
    }

    // Insert products into database
    const createdProducts = await db.product.createMany({
      data: products.map((product) => ({
        name: product.name,
        price: Math.round(product.price), // Convert to integer (cents)
        description: product.description,
        category: product.category,
        storeId,
      })),
      skipDuplicates: true,
    })

    revalidatePath(`/dashboard/stores/${storeId}`)

    return {
      success: true,
      count: createdProducts.count,
      message: `${createdProducts.count} productos importados correctamente`,
    }
  } catch (error) {
    console.error('Error importing menu:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al importar el menú. Por favor, intenta de nuevo.',
    }
  }
}
