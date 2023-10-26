import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BookOpenCheck } from "lucide-react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden ">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/images/auth-background.webp"
          alt="a table with food on it"
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
        <Link
          href="/"
          className="absolute left-8 top-6 z-20 flex items-center text-lg font-bold tracking-tight"
        >
          <BookOpenCheck />
          <span>{siteConfig.name}</span>
        </Link>
        <div className="absolute bottom-6 left-8 z-20 line-clamp-1 text-base">
          Foto de{" "}
          <a
            href="https://unsplash.com/es/@lvnatikk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            className="hover:underline"
          >
            Lily Banse
          </a>
          {" en "}
          <a
            href="https://unsplash.com/es/fotos/plato-cocinado-en-tazon-gris--YHSwy6uqvk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            className="hover:underline"
          >
            Unsplash
          </a>
        </div>
        <main className="container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
          {children}
        </main>
      </AspectRatio>
    </div>
  );
}
