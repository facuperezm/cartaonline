import Link from "next/link";

import { db } from "@/lib/db";
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

type Store = {
  id: number;
  name: string;
};

export async function StoreCard({ store, href }: StoreCardProps) {
  //check in db if store is active or inactive to display the badge
  const currentStore = await db.store.findFirst({
    where: {
      id: store.id,
    },
  });

  return (
    <Link href={href}>
      <span className="sr-only">{store.name}</span>
      <Card className="h-full overflow-hidden">
        <AspectRatio ratio={21 / 9}>
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/40",
              currentStore?.status !== "ACTIVE" && "bg-black/70",
            )}
          />
          <Badge
            className={cn(
              "pointer-events-none absolute right-2 top-2 rounded-sm px-2 py-1 font-semibold",
              currentStore?.status === "ACTIVE"
                ? "border-green-600/20 bg-green-50 text-green-700"
                : "border-red-600/10 bg-red-50 text-red-700",
            )}
          >
            {currentStore?.status === "ACTIVE" ? "Activa" : "Inactiva"}
          </Badge>
          <div
            className="h-full rounded-t-md border-b"
            style={getRandomPatternStyle(String(store.id))}
          />
        </AspectRatio>
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1">{store.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {currentStore?.address}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
