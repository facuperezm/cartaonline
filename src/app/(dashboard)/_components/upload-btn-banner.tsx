"use client";

import React from "react";
import Image from "next/image";
import { Camera, ImageIcon } from "lucide-react";

import { createBanner } from "@/lib/actions/store";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadDropzone from "@/components/upload-dropzone";

export default function BannerBtn({
  storeId,
  storeBanner,
}: {
  storeId: string;
  storeBanner: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

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
        <div
          className="group relative cursor-pointer"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border-2 border-border shadow-sm transition-all duration-200 group-hover:border-primary">
            {storeBanner ? (
              <Image
                src={storeBanner}
                alt="Banner de la tienda"
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-200",
                  isHovered ? "opacity-50" : "opacity-100",
                )}
                fill
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-sm transition-opacity duration-200",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <Camera className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-muted-foreground">
              Banner de la tienda (recomendado: 1920x820)
            </span>
          </div>
        </div>
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
  );
}
