"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { updateStoreSchema } from "../validations/store";

export async function deleteStore(storeId: number) {
  try {
    const store = await db.store.findFirst({
      where: {
        id: storeId,
      },
    });

    if (store) {
      await db.product.deleteMany({
        where: {
          storeId,
        },
      });
      await db.store.delete({ where: { id: storeId } });
    }

    revalidatePath("/dashboard/stores");
    redirect("/dashboard/stores");
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.");
  }
}

export async function updateStore(storeId: number, fd: FormData) {
  try {
    const input = updateStoreSchema.parse({
      name: fd.get("name"),
      address: fd.get("address"),
      city: fd.get("city"),
      slug: fd.get("slug"),
    });

    const storeWithSameName = await db.store.findFirst({
      where: {
        name: input.name,
        id: {
          not: storeId,
        },
      },
    });

    if (storeWithSameName) {
      throw new Error("Store name already exists");
    }

    await db.store.update({
      where: {
        id: storeId,
      },
      data: {
        name: input.name,
        address: input.address,
        city: input.city,
        slug: input.slug,
      },
    });

    revalidatePath(`/dashboard/stores/${storeId}`);
    redirect("/dashboard/stores");
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.");
  }
}

export async function updateStoreStatus(storeId: number, fd: FormData) {
  try {
    const status = fd.get("status");

    await db.store.update({
      where: {
        id: storeId,
      },
      data: {
        status: status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      },
    });

    revalidatePath(`/dashboard/stores/${storeId}`);
    redirect("/dashboard/stores");
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.");
  }
}

export async function updateStoreSlug(storeId: number, newSlug: string) {
  try {
    if (!newSlug.trim()) {
      throw new Error("El slug no puede estar vacío");
    }

    // Validar formato del slug
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(newSlug)) {
      throw new Error(
        "El slug solo puede contener letras minúsculas, números y guiones",
      );
    }

    // Verificar si el slug ya existe
    const existingStore = await db.store.findFirst({
      where: {
        slug: newSlug,
        id: {
          not: storeId,
        },
      },
    });

    if (existingStore) {
      throw new Error("Este slug ya está en uso");
    }

    // Actualizar el slug
    await db.store.update({
      where: {
        id: storeId,
      },
      data: {
        slug: newSlug,
      },
    });

    revalidatePath(`/dashboard/stores/${storeId}`);
    revalidatePath(`/share/${newSlug}`);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al actualizar el slug",
    };
  }
}
