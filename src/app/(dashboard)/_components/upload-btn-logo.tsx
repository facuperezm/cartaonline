"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Camera, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadDropzone from "@/components/upload-dropzone";
import { trpc } from "@/app/_trpc/client";

export default function UploadBtn({
  storeId,
  storeLogo,
}: {
  storeId: number;
  storeLogo: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();

  const { mutate: createBanner } = trpc.createStoreImage.useMutation();

  const { mutate: startPolling } = trpc.getLogoFromUploadthing.useMutation({
    onSuccess: async () => {
      router.refresh();
      setIsOpen(false);
    },
    retry: true,
    retryDelay: 500,
  });

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
          <Avatar className="h-24 w-24 rounded-full border-2 border-border shadow-sm transition-all duration-200 group-hover:border-primary">
            <AvatarImage
              src={storeLogo}
              className={cn(
                "object-cover transition-opacity duration-200",
                isHovered ? "opacity-50" : "opacity-100",
              )}
            />
            <AvatarFallback className="bg-muted">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center rounded-full transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <Camera className="h-6 w-6 text-primary" />
          </div>
          <div className="mt-2 text-center">
            <span className="text-sm text-muted-foreground">
              Logo de la tienda
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar logo</DialogTitle>
        </DialogHeader>
        <UploadDropzone
          createImage={createBanner}
          polling={startPolling}
          setIsOpen={setIsOpen}
          storeId={storeId}
        />
      </DialogContent>
    </Dialog>
  );
}