import { db } from "@/lib/db";

import { StoreCard } from "./cards/store-card";
import { StoreCardSkeleton } from "./skeletons/store-card-skeleton";

export default async function StoreList({ userId }: { userId: string }) {
  // const { data: allStores, isLoading } = trpc.getUserStores.useQuery();

  const allStores = await db.store.findMany({
    where: {
      userId,
    },
  });

  if (!allStores) {
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
