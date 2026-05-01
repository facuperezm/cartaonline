'use client'

import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

type SubscriptionButtonProps = {
  className?: string
  label?: string
}

export function SubscriptionButton({
  className,
  label = 'Suscribirse al plan Pro',
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  const handleSubscription = async () => {
    try {
      const email = user?.emailAddresses[0]?.emailAddress
      if (!email) {
        toast.error('No se encontró un email asociado a tu cuenta')
        return
      }

      setIsLoading(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, planType: 'PRO' }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error ?? 'Error al crear la suscripción')
      }

      if (!data?.initPoint) {
        throw new Error('No se recibió el enlace de pago')
      }

      window.location.href = data.initPoint as string
    } catch (error) {
      console.error('[SUBSCRIPTION_ERROR]', error)
      const message =
        error instanceof Error
          ? error.message
          : 'Error al procesar la suscripción'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      className={className}
      disabled={isLoading}
      onClick={handleSubscription}
      type="button"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span>{label}</span>
      )}
    </Button>
  )
}
