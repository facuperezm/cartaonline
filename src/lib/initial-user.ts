import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const InitialUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    // Optimized database query with field selection
    const profile = await db.user.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        userId: true,
        name: true,
        email: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    if (profile) {
      return profile;
    }

    // Create new profile with optimized field selection
    const newProfile = await db.user.create({
      data: {
        userId: user.id,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress ?? "",
      },
      select: {
        id: true,
        userId: true,
        name: true,
        email: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    return newProfile;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to initialize user: ${error.message}`);
    }
    throw new Error("Failed to initialize user");
  }
};
