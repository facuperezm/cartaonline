"use client";

import { useState } from "react";
import { Download, Upload } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface QRCodeCustomizerProps {
  storeUrl: string;
  storeName: string;
}

export function QRCodeCustomizer({
  storeUrl,
  storeName,
}: QRCodeCustomizerProps) {
  const [qrStyle, setQrStyle] = useState<"squares" | "dots">("squares");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const [logo, setLogo] = useState<string | null>(null);
  const [includeMargin, setIncludeMargin] = useState(true);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code");
    if (svg) {
      // Get SVG data
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      // Set canvas size to match SVG size
      canvas.width = size;
      canvas.height = size;

      img.onload = () => {
        // Draw white background
        if (ctx) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          // Convert to PNG
          const pngFile = canvas.toDataURL("image/png");

          // Download
          const downloadLink = document.createElement("a");
          downloadLink.download = `${storeName}-qr-code.png`;
          downloadLink.href = pngFile;
          downloadLink.click();
        }
      };

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

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
              id="qr-code"
              value={storeUrl}
              size={size}
              fgColor={primaryColor}
              bgColor={backgroundColor}
              level="H"
              includeMargin={includeMargin}
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
            />
          </div>
          <Button onClick={downloadQRCode} className="w-full">
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
              value={qrStyle}
              onValueChange={(value) => setQrStyle(value as "squares" | "dots")}
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
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-10 w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color de fondo</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="h-10 w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tamaño ({size}px)</Label>
            <Slider
              value={[size]}
              onValueChange={(value) => setSize(value[0])}
              min={128}
              max={512}
              step={8}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Logo (opcional)</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("logo-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Subir logo
              </Button>
              {logo && (
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setLogo(null)}
                >
                  ×
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
