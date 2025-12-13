'use client'

import { Download, Upload } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const QRCodeSVG = dynamic(
  () => import('qrcode.react').then((m) => m.QRCodeSVG),
  { ssr: false },
)

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

interface QRCodeCustomizerProps {
  storeUrl: string
  storeName: string
}

export function QRCodeCustomizer({
  storeUrl,
  storeName,
}: QRCodeCustomizerProps) {
  const [qrStyle, setQrStyle] = useState<'squares' | 'dots'>('squares')
  const [primaryColor, setPrimaryColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [size, setSize] = useState(256)
  const [logo, setLogo] = useState<string | null>(null)
  const [includeMargin] = useState(true)

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code')
    if (svg) {
      // Get SVG data
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      // Set canvas size to match SVG size
      canvas.width = size
      canvas.height = size

      img.onload = () => {
        // Draw white background
        if (ctx) {
          ctx.fillStyle = backgroundColor
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0)

          // Convert to PNG
          const pngFile = canvas.toDataURL('image/png')

          // Download
          const downloadLink = document.createElement('a')
          downloadLink.download = `${storeName}-qr-code.png`
          downloadLink.href = pngFile
          downloadLink.click()
        }
      }

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* QR Code Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Vista previa del QR</CardTitle>
          <CardDescription>
            Así es como se verá tu código QR personalizado
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-lg border bg-white p-4">
            <QRCodeSVG
              bgColor={backgroundColor}
              fgColor={primaryColor}
              id="qr-code"
              imageSettings={
                logo
                  ? {
                      src: logo,
                      height: size * 0.2,
                      width: size * 0.2,
                      excavate: true,
                    }
                  : undefined
              }
              includeMargin={includeMargin}
              level="H"
              size={size}
              value={storeUrl}
            />
          </div>
          <Button className="w-full" onClick={downloadQRCode}>
            <Download className="mr-2 h-4 w-4" />
            Descargar QR
          </Button>
        </CardContent>
      </Card>

      {/* Customization Options */}
      <Card>
        <CardHeader>
          <CardTitle>Personalización</CardTitle>
          <CardDescription>
            Personaliza el aspecto de tu código QR
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Estilo</Label>
            <Select
              onValueChange={(value) => setQrStyle(value as 'squares' | 'dots')}
              value={qrStyle}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="squares">Cuadrados</SelectItem>
                <SelectItem value="dots">Puntos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Color principal</Label>
            <div className="flex gap-2">
              <Input
                className="h-10 w-full"
                onChange={(e) => setPrimaryColor(e.target.value)}
                type="color"
                value={primaryColor}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color de fondo</Label>
            <div className="flex gap-2">
              <Input
                className="h-10 w-full"
                onChange={(e) => setBackgroundColor(e.target.value)}
                type="color"
                value={backgroundColor}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tamaño ({size}px)</Label>
            <Slider
              className="w-full"
              max={512}
              min={128}
              onValueChange={(value) => setSize(value[0])}
              step={8}
              value={[size]}
            />
          </div>

          <div className="space-y-2">
            <Label>Logo (opcional)</Label>
            <div className="flex items-center gap-2">
              <Input
                accept="image/*"
                className="hidden"
                id="logo-upload"
                onChange={handleLogoUpload}
                type="file"
              />
              <Button
                className="w-full"
                onClick={() => document.getElementById('logo-upload')?.click()}
                variant="outline"
              >
                <Upload className="mr-2 h-4 w-4" />
                Subir logo
              </Button>
              {logo && (
                <Button
                  onClick={() => setLogo(null)}
                  size="icon"
                  variant="destructive"
                >
                  ×
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
