"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

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
  try {
    const validatedFields = storeSchema.parse({
      name: formData.get("name"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      description: formData.get("description"),
      city: formData.get("city"),
    });

    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not found");
    }

    await db.store.create({
      data: {
        name: validatedFields.name,
        address: validatedFields.address,
        description: validatedFields.description,
        phone: validatedFields.phone,
        status: "ACTIVE",
        city: {
          connect: {
            name: validatedFields.city,
          },
        },
        user: {
          connect: {
            userId: userId,
          },
        },
      },
    });
    return { message: "Store created successfully", success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Logo Creation Error:", error.stack);
    } else {
      console.error("Logo Creation Error:", error);
    }
    return { success: false, error: "Failed to create logo" };
  }
  redirect(`/dashboard/stores`);
}

export async function createBanner(data: { key: string; storeId: string }) {
  try {
    const { key, storeId } = data;
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not found");
    }

    const store = db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    await db.banner.upsert({
      where: {
        key: key,
      },
      create: {
        key: key,
        name: key,
        url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
        status: "SUCCESS",
        storeId: storeId,
      },
      update: {
        storeId: storeId,
        url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
      },
    });

    // redirect(`/dashboard/stores/${storeId}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Banner Creation Error:", error.stack);
    } else {
      console.error("Logo Creation Error:", error);
    }
    return { success: false, error: "Failed to create logo" };
  }
}

export async function createLogo(data: { key: string; storeId: string }) {
  try {
    const { key, storeId } = data;
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not found");
    }

    const store = db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    await db.logo.upsert({
      where: {
        key: key,
      },
      create: {
        key: key,
        name: key,
        url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
        status: "SUCCESS",
        storeId: storeId,
      },
      update: {
        storeId: storeId,
        url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${key}`,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Logo Creation Error:", error.stack);
    } else {
      console.error("Logo Creation Error:", { error });
    }
    return { success: false, error: "Failed to create logo" };
  }
}
