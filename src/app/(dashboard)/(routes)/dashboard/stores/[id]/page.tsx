import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";
import { QRCodeCustomizer } from "@/app/(dashboard)/_components/qr-code-customizer";
import StoreSettings from "@/app/(dashboard)/_components/store-settings";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const store = await db.store.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!store) {
    return {
      title: "Store not found",
      description: "The store you are looking for does not exist.",
    };
  }

  return {
    title: `${store.name} - Settings`,
    description: `Manage ${store.name} settings`,
  };
}

export default async function StorePage({ params }: PageProps) {
  const { id } = await params;
  const store = await db.store.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      products: true,
    },
  });

  if (!store) {
    notFound();
  }

  const storeUrl = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/stores/${store.city.toLowerCase()}/${store.id}`;

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <PageHeaderHeading>{store.name}</PageHeaderHeading>
        <PageHeaderDescription>
          Administra la configuración de tu tienda
        </PageHeaderDescription>
      </PageHeader>
      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
          <TabsTrigger value="qr">Código QR</TabsTrigger>
        </TabsList>
        <TabsContent value="settings" className="space-y-4">
          <StoreSettings store={store} />
        </TabsContent>
        <TabsContent value="qr" className="space-y-4">
          <QRCodeCustomizer storeUrl={storeUrl} storeName={store.name} />
        </TabsContent>
      </Tabs>
    </Shell>
  );
}
