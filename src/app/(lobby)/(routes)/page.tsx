import { type Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Clock,
  CreditCard,
  Globe,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Utensils,
  X,
  Zap,
} from "lucide-react";

import { cities } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shell";
import { CityCard } from "@/app/(lobby)/_components/city-card";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Carta Online - Tu Menú Digital",
    description:
      "La manera más fácil de publicar y gestionar tu carta online. Digitaliza tu menú y llega a más clientes.",
  };
}

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section - Direct Benefit */}
      <section className="flex w-full justify-center py-24">
        <Shell className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <small className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium">
              ✨ La manera más fácil de digitalizar tu menú
            </small>
            <h1
              className="animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
              style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
            >
              Tu carta digital en minutos, sin complicaciones
            </h1>
            <p className="mx-auto max-w-[46rem] text-balance text-center text-lg text-muted-foreground md:text-xl">
              Crea un menú digital profesional, actualizable en tiempo real y
              accesible mediante código QR. Ideal para restaurantes que quieren
              modernizarse.
            </p>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="gap-2">
              Crear mi carta digital <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Ver ejemplo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-muted-foreground sm:gap-8">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>1000+ Restaurantes activos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span>4.9/5 Valoración</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <span>Soporte 24/7</span>
            </div>
          </div>

          {/* Product Preview */}
          <div className="relative mt-8 w-full max-w-5xl overflow-hidden rounded-xl border bg-background shadow-2xl">
            <div className="aspect-[16/9] w-full">
              <Image
                src="/images/demo-menu.webp"
                alt="Demo de carta digital"
                className="h-full w-full object-cover"
                width={1000}
                height={2000}
              />
            </div>
          </div>

          {/* Logos Section */}
          {/* <div className="mt-16 w-full">
            <p className="text-center text-sm text-muted-foreground">
              Restaurantes que confían en nosotros
            </p>
            <div className="mt-8 grid grid-cols-2 gap-8 opacity-70 md:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-12 items-center justify-center grayscale transition hover:grayscale-0"
                >
                  <img
                    src={`/images/logos/logo-${i + 1}.svg`}
                    alt={`Logo cliente ${i + 1}`}
                    className="max-h-8 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>*/}
        </Shell>
      </section>

      {/* Problem/Solution Section */}
      <section className="flex w-full justify-center bg-muted/50 py-24">
        <Shell>
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-lg bg-destructive/10 px-3 py-1 text-sm text-destructive">
                  <X className="mr-2 h-4 w-4" />
                  El problema
                </div>
                <h2 className="text-3xl font-bold">
                  Los menús tradicionales son costosos e ineficientes
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <X className="h-5 w-5 shrink-0 text-destructive" />
                    Costos de impresión recurrentes
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-5 w-5 shrink-0 text-destructive" />
                    Imposible actualizar precios rápidamente
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-5 w-5 shrink-0 text-destructive" />
                    Sin fotos ni descripciones detalladas
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-5 w-5 shrink-0 text-destructive" />
                    Deterioro físico constante
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Check className="mr-2 h-4 w-4" />
                  La solución
                </div>
                <h2 className="text-3xl font-bold">
                  Carta Online: Tu menú digital inteligente
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    Actualización instantánea de precios y platos
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    Fotos profesionales y descripciones detalladas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    Acceso mediante código QR personalizado
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    Análisis de platos más populares
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* Bento Grid Features */}
      <section className="flex w-full justify-center py-20">
        <Shell>
          <div className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="group row-span-2 rounded-3xl bg-gradient-to-br from-pink-100 to-pink-200 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:from-pink-950 dark:to-pink-900">
              <Utensils className="h-12 w-12 text-pink-600 transition-transform duration-300 group-hover:-rotate-12 dark:text-pink-400" />
              <h3 className="mt-4 text-xl font-semibold">Menú Digital</h3>
              <p className="mt-2 text-muted-foreground">
                Carta digital interactiva con fotos y descripciones detalladas
                de tus platos. Incluye categorías, alérgenos y opciones
                personalizables.
              </p>
            </div>
            <div className="group rounded-3xl bg-gradient-to-br from-blue-100 to-blue-200 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:from-blue-950 dark:to-blue-900">
              <Globe className="h-12 w-12 text-blue-600 transition-transform duration-300 group-hover:rotate-12 dark:text-blue-400" />
              <h3 className="mt-4 text-xl font-semibold">Acceso Universal</h3>
              <p className="mt-2 text-muted-foreground">
                Disponible en cualquier dispositivo mediante código QR.
                Multilenguaje y adaptable a cualquier pantalla.
              </p>
            </div>
            <div className="group rounded-3xl bg-gradient-to-br from-green-100 to-green-200 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:from-green-950 dark:to-green-900">
              <Clock className="h-12 w-12 text-green-600 transition-transform duration-300 group-hover:rotate-12 dark:text-green-400" />
              <h3 className="mt-4 text-xl font-semibold">
                Actualización Instantánea
              </h3>
              <p className="mt-2 text-muted-foreground">
                Modifica precios y platos en tiempo real. Sin esperas ni
                retrasos en los cambios.
              </p>
            </div>
            <div className="group rounded-3xl bg-gradient-to-br from-purple-100 to-purple-200 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:from-purple-950 dark:to-purple-900">
              <Sparkles className="h-12 w-12 text-purple-600 transition-transform duration-300 group-hover:-rotate-12 dark:text-purple-400" />
              <h3 className="mt-4 text-xl font-semibold">
                Diseño Personalizado
              </h3>
              <p className="mt-2 text-muted-foreground">
                Adapta el diseño a tu marca con temas personalizados, logos y
                colores corporativos.
              </p>
            </div>
            <div className="group rounded-3xl bg-gradient-to-br from-orange-100 to-orange-200 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:from-orange-950 dark:to-orange-900">
              <CreditCard className="h-12 w-12 text-orange-600 transition-transform duration-300 group-hover:rotate-12 dark:text-orange-400" />
              <h3 className="mt-4 text-xl font-semibold">Planes Flexibles</h3>
              <p className="mt-2 text-muted-foreground">
                Opciones de suscripción para cada necesidad, desde pequeños
                locales hasta grandes cadenas.
              </p>
            </div>
          </div>
        </Shell>
      </section>

      {/* Stats Section */}
      <section className="flex w-full justify-center bg-gradient-to-b from-muted/50 to-background py-20">
        <Shell>
          <div className="mx-auto w-full max-w-6xl">
            <div className="rounded-3xl bg-card px-6 py-12 shadow-sm md:px-12 md:py-24">
              <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-4xl font-bold md:text-5xl">1M+</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Menús servidos
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold md:text-5xl">30%</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Aumento en ventas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold md:text-5xl">15min</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Tiempo de configuración
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* Why Choose Us Section */}
      <section className="flex w-full justify-center bg-muted/30 py-20">
        <Shell>
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">¿Por qué elegirnos?</h2>
              <p className="mt-2 text-muted-foreground">
                Beneficios que marcan la diferencia
              </p>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Rápido y Eficiente</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Implementación en menos de 24 horas. Comienza a usar tu menú
                  digital de inmediato.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Soporte Dedicado</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Equipo de soporte local disponible 24/7 para ayudarte en todo
                  momento.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">Seguro y Confiable</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Plataforma segura con respaldos automáticos y alta
                  disponibilidad.
                </p>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* Testimonials */}
      <section className="flex w-full justify-center py-20">
        <Shell>
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">
                Lo que dicen nuestros clientes
              </h2>
              <p className="mt-2 text-muted-foreground">
                Historias de éxito de restaurantes que confían en nosotros
              </p>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex gap-1 text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  &quot;Increíble herramienta que ha revolucionado la forma en
                  que presentamos nuestro menú. Los clientes adoran la
                  experiencia digital.&quot;
                </p>
                <div className="mt-4">
                  <p className="font-semibold">María García</p>
                  <p className="text-sm text-muted-foreground">
                    Restaurante El Rincón
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="flex gap-1 text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  &quot;La facilidad de actualización y el soporte al cliente
                  son excepcionales. Ha mejorado significativamente nuestra
                  eficiencia.&quot;
                </p>
                <div className="mt-4">
                  <p className="font-semibold">Carlos Rodríguez</p>
                  <p className="text-sm text-muted-foreground">Café Central</p>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="flex gap-1 text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  &quot;Una inversión que vale la pena. Hemos reducido costos y
                  mejorado la experiencia de nuestros clientes.&quot;
                </p>
                <div className="mt-4">
                  <p className="font-semibold">Ana Martínez</p>
                  <p className="text-sm text-muted-foreground">
                    La Terraza Restaurant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* Cities Section */}
      <section className="flex w-full justify-center bg-gradient-to-b from-muted/30 to-background py-20">
        <div className="w-full px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Disponible en tu ciudad</h2>
              <p className="mt-2 text-muted-foreground">
                Únete a los restaurantes que ya confían en nosotros
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <CityCard
                  key={city.name}
                  src={city.src}
                  city={city.name}
                  disabled={city.disabled ?? false}
                  href={city.href}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="flex w-full justify-center bg-muted/30 py-20">
        <Shell>
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">
                Planes simples y transparentes
              </h2>
              <p className="mt-2 text-muted-foreground">
                Elige el plan que mejor se adapte a tu negocio
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Basic Plan */}
              <div className="relative flex rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex h-full flex-col">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Básico</h3>
                    <div className="text-3xl font-bold">
                      $19
                      <span className="text-base font-normal text-muted-foreground">
                        /mes
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Perfecto para pequeños restaurantes que están comenzando
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        Menú digital ilimitado
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        Código QR personalizado
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        Actualizaciones en tiempo real
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        Soporte por email
                      </li>
                    </ul>
                    <Button className="mt-6 w-full" variant="outline">
                      Comenzar gratis
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="relative rounded-2xl border bg-card p-6 shadow-sm">
                <div className="absolute inset-x-0 -top-4 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <div className="text-3xl font-bold">
                    $49
                    <span className="text-base font-normal text-muted-foreground">
                      /mes
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Para restaurantes que buscan más funcionalidades
                  </p>
                </div>
                <div className="mt-6 space-y-4">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Todo lo del plan Básico
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Múltiples idiomas
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Análisis de visitas
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Soporte prioritario 24/7
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      Personalización avanzada
                    </li>
                  </ul>
                  <Button className="w-full">Comenzar prueba gratuita</Button>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
              <p>
                Todos los planes incluyen actualizaciones gratuitas y acceso a
                nuevas funcionalidades. ¿Necesitas algo específico?{" "}
                <span className="font-medium text-primary">Contáctanos</span>
              </p>
            </div>
          </div>
        </Shell>
      </section>

      {/* FAQ Section */}
      <section className="flex w-full justify-center py-20">
        <Shell>
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Preguntas frecuentes</h2>
              <p className="mt-2 text-muted-foreground">
                Todo lo que necesitas saber sobre Carta Online
              </p>
            </div>
            <div className="mt-8 grid gap-4">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">
                  ¿Cuánto tiempo toma implementar Carta Online?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  La implementación básica toma menos de 24 horas. Nuestro
                  equipo te ayuda en todo el proceso, desde la configuración
                  inicial hasta la personalización completa de tu menú.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">
                  ¿Necesito conocimientos técnicos?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No, nuestra plataforma está diseñada para ser fácil de usar.
                  Además, ofrecemos capacitación gratuita y soporte continuo
                  para asegurar tu éxito.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">
                  ¿Puedo personalizar el diseño?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Sí, puedes personalizar colores, logos, fuentes y más para que
                  coincida con tu marca. También ofrecemos plantillas
                  prediseñadas profesionales.
                </p>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* CTA Section */}
      <section className="flex w-full justify-center bg-muted/30 py-20">
        <Shell>
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl bg-gradient-to-br from-black to-muted-foreground p-8 text-center shadow-lg md:p-12">
              <h2 className="text-3xl font-bold text-muted md:text-4xl">
                ¿Listo para modernizar tu restaurante?
              </h2>
              <p className="mt-4 text-muted">
                Únete a la revolución digital de los restaurantes. Comienza hoy
                mismo con nuestra prueba gratuita de 14 días, sin compromiso.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 text-muted">
                <Button size="lg" className="gap-2">
                  Comenzar prueba gratuita <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-sm text-muted">
                  No se requiere tarjeta de crédito • Configuración en 24 horas
                  • Soporte incluido
                </p>
              </div>
            </div>
          </div>
        </Shell>
      </section>
    </div>
  );
}
