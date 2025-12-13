'use client'

import { Camera, ImageIcon } from 'lucide-react'
import React from 'react'
import UploadDropzone from '@/app/(dashboard)/_components/upload-dropzone'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createLogo } from '@/lib/actions/store'

export default function UploadBtn({
  storeId,
  storeLogo,
}: {
  storeId: string
  storeLogo: string
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
          className="group flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-muted-foreground/25 border-dashed bg-muted/30 p-6 transition-all hover:border-primary/50 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <div className="relative">
            <Avatar className="size-20 shadow-lg ring-4 ring-background transition-transform group-hover:scale-105">
              <AvatarImage className="object-cover" src={storeLogo} />
              <AvatarFallback className="bg-gradient-to-br from-muted to-muted-foreground/10">
                <ImageIcon className="size-8 text-muted-foreground/50" />
              </AvatarFallback>
            </Avatar>
            <div className="-bottom-1 -right-1 absolute flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <Camera className="size-3.5" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground text-sm">
              {storeLogo ? 'Cambiar logo' : 'Subir logo'}
            </p>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Click para seleccionar
            </p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar logo</DialogTitle>
        </DialogHeader>
        <UploadDropzone
          createImage={createLogo}
          setIsOpen={setIsOpen}
          storeId={storeId}
        />
      </DialogContent>
    </Dialog>
  )
}
