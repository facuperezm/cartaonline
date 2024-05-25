import { type SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Carta Online",
  description:
    "Carta Online es una pagina donde podes publicar tu menu para que la gente lo vea antes de ir a comer. Crea tu propia carta online y compartila con tus clientes.",
  url: "https://cartaonline.facupm.dev",
  ogImage: "https://cartaonline.facupm.dev/opengraph-image.png",
  links: {
    twitter: "https://twitter.com/facuperezm",
    github: "https://github.com/facuperezm",
  },
};

export const cities = [
  {
    name: "Puerto Iguazú",
    href: "/stores/puerto_iguazu",
    src: "/images/puertoiguazu.webp",
  },
  {
    name: "Corrientes",
    href: "/stores/corrientes",
    src: "/images/corrientes.webp",
  },
  {
    name: "Posadas",
    href: "/stores/posadas",
    src: "/images/posadas.webp",
  },
  {
    name: "Buenos Aires",
    src: "/images/buenosaires.webp",
    href: "/stores/buenos_aires",
    disabled: true,
  },
  {
    name: "Córdoba",
    src: "/images/cordoba.webp",
    href: "/stores/cordoba",
    disabled: true,
  },
  {
    name: "Ushuaia",
    src: "/images/ushuaia.webp",
    href: "/stores/ushuaia",
    disabled: true,
  },
];
