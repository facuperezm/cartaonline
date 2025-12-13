import {
  Facebook,
  Github,
  Instagram,
  Twitter,
  UtensilsCrossed,
} from 'lucide-react'
import Link from 'next/link'
import { Shell } from '@/components/shell'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function SiteFooter() {
  return (
    <footer className="relative w-full">
      {/* Gradient transition */}
      <div className="h-24 bg-gradient-to-b from-background via-background to-muted/50" />

      {/* Footer content */}
      <div className="bg-muted/50">
        <Shell className="gap-0 pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link className="group flex items-center space-x-2" href="/">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-3 group-hover:scale-110">
                  <UtensilsCrossed className="h-5 w-5" />
                </div>
                <span className="font-bold text-xl tracking-tight">
                  {siteConfig.name}
                </span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Transformando la experiencia gastronómica con menús digitales
                inteligentes. Hacemos que tu negocio brille.
              </p>
              <div className="flex space-x-2">
                {[
                  {
                    href: siteConfig.links.github,
                    icon: Github,
                    label: 'GitHub',
                  },
                  {
                    href: 'https://twitter.com',
                    icon: Twitter,
                    label: 'Twitter',
                  },
                  {
                    href: 'https://instagram.com',
                    icon: Instagram,
                    label: 'Instagram',
                  },
                  {
                    href: 'https://facebook.com',
                    icon: Facebook,
                    label: 'Facebook',
                  },
                ].map((social) => (
                  <Link
                    className={cn(
                      buttonVariants({
                        size: 'icon',
                        variant: 'ghost',
                      }),
                      'h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary',
                    )}
                    href={social.href}
                    key={social.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">
                Producto
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { href: '/pricing', label: 'Precios' },
                  { href: '#features', label: 'Características' },
                  { href: '#testimonials', label: 'Testimonios' },
                  { href: '#faq', label: 'FAQ' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-muted-foreground transition-colors hover:text-primary"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">
                Empresa
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { href: '/about', label: 'Sobre nosotros' },
                  { href: '/blog', label: 'Blog' },
                  { href: '/careers', label: 'Carreras' },
                  { href: '/contact', label: 'Contacto' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-muted-foreground transition-colors hover:text-primary"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { href: '/privacy', label: 'Privacidad' },
                  { href: '/terms', label: 'Términos' },
                  { href: '/cookies', label: 'Cookies' },
                  { href: '/licenses', label: 'Licencias' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-muted-foreground transition-colors hover:text-primary"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl bg-card p-6 shadow-sm md:flex-row">
            <p className="text-muted-foreground text-sm">
              &copy; 2025 {siteConfig.name}. Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-1 text-muted-foreground text-sm">
              Hecho con
              <span className="mx-1 inline-block animate-pulse text-destructive">
                ❤️
              </span>
              en Argentina
            </p>
          </div>
        </Shell>
      </div>
    </footer>
  )
}
