import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

import { db } from '@/lib/db'

const f = createUploadthing()

async function handleAuth() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('No autorizado')
  }
  return { userId }
}

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ file }) => {
      await db.logo.create({
        data: {
          name: file.name,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          status: 'SUCCESS',
          key: file.key,
        },
      })
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
