"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "./icons";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ProductCard({ className, ...props }: ProductCardProps) {
  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link href={`/companies`}>
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={8 / 3}>
            <div
              aria-label="Placeholder"
              role="img"
              aria-roledescription="placeholder"
              className="relative flex items-center justify-center w-full h-full"
            >
              <div className="absolute inset-0 opacity-60 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
              <Image
                className="object-cover w-full h-full bg-gradient-to-r from-blue-500"
                width={100}
                height={100}
                src="https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2014_14/294441/140401-starbucks-food-jsw-208p.jpg"
                alt="product"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                loading="lazy"
              />
            </div>
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">nombre</span>
      </Link>
      <Link href={`/product`} tabIndex={-1}>
        <CardContent className="flex flex-row gap-2.5 p-4 align-center">
          <div className="w-12 h-12 overflow-hidden rounded-md">
            <Image
              className="object-cover w-full h-full"
              src="https://logos-world.net/wp-content/uploads/2020/09/Starbucks-Symbol.jpg"
              alt="alala lala long"
              width={100}
              height={100}
            />
          </div>
          <CardTitle className="text-lg font-bold line-clamp-2">
            Starbucks
            <CardDescription className="line-clamp-2">
              Cafeteria
            </CardDescription>
            {/* <Icons.whatsapp
              className="w-5 text-muted-foreground"
              aria-hidden="true"
            /> */}
          </CardTitle>
        </CardContent>
      </Link>
    </Card>
  );
}
