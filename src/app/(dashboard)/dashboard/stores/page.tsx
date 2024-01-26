import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";
import StoreList from "@/components/stores-list";

export const metadata: Metadata = {
  title: "Mis tiendas",
  description: "Administra tu tienda",
};

export default async function StoresPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

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
        <StoreList userId={user.id} />
      </section>
    </Shell>
  );
}
