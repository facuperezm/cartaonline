'use client'

import { Cloud, File, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Dropzone from 'react-dropzone'
import { toast } from 'sonner'
import { Progress } from '@/components/ui/progress'
import { useUploadThing } from '@/lib/uploadthing'
import { cn, compressImage } from '@/lib/utils'

interface UploadDropzoneProps {
  storeId: string
  setIsOpen: (open: boolean) => void
  createImage: (data: {
    key: string
    storeId: string
  }) => Promise<{ success: boolean; error?: string } | undefined>
}

export default function UploadDropzone({
  createImage,
  setIsOpen,
  storeId,
}: UploadDropzoneProps) {
  const router = useRouter()
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState(0)

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: async (res) => {
      if (res?.[0]) {
        await createImage({ key: res[0].key, storeId })
        setIsOpen(false)
      }
      router.refresh()
      setIsUploading(false)
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress)
    },
    onUploadError: (error) => {
      setIsUploading(false)
      toast.error(error.message || 'Error al subir la imagen')
    },
  })

  const startSimulatedProgress = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)
    return interval
  }

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true)
        const progressInterval = startSimulatedProgress()
        const compressed = await compressImage(
          acceptedFile[0],
          0.5,
          acceptedFile[0].name,
        )
        await startUpload([compressed])

        clearInterval(progressInterval)
        setUploadProgress(100)
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="m-4 h-64 rounded-lg border border-gray-300 border-dashed hover:bg-gray-50"
        >
          <div className="flex h-full w-full items-center justify-center">
            <label
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100"
              htmlFor="dropzone-file"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">Click para subir</span> o
                  arrastra y suelta
                </p>
                <p className="text-xs text-zinc-500">Imágenes (máximo 4MB)</p>
              </div>

              {acceptedFiles?.[0] ? (
                <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <File className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    className={cn(
                      'h-1 w-full bg-zinc-200',
                      uploadProgress === 100 ? 'bg-green-500' : '',
                    )}
                    value={uploadProgress}
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex items-center justify-center gap-1 pt-2 text-center text-sm text-zinc-700">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                className="hidden"
                id="dropzone-file"
                type="file"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  )
}
