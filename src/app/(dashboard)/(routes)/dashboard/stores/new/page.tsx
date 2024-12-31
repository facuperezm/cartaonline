import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

import { Card, CardContent } from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";
import { AddStoreForm } from "@/app/(dashboard)/(routes)/dashboard/stores/new/_components/add-store";

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
        <CardContent className="mt-6">
          <AddStoreForm />
        </CardContent>
      </Card>
    </Shell>
  );
}
