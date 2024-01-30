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

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  address: string;
  id: string;
  city: string;
}

export function ProductCard({
  className,
  name,
  id,
  address,
  city,
  ...props
}: ProductCardProps) {
  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link href={`/stores/${city}/${id}`}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={8 / 3}>
            <div
              aria-label="Placeholder"
              role="img"
              aria-roledescription="placeholder"
              className="relative flex h-full w-full items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent opacity-80"></div>
              <Image
                className="h-full w-full bg-gradient-to-r from-blue-500 object-cover"
                width={100}
                height={100}
                src="/images/restaurantphoto.webp"
                alt="product"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                loading="lazy"
              />
            </div>
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{name}</span>
      </Link>
      <Link href={`/product`} tabIndex={-1}>
        <CardContent className="flex flex-row items-center gap-2.5 p-3">
          <div className="h-12 w-12 overflow-hidden rounded-md">
            <Image
              className="h-full w-full object-cover"
              src="/images/logo-company.webp"
              alt="alala lala long"
              width={100}
              height={100}
            />
          </div>
          <CardTitle className="line-clamp-2 text-lg font-bold capitalize">
            {name}
            <CardDescription className="line-clamp-2">
              {address}
            </CardDescription>
          </CardTitle>
        </CardContent>
      </Link>
    </Card>
  );
}
