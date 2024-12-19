import { type Metadata } from "next";
import {
  ArrowRight,
  Clock,
  CreditCard,
  Globe,
  Phone,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react";
import { Balancer } from "react-wrap-balancer";

import { cities } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";
import { CityCard } from "@/app/(lobby)/_components/city-card";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Carta Online - Tu Menú Digital",
  description:
    "La manera más fácil de publicar y gestionar tu carta online. Digitaliza tu menú y llega a más clientes.",
};

export default async function Home() {
  return (
    <Shell className="gap-10 md:gap-14">
      {/* Hero Section */}
      <section
        id="hero"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pt-8 text-center md:pt-12 lg:py-14"
      >
        <div className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium">
          ✨ Tu restaurante en la era digital
        </div>
        <h1
          className="animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          <Balancer>Moderniza tu carta con un click</Balancer>
        </h1>
        <p className="max-w-[46rem] text-lg text-muted-foreground md:text-xl">
          <Balancer>
            Transforma tu menú en una experiencia digital interactiva. Actualiza
            precios, platos y promociones en tiempo real.
          </Balancer>
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="gap-2">
            Comenzar ahora <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Ver demo
          </Button>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="mx-auto grid w-full max-w-5xl gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="row-span-2 rounded-3xl bg-gradient-to-br from-pink-100 to-pink-200 p-6 dark:from-pink-950 dark:to-pink-900">
          <Utensils className="h-12 w-12 text-pink-600 dark:text-pink-400" />
          <h3 className="mt-4 text-xl font-semibold">Menú Digital</h3>
          <p className="mt-2 text-muted-foreground">
            Carta digital interactiva con fotos y descripciones detalladas de
            tus platos
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200 p-6 dark:from-blue-950 dark:to-blue-900">
          <Globe className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h3 className="mt-4 text-xl font-semibold">Acceso Universal</h3>
          <p className="mt-2 text-muted-foreground">
            Disponible en cualquier dispositivo mediante código QR
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-green-100 to-green-200 p-6 dark:from-green-950 dark:to-green-900">
          <Clock className="h-12 w-12 text-green-600 dark:text-green-400" />
          <h3 className="mt-4 text-xl font-semibold">
            Actualización Instantánea
          </h3>
          <p className="mt-2 text-muted-foreground">
            Modifica precios y platos en tiempo real
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-purple-100 to-purple-200 p-6 dark:from-purple-950 dark:to-purple-900">
          <Sparkles className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          <h3 className="mt-4 text-xl font-semibold">Diseño Personalizado</h3>
          <p className="mt-2 text-muted-foreground">
            Adapta el diseño a tu marca
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-orange-100 to-orange-200 p-6 dark:from-orange-950 dark:to-orange-900">
          <CreditCard className="h-12 w-12 text-orange-600 dark:text-orange-400" />
          <h3 className="mt-4 text-xl font-semibold">Planes Flexibles</h3>
          <p className="mt-2 text-muted-foreground">
            Opciones de suscripción para cada necesidad
          </p>
        </div>
      </section>

      {/* Cities Section */}
      <section className="space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Disponible en tu ciudad</h2>
          <p className="mt-2 text-muted-foreground">
            Únete a los restaurantes que ya confían en nosotros
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <CityCard
              key={city.name}
              src={city.src}
              city={city.name}
              disabled={city.disabled}
              href={city.href}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-background to-muted p-8 text-center shadow-lg">
        <h2 className="text-3xl font-bold">
          ¿Listo para modernizar tu restaurante?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Únete a la revolución digital de los restaurantes. Comienza hoy mismo
          con nuestra prueba gratuita.
        </p>
        <Button size="lg" className="mt-6 gap-2">
          Comenzar prueba gratuita <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </Shell>
  );
}
