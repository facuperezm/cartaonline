import type * as React from 'react'

import { cn } from '@/lib/utils'

const Card = ({
  className,
  as: Comp = 'div',
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article'
} & { ref?: React.RefObject<HTMLDivElement | null> }) => (
  <Comp
    className={cn(
      'rounded-xl border bg-card text-card-foreground shadow',
      className,
    )}
    ref={ref}
    {...props}
  />
)
Card.displayName = 'Card'

const CardHeader = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>
}) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    ref={ref}
    {...props}
  />
)
CardHeader.displayName = 'CardHeader'

const CardTitle = ({
  className,
  as: Comp = 'h3',
  ref,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' } & {
  ref?: React.RefObject<HTMLParagraphElement | null>
}) => (
  <Comp
    className={cn('font-semibold leading-none tracking-tight', className)}
    ref={ref}
    {...props}
  />
)
CardTitle.displayName = 'CardTitle'

const CardDescription = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ref?: React.RefObject<HTMLParagraphElement | null>
}) => (
  <p
    className={cn('text-muted-foreground text-sm', className)}
    ref={ref}
    {...props}
  />
)
CardDescription.displayName = 'CardDescription'

const CardContent = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>
}) => <div className={cn('p-6 pt-0', className)} ref={ref} {...props} />
CardContent.displayName = 'CardContent'

const CardFooter = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>
}) => (
  <div
    className={cn('flex items-center p-6 pt-0', className)}
    ref={ref}
    {...props}
  />
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
