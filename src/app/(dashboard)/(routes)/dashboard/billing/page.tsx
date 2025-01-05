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
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const stores = await db.store.findMany({
    where: {
      userId,
    },
    include: {
      subscription: true,
    },
  });

  if (!stores) {
    redirect("/dashboard/stores");
  }

  const currentPlan = stores[0].subscription?.planType ?? "BASIC";
  const storeCount = stores.length;

  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <PageHeader>
        <PageHeaderHeading>Pagos</PageHeaderHeading>
        <PageHeaderDescription>Administra tu suscripción</PageHeaderDescription>
      </PageHeader>
      <Billing
        storeId={stores[0].id}
        currentPlan={currentPlan}
        storeCount={storeCount}
      />
    </Shell>
  );
}
