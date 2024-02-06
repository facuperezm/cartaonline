"use client";

import React from "react";
import { useRouter } from "next/navigation";

import UploadDropzone from "@/components/upload-dropzone";
import { trpc } from "@/app/_trpc/client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function BannerBtn({
  storeId,
  storeBanner,
}: {
  storeId: number;
  storeBanner: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
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
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(v) => {
          if (!v) {
            setIsOpen(v);
          }
        }}
      >
        <DialogTrigger onClick={() => setIsOpen(true)} asChild>
          <Avatar className="h-16 w-32 rounded-md">
            <AvatarImage src={storeBanner} />
            <AvatarFallback className="rounded-md">Banner</AvatarFallback>
          </Avatar>
        </DialogTrigger>
        <DialogContent>
          <UploadDropzone
            createImage={createBanner}
            polling={startPolling}
            setIsOpen={setIsOpen}
            storeId={storeId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
