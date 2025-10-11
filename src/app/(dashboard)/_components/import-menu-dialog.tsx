"use client";

import * as React from "react";
import Image from "next/image";
import { FileUp, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { importMenuFromFile } from "@/lib/actions/import-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/icons";

interface ImportMenuDialogProps {
  storeId: string;
}

export function ImportMenuDialog({ storeId }: ImportMenuDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const [preview, setPreview] = React.useState<string | null>(null);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      // Create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleImport = () => {
    if (!file) {
      toast.error("Por favor selecciona un archivo");
      return;
    }

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("storeId", storeId);
        formData.append("file", file);

        const result = await importMenuFromFile(formData);

        if (result.success) {
          toast.success(result.message || "Menú importado correctamente");
          setOpen(false);
          setFile(null);
          setPreview(null);
        } else {
          toast.error(result.error || "Error al importar el menú");
        }
      } catch (error) {
        toast.error("Error inesperado al importar el menú");
        console.error(error);
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isPending) {
      setOpen(newOpen);
      if (!newOpen) {
        setFile(null);
        setPreview(null);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-1 h-8">
          <Upload className="mr-2 h-4 w-4" />
          Importar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Importar menú con IA</DialogTitle>
          <DialogDescription>
            Sube una imagen o PDF de tu menú y la IA extraerá los productos
            automáticamente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!file ? (
            <div
              {...getRootProps()}
              className={`
                flex cursor-pointer flex-col items-center justify-center
                rounded-lg border-2 border-dashed p-8 transition-colors
                ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50"
                }
              `}
            >
              <input {...getInputProps()} />
              <FileUp className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-sm font-medium">
                {isDragActive
                  ? "Suelta el archivo aquí"
                  : "Arrastra un archivo o haz click para seleccionar"}
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, PNG, JPG o WEBP (máx. 10MB)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {preview ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <FileUp className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  disabled={isPending}
                >
                  Cambiar archivo
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleImport}
                  disabled={isPending}
                >
                  {isPending && (
                    <Icons.spinner
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  {isPending ? "Procesando..." : "Importar menú"}
                </Button>
              </div>

              {isPending && (
                <p className="text-center text-xs text-muted-foreground">
                  Esto puede tomar unos segundos...
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
