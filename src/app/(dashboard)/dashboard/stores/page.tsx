import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { RocketIcon } from "@radix-ui/react-icons";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { StoreCard } from "@/components/cards/store-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";
import { StoreCardSkeleton } from "@/components/skeletons/store-card-skeleton";
import Stores from "@/components/stores";
import { trpc } from "@/app/_trpc/client";

export const metadata: Metadata = {
  title: "Stores",
  description: "Manage your stores",
};

export default async function StoresPage() {
  const userfromclerk = await currentUser();

  // const userfromDB = await db.user.findUnique({
  //   where: {
  //     id: userfromclerk!.id,
  //   },
  // });

  if (!userfromclerk) {
    redirect("/signin");
  }

  const allStores = await db.store.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Stores
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
            Create store
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Manage your stores
        </PageHeaderDescription>
      </PageHeader>
      <Alert>
        <RocketIcon className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You are currently on the <span className="font-semibold">FREE</span>{" "}
          plan. You can create up to <span className="font-semibold">5</span>{" "}
          stores and <span className="font-semibold">25</span> products on this
          plan.
        </AlertDescription>
      </Alert>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <StoreCardSkeleton key={i} />
          ))}
        >
          <Stores />
        </React.Suspense>
      </section>
    </Shell>
  );
}
