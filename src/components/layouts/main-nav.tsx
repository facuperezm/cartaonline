import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

import { siteConfig } from "@/config/site";

export function MainNav() {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link href="/" className="group flex items-center space-x-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-110 group-hover:rotate-3">
          <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="inline-block text-xl font-bold tracking-tight">{siteConfig.name}</span>
        <span className="sr-only">Home</span>
      </Link>
    </div>
  );
}
