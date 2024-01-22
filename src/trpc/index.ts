import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { db } from "@/lib/db";

import { privateProcedure, publicProcedure, router } from "./trpc";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const user = await currentUser();

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to access this resource",
      });
    }
    // check if the user is in the database
    const dbUser = await db.user.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!dbUser) {
      await db.user.create({
        data: {
          userId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0]!.emailAddress,
        },
      });
    }
    return { success: true };
  }),
  getStores: privateProcedure.query(async ({ ctx }) => {
    const { userId, user } = ctx;
    // check if the user is in the database
    // but I think this is not necessary
    if (!userId || !user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to access this resource",
      });
    }
    return await db.store.findMany({
      where: {
        userId: user.id,
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
