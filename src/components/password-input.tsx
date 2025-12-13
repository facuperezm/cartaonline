'use client'

import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input, type InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const PasswordInput = ({
  className,
  ref,
  ...props
}: InputProps & { ref?: React.RefObject<HTMLInputElement | null> }) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative">
      <Input
        className={cn('pr-10', className)}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
      <Button
        className="absolute top-0 right-0 h-full px-3 py-1 hover:bg-transparent"
        disabled={props.value === '' || props.disabled}
        onClick={() => setShowPassword((prev) => !prev)}
        size="sm"
        type="button"
        variant="ghost"
      >
        {showPassword ? (
          <EyeNoneIcon aria-hidden="true" className="h-4 w-4" />
        ) : (
          <EyeOpenIcon aria-hidden="true" className="h-4 w-4" />
        )}
        <span className="sr-only">
          {showPassword ? 'Hide password' : 'Show password'}
        </span>
      </Button>
    </div>
  )
}
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
