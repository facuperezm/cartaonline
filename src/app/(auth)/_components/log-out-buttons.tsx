'use client'

import { SignOutButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useMounted } from '@/hooks/use-mounted'
import { cn } from '@/lib/utils'

export function LogOutButtons() {
  const router = useRouter()
  const mounted = useMounted()

  return (
    <div className="flex w-full flex-col-reverse items-center gap-2 sm:flex-row">
      <Button
        className="w-full"
        onClick={() => router.back()}
        size="sm"
        variant="secondary"
      >
        Volver
        <span className="sr-only">Página previa</span>
      </Button>
      {mounted ? (
        <SignOutButton
          redirectUrl={`${window.location.origin}/?redirect=false`}
        >
          <Button className="w-full" size="sm">
            Cerrar sesión
            <span className="sr-only">Cerrar sesión</span>
          </Button>
        </SignOutButton>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: 'sm' }),
            'w-full bg-muted text-muted-foreground',
          )}
        >
          Cerrar sesión
        </Skeleton>
      )}
    </div>
  )
}
