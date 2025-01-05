"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { updateProductSchema } from "@/lib/validations/product";

import { db } from "../db";

export async function getProduct(id: string) {
  return db.product.findFirst({ where: { id } });
}

export async function deleteProduct({ productId }: { productId: string }) {
  noStore();

  try {
    const product = await db.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (product) {
      await db.product.delete({ where: { id: productId } });
    }

    revalidatePath("/dashboard/stores");
    redirect("/dashboard/stores");
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.");
  }
}

export async function updateProduct(state: any, formData: FormData) {
  noStore();

  const input = updateProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    description: formData.get("description"),
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
    where: { id: input.data.id },
    data: {
      name: input.data.name,
      price: Number(input.data.price),
      category: input.data.category,
      description: input.data.description,
    },
  });

  const path = `/dashboard/stores/${input.data.id}`;
  revalidatePath(path);
  return {
    message: "El producto se editó correctamente",
    status: "success",
  };
}

export async function addProduct(data: any) {
  const { name, price, category, description, storeId } = data;

  await db.product.create({
    data: { name, price: Number(price), category, description, storeId },
  });

  revalidatePath(`/dashboard/stores/${storeId}`);
}
