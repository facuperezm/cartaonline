import Link from "next/link";

import { BookOpenCheck } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export function SiteHeader({ user }: { user?: any }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex items-center h-16">
        <MobileNav />
        <nav className="flex items-center space-x-2">
          <BookOpenCheck />
          <Link href="/" className="font-bold">
            <span className="relative">
              <span
                className="absolute block -skew-y-3 bg-pink-400 -inset-1"
                aria-hidden="true"
              ></span>
              <span className="relative text-white">Carta Online</span>
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
