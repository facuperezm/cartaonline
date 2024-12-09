import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getPaymentById, updateSubscriptionStatus } from "@/lib/mercadopago";

export async function POST(req: Request) {
  try {
    const headersList = headers();
    const payload = await req.json();

    // Validar que sea una notificación válida de MercadoPago
    const type = headersList.get("x-webhook-type");
    if (type !== "payment") {
      return new NextResponse(null, { status: 200 });
    }

    // Obtener los detalles del pago
    const paymentResponse = await getPaymentById(payload.data.id);
    if (!paymentResponse || !paymentResponse.status) {
      throw new Error("Payment not found");
    }

    const payment =
      paymentResponse.status === 200 ? paymentResponse.response : null;
    if (!payment) {
      throw new Error("Invalid payment data");
    }

    // Verificar si es una suscripción
    const isSubscription = payment.metadata?.subscription === true;

    if (isSubscription) {
      // Procesar pago de suscripción
      const subscriptionData = await updateSubscriptionStatus(payment);

      // Actualizar o crear la suscripción
      await db.subscription.upsert({
        where: {
          storeId: subscriptionData.storeId,
        },
        create: {
          storeId: subscriptionData.storeId,
          planType: subscriptionData.planType,
          status: payment.status === "approved" ? "ACTIVE" : "PENDING",
          expiresAt: subscriptionData.expiresAt,
        },
        update: {
          planType: subscriptionData.planType,
          status: payment.status === "approved" ? "ACTIVE" : "PENDING",
          expiresAt: subscriptionData.expiresAt,
        },
      });
    }

    // Registrar el pago
    await db.payment.create({
      data: {
        paymentId: payment.id.toString(),
        storeId: parseInt(payment.metadata.store_id),
        status: payment.status,
        merchantOrderId: payment.order.id,
        amount: payment.transaction_amount,
        paymentMethod: payment.payment_method_id,
        metadata: payment,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("[MERCADOPAGO_WEBHOOK_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 },
    );
  }
}
