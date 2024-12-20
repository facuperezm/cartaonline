"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Camera, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import UploadDropzone from "@/components/upload-dropzone";
import { trpc } from "@/app/_trpc/client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

export default function BannerBtn({
  storeId,
  storeBanner,
}: {
  storeId: number;
  storeBanner: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const router = useRouter();

  const { mutate: createBanner } = trpc.createBannerImage.useMutation();

  const { mutate: startPolling } = trpc.getBannerFromUploadthing.useMutation({
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
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border-2 border-border shadow-sm transition-all duration-200 group-hover:border-primary">
            {storeBanner ? (
              <img
                src={storeBanner}
                alt="Banner de la tienda"
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-200",
                  isHovered ? "opacity-50" : "opacity-100",
                )}
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
          polling={startPolling}
          setIsOpen={setIsOpen}
          storeId={storeId}
        />
      </DialogContent>
    </Dialog>
  );
}
