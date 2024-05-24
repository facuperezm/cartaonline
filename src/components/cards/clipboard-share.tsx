"use client";

import { toast } from "sonner";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CliboardShare({ slug }: { slug: string | null }) {
  return (
    <>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Compartir tu tienda</CardTitle>
          <CardDescription>
            Cualquier persona con este link puede ver tu página
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Label htmlFor="store-url">Url de tu tienda</Label>
            <Input
              id="store-url"
              aria-describedby="store-url"
              readOnly
              value={`cartaonline.facupm.dev/share/${slug}`}
            />
            <Button
              className="shrink-0"
              onClick={() => {
                toast.success("Link copiado al portapapeles");
                navigator.clipboard.writeText(
                  `https://www.cartaonline.facupm.dev/share/${slug}`,
                );
              }}
            >
              Copiar link
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
