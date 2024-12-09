import { MercadoPagoConfig, PreApproval } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

interface SubscribeParams {
  email: string;
  planType: "BASIC" | "PRO" | "ENTERPRISE";
  storeId: number;
}

const PLAN_PRICES = {
  BASIC: 0,
  PRO: 2999,
  ENTERPRISE: 5999,
} as const;

export async function subscribe({ email, planType, storeId }: SubscribeParams) {
  const subscription = await new PreApproval(client).create({
    body: {
      back_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing/success`,
      reason: `Suscripción al plan ${planType} de Carta Online`,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: PLAN_PRICES[planType],
        currency_id: "ARS",
      },
      payer_email: "test_user_1568047269@testuser.com",
      external_reference: `${storeId}-${planType}`,
      status: "pending",
    },
  });

  return subscription.init_point!;
}
