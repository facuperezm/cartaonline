"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: any;
  variant?: "default" | "switchable";
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
}

export function ProductCard({
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link href={`/product/`}>
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={8 / 3}>
            <div
              aria-label="Placeholder"
              role="img"
              aria-roledescription="placeholder"
              className="relative flex items-center justify-center w-full h-full"
            >
              {/* <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                /> */}
              <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-black via-black/20 to-transparent"></div>
              <img
                className="object-cover w-full h-full bg-gradient-to-r from-blue-500"
                src="https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2014_14/294441/140401-starbucks-food-jsw-208p.jpg"
                alt="product"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                fill
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
            <img
              className="object-cover w-full h-full"
              src="https://logos-world.net/wp-content/uploads/2020/09/Starbucks-Symbol.jpg"
              alt=""
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
      {/* <CardFooter className="p-4">
        {variant === "default" ? (
          <Button
            aria-label="Add to cart"
            size="sm"
            className="w-full h-8 rounded-sm"
            onClick={() => {
              console.log("add to cart")
            }}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner
                className="w-4 h-4 mr-2 animate-spin"
                aria-hidden="true"
              />
            )}
            Add to cart
          </Button>
        ) : (
          <Button
            aria-label={isAddedToCart ? "Remove from cart" : "Add to cart"}
            size="sm"
            className="w-full h-8 rounded-sm"
            onClick={() => {
              startTransition(async () => {
                await onSwitch?.()
              })
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner
                className="w-4 h-4 mr-2 animate-spin"
                aria-hidden="true"
              />
            ) : isAddedToCart ? (
              <CheckIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            ) : (
              <PlusIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            )}
            {isAddedToCart ? "Added" : "Add to cart"}
          </Button>
        )}
      </CardFooter> */}
    </Card>
  );
}
