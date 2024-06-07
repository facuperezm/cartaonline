"use client";

import { loadMercadoPago } from "@mercadopago/sdk-js";

const mp = new loadMercadoPago(process.env.MP_PUBLIC_KEY, {
  locale: "en-US",
});

export default function PaymentsForm() {
  console.log(mp);

  return (
    <>
      <form id="form-checkout">
        <div id="form-checkout__cardNumber" className="container"></div>
        <div id="form-checkout__expirationDate" className="container"></div>
        <div id="form-checkout__securityCode" className="container"></div>
        <input type="text" id="form-checkout__cardholderName" />
        <select id="form-checkout__issuer"></select>
        <select id="form-checkout__installments"></select>
        <select id="form-checkout__identificationType"></select>
        <input type="text" id="form-checkout__identificationNumber" />
        <input type="email" id="form-checkout__cardholderEmail" />

        <button type="submit" id="form-checkout__submit">
          Pagar
        </button>
        <progress value="0" className="progress-bar">
          Cargando...
        </progress>
      </form>
    </>
  );
}
