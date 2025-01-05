import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

import { siteConfig } from "@/config/site";

export function MainNav() {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link href="/" className="flex items-center space-x-2">
        <BookOpenCheck className="h-6 w-6" aria-hidden="true" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
        <span className="sr-only">Home</span>
      </Link>
    </div>
  );
}
