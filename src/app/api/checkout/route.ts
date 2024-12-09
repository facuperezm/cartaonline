import { NextResponse } from "next/server";
import { z } from "zod";

import { subscribe } from "@/lib/mercadopago";

const checkoutSchema = z.object({
  email: z.string().email(),
  planType: z.enum(["BASIC", "PRO", "ENTERPRISE"]),
  storeId: z.number(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, planType, storeId } = checkoutSchema.parse(body);

    const initPoint = await subscribe({ email, planType, storeId });

    return NextResponse.json({ initPoint });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 },
      );
    }

    console.error("[CHECKOUT_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
