import Link from "next/link"
import { BookOpenCheck } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shell"

import { ModeToggle } from "./theme-toggle"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell>
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20"
        >
          <section
            id="footer-branding"
            aria-labelledby="footer-branding-heading"
          >
            <Link href="/" className="flex w-fit items-center space-x-2">
              <BookOpenCheck className="h-6 w-6" aria-hidden="true" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </section>
          <section
            id="footer-links"
            aria-labelledby="footer-links-heading"
            className="xxs:grid-cols-2 grid flex-1 grid-cols-1 gap-10 sm:grid-cols-4"
          ></section>
          <section
            id="newsletter"
            aria-labelledby="newsletter-heading"
            className="space-y-3"
          >
            <h4 className="text-base font-medium">Come rico siempre.</h4>
          </section>
        </section>
        <section
          id="footer-bottom"
          aria-labelledby="footer-bottom-heading"
          className="flex items-center space-x-4"
        >
          <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
            Hecho por{" "}
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-foreground"
            >
              Facundo
              <span className="sr-only">X</span>
            </Link>
            .
          </div>
          <div className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })
              )}
            >
              <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </Link>
            <ModeToggle />
          </div>
        </section>
      </Shell>
    </footer>
  )
}
