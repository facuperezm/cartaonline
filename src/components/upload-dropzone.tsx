"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Cloud, File as FileSVG } from "lucide-react";
import Dropzone from "react-dropzone";

import { useUploadThing } from "@/lib/uploadthing";
import { compressImage } from "@/lib/utils";

import { Progress } from "./ui/progress";
import { useToast } from "./ui/use-toast";

export default function UploadDropzone({
  storeId,
  setIsOpen,
  polling,
  createImage,
}: {
  storeId: number;
  setIsOpen: (v: boolean) => void;
  polling: (v: { storeId: number; url: string }) => void;
  createImage: (v: { storeId: number; url: string }) => void;
}) {
  const router = useRouter();
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const { startUpload } = useUploadThing("imageUploader", {
    async onClientUploadComplete(res) {
      try {
        createImage({ url: res[0].url, storeId });
        router.refresh();
        setIsOpen(false);
      } catch (err) {
        console.error(err);
      }
    },
  });

  const { toast } = useToast();

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 500);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        const progressInterval = startSimulatedProgress();

        const compressed = await compressImage(
          acceptedFile[0],
          0.5,
          acceptedFile[0].name,
        );

        const res = await startUpload([compressed]);
        if (!res) {
          return toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        }

        const [fileResponse] = res;

        const url = fileResponse?.url;

        if (!url) {
          return toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (!polling) {
          return null;
        }

        polling({ url, storeId });
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
