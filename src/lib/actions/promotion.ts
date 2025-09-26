"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { db } from "../db";
import { promotionSchema, updatePromotionSchema } from "../validations/promotion";

export async function createPromotion(formData: FormData) {
  noStore();

  const input = promotionSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") ?? undefined,
    discountType: formData.get("discountType"),
    value: formData.get("value"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") ?? undefined,
    storeId: formData.get("storeId"),
  });

  if (!input.success) {
    return {
      errors: input.error.flatten().fieldErrors,
      status: "error",
      message: "Error al crear la promoción",
    } as const;
  }

  const { userId } = await auth();
  if (!userId) {
    return { status: "error", message: "No autorizado" } as const;
  }

  const store = await db.store.findFirst({
    where: { id: input.data.storeId, userId },
  });
  if (!store) {
    return { status: "error", message: "Tienda no encontrada" } as const;
  }

  await db.promotion.create({
    data: {
      title: input.data.title,
      description: input.data.description,
      discountType: input.data.discountType as "PERCENTAGE" | "FIXED",
      value: Number(input.data.value),
      startDate: new Date(input.data.startDate),
      endDate: input.data.endDate ? new Date(input.data.endDate) : null,
      storeId: input.data.storeId,
    },
  });

  revalidatePath(`/dashboard/stores/${input.data.storeId}`);
  return { status: "success" } as const;
}

export async function updatePromotion(formData: FormData) {
  noStore();

  const input = updatePromotionSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description") ?? undefined,
    discountType: formData.get("discountType"),
    value: formData.get("value"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") ?? undefined,
    active: formData.get("active") === "true",
  });

  if (!input.success) {
    return {
      errors: input.error.flatten().fieldErrors,
      status: "error",
      message: "Error al actualizar la promoción",
    } as const;
  }

  const { userId } = await auth();
  if (!userId) {
    return { status: "error", message: "No autorizado" } as const;
  }

  const promo = await db.promotion.findUnique({ where: { id: input.data.id } });
  if (!promo) {
    return { status: "error", message: "Promoción no encontrada" } as const;
  }

  const store = await db.store.findFirst({
    where: { id: promo.storeId, userId },
  });
  if (!store) {
    return { status: "error", message: "No autorizado" } as const;
  }

  await db.promotion.update({
    where: { id: input.data.id },
    data: {
      title: input.data.title,
      description: input.data.description,
      discountType: input.data.discountType as "PERCENTAGE" | "FIXED",
      value: Number(input.data.value),
      startDate: new Date(input.data.startDate),
      endDate: input.data.endDate ? new Date(input.data.endDate) : null,
      active: input.data.active,
    },
  });

  revalidatePath(`/dashboard/stores/${promo.storeId}`);
  return { status: "success" } as const;
}

export async function deletePromotion(promotionId: string) {
  noStore();

  const { userId } = await auth();
  if (!userId) {
    return { status: "error", message: "No autorizado" } as const;
  }

  const promo = await db.promotion.findUnique({ where: { id: promotionId } });
  if (!promo) {
    return { status: "error", message: "Promoción no encontrada" } as const;
  }

  const store = await db.store.findFirst({
    where: { id: promo.storeId, userId },
  });
  if (!store) {
    return { status: "error", message: "No autorizado" } as const;
  }

  await db.promotion.delete({ where: { id: promotionId } });
  revalidatePath(`/dashboard/stores/${promo.storeId}`);
  return { status: "success" } as const;
}

export async function togglePromotion(promotionId: string) {
  noStore();

  const { userId } = await auth();
  if (!userId) {
    return { status: "error", message: "No autorizado" } as const;
  }

  const promo = await db.promotion.findUnique({ where: { id: promotionId } });
  if (!promo) {
    return { status: "error", message: "Promoción no encontrada" } as const;
  }

  const store = await db.store.findFirst({
    where: { id: promo.storeId, userId },
  });
  if (!store) {
    return { status: "error", message: "No autorizado" } as const;
  }

  await db.promotion.update({
    where: { id: promotionId },
    data: { active: !promo.active },
  });

  revalidatePath(`/dashboard/stores/${promo.storeId}`);
  return { status: "success" } as const;
}

