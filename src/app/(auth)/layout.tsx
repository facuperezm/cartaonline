import { BookOpenCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { siteConfig } from '@/config/site'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <AspectRatio ratio={18 / 6}>
        <Image
          alt="una mesa con comida y una computadora portátil abierta"
          className="absolute inset-0 object-cover"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          src="/images/auth-background.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
        <Link
          className="absolute top-6 left-8 z-20 flex items-center font-bold text-lg tracking-tight"
          href="/"
        >
          <BookOpenCheck className="mr-2" />
          <span>{siteConfig.name}</span>
        </Link>
        <div className="absolute bottom-6 left-8 z-20 line-clamp-1 text-base">
          Foto de{' '}
          <a
            className="hover:underline"
            href="https://unsplash.com/es/@lvnatikk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >
            Lily Banse
          </a>
          {' en '}
          <a
            className="hover:underline"
            href="https://unsplash.com/es/fotos/plato-cocinado-en-tazon-gris--YHSwy6uqvk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >
            Unsplash
          </a>
        </div>
        <main className="-translate-y-1/2 absolute top-1/2 w-full">
          {children}
        </main>
      </AspectRatio>
    </div>
  )
}
