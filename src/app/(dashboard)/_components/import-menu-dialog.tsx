'use client'

import { FileUp, Upload } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { importMenuFromFile } from '@/lib/actions/import-menu'

type ImportMenuDialogProps = {
  storeId: string
}

export function ImportMenuDialog({ storeId }: ImportMenuDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [file, setFile] = React.useState<File | null>(null)
  const [isPending, startTransition] = React.useTransition()
  const [preview, setPreview] = React.useState<string | null>(null)

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)

      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreview(e.target?.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const handleImport = () => {
    if (!file) {
      toast.error('Por favor selecciona un archivo')
      return
    }

    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append('storeId', storeId)
        formData.append('file', file)

        const result = await importMenuFromFile(formData)

        if (result.success) {
          toast.success(result.message || 'Menú importado correctamente')
          setOpen(false)
          setFile(null)
          setPreview(null)
        } else {
          toast.error(result.error || 'Error al importar el menú')
        }
      } catch (error) {
        toast.error('Error inesperado al importar el menú')
        console.error(error)
      }
    })
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!isPending) {
      setOpen(newOpen)
      if (!newOpen) {
        setFile(null)
        setPreview(null)
      }
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button className="ml-1 h-8" variant="outline">
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
          {file ? (
            <div className="space-y-4">
              {preview ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  <Image
                    alt="Preview"
                    className="object-contain"
                    fill
                    src={preview}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <FileUp className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  disabled={isPending}
                  onClick={() => {
                    setFile(null)
                    setPreview(null)
                  }}
                  variant="outline"
                >
                  Cambiar archivo
                </Button>
                <Button
                  className="flex-1"
                  disabled={isPending}
                  onClick={handleImport}
                >
                  {isPending ? (
                    <Icons.spinner
                      aria-hidden="true"
                      className="mr-2 h-4 w-4 animate-spin"
                    />
                  ) : null}
                  {isPending ? 'Procesando...' : 'Importar menú'}
                </Button>
              </div>

              {isPending ? (
                <p className="text-center text-muted-foreground text-xs">
                  Esto puede tomar unos segundos...
                </p>
              ) : null}
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }
              `}
            >
              <input {...getInputProps()} />
              <FileUp className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 font-medium text-sm">
                {isDragActive
                  ? 'Suelta el archivo aquí'
                  : 'Arrastra un archivo o haz click para seleccionar'}
              </p>
              <p className="text-muted-foreground text-xs">
                PDF, PNG, JPG o WEBP (máx. 10MB)
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
