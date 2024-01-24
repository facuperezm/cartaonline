"use server";

import { revalidatePath, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

import { updateProductSchema } from "@/lib/validations/product";

import { db } from "../db";

export async function deleteProduct({ productId }: { productId: number }) {
  try {
    const product = await db.product.findFirst({
      where: {
        id: Number(productId),
      },
    });

    if (product) {
      await db.product.delete({ where: { id: productId } });
    }
    const path = "/dashboard/stores";
    revalidatePath(path);
    redirect(path);
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.");
  }
}

export async function updateProduct(state: any, formData: FormData) {
  unstable_noStore();

  const input = updateProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    id: formData.get("id"),
  });

  if (!input.success) {
    return {
      errors: input.error.flatten().fieldErrors,
      status: "error",
      message: "Error al editar el producto",
    };
  }

  await db.product.update({
    where: { id: Number(input.data.id) },
    data: {
      name: input.data.name,
      price: Number(input.data.price),
      category: input.data.category,
    },
  });

  const path = `/dashboard/stores/${input.data.id}`;
  revalidatePath(path);
  return {
    message: "El producto se editó correctamente",
    status: "success",
  };
}
