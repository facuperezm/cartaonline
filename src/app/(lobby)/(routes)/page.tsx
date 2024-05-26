import { type Metadata } from "next";
import { Balancer } from "react-wrap-balancer";

import { cities } from "@/config/site";
import { Shell } from "@/components/shell";
import { CityCard } from "@/app/(lobby)/_components/city-card";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Bienvenidos",
  description: "La manera mas facil de publicar tu carta online.",
};

export default async function Home() {
  return (
    <Shell className="gap-10 md:gap-14">
      <section
        id="hero"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-2 pt-3 text-center md:pt-10 lg:py-8"
      >
        <h1
          className="animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent opacity-0 drop-shadow-sm md:text-6xl/[5rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          <Balancer>Bienvenidos a Carta Online </Balancer>
        </h1>
        <p className="max-w-[46rem] font-normal text-foreground md:text-xl">
          <Balancer>La manera mas facil de publicar tu carta online.</Balancer>
        </p>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cities.map((city) => (
          <CityCard
            key={city.name}
            src={city.src}
            city={city.name}
            disabled={city.disabled}
            href={city.href}
          />
        ))}
      </section>
    </Shell>
  );
}
