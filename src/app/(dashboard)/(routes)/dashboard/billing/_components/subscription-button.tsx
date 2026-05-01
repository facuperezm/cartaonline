'use client'

import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

type SubscriptionButtonProps = {
  planType: 'PRO' | 'ENTERPRISE'
  className?: string
}

const PLAN_TITLES = {
  PRO: 'Plan Pro',
  ENTERPRISE: 'Plan Enterprise',
} as const

export function SubscriptionButton({
  planType,
  className,
}: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  const handleSubscription = async () => {
    try {
      if (!user?.emailAddresses[0]?.emailAddress) {
        toast.error('No se encontró un email asociado a tu cuenta')
        return
      }

      setIsLoading(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.emailAddresses[0].emailAddress,
          planType,
        }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error ?? 'Error al crear la suscripción')
      }

      if (!data?.initPoint) {
        throw new Error('No se recibió el enlace de pago')
      }

      const { initPoint } = data
      window.location.href = initPoint
    } catch (error) {
      console.error('[SUBSCRIPTION_ERROR]', error)
      toast.error('Error al procesar la suscripción')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      className={className}
      disabled={isLoading}
      onClick={handleSubscription}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        `Suscribirse al ${PLAN_TITLES[planType]}`
      )}
    </Button>
  )
}
