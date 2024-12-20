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
import ClipboardShare from "@/app/(dashboard)/_components/clipboard-share";
import {
  CardDescription,
  CardTitle,
  QRCodeCustomizer,
} from "@/app/(dashboard)/_components/qr-code-customizer";
import StoreSettings from "@/app/(dashboard)/_components/store-settings";
import { columns } from "@/app/(dashboard)/_components/tables/columns";
import { DataTable } from "@/app/(dashboard)/_components/tables/data-table";
import BannerBtn from "@/app/(dashboard)/_components/upload-btn-banner";
import UploadBtn from "@/app/(dashboard)/_components/upload-btn-logo";

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
  });

  if (!store) {
    notFound();
  }

  const storeWithProducts = await db.store.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      products: true,
    },
  });

  const storeUrl = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/stores/${store.city.toLowerCase()}/${store.id}`;

  return (
    <Shell variant="sidebar">
      <PageHeader separated>
        <PageHeaderHeading size="sm">{store.name}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Administra la configuración de tu tienda
        </PageHeaderDescription>
      </PageHeader>
      <Tabs defaultValue="qr" className="space-y-4">
        <TabsList>
          <TabsTrigger value="qr">Código QR</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>
        <TabsContent value="qr" className="space-y-4">
          <QRCodeCustomizer storeUrl={storeUrl} storeName={store.name} />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          {/* Add your existing store settings content here */}
          <StoreSettings store={store} storeWithProducts={storeWithProducts} />
        </TabsContent>
      </Tabs>
    </Shell>
  );
}
