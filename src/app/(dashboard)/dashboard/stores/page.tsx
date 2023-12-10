import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { StoreCard } from "@/components/cards/store-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";
import { StoreCardSkeleton } from "@/components/skeletons/store-card-skeleton";

export const metadata: Metadata = {
  title: "Mis tiendas",
  description: "Administra tu tienda",
};

export default async function StoresPage() {
  const userfromclerk = await currentUser();

  if (!userfromclerk) {
    redirect("/signin");
  }

  const allStores = await db.store.findMany({
    where: {
      userId: userfromclerk.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Tiendas
          </PageHeaderHeading>
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
        <PageHeaderDescription size="sm">
          Administra tus tiendas
        </PageHeaderDescription>
      </PageHeader>
      {/* implement an Alert with info about the subscription */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        >
          {allStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              href={`/dashboard/stores/${store.id}`}
            />
          ))}
        </React.Suspense>
      </section>
    </Shell>
  );
}
