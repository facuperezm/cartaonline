import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  storeLogoUploader: f({ image: { maxFileSize: "2MB" } })
    .middleware(async () => {
      const user = await currentUser();

      if (!user) {
        throw new Error("Not authenticated");
      }
      return { userId: user.id };
    })
    .onUploadComplete(async ({ file }) => {
      await db.logo.create({
        data: {
          name: file.name,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          status: "PROCESSING",
          key: file.key,
        },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
