import { revalidatePath } from "next/cache";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { db } from "@/lib/db";

import { privateProcedure, router } from "./trpc";

export const appRouter = router({
  getUserStores: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.store.findMany({
      where: {
        userId,
      },
    });
  }),
  createStore: privateProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        city: z.enum([
          "buenos_aires",
          "puerto_iguazu",
          "corrientes",
          "posadas",
          "ushuaia",
          "cordoba",
        ]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.userId;

      // check if name is taken
      const storeWithTheSameName = await db.store.findFirst({
        where: {
          name: input.name,
        },
      });

      if (storeWithTheSameName) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Store name is already taken",
        });
      }

      await db.store.create({
        data: {
          name: input.name,
          userId,
          address: input.address,
          city: input.city,
        },
      });
      revalidatePath("/dashboard/stores");
      return { success: true };
    }),
  createProduct: privateProcedure
    .input(
      z.object({
        name: z.string({ invalid_type_error: "El nombre debe ser un texto" }),
        price: z
          .string({ invalid_type_error: "El precio debe ser un número" })
          .min(1, { message: "El precio debe ser mayor a 0" }),
        category: z.enum(["Comida", "Bebida", "Postre"]),
        storeId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const store = await db.store.findFirst({
        where: {
          id: Number(input.storeId),
        },
      });

      if (!store) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Store not found",
        });
      }

      await db.product.create({
        data: {
          name: input.name,
          price: Number(input.price),
          category: input.category,
          storeId: Number(input.storeId),
        },
      });
      revalidatePath(`/dashboard/stores/${store.id}`);
      return { success: true };
    }),
  deleteProduct: privateProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx;

      // check if name is taken
      const store = await db.store.findFirst({
        where: {
          userId,
        },
      });

      if (!store) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Store not found",
        });
      }

      await db.product.delete({
        where: {
          id: Number(input.id),
        },
      });
      revalidatePath(`/dashboard/stores/${store.id}`);
      return { success: true };
    }),

  getProduct: privateProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { userId } = ctx;

      // check if name is taken
      const store = await db.store.findFirst({
        where: {
          userId,
        },
      });

      if (!store) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Store not found",
        });
      }

      const product = await db.product.findFirst({
        where: {
          id: Number(input.id),
        },
      });
      return product;
    }),
});

export type AppRouter = typeof appRouter;
