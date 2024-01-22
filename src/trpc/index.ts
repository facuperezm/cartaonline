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
        },
      });
      revalidatePath("/dashboard/stores");
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
