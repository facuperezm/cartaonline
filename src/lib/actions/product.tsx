"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateProductSchema } from "@/components/data/products-schema";

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

export async function deleteAllProducts({ storeId }: { storeId: number }) {
  try {
    const store = db.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    await db.product.deleteMany({
      where: {
        storeId,
      },
    });
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.");
  }
}

export async function updateProduct(productId: number, fd: FormData) {
  const input = updateProductSchema.parse({
    name: fd.get("name"),
    price: fd.get("price"),
    category: fd.get("category"),
  });

  await db.product.update({
    where: { id: productId },
    data: {
      name: input.name,
      price: Number(input.price),
      category: input.category,
    },
  });
  const path = "/dashboard/stores";
  revalidatePath(path);
}
