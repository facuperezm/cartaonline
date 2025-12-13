'use client'

import { ArrowLeft, UtensilsCrossed } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'

import { Icons } from '../icons'
import { Separator } from '../ui/separator'

export function MobileNav({ isSignedIn }: { isSignedIn: boolean }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button
          className="mr-2 gap-2 p-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          variant="ghost"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <UtensilsCrossed aria-hidden="true" className="h-4 w-4" />
          </div>
          <span className="inline-block font-bold text-lg tracking-tight">
            {siteConfig.name}
          </span>
          <span className="sr-only">Home</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="pr-0 pl-1" side="left">
        <div className="px-7">
          <Link
            className="flex items-center"
            href="/"
            onClick={() => setIsOpen(false)}
          >
            <span className="flex items-center gap-2 font-bold">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Volver al inicio
            </span>
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="mb-2 pr-7 pl-1 text-sm leading-none">
            <h4 className="text-center">Ver tiendas en:</h4>
          </div>
          <div className="pr-7 pl-1">
            <Button className="w-full space-x-1" variant="link">
              <Link href="/stores/puerto_iguazu">Puerto Iguazú</Link>
            </Button>
            <Button className="w-full space-x-1" variant="link">
              <Link href="/stores/posadas">Posadas</Link>
            </Button>
            <Button className="w-full space-x-1" variant="link">
              <Link href="/stores/corrientes">Corrientes</Link>
            </Button>
            <Separator className="my-2" />
            {isSignedIn ? (
              <>
                <Button className="w-full space-x-2" variant="ghost">
                  <Icons.avatar className="size-4" />
                  <Link href="/dashboard/account">Mi cuenta</Link>
                </Button>
                <Button className="w-full space-x-2" variant="ghost">
                  <Icons.store className="size-4" />
                  <Link href="/dashboard/stores">Mis tiendas</Link>
                </Button>
              </>
            ) : (
              <Button className="w-full" variant="ghost">
                <Link href="/auth/sign-in">Iniciar sesión</Link>
              </Button>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
