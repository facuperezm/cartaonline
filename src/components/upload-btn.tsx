"use client";

import { on } from "events";
import React from "react";
import { useRouter } from "next/navigation";
import { retryDelay } from "@trpc/client/dist/internals/retryDelay";
import { Cloud, File as FileSVG } from "lucide-react";
import Dropzone from "react-dropzone";
import sharp from "sharp";
import { toast } from "sonner";

import { useUploadThing } from "@/lib/uploadthing";
import { trpc } from "@/app/_trpc/client";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { useToast } from "./ui/use-toast";

// TODO: make a compression function to improve the image upload
// async function compress(file: any) {
//   // Read the input image
//   const compressedFile = await sharp(file)
//     .withMetadata()
//     .resize({ width: 800, height: 600 }) // Adjust the dimensions as needed
//     .webp({ quality: 10 })
//     .toFile(file.name);

//   return compressedFile;
// }

function UploadDropzone() {
  const router = useRouter();
  const [isUploading, setIsUploading] = React.useState(true);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const { startUpload } = useUploadThing("storeLogoUploader");
  const { toast } = useToast();
  const { mutate: startPoling } = trpc.getFile.useMutation({
    onSuccess: () => {
      router.push(`/dashboard/stores`);
      setIsUploading(false);
    },
    retry: true,
    retryDelay: 500,
  });
  const startSimulatedPrgoress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        const progressInterval = startSimulatedPrgoress();

        // const compressedImage = await compress(acceptedFile[0]);
        // console.log(compressedImage);

        const res = await startUpload(acceptedFile);

        if (!res) {
          return toast({
            title: "Algo salió mal",
            description: "No se pudo subir la imagen",
            variant: "destructive",
          });
        }

        const [fileResponse] = res;

        const key = fileResponse?.key;

        if (!key) {
          return toast({
            title: "Algo salió mal",
            description: "No se pudo subir la imagen",
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        startPoling({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="m-4 h-64 rounded border border-dashed border-gray-300"
        >
          <input {...getInputProps()} />
          <div className="flex h-full flex-col items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex size-full flex-col items-center justify-center rounded-lg "
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <Cloud className="mb-2 size-6 text-zinc-500" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">
                    Hace click y subi tu imagen
                  </span>{" "}
                  o arrastrala y soltala acá
                </p>
                <p className="text-xs text-zinc-500">
                  .jpg .jpeg .png (hasta 2MB)
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <FileSVG className="size-6 text-blue-500" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
}

export default function UploadBtn() {
  const [isOpen, setIsOpen] = React.useState(false);

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
        <DialogTrigger onClick={() => setIsOpen(true)}>OPEN BTN</DialogTrigger>
        <DialogContent>
          <UploadDropzone />
        </DialogContent>
      </Dialog>
    </>
  );
}
