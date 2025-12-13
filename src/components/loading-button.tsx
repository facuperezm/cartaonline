'use client'

import type * as React from 'react'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Icons } from '@/components/icons'
import {
  Button,
  type ButtonProps,
  buttonVariants,
} from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useMounted } from '@/hooks/use-mounted'
import { cn } from '@/lib/utils'

type ButtonActionProps = ButtonProps & {
  action: string
}

const LoadingButton = ({
  children,
  className,
  variant,
  size,
  action,
  ref,
  ...props
}: ButtonActionProps & { ref?: React.RefObject<HTMLButtonElement | null> }) => {
  const { pending } = useFormStatus()
  const [del, setDel] = useState(false)
  const [update, setUpdate] = useState(false)
  const mounted = useMounted()

  if (!mounted) {
    return (
      <Skeleton
        className={cn(
          buttonVariants({ variant, size, className }),
          'bg-muted text-muted-foreground',
        )}
      >
        {children}
      </Skeleton>
    )
  }

  return (
    <Button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={pending}
      ref={ref}
      {...props}
      onClick={() => {
        if (action === 'update') {
          setUpdate(true)
        } else {
          setDel(true)
        }
      }}
    >
      {del === true && pending ? (
        <Icons.spinner
          aria-hidden="true"
          className="mr-2 h-4 w-4 animate-spin"
        />
      ) : null}
      {update === true && pending ? (
        <Icons.spinner
          aria-hidden="true"
          className="mr-2 h-4 w-4 animate-spin"
        />
      ) : null}
      {children}
    </Button>
  )
}
LoadingButton.displayName = 'LoadingButton'

export { LoadingButton }
