import { FileQuestion, Home, Search } from 'lucide-react'
import Link from 'next/link'
import { Shell } from '@/components/shell'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Shell variant="centered">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="size-10 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="font-bold text-4xl tracking-tight">404</h1>
          <h2 className="font-semibold text-xl">Página no encontrada</h2>
          <p className="max-w-md text-muted-foreground">
            Lo sentimos, la página que buscas no existe o fue movida a otra
            ubicación.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="gap-2">
            <Link href="/">
              <Home className="size-4" />
              Volver al inicio
            </Link>
          </Button>
          <Button asChild className="gap-2" variant="outline">
            <Link href="/stores/puerto_iguazu">
              <Search className="size-4" />
              Ver restaurantes
            </Link>
          </Button>
        </div>
      </div>
    </Shell>
  )
}
