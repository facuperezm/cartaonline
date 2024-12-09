"use client";

import { useState } from "react";
import { Edit, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { updateStoreSlug } from "@/lib/actions/store";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function ClipboardShare({
  slug,
  storeId,
}: {
  slug: string | null;
  storeId: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newSlug, setNewSlug] = useState(slug || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateSlug = async () => {
    setIsLoading(true);
    try {
      const result = await updateStoreSlug(storeId, newSlug);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Slug actualizado correctamente");
      setIsEditing(false);
    } catch (error) {
      toast.error("Error al actualizar el slug");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Compartir tu tienda</CardTitle>
        <CardDescription>
          Cualquier persona con este link puede ver tu página
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="store-url">URL de tu tienda</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              disabled={isLoading}
            >
              {isEditing ? (
                <X className="h-4 w-4" />
              ) : (
                <Edit className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex gap-2">
            <Input
              id="store-url"
              aria-describedby="store-url"
              readOnly={!isEditing}
              value={
                isEditing ? newSlug : `cartaonline.facupm.dev/share/${slug}`
              }
              onChange={(e) => setNewSlug(e.target.value)}
              placeholder="Ingresa un nuevo slug"
              className={isEditing ? "border-primary" : ""}
            />
            {isEditing && (
              <Button
                onClick={handleUpdateSlug}
                disabled={isLoading}
                className="shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Guardar"
                )}
              </Button>
            )}
          </div>
          <Button
            className="shrink-0"
            onClick={() => {
              toast.success("Link copiado al portapapeles");
              navigator.clipboard.writeText(
                `https://cartaonline.facupm.dev/share/${slug}`,
              );
            }}
          >
            Copiar link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
