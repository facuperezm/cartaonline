import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

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
  title: "Nueva empresa",
  description: "Agrega tu nueva empresa a Carta Online",
};

export default async function NewStorePage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="new-store-page-header"
        aria-labelledby="new-store-page-header-heading"
      >
        <PageHeaderHeading>Nueva tienda</PageHeaderHeading>
        <PageHeaderDescription>
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
