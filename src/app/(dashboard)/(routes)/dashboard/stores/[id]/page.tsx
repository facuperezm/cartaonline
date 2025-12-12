import { type Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  PackageIcon,
  QrCodeIcon,
  SettingsIcon,
  ShieldAlertIcon,
} from "lucide-react";

import { getCities } from "@/lib/queries/city";
import { getStoreById } from "@/lib/queries/store";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";
import { QRCodeCustomizer } from "@/app/(dashboard)/_components/qr-code-customizer";
import { StoreDangerZone } from "@/app/(dashboard)/_components/store-danger-zone";
import { StoreInfoTab } from "@/app/(dashboard)/_components/store-info-tab";
import { StoreProductsTab } from "@/app/(dashboard)/_components/store-products-tab";

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

  const isActive = store.status === "ACTIVE";

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex items-center gap-3">
          <PageHeaderHeading>{store.name}</PageHeaderHeading>
          <Badge
            variant={isActive ? "default" : "destructive"}
            className={cn(
              "gap-1.5",
              isActive && "bg-emerald-600 hover:bg-emerald-600/90"
            )}
          >
            {isActive ? (
              <CheckCircle2Icon className="size-3" />
            ) : (
              <AlertCircleIcon className="size-3" />
            )}
            {isActive ? "Activa" : "Inactiva"}
          </Badge>
        </div>
        <PageHeaderDescription>
          Administra la configuración de tu tienda
        </PageHeaderDescription>
      </PageHeader>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger value="products" className="gap-2">
            <PackageIcon className="size-4" />
            Productos
          </TabsTrigger>
          <TabsTrigger value="store" className="gap-2">
            <SettingsIcon className="size-4" />
            Tienda
          </TabsTrigger>
          <TabsTrigger value="qr" className="gap-2">
            <QrCodeIcon className="size-4" />
            Código QR
          </TabsTrigger>
          <TabsTrigger value="danger" className="gap-2">
            <ShieldAlertIcon className="size-4" />
            Avanzado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <StoreProductsTab storeId={store.id} products={store.products} />
        </TabsContent>

        <TabsContent value="store" className="space-y-4">
          <StoreInfoTab store={store} cities={cities} />
        </TabsContent>

        <TabsContent value="qr" className="space-y-4">
          <QRCodeCustomizer storeUrl={storeUrl} storeName={store.name} />
        </TabsContent>

        <TabsContent value="danger" className="space-y-4">
          <StoreDangerZone store={store} />
        </TabsContent>
      </Tabs>
    </Shell>
  );
}
