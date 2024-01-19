import { Balancer } from "react-wrap-balancer";

import { CategoryCard } from "@/components/card";
import { Shell } from "@/components/shell";

export default function Home() {
  return (
    <Shell className="gap-14">
      <section
        id="hero"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-2 pt-6 text-center md:pt-10 lg:py-8"
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
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <CategoryCard
          city="Puerto Iguazú"
          src="https://images.unsplash.com/photo-1556918936-3e73b945d24f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3132&q=80"
        />
        <CategoryCard
          city="Corrientes"
          src="https://ciudaddecorrientes.gov.ar/sites/default/files/photo_5116340479980579523_y_0.jpg"
        />
        <CategoryCard
          city="Posadas"
          src="https://canal12misiones.com/wp-content/uploads/2022/07/Turismo-en-Posadas.jpg"
        />

        <CategoryCard city="Buenos Aires" src="/images/buenosaires.jpeg" />
        <CategoryCard city="Córdoba" src="/images/cordoba.jpeg" />
        <CategoryCard city="Ushuaia" src="/images/ushuaia.jpeg" />
      </section>
    </Shell>
  );
}
