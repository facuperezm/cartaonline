import Link from "next/link";
import {
  BookOpenCheck,
  Facebook,
  Github,
  Instagram,
  Twitter,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Shell } from "@/components/shell";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-slate-50">
      <Shell className="gap-0 py-8 md:py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpenCheck className="h-6 w-6" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transformando la experiencia gastronómica con menús digitales
              inteligentes. Hacemos que tu negocio brille en la era digital.
            </p>
            <div className="flex space-x-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
                )}
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
                )}
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
                )}
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
                )}
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Producto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-foreground">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-foreground">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Empresa</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground">
                  Carreras
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/licenses" className="hover:text-foreground">
                  Licencias
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between space-y-4 border-t pt-8 text-sm text-muted-foreground md:flex-row md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Todos los
            derechos reservados.
          </p>
          <p>Hecho con ❤️ en Argentina</p>
        </div>
      </Shell>
    </footer>
  );
}
