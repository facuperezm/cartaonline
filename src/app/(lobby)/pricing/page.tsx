import { PLANS } from "@/config/mercadopago";
import { cn } from "@/lib/utils";
import { Shell } from "@/components/shell";

export default function PricingPage() {
  const pricingItems = [
    {
      plan: "Free",
      tagline: "Para empezar a vender",
      quota: 10,
      features: {
        text: "Hasta 20 productos",
        footnote: "Todas las funcionalidades de la plataforma",
      },
    },
    {
      plan: "Pro",
      tagline: "Para negocios grandes",
      quota: PLANS.find((p) => p.slug === "pro")!.quota,
    },
  ];

  return (
    <Shell>
      <div className="">
        <h2 className="text-2xl font-bold leading-tight tracking-tighter">
          Actualizar tienda
        </h2>
        <p>Elegí que plan se adapta mejor a las necesidades de tu negocio</p>
      </div>

      <div className="grid grid-cols-1 gap-10 pt-12 lg:grid-cols-2">
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
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-center text-sm font-medium text-white">
                  Upgrade now
                </div>
              )}
              <div className="p-5">
                <h3 className=" my-3 text-center text-3xl font-bold">{plan}</h3>
                <p className="text-gray-500">{tagline}</p>
                <p className="my-5 text-6xl font-semibold">${price}</p>
                <p className="text-gray-500">per month</p>
              </div>
              <div className="flex h-20 items-center justify-center border-y border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-1">
                  <p>{quota.toLocaleString()} PDFs/mo included</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}
