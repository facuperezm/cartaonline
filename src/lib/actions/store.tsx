"use server";

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

import { storeSchema, updateStoreSchema } from "../validations/store";

export async function deleteStore(storeId: string) {
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

    redirect("/dashboard/stores");
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.");
  }
}

export async function updateStore(storeId: string, fd: FormData) {
  try {
    const input = updateStoreSchema.parse({
      name: fd.get("name"),
      address: fd.get("address"),
      city: fd.get("city"),
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
        city: {
          connect: {
            name: input.city,
          },
        },
      },
    });

    redirect("/dashboard/stores");
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.");
  }
}

export async function updateStoreStatus(storeId: string, fd: FormData) {
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

    redirect("/dashboard/stores");
  } catch (err) {
    throw err instanceof Error
      ? err
      : new Error("Something went wrong, please try again.");
  }
}

export async function updateStoreSlug(storeId: string, newSlug: string) {
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

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error al actualizar el slug",
    };
  }
}

export async function createStore(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const validatedFields = storeSchema.safeParse(rawFormData);

  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const storeWithTheSameName = await db.store.findFirst({
    where: {
      name: validatedFields.data.name,
    },
  });

  if (storeWithTheSameName) {
    return { success: false, message: "Store name is already taken" };
  }

  await db.store.create({
    data: {
      name: validatedFields.data.name,
      address: validatedFields.data.address,
      description: validatedFields.data.description,
      phone: validatedFields.data.phone,
      city: {
        connect: {
          name: validatedFields.data.city,
        },
      },
      user: {
        connect: {
          userId: user.id,
        },
      },
    },
  });

  redirect("/dashboard/stores");
}

export async function createBanner(data: { url: string; storeId: string }) {
  const { url, storeId } = data;
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const store = db.store.findFirst({
    where: {
      id: storeId,
      userId: user.id,
    },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  await db.banner.update({
    where: {
      storeId: storeId,
    },
    data: {
      url,
    },
  });

  redirect(`/dashboard/stores/${storeId}`);
}

export async function createLogo(data: { url: string; storeId: string }) {
  const { url, storeId } = data;
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const store = db.store.findFirst({
    where: {
      id: storeId,
      userId: user.id,
    },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  await db.logo.update({
    where: {
      storeId,
    },
    data: {
      url,
    },
  });
}
