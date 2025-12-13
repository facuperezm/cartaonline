import Link from "next/link";
import { FileQuestion, Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";

export default function NotFound() {
  return (
    <Shell variant="centered">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="size-10 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <h2 className="text-xl font-semibold">Página no encontrada</h2>
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
          <Button variant="outline" asChild className="gap-2">
            <Link href="/stores/puerto_iguazu">
              <Search className="size-4" />
              Ver restaurantes
            </Link>
          </Button>
        </div>
      </div>
    </Shell>
  );
}
