import Link from "next/link";
import { type Store } from "@/types";

import { getRandomPatternStyle } from "@/lib/generate-pattern";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StoreCardProps {
  store: Store;
  href: string;
}

export function StoreCard({ store, href }: StoreCardProps) {
  return (
    <Link href={href}>
      <span className="sr-only">{store.name}</span>
      <Card className="h-full overflow-hidden">
        <AspectRatio ratio={21 / 9}>
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/40",
              store?.status !== "ACTIVE" && "bg-black/70",
            )}
          />
          <Badge
            className={cn(
              "pointer-events-none absolute right-2 top-2 rounded-sm px-2 py-1 font-semibold",
              store?.status === "ACTIVE"
                ? "border-green-600/20 bg-green-50 text-green-700"
                : "border-red-600/10 bg-red-50 text-red-700",
            )}
          >
            {store?.status === "ACTIVE" ? "Activa" : "Inactiva"}
          </Badge>
          <div
            className="h-full rounded-t-md border-b"
            style={getRandomPatternStyle(String(store.id))}
          />
        </AspectRatio>
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1">{store.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {store?.address}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
