"use client";

import React from "react";
import { useRouter } from "next/navigation";

import UploadDropzone from "@/components/upload-dropzone";
import { trpc } from "@/app/_trpc/client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function UploadBtn({
  storeId,
  storeLogo,
}: {
  storeId: number;
  storeLogo: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
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
          <Avatar className="h-16 w-16 rounded-full">
            <AvatarImage src={storeLogo} />
            <AvatarFallback className="rounded-full">Logo</AvatarFallback>
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
