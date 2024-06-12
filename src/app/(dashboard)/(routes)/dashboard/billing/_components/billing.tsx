import Link from "next/link";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { UsageCard } from "./usage";

export async function Billing() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Plan y uso</CardTitle>
          <div className="text-sm text-muted-foreground">
            En este momento estas en el plan:{" "}
            <Badge
              variant="secondary"
              className="pointer-events-none text-foreground/90"
            >
              Gratis
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <UsageCard
            title="Tiendas disponibles"
            count={1}
            limit={1}
            moreInfo="The number of stores you can create on the current plan."
          />
        </CardContent>
      </Card>
      <section className="grid gap-6 lg:grid-cols-3">
        <Card
          className={cn("flex flex-col", {
            "sm:col-span-2 lg:col-span-1": 1 === 3 - 1,
          })}
        >
          <CardHeader className="flex-1">
            <CardTitle className="text-lg">Gratis</CardTitle>
            <CardDescription>Podes crear una tienda</CardDescription>
          </CardHeader>
          <CardContent className="grid flex-1 place-items-start gap-6">
            <div className="text-3xl font-bold">
              $0
              <span className="text-sm font-normal text-muted-foreground">
                /mes
              </span>
            </div>
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2">
                <div className="aspect-square shrink-0 rounded-full bg-foreground p-px text-background">
                  <CheckIcon className="size-3.5" aria-hidden="true" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Crear una tienda
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="aspect-square shrink-0 rounded-full bg-foreground p-px text-background">
                  <CheckIcon className="size-3.5" aria-hidden="true" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Hasta 15 productos
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <Button className="w-full" asChild>
              <Link href="/dashboard/stores">
                Crear tienda
                <span className="sr-only">Ir a tiendas</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
