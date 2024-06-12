"use client";

import { CardPayment, initMercadoPago } from "@mercadopago/sdk-react";

import { PaymentAction } from "../action";

//test credential not real
initMercadoPago("APP_USR-7d7351b9-dac9-4398-817f-7f2395838d62");

export default function FormPay() {
  // const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);

  return (
    <>
      <CardPayment initialization={{ amount: 1000 }} onSubmit={PaymentAction} />
    </>
  );
}
