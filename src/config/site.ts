import { type SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "cartaonline.",
  description:
    "Carta online es una pagina donde podes publicar tu menu para que la gente lo vea antes de ir a comer!",
  url: "https://cartaonline.vercel.app",
  ogImage: "https://cartaonline.vercel.app/opengraph-image.png",
  links: {
    twitter: "https://twitter.com/facuperezm",
    github: "https://github.com/facuperezm",
  },
};

export const cities = [
  {
    name: "Puerto Iguazú",
    href: "/stores/puerto_iguazu",
    src: "https://images.unsplash.com/photo-1556918936-3e73b945d24f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3132&q=80",
  },
  {
    name: "Corrientes",
    href: "/stores/corrientes",

    src: "https://ciudaddecorrientes.gov.ar/sites/default/files/photo_5116340479980579523_y_0.jpg",
  },
  {
    name: "Posadas",
    href: "/stores/posadas",
    src: "https://canal12misiones.com/wp-content/uploads/2022/07/Turismo-en-Posadas.jpg",
  },
  {
    name: "Buenos Aires",
    src: "/images/buenosaires.jpeg",
    href: "/stores/buenos_aires",
    disabled: true,
  },
  {
    name: "Córdoba",
    src: "/images/cordoba.jpeg",
    href: "/stores/cordoba",
    disabled: true,
  },
  {
    name: "Ushuaia",
    src: "/images/ushuaia.jpeg",
    href: "/stores/ushuaia",
    disabled: true,
  },
];
