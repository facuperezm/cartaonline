import { currentUser } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";

import { db } from "@/lib/db";

import { publicProcedure, router } from "./trpc";

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
});

export type AppRouter = typeof appRouter;
