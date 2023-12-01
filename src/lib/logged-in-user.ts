import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export async function LoggedInUser() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInDb = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!userInDb) {
    // create user in db
    const newProfile = await db.user.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]!.emailAddress,
      },
    });
  }

  return userInDb;
}
