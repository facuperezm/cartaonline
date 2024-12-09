"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
  storeId: number;
  planType: "BASIC" | "PRO" | "ENTERPRISE";
  className?: string;
}

const PLAN_TITLES = {
  BASIC: "Plan Básico",
  PRO: "Plan Pro",
  ENTERPRISE: "Plan Enterprise",
};

export function SubscriptionButton({
  storeId,
  planType,
  className,
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleSubscription = async () => {
    try {
      if (!user?.emailAddresses[0]?.emailAddress) {
        toast.error("No se encontró un email asociado a tu cuenta");
        return;
      }

      setIsLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.emailAddresses[0].emailAddress,
          planType,
          storeId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la suscripción");
      }

      const { initPoint } = await response.json();

      // Redirigir al usuario al checkout de MercadoPago
      window.location.href = initPoint;
    } catch (error) {
      console.error("[SUBSCRIPTION_ERROR]", error);
      toast.error("Error al procesar la suscripción");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscription}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        `Suscribirse al ${PLAN_TITLES[planType]}`
      )}
    </Button>
  );
}
