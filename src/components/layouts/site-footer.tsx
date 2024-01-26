import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Shell } from "@/components/shell";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell className="py-6">
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex justify-between gap-4 lg:flex-row lg:gap-10"
        >
          <article
            id="footer-branding"
            aria-labelledby="footer-branding-heading"
            className="flex items-center"
          >
            <Link href="/" className="flex w-fit items-center space-x-2">
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </article>
          <article>
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
              <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </Link>
          </article>
        </section>
      </Shell>
    </footer>
  );
}
