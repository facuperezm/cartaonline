"use client";

import { trpc } from "@/app/_trpc/client";

import { StoreCard } from "./cards/store-card";
import { StoreCardSkeleton } from "./skeletons/store-card-skeleton";

export default function StoreList() {
  const { data: allStores, isLoading } = trpc.getUserStores.useQuery();

  if (!allStores || isLoading) {
    return (
      <>
        <StoreCardSkeleton />
        <StoreCardSkeleton />
        <StoreCardSkeleton />
      </>
    );
  }
  return (
    <>
      {allStores.map((store: any) => (
        <StoreCard
          key={store.id}
          store={store}
          href={`/dashboard/stores/${store.id}`}
        />
      ))}
    </>
  );
}
