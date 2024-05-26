"use client";

import * as React from "react";
import Link from "next/link";
import { Protect } from "@clerk/nextjs";
import { ArrowLeft, BookOpenCheck } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Separator } from "../ui/separator";
import SideBarLoggedIn from "./sidebar-loggedin";

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
              Volver al menú
            </span>
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Button variant="link" className="w-full space-x-1">
              <Link href="/stores/puerto_iguazu">
                Ver tiendas en Puerto Iguazú
              </Link>
            </Button>
            <Button variant="link" className="w-full space-x-1">
              <Link href="/stores/posadas">Ver tiendas en Posadas</Link>
            </Button>
            <Button variant="link" className="w-full space-x-1">
              <Link href="/stores/corrientes">Ver tiendas en Corrientes</Link>
            </Button>
            <Separator className="my-2" />
            <Protect
              permission="org:team_settings:manage"
              fallback={<p>You are not allowed to see this section.</p>}
            >
              protected
            </Protect>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
