import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddStoreForm } from "@/components/forms/add-store-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "New Store",
  description: "Add a new store",
};

export default async function NewStorePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="new-store-page-header"
        aria-labelledby="new-store-page-header-heading"
      >
        <PageHeaderHeading size="sm">Nueva tienda</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Agregá una nueva tienda a tu cuenta
        </PageHeaderDescription>
      </PageHeader>
      <Card
        as="section"
        id="new-store-page-form-container"
        aria-labelledby="new-store-page-form-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Información de la nueva tienda
          </CardTitle>
          <CardDescription>Datos importantes</CardDescription>
        </CardHeader>
        <CardContent>
          <AddStoreForm />
        </CardContent>
      </Card>
    </Shell>
  );
}
