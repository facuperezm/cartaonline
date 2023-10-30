import { useProfileStore } from "@/stores/profile"
import type { SiteConfig } from "@/types"

import { Icons } from "@/components/icons"

export const siteConfig: SiteConfig = {
  name: "Carta Online",
  description:
    "Carta online es una pagina donde podes publicar tu menu para que la gente lo vea antes de ir a comer!",
  url: "https://cartaonline.vercel.app",
  ogImage: "https://cartaonline.vercel.app/opengraph-image.png",
  links: {
    twitter: "https://twitter.com/facuperezm",
    github: "https://github.com/facuperezm",
  },
}