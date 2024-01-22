"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";

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
