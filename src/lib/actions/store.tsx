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
      await db.store.delete({ where: { id: storeId } });
      // delete all products from store
      await db.product.deleteMany({
        where: {
          storeId,
        },
      });
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

export async function updateStore(storeId: number, fd: FormData) {
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
        city: input.city,
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
