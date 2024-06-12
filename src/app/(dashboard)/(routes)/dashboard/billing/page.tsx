import { type Metadata } from "next";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Shell } from "@/components/shell";

import { Billing } from "./_components/billing";

export const metadata: Metadata = {
  title: "Mis empresas",
  description: "Administra tus empresas en un solo lugar",
};

export default function BillingPage() {
  return (
    <Shell variant="sidebar" className="overflow-hidden">
      <PageHeader>
        <PageHeaderHeading size="sm">Pagos</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Administra tu suscripción
        </PageHeaderDescription>
      </PageHeader>
      <Billing />
    </Shell>
  );
}
