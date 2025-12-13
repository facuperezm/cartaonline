"use client";

import * as React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log error to console in development, could send to error tracking service
    console.error("Application error:", error);
  }, [error]);

  return (
    <Shell variant="centered">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="size-10 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Algo salió mal
          </h1>
          <p className="text-muted-foreground">
            Ocurrió un error inesperado. Por favor, intenta de nuevo.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground/70">
              Código de error: {error.digest}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="size-4" />
            Intentar de nuevo
          </Button>
          <Button variant="outline" asChild>
            <a href="/">Volver al inicio</a>
          </Button>
        </div>
      </div>
    </Shell>
  );
}
