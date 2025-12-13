'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
import * as React from 'react'
import { Shell } from '@/components/shell'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log error to console in development, could send to error tracking service
    console.error('Application error:', error)
  }, [error])

  return (
    <Shell variant="centered">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="size-10 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="font-bold text-2xl tracking-tight">Algo salió mal</h1>
          <p className="text-muted-foreground">
            Ocurrió un error inesperado. Por favor, intenta de nuevo.
          </p>
          {error.digest ? (
            <p className="text-muted-foreground/70 text-xs">
              Código de error: {error.digest}
            </p>
          ) : null}
        </div>

        <div className="flex gap-3">
          <Button className="gap-2" onClick={reset}>
            <RefreshCw className="size-4" />
            Intentar de nuevo
          </Button>
          <Button asChild variant="outline">
            <a href="/">Volver al inicio</a>
          </Button>
        </div>
      </div>
    </Shell>
  )
}
