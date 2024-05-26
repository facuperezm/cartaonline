import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export async function InitialUser() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Tenes que estar loggeado para ver esta pagina");
  }
  // check if the user is in the database
  const profile = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.user.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0]!.emailAddress,
    },
  });

  return newProfile;
}
