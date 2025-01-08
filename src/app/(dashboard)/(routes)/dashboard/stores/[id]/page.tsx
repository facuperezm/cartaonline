import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getCities } from "@/lib/queries/city";
import { getStoreById } from "@/lib/queries/store";
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
  const store = await getStoreById(id);

  if (!store) {
    return {
      title: "CartaOnline - Tienda no encontrada",
      description: "La tienda que estás buscando no existe.",
    };
  }

  return {
    title: `${store.name} - Settings`,
    description: `Manage ${store.name} settings`,
  };
}

export default async function StorePage({ params }: PageProps) {
  const { id } = await params;
  const store = await getStoreById(id);

  if (!store) {
    notFound();
  }

  const cities = await getCities();

  const storeUrl = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/stores/${store.city.name.toLowerCase()}/${store.id}`;

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
          <StoreSettings store={store} cities={cities} />
        </TabsContent>
        <TabsContent value="qr" className="space-y-4">
          <QRCodeCustomizer storeUrl={storeUrl} storeName={store.name} />
        </TabsContent>
      </Tabs>
    </Shell>
  );
}
