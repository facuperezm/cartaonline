"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-8 text-destructive" />
          </div>
          <CardTitle>Error en el Dashboard</CardTitle>
          <CardDescription>
            Ocurrió un problema al cargar esta página. Esto puede ser temporal.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Si el problema persiste, por favor contacta con soporte.
          </p>
          {error.digest && (
            <p className="mt-2 font-mono text-xs text-muted-foreground/70">
              Ref: {error.digest}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={reset} className="w-full gap-2">
            <RefreshCw className="size-4" />
            Reintentar
          </Button>
          <Button variant="outline" className="w-full gap-2" asChild>
            <Link href="/dashboard/stores">
              <ArrowLeft className="size-4" />
              Volver a tiendas
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
