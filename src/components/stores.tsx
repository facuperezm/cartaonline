"use client";

import { trpc } from "@/app/_trpc/client";

import { StoreCard } from "./cards/store-card";

function Stores() {
  const { data: allStores } = trpc.getStores.useQuery();

  console.log(allStores);

  return (
    <div>
      {allStores?.map((store) => {
        return <StoreCard key={store.id} store={store} href={store.name} />;
      })}
    </div>
  );
}

export default Stores;
