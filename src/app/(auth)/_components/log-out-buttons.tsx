"use client";

import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function LogOutButtons() {
  const router = useRouter();
  const mounted = useMounted();

  return (
    <div className="flex w-full flex-col-reverse items-center gap-2 sm:flex-row">
      <Button
        variant="secondary"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
      >
        Volver
        <span className="sr-only">Página previa</span>
      </Button>
      {mounted ? (
        <SignOutButton
          redirectUrl={`${window.location.origin}/?redirect=false`}
        >
          <Button size="sm" className="w-full">
            Cerrar sesión
            <span className="sr-only">Cerrar sesión</span>
          </Button>
        </SignOutButton>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground",
          )}
        >
          Cerrar sesión
        </Skeleton>
      )}
    </div>
  );
}
