import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  storeLogoUploader: f({ image: { maxFileSize: "1MB" } })
    .middleware(async ({}) => {
      const user = await currentUser();

      if (!user) {
        throw new Error("Not authenticated");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.store.find({
        where: {
          userId: metadata.userId,
        },
        data: {
          logoUrl: file.url,
        },
      });
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
