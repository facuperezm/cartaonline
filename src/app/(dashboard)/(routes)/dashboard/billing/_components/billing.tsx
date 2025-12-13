import { CheckIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { SubscriptionButton } from '@/app/(dashboard)/(routes)/dashboard/billing/_components/subscription-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { UsageCard } from './usage'

function PlanButton({
  currentPlan,
  planType,
  storeId,
}: {
  currentPlan: 'BASIC' | 'PRO' | 'ENTERPRISE'
  planType: 'BASIC' | 'PRO' | 'ENTERPRISE'
  storeId: string
}) {
  if (planType === currentPlan) {
    return (
      <Button className="w-full" disabled>
        Plan actual
      </Button>
    )
  }

  if (planType === 'BASIC') {
    return (
      <Button asChild className="w-full">
        <Link href="/dashboard/stores">
          Crear tienda
          <span className="sr-only">Ir a tiendas</span>
        </Link>
      </Button>
    )
  }

  return (
    <SubscriptionButton
      className="w-full"
      planType={planType as 'BASIC' | 'PRO'}
      storeId={storeId}
    />
  )
}

const plans = [
  {
    name: 'Gratis',
    description: 'Podes crear una tienda',
    price: 0,
    features: ['Crear una tienda', 'Hasta 15 productos'],
    planType: 'BASIC' as const,
  },
  {
    name: 'Pro',
    description: 'Para negocios en crecimiento',
    price: 2999,
    features: [
      'Hasta 3 tiendas',
      'Productos ilimitados',
      'Estadísticas avanzadas',
      'Soporte prioritario',
    ],
    planType: 'PRO' as const,
  },
  {
    name: 'Enterprise',
    description: 'Para grandes empresas',
    price: 5999,
    features: [
      'Tiendas ilimitadas',
      'Productos ilimitados',
      'Estadísticas avanzadas',
      'Soporte 24/7',
      'API personalizada',
      'Panel de administración',
    ],
    planType: 'ENTERPRISE' as const,
  },
]

type BillingProps = {
  storeId: string
  currentPlan?: 'BASIC' | 'PRO' | 'ENTERPRISE'
  storeCount: number
}

export function Billing({
  storeId,
  currentPlan = 'BASIC',
  storeCount,
}: BillingProps) {
  const storeLimits = {
    BASIC: 1,
    PRO: 3,
    ENTERPRISE: Number.POSITIVE_INFINITY,
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Plan y uso</CardTitle>
          <div className="text-muted-foreground text-sm">
            En este momento estas en el plan:{' '}
            <Badge
              className="pointer-events-none text-foreground/90"
              variant="secondary"
            >
              {plans.find((p) => p.planType === currentPlan)?.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <UsageCard
            count={storeCount}
            limit={storeLimits[currentPlan]}
            moreInfo="The number of stores you can create on the current plan."
            title="Tiendas disponibles"
          />
        </CardContent>
      </Card>
      <section className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card className={cn('flex flex-col')} key={plan.name}>
            <CardHeader className="flex-1">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid flex-1 place-items-start gap-6">
              <div className="font-bold text-3xl">
                ${plan.price}
                <span className="font-normal text-muted-foreground text-sm">
                  /mes
                </span>
              </div>
              <div className="w-full space-y-2">
                {plan.features.map((feature) => (
                  <div className="flex items-center gap-2" key={feature}>
                    <div className="aspect-square shrink-0 rounded-full bg-foreground p-px text-background">
                      <CheckIcon aria-hidden="true" className="size-3.5" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <PlanButton
                currentPlan={currentPlan}
                planType={plan.planType}
                storeId={storeId}
              />
            </CardFooter>
          </Card>
        ))}
      </section>
    </>
  )
}
