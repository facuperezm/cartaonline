import Link from "next/link";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubscriptionButton } from "@/app/(dashboard)/(routes)/dashboard/billing/_components/subscription-button";

import { UsageCard } from "./usage";

const plans = [
  {
    name: "Gratis",
    description: "Podes crear una tienda",
    price: 0,
    features: ["Crear una tienda", "Hasta 15 productos"],
    planType: "BASIC" as const,
  },
  {
    name: "Pro",
    description: "Para negocios en crecimiento",
    price: 2999,
    features: [
      "Hasta 3 tiendas",
      "Productos ilimitados",
      "Estadísticas avanzadas",
      "Soporte prioritario",
    ],
    planType: "PRO" as const,
  },
  {
    name: "Enterprise",
    description: "Para grandes empresas",
    price: 5999,
    features: [
      "Tiendas ilimitadas",
      "Productos ilimitados",
      "Estadísticas avanzadas",
      "Soporte 24/7",
      "API personalizada",
      "Panel de administración",
    ],
    planType: "ENTERPRISE" as const,
  },
];

interface BillingProps {
  storeId: string;
  currentPlan?: "BASIC" | "PRO" | "ENTERPRISE";
  storeCount: number;
}

export function Billing({
  storeId,
  currentPlan = "BASIC",
  storeCount,
}: BillingProps) {
  const storeLimits = {
    BASIC: 1,
    PRO: 3,
    ENTERPRISE: Infinity,
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Plan y uso</CardTitle>
          <div className="text-sm text-muted-foreground">
            En este momento estas en el plan:{" "}
            <Badge
              variant="secondary"
              className="pointer-events-none text-foreground/90"
            >
              {plans.find((p) => p.planType === currentPlan)?.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <UsageCard
            title="Tiendas disponibles"
            count={storeCount}
            limit={storeLimits[currentPlan]}
            moreInfo="The number of stores you can create on the current plan."
          />
        </CardContent>
      </Card>
      <section className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={cn("flex flex-col")}>
            <CardHeader className="flex-1">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid flex-1 place-items-start gap-6">
              <div className="text-3xl font-bold">
                ${plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /mes
                </span>
              </div>
              <div className="w-full space-y-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="aspect-square shrink-0 rounded-full bg-foreground p-px text-background">
                      <CheckIcon className="size-3.5" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              {plan.planType === currentPlan ? (
                <Button className="w-full" disabled>
                  Plan actual
                </Button>
              ) : plan.planType === "BASIC" ? (
                <Button className="w-full" asChild>
                  <Link href="/dashboard/stores">
                    Crear tienda
                    <span className="sr-only">Ir a tiendas</span>
                  </Link>
                </Button>
              ) : (
                <SubscriptionButton
                  storeId={storeId}
                  planType={plan.planType as "BASIC" | "PRO"}
                  className="w-full"
                />
              )}
            </CardFooter>
          </Card>
        ))}
      </section>
    </>
  );
}
