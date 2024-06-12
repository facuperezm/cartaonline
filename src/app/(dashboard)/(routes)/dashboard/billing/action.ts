"use server";

import { redirect } from "next/navigation";

export async function PaymentAction(param: any) {
  try {
    //Create Subscription Plan
    const createPlanResponse = await fetch(
      "https://api.mercadopago.com/preapproval_plan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // test credentials not real
          Authorization: `Bearer APP_USR-2349578459858645-061010-2fc2dcd82b9877b5ee2c5f449607a58b-1842783107`,
        },
        body: JSON.stringify({
          auto_recurring: {
            frequency: 1,
            frequency_type: "months",
            repetitions: 12,
            billing_day: 10,
            billing_day_proportional: false,
            free_trial: {
              frequency: 1,
              frequency_type: "months",
            },
            transaction_amount: 1000,
            currency_id: "ARS",
          },
          back_url: "https://newcastle-cuts-eagle-richard.trycloudflare.com/",
          reason: "suscripcion anal",
        }),
      },
    );

    if (!createPlanResponse.ok) {
      const errorData = await createPlanResponse.json();
      console.error("Failed to create subscription plan:", errorData);
      return;
    }

    const planData = await createPlanResponse.json();
    console.log("Subscription plan created successfully:", planData);

    function wait(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await wait(30000);
    // Create Subscription
    const createSubResponse = await fetch(
      "https://api.mercadopago.com/preapproval",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          auto_recurring: {
            frequency: 1,
            frequency_type: "months",
            start_date: new Date().toISOString(),
            end_date: "2025-07-20T15:59:52.581Z",
            transaction_amount: 1000,
            currency_id: "ARS",
          },
          back_url: "https://newcastle-cuts-eagle-richard.trycloudflare.com/",
          card_token_id: param.token,
          external_reference: "SUSCANAL",
          payer_email: param.payer.email,
          preapproval_plan_id: planData.id,
          reason: "suscripcion anal",
          status: "authorized",
        }),
      },
    );

    if (!createSubResponse.ok) {
      const errorData = await createSubResponse.json();
      console.error("Failed to create subscription:", errorData);
      return;
    }

    const subData = await createSubResponse.json();
    console.log("Subscription created successfully:", subData);

    // Redirect to the init point
    redirect(subData.init_point);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
