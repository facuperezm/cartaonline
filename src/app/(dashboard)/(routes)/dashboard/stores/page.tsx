import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { AlertOctagon } from "lucide-react";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";
import { StoreCard } from "@/app/(dashboard)/_components/store-card";
import { StoreCardSkeleton } from "@/app/(dashboard)/_components/store-card-skeleton";

export const metadata: Metadata = {
  title: "Mis empresas",
  description: "Administra tus empresas en un solo lugar",
};

export default async function StoresPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const allStores = await db.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading className="flex-1">Tiendas</PageHeaderHeading>
          <Link
            aria-label="Create store"
            href="stores/new"
            className={cn(
              buttonVariants({
                size: "sm",
              }),
            )}
          >
            Crear tienda
          </Link>
        </div>
        <PageHeaderDescription>Administra tus tiendas</PageHeaderDescription>
      </PageHeader>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        >
          {allStores.length === 0 ? (
            <Alert className="col-span-3">
              <AlertOctagon className="size-4" />
              <AlertTitle>No tenés tiendas creadas</AlertTitle>
              <AlertDescription>
                Para crear una tienda, hacé click en el botón &quot;Crear
                tienda&quot; en la barra lateral.
              </AlertDescription>
            </Alert>
          ) : (
            allStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                href={`/dashboard/stores/${store.id}`}
              />
            ))
          )}
        </React.Suspense>
      </section>
    </Shell>
  );
}
