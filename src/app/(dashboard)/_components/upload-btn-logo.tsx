"use client";

import React from "react";
import { Camera, ImageIcon, Upload } from "lucide-react";

import { createLogo } from "@/lib/actions/store";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadDropzone from "@/app/(dashboard)/_components/upload-dropzone";

export default function UploadBtn({
  storeId,
  storeLogo,
}: {
  storeId: string;
  storeLogo: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-6 transition-all hover:border-primary/50 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="relative">
            <Avatar className="size-20 ring-4 ring-background shadow-lg transition-transform group-hover:scale-105">
              <AvatarImage src={storeLogo} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-muted to-muted-foreground/10">
                <ImageIcon className="size-8 text-muted-foreground/50" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <Camera className="size-3.5" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              {storeLogo ? "Cambiar logo" : "Subir logo"}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
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
  );
}
