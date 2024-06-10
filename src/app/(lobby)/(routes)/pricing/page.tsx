"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Check, Minus } from "lucide-react";

import { PLANS } from "@/config/mercadopago";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Shell } from "@/components/shell";

const FormDynamic = dynamic(() => import("./form-payment"), {
  ssr: false,
});

const SecondForm = dynamic(() => import("./form-pay"), {
  ssr: false,
});

export default function PricingPage() {
  // const pricingItems = [
  //   {
  //     plan: "Gratis",
  //     tagline: "Para empezar a vender",
  //     quota: 10,
  //     features: [
  //       {
  //         text: "Hasta 10 productos",
  //         footnote: "Todas las funcionalidades de la plataforma",
  //         negative: false,
  //       },
  //     ],
  //   },
  //   {
  //     plan: "Pro",
  //     tagline: "Para negocios grandes",
  //     quota: PLANS.find((p) => p.slug === "pro")!.quota,
  //     features: [],
  //   },
  // ];

  return (
    <Shell>
      <div className="">
        <h2 className="text-2xl font-bold leading-tight tracking-tighter">
          Actualizar tienda
        </h2>
        <p>Elegí qué plan se adapta mejor a las necesidades de tu negocio</p>
      </div>

      {/* <FormDynamic /> */}
      <SecondForm />

      {/* <div className="grid grid-cols-1 gap-10 pt-12 lg:grid-cols-2">
        {pricingItems.map(({ plan, tagline, quota, features }) => {
          const price =
            PLANS.find((p) => p.slug === plan.toLowerCase())!.price.amount || 0;

          return (
            <div
              key={plan}
              className={cn("relative rounded-2xl bg-white shadow-lg", {
                "border-2 border-blue-600 shadow-blue-200": plan === "Pro",
                "border border-gray-200": plan !== "Pro",
              })}
            >
              {plan === "Pro" && (
                <div className="absolute inset-x-0 -top-5 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-center text-sm font-medium text-white">
                  Upgrade now
                </div>
              )}
              <div className="p-5">
                <h3 className="my-3 text-center text-3xl font-bold">{plan}</h3>
                <p className="text-gray-500">{tagline}</p>
                <p className="my-5 text-6xl font-semibold">${price}</p>
                <p className="text-gray-500">per month</p>
              </div>
              <div className="flex h-20 items-center justify-center border-y border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-1">
                  <p>{quota.toLocaleString()} PDFs/mo included</p>
                </div>
              </div>

              <ul className="my-10 space-y-5 px-8">
                {features.map(
                  ({
                    text,
                    footnote,
                    negative,
                  }: {
                    text: string;
                    footnote: string;
                    negative: boolean;
                  }) => (
                    <li key={text} className="flex space-x-5">
                      <div className="shrink-0">
                        {negative ? (
                          <Minus className="h-6 w-6 text-gray-300" />
                        ) : (
                          <Check className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                      {footnote ? (
                        <div className="flex items-center space-x-1">
                          <p
                            className={cn("text-gray-600", {
                              "text-gray-400": negative,
                            })}
                          >
                            {text}
                          </p>
                        </div>
                      ) : (
                        <p
                          className={cn("text-gray-600", {
                            "text-gray-400": negative,
                          })}
                        >
                          {text}
                        </p>
                      )}
                    </li>
                  ),
                )}
              </ul>
              <div className="border-t border-gray-200" />
              <div className="p-5">
                {plan === "Free" ? (
                  <Link
                    href={user ? "/dashboard" : "/sign-in"}
                    className={buttonVariants({
                      className: "w-full",
                      variant: "secondary",
                    })}
                  >
                    {user ? "Upgrade now" : "Sign up"}
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                ) : user ? (
                  <Link
                    href="/upgrade"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Upgrade now
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                ) : (
                  <Link
                    href="/sign-in"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Sign up
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div> */}
    </Shell>
  );
}
