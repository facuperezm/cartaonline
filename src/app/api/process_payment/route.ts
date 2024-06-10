import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });

  console.log(body, "from post");
  // fetch("https://api.mercadopago.com/v1/payments", {
  //   headers: {
  //     "X-Idempotency-Key": "0d5020ed-1af6-469c-ae06-c3bec19954bb",
  //   },
  // });

  return Response.json({ success: true });
}
