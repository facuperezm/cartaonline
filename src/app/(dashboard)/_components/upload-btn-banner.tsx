'use client'

import { Camera, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import UploadDropzone from '@/app/(dashboard)/_components/upload-dropzone'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createBanner } from '@/lib/actions/store'
import { cn } from '@/lib/utils'

export default function BannerBtn({
  storeId,
  storeBanner,
}: {
  storeId: string
  storeBanner: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v)
        }
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <button
          className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-muted-foreground/25 border-dashed bg-muted/30 transition-all hover:border-primary/50 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <div className="absolute inset-0">
            {storeBanner ? (
              <Image
                alt="Banner de la tienda"
                className="object-cover transition-transform group-hover:scale-[1.02]"
                fill
                src={storeBanner}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted-foreground/10">
                  <ImageIcon className="size-6 text-muted-foreground/50" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground text-sm">
                    Subir banner
                  </p>
                  <p className="mt-0.5 text-muted-foreground text-xs">
                    Recomendado: 1920 × 820px
                  </p>
                </div>
              </div>
            )}
            {/* Hover overlay */}
            <div
              className={cn(
                'absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 backdrop-blur-sm transition-opacity',
                storeBanner ? 'opacity-0 group-hover:opacity-100' : 'opacity-0',
              )}
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Camera className="size-5" />
              </div>
              <p className="font-medium text-sm">Cambiar banner</p>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar banner</DialogTitle>
        </DialogHeader>
        <UploadDropzone
          createImage={createBanner}
          setIsOpen={setIsOpen}
          storeId={storeId}
        />
      </DialogContent>
    </Dialog>
  )
}
