import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChefHat,
  Clock,
  Globe,
  MessageCircle,
  Minus,
  Plus,
  QrCode,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Utensils,
  X,
  Zap,
} from "lucide-react";

import { CITIES } from "@/lib/constants/cities";
import { cn } from "@/lib/utils";
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

export default function Home() {
  const cities = [...CITIES].sort(
    (a, b) => Number(b.active) - Number(a.active),
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
          <div className="absolute -left-20 top-1/2 h-96 w-96 rounded-full bg-gradient-to-tr from-secondary/15 to-accent/15 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-gradient-to-bl from-accent/10 to-primary/10 blur-3xl" />
        </div>

        <Shell className="relative z-10 flex min-h-[90vh] flex-col justify-center py-12 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Text Content */}
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <div
                className="animate-fade-up opacity-0"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm font-medium text-secondary-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  La forma más fácil de digitalizar tu menú
                </span>
              </div>

              {/* Headline */}
              <h1
                className="animate-fade-up text-4xl font-bold leading-tight tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ animationDelay: "0.2s" }}
              >
                Tu carta digital{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">en minutos</span>
                  <span className="absolute -inset-x-2 bottom-2 -z-0 h-4 rounded bg-secondary/50 md:h-5" />
                </span>
                <br />
                <span className="text-primary">sin complicaciones</span>
              </h1>

              {/* Description */}
              <p
                className="animate-fade-up max-w-lg text-lg text-muted-foreground opacity-0 md:text-xl"
                style={{ animationDelay: "0.3s" }}
              >
                Crea un menú digital profesional, actualizable en tiempo real y
                accesible mediante código QR. Ideal para restaurantes que
                quieren modernizarse.
              </p>

              {/* CTA Buttons */}
              <div
                className="animate-fade-up flex flex-col gap-3 opacity-0 sm:flex-row sm:gap-4"
                style={{ animationDelay: "0.4s" }}
              >
                <Button
                  size="lg"
                  className="group gap-2 rounded-full px-8 text-lg shadow-warm transition-all hover:scale-105 hover:shadow-warm-lg"
                  asChild
                >
                  <Link href="/sign-in">
                    Crear mi carta gratis
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 text-lg transition-all hover:scale-105"
                  asChild
                >
                  <Link href="/stores/cordoba">Ver ejemplo</Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div
                className="animate-fade-up mt-4 flex flex-wrap items-center gap-6 opacity-0"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">1000+ Restaurantes</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                  <span className="text-sm font-medium">4.9/5 Valoración</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Soporte 24/7</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div
              className="animate-fade-up relative opacity-0 lg:pl-8"
              style={{ animationDelay: "0.3s" }}
            >
              {/* Floating decorative elements */}
              <div className="absolute -left-4 top-8 animate-float rounded-2xl bg-card p-3 shadow-playful">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <div
                className="absolute -right-2 bottom-16 animate-float rounded-2xl bg-card p-3 shadow-playful"
                style={{ animationDelay: "1s" }}
              >
                <Smartphone className="h-8 w-8 text-accent" />
              </div>
              <div
                className="absolute -right-4 top-1/4 animate-float rounded-2xl bg-secondary/20 p-3"
                style={{ animationDelay: "0.5s" }}
              >
                <ChefHat className="h-8 w-8 text-secondary-foreground" />
              </div>

              {/* Main image */}
              <div className="relative overflow-hidden rounded-3xl border-4 border-card bg-card shadow-2xl">
                <div className="aspect-[4/3] w-full">
                  <Image
                    src="/images/demo-web.webp"
                    alt="Demo de carta digital"
                    className="h-full w-full object-cover"
                    width={800}
                    height={600}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* Problem/Solution Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
        <Shell className="relative z-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold md:text-4xl">
                ¿Por qué necesitas una carta digital?
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              {/* Problem */}
              <div className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-playful transition-transform hover:-rotate-1">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-destructive/10 blur-2xl" />
                <div className="relative">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive">
                    <X className="h-4 w-4" />
                    El problema
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">
                    Los menús tradicionales ya no funcionan
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Costos de impresión recurrentes",
                      "Imposible actualizar precios rápidamente",
                      "Sin fotos ni descripciones detalladas",
                      "Se deterioran constantemente",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                          <X className="h-3 w-3 text-destructive" />
                        </span>
                        <span className="line-through decoration-destructive/50">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Solution */}
              <div className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-playful transition-transform hover:rotate-1">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                    <Check className="h-4 w-4" />
                    La solución
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">
                    Carta Online: simple, moderno, eficiente
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Actualización instantánea de precios",
                      "Fotos profesionales que venden",
                      "Acceso mediante código QR",
                      "Análisis de platos populares",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20">
                          <Check className="h-3 w-3 text-accent" />
                        </span>
                        <span className="font-medium text-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20 md:py-28">
        <Shell>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Características
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              Todo lo que necesitas para brillar
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Herramientas pensadas para restaurantes de todo tipo
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Large featured card */}
            <div className="group relative row-span-2 overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground shadow-warm-lg transition-all hover:scale-[1.02]">
              <div className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-2xl bg-white/20 p-4">
                  <Utensils className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-2xl font-bold">Menú Digital Premium</h3>
                <p className="text-primary-foreground/90">
                  Carta digital interactiva con fotos de alta calidad,
                  descripciones detalladas, categorías organizadas e
                  información de alérgenos. Todo actualizable en segundos.
                </p>
              </div>
            </div>

            {/* Feature cards */}
            {[
              {
                icon: QrCode,
                title: "Código QR Único",
                description:
                  "Genera QR personalizados para cada mesa o ubicación",
                color: "bg-secondary",
                textColor: "text-secondary-foreground",
              },
              {
                icon: Clock,
                title: "Actualización Instantánea",
                description: "Cambia precios y disponibilidad en tiempo real",
                color: "bg-accent",
                textColor: "text-accent-foreground",
              },
              {
                icon: Globe,
                title: "Acceso Universal",
                description: "Funciona en cualquier dispositivo sin apps",
                color: "bg-coral",
                textColor: "text-white",
              },
              {
                icon: TrendingUp,
                title: "Analíticas Detalladas",
                description: "Descubre qué platos son los más vistos",
                color: "bg-violet-500",
                textColor: "text-white",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl bg-card p-6 shadow-playful transition-all hover:scale-[1.02] hover:shadow-warm"
              >
                <div
                  className={cn(
                    "mb-4 inline-flex rounded-2xl p-3",
                    feature.color,
                  )}
                >
                  <feature.icon className={cn("h-6 w-6", feature.textColor)} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* Cities Section */}
      <section className="overflow-hidden bg-muted/30 py-20 md:py-28">
        <Shell>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              Cobertura
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              Disponible en tu ciudad
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Únete a los restaurantes que ya confían en nosotros
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <CityCard
                key={city.name}
                src={city.imgUrl}
                city={city.name}
                disabled={!city.active}
                href={`/stores/${city.name}`}
              />
            ))}
          </div>
        </Shell>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28">
        <Shell>
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-coral p-8 text-primary-foreground shadow-warm-lg md:p-12">
              <div className="grid gap-8 text-center md:grid-cols-3 md:gap-4">
                {[
                  { value: "1M+", label: "Menús servidos" },
                  { value: "30%", label: "Aumento en ventas" },
                  { value: "15min", label: "Tiempo de setup" },
                ].map((stat, i) => (
                  <div key={i} className="relative">
                    <div className="text-5xl font-bold md:text-6xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-primary-foreground/80">
                      {stat.label}
                    </div>
                    {i < 2 && (
                      <div className="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-primary-foreground/20 md:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-20 md:py-28">
        <Shell>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              ¿Por qué elegirnos?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Beneficios que marcan la diferencia
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                icon: Rocket,
                title: "Rápido y Eficiente",
                description:
                  "Implementación en menos de 24 horas. Comienza de inmediato.",
                color: "border-primary",
                iconBg: "bg-primary/10",
                iconColor: "text-primary",
              },
              {
                icon: MessageCircle,
                title: "Soporte Dedicado",
                description:
                  "Equipo local disponible 24/7 para ayudarte en todo momento.",
                color: "border-secondary",
                iconBg: "bg-secondary/20",
                iconColor: "text-secondary-foreground",
              },
              {
                icon: ShieldCheck,
                title: "Seguro y Confiable",
                description:
                  "Plataforma segura con respaldos automáticos y alta disponibilidad.",
                color: "border-accent",
                iconBg: "bg-accent/10",
                iconColor: "text-accent",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border-2 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-playful",
                  item.color,
                )}
              >
                <div
                  className={cn(
                    "mb-4 inline-flex rounded-2xl p-3",
                    item.iconBg,
                  )}
                >
                  <item.icon className={cn("h-6 w-6", item.iconColor)} />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <Shell>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-2 text-sm font-medium text-secondary-foreground">
              Testimonios
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "Increíble herramienta que ha revolucionado cómo presentamos nuestro menú. Los clientes adoran la experiencia.",
                author: "María García",
                role: "Restaurante El Rincón",
                avatar: "M",
                color: "bg-primary",
              },
              {
                quote:
                  "La facilidad de actualización y el soporte al cliente son excepcionales. Mejoró nuestra eficiencia.",
                author: "Carlos Rodríguez",
                role: "Café Central",
                avatar: "C",
                color: "bg-secondary",
              },
              {
                quote:
                  "Una inversión que vale la pena. Reducimos costos y mejoramos la experiencia del cliente.",
                author: "Ana Martínez",
                role: "La Terraza Restaurant",
                avatar: "A",
                color: "bg-accent",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="group relative rounded-3xl bg-card p-6 shadow-playful transition-all hover:-translate-y-1"
              >
                {/* Quote mark */}
                <div className="absolute -top-3 left-6 text-6xl font-bold text-primary/20">
                  "
                </div>

                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-5 w-5 fill-secondary text-secondary"
                    />
                  ))}
                </div>

                <p className="mb-6 text-muted-foreground">
                  &quot;{testimonial.quote}&quot;
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white",
                      testimonial.color,
                    )}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* Pricing */}
      <section className="bg-muted/30 py-20 md:py-28">
        <Shell>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Precios
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              Planes simples y transparentes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Elige el plan que mejor se adapte a tu negocio
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Basic */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-warm">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Básico</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold">$19</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Perfecto para pequeños restaurantes
                </p>
              </div>

              <ul className="mb-8 space-y-3">
                {[
                  "Menú digital ilimitado",
                  "Código QR personalizado",
                  "Actualizaciones en tiempo real",
                  "Soporte por email",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full rounded-full"
                size="lg"
                asChild
              >
                <Link href="/sign-in">Comenzar gratis</Link>
              </Button>
            </div>

            {/* Pro */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-primary bg-card p-8 shadow-warm-lg">
              {/* Popular badge */}
              <div className="absolute -right-12 top-8 rotate-45 bg-primary px-12 py-1 text-sm font-medium text-primary-foreground">
                Popular
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold">Pro</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-primary">$49</span>
                  <span className="text-muted-foreground">/mes</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Para restaurantes que buscan crecer
                </p>
              </div>

              <ul className="mb-8 space-y-3">
                {[
                  "Todo lo del plan Básico",
                  "Múltiples idiomas",
                  "Análisis de visitas",
                  "Soporte prioritario 24/7",
                  "Personalización avanzada",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </span>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full rounded-full shadow-warm"
                size="lg"
                asChild
              >
                <Link href="/sign-in">Comenzar prueba gratuita</Link>
              </Button>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted-foreground">
            Todos los planes incluyen actualizaciones gratuitas. ¿Necesitas
            algo específico?{" "}
            <Link href="#" className="font-medium text-primary hover:underline">
              Contáctanos
            </Link>
          </p>
        </Shell>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28">
        <Shell>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              FAQ
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {[
              {
                q: "¿Cuánto tiempo toma implementar Carta Online?",
                a: "La implementación básica toma menos de 24 horas. Nuestro equipo te ayuda en todo el proceso, desde la configuración inicial hasta la personalización completa de tu menú.",
              },
              {
                q: "¿Necesito conocimientos técnicos?",
                a: "No, nuestra plataforma está diseñada para ser fácil de usar. Además, ofrecemos capacitación gratuita y soporte continuo para asegurar tu éxito.",
              },
              {
                q: "¿Puedo personalizar el diseño?",
                a: "Sí, puedes personalizar colores, logos, fuentes y más para que coincida con tu marca. También ofrecemos plantillas prediseñadas profesionales.",
              },
              {
                q: "¿Qué pasa si cancelo mi suscripción?",
                a: "Puedes cancelar en cualquier momento. Tus datos se mantienen por 30 días por si decides volver. Sin compromisos ni penalizaciones.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border bg-card shadow-sm transition-all hover:shadow-warm [&[open]]:shadow-warm"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold">
                  {faq.q}
                  <span className="ml-4 shrink-0">
                    <Plus className="h-5 w-5 text-primary group-open:hidden" />
                    <Minus className="hidden h-5 w-5 text-primary group-open:block" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">{faq.a}</div>
              </details>
            ))}
          </div>
        </Shell>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <Shell>
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-coral p-8 text-center text-primary-foreground shadow-warm-lg md:p-16">
              {/* Decorative elements */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
              </div>

              <div className="relative">
                <h2 className="text-3xl font-bold md:text-5xl">
                  ¿Listo para modernizar tu restaurante?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/90">
                  Únete a la revolución digital. Comienza hoy con nuestra
                  prueba gratuita de 14 días, sin compromiso.
                </p>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="group gap-2 rounded-full px-8 text-lg shadow-lg transition-all hover:scale-105"
                    asChild
                  >
                    <Link href="/sign-in">
                      Comenzar prueba gratuita
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-primary-foreground/80">
                    <span className="flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      Sin tarjeta de crédito
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      Setup en 24 horas
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      Soporte incluido
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Shell>
      </section>
    </div>
  );
}
