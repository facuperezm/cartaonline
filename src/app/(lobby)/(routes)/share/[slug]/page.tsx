import { redirect } from "next/navigation";

import { db } from "@/lib/db";

export default async function SlugStorePage({
  params,
}: {
  params: { slug: string };
}) {
  const store = await db.store.findFirst({
    where: { slug: params.slug },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  redirect(`/stores/${store.city.toLowerCase()}/${store.id}`);
}
