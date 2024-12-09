"use client";

import * as React from "react";
import Link from "next/link";
import { Protect } from "@clerk/nextjs";
import { ArrowLeft, BookOpenCheck } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Icons } from "../icons";
import { Separator } from "../ui/separator";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 gap-2 p-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <BookOpenCheck className="h-6 w-6" aria-hidden="true" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
          <span className="sr-only">Home</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <span className="flex items-center gap-2 font-bold">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Volver al inicio
            </span>
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="mb-2 pl-1 pr-7 text-sm leading-none">
            <h4 className="text-center ">Ver tiendas en:</h4>
          </div>
          <div className="pl-1 pr-7">
            <Button variant="link" className="w-full space-x-1">
              <Link href="/stores/puerto_iguazu">Puerto Iguazú</Link>
            </Button>
            <Button variant="link" className="w-full space-x-1">
              <Link href="/stores/posadas">Posadas</Link>
            </Button>
            <Button variant="link" className="w-full space-x-1">
              <Link href="/stores/corrientes">Corrientes</Link>
            </Button>
            <Separator className="my-2" />
            <Protect
              fallback={
                <Button variant="ghost" className="w-full">
                  <Link href="/auth/sign-in">Iniciar sesión</Link>
                </Button>
              }
            >
              <Button variant="ghost" className="w-full space-x-2">
                <Icons.avatar className="size-4" />
                <Link href="/dashboard/account">Mi cuenta</Link>
              </Button>
              <Button variant="ghost" className="w-full space-x-2">
                <Icons.store className="size-4" />
                <Link href="/dashboard/stores">Mis tiendas</Link>
              </Button>
            </Protect>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
