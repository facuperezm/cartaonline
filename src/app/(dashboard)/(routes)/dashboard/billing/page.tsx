import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";

import { Billing } from "./_components/billing";

export const metadata: Metadata = {
  title: "Billing",
  description: "Administra tu suscripción y plan",
};

export default async function BillingPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await db.store.findMany({
    where: {
      userId,
      deletedAt: null,
    },
    include: {
      subscription: true,
    },
  });

  const mainStore = stores[0];
  if (!mainStore) {
    redirect("/dashboard/stores");
  }

  const currentPlan = mainStore.subscription?.planType ?? "BASIC";
  const storeCount = stores.length;

  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <PageHeader>
        <PageHeaderHeading size="sm">Pagos</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Administra tu suscripción
        </PageHeaderDescription>
      </PageHeader>
      <Billing
        storeId={mainStore.id}
        currentPlan={currentPlan}
        storeCount={storeCount}
      />
    </Shell>
  );
}
