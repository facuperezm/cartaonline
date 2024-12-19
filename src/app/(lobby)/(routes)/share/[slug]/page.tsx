import { redirect } from "next/navigation";

import { db } from "@/lib/db";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SlugStorePage(props: PageProps) {
  const params = await props.params;
  const store = await db.store.findFirst({
    where: { slug: params.slug },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  redirect(`/stores/${store.city.toLowerCase()}/${store.id}`);
}
