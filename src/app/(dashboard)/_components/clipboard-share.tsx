'use client'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type ClipboardShareProps = {
  shareUrl: string
}

export default function ClipboardShare({ shareUrl }: ClipboardShareProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compartir tu tienda</CardTitle>
        <CardDescription>
          Cualquier persona con este link puede ver tu página
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Input
              aria-describedby="store-url"
              id="store-url"
              readOnly={true}
              value={shareUrl}
            />
          </div>
          <Button
            className="shrink-0"
            onClick={() => {
              toast.success('Link copiado al portapapeles')
              navigator.clipboard.writeText(shareUrl)
            }}
          >
            Copiar link
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
