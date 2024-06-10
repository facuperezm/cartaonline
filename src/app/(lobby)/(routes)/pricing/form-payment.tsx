"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

const formSchema = z.object({
  card_number: z
    .number()
    .min(15, {
      message: "Card number must be at least 15 characters.",
    })
    .max(16),
  expiration_date: z.number(),
  security_code: z.number(),
  card_holder_name: z.string().max(32),
  issuer: z.string(),
  installments: z.number(),
  identification_type: z.string(),
  identification_number: z.number(),
  email: z.string(),
  token: z.number(),
  payment_method_id: z.number(),
  transaction_amount: z.number(),
  description: z.string(),
});

await loadMercadoPago();

export default function FormPayment() {
  const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      card_number: 0,
      expiration_date: 0,
      security_code: 0,
      card_holder_name: "",
      issuer: "",
      installments: 0,
      identification_type: "",
      identification_number: 0,
      email: "",
      token: 0,
      payment_method_id: 0,
      transaction_amount: 0,
      description: "",
    },
  });

  // initialize card fields
  const cardNumberElement = mp.fields
    .create("cardNumber", {
      placeholder: "Número de la tarjeta",
    })
    .mount("form-checkout__cardNumber");
  const expirationDateElement = mp.fields
    .create("expirationDate", {
      placeholder: "MM/YY",
    })
    .mount("form-checkout__expirationDate");
  const securityCodeElement = mp.fields
    .create("securityCode", {
      placeholder: "Código de seguridad",
    })
    .mount("form-checkout__securityCode");

  // get documents type
  (async function getIdentificationTypes() {
    try {
      const identificationTypes = await mp.getIdentificationTypes();
      const identificationTypeElement = document.getElementById(
        "form-checkout__identificationType",
      );

      createSelectOptions(identificationTypeElement, identificationTypes);
    } catch (e) {
      return console.error("Error getting identificationTypes: ", e);
    }
  })();

  function createSelectOptions(
    elem,
    options,
    labelsAndKeys = { label: "name", value: "id" },
  ) {
    const { label, value } = labelsAndKeys;

    elem.options.length = 0;

    const tempOptions = document.createDocumentFragment();

    options.forEach((option) => {
      const optValue = option[value];
      const optLabel = option[label];

      const opt = document.createElement("option");
      opt.value = optValue;
      opt.textContent = optLabel;

      tempOptions.appendChild(opt);
    });

    elem.appendChild(tempOptions);
  }

  // get payment methods for cards
  const paymentMethodElement = document.getElementById("paymentMethodId");
  const issuerElement = document.getElementById("form-checkout__issuer");
  const installmentsElement = document.getElementById(
    "form-checkout__installments",
  );

  const issuerPlaceholder = "Banco emisor";
  const installmentsPlaceholder = "Cuotas";

  let currentBin;
  cardNumberElement.on("binChange", async (data) => {
    const { bin } = data;
    try {
      if (!bin && paymentMethodElement.value) {
        clearSelectsAndSetPlaceholders();
        paymentMethodElement.value = "";
      }

      if (bin && bin !== currentBin) {
        const { results } = await mp.getPaymentMethods({ bin });
        const paymentMethod = results[0];

        paymentMethodElement.value = paymentMethod.id;
        updatePCIFieldsSettings(paymentMethod);
        updateIssuer(paymentMethod, bin);
        updateInstallments(paymentMethod, bin);
      }

      currentBin = bin;
    } catch (e) {
      console.error("error getting payment methods: ", e);
    }
  });

  function clearSelectsAndSetPlaceholders() {
    clearHTMLSelectChildrenFrom(issuerElement);
    createSelectElementPlaceholder(issuerElement, issuerPlaceholder);

    clearHTMLSelectChildrenFrom(installmentsElement);
    createSelectElementPlaceholder(
      installmentsElement,
      installmentsPlaceholder,
    );
  }

  function clearHTMLSelectChildrenFrom(element) {
    const currOptions = [...element.children];
    currOptions.forEach((child) => child.remove());
  }

  function createSelectElementPlaceholder(element, placeholder) {
    const optionElement = document.createElement("option");
    optionElement.textContent = placeholder;
    optionElement.setAttribute("selected", "");
    optionElement.setAttribute("disabled", "");

    element.appendChild(optionElement);
  }

  // Este paso mejora las validaciones de cardNumber y securityCode
  function updatePCIFieldsSettings(paymentMethod) {
    const { settings } = paymentMethod;

    const cardNumberSettings = settings[0].card_number;
    cardNumberElement.update({
      settings: cardNumberSettings,
    });

    const securityCodeSettings = settings[0].security_code;
    securityCodeElement.update({
      settings: securityCodeSettings,
    });
  }

  // get bank issuer
  async function updateIssuer(paymentMethod, bin) {
    const { additional_info_needed, issuer } = paymentMethod;
    let issuerOptions = [issuer];

    if (additional_info_needed.includes("issuer_id")) {
      issuerOptions = await getIssuers(paymentMethod, bin);
    }

    createSelectOptions(issuerElement, issuerOptions);
  }

  async function getIssuers(paymentMethod, bin) {
    try {
      const { id: paymentMethodId } = paymentMethod;
      return await mp.getIssuers({ paymentMethodId, bin });
    } catch (e) {
      console.error("error getting issuers: ", e);
    }
  }
  // get installments
  async function updateInstallments(paymentMethod, bin) {
    try {
      const installments = await mp.getInstallments({
        amount: document.getElementById("transactionAmount").value,
        bin,
        paymentTypeId: "credit_card",
      });
      const installmentOptions = installments[0].payer_costs;
      const installmentOptionsKeys = {
        label: "recommended_message",
        value: "installments",
      };
      createSelectOptions(
        installmentsElement,
        installmentOptions,
        installmentOptionsKeys,
      );
    } catch (error) {
      console.error("error getting installments: ", e);
    }
  }

  // create card token
  async function handleCardToken(event: any) {
    try {
      const tokenElement = document.getElementById("token");
      if (!tokenElement.value) {
        event.preventDefault();
        const token = await mp.fields.createCardToken({
          cardholderName: document.getElementById(
            "form-checkout__cardholderName",
          ).value,
          identificationType: document.getElementById(
            "form-checkout__identificationType",
          ).value,
          identificationNumber: document.getElementById(
            "form-checkout__identificationNumber",
          ).value,
        });
        tokenElement.value = token.id;
        formElement.requestSubmit();
      }
    } catch (e) {
      console.error("error creating card token: ", e);
    }
  }

  return (
    <div>
      {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCardToken)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="card_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de la tarjeta</FormLabel>
                  <FormControl>
                    <Input
                      id="form-checkout__cardNumber"
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiration_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vencimiento de la tarjeta</FormLabel>
                  <FormControl>
                    <Input
                      id="form-checkout__expirationDate"
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="security_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de seguridad</FormLabel>
                  <FormControl>
                    <Input
                      id="form-checkout__securityCode"
                      placeholder="123"
                      type="number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="card_holder_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titular de la tarjeta</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="form-checkout__cardholderName"
                      placeholder="Titular de la tarjeta"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issuer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banco emisor</FormLabel>
                  <FormControl>
                    <div id="form-checkout__issuer">
                      <Select name="issuer">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Banco emisor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem {...field} value="banco">
                            Banco emisor
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="installments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuotas</FormLabel>
                  <FormControl>
                    <div id="form-checkout__installments">
                      <Select name="installments">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="cuotas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem {...field} value="asd">
                            Banco emisor
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identification_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de documento</FormLabel>
                  <FormControl>
                    <div id="form-checkout__identificationType">
                      <Select name="identificationType">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem {...field} value="asd"></SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identification_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de documento</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="form-checkout__identificationNumber"
                      placeholder="Número do documento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="form-checkout__email"
                      placeholder="E-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <input id="token" name="token" type="hidden" />
            <input id="paymentMethodId" name="paymentMethodId" type="hidden" />
            <input
              id="transactionAmount"
              name="transactionAmount"
              type="hidden"
              value="100"
            />
            <input
              id="description"
              name="description"
              type="hidden"
              value="Nome do Produto"
            />
            <Button id="form-checkout__submit" type="submit">
              Submit
            </Button>
          </form>
        </Form> */}
      <form id="form-checkout" action="/process_payment" method="POST">
        <div id="form-checkout__cardNumber" className="container"></div>
        <div id="form-checkout__expirationDate" className="container"></div>
        <div id="form-checkout__securityCode" className="container"></div>
        <input
          type="text"
          id="form-checkout__cardholderName"
          placeholder="Titular de la tarjeta"
        />
        <select id="form-checkout__issuer" name="issuer">
          <option value="" disabled selected>
            Banco emisor
          </option>
        </select>
        <select id="form-checkout__installments" name="installments">
          <option value="" disabled selected>
            Cuotas
          </option>
        </select>
        <select
          id="form-checkout__identificationType"
          name="identificationType"
        >
          <option value="" disabled selected>
            Tipo de documento
          </option>
        </select>
        <input
          type="text"
          id="form-checkout__identificationNumber"
          name="identificationNumber"
          placeholder="Número do documento"
        />
        <input
          type="email"
          id="form-checkout__email"
          name="email"
          placeholder="E-mail"
        />
        <input id="token" name="token" type="hidden" />
        <input id="paymentMethodId" name="paymentMethodId" type="hidden" />
        <input
          id="transactionAmount"
          name="transactionAmount"
          type="hidden"
          value="100"
        />
        <input
          id="description"
          name="description"
          type="hidden"
          value="Nome do Produto"
        />
        <button type="submit" id="form-checkout__submit">
          Pagar
        </button>
      </form>
    </div>
  );
}
