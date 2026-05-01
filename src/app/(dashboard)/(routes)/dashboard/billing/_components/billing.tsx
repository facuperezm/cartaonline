import { CheckIcon, Clock4 } from 'lucide-react'
import type { ReactNode } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import { ENTERPRISE_CARD, type Plan } from '@/config/plans'
import { getPlan, type SubscriptionUiState } from '@/lib/subscription'
import { cn } from '@/lib/utils'

import { AutoRefreshAfter } from './auto-refresh-after'
import { CancelSubscriptionButton } from './cancel-subscription-button'
import { SubscriptionButton } from './subscription-button'
import { UsageCard } from './usage'

const BASIC_PLAN = getPlan('BASIC')
const PRO_PLAN = getPlan('PRO')

const arsFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

type BillingProps = {
  uiState: SubscriptionUiState
  activePlan: Plan
  storeCount: number
  productCount: number
  justReturnedFromMp?: boolean
}

export function Billing({
  uiState,
  activePlan,
  storeCount,
  productCount,
  justReturnedFromMp = false,
}: BillingProps) {
  const showPendingBanner = uiState.kind === 'pending' && justReturnedFromMp

  return (
    <>
      {showPendingBanner ? (
        <>
          <Alert>
            <Clock4 className="size-4" />
            <AlertTitle>Esperando confirmación de Mercado Pago...</AlertTitle>
            <AlertDescription>
              Esto puede tomar unos segundos. Vamos a actualizar la página
              automáticamente.
            </AlertDescription>
          </Alert>
          <AutoRefreshAfter delayMs={5000} />
        </>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Plan y uso</CardTitle>
          <div className="text-muted-foreground text-sm">
            En este momento estás en el plan:{' '}
            <Badge
              className="pointer-events-none text-foreground/90"
              variant="secondary"
            >
              {activePlan.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <UsageCard
            count={storeCount}
            limit={activePlan.storeLimit}
            title="Tiendas"
          />
          <UsageCard
            count={productCount}
            limit={activePlan.productLimit}
            title="Productos"
          />
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-3">
        <PlanCard
          footer={<BasicCardButton uiState={uiState} />}
          plan={BASIC_PLAN}
        />

        <PlanCard
          banner={
            uiState.kind === 'cancelled-grace' ? (
              <CardDescription className="font-medium text-foreground/80">
                Activo hasta el {dateFormatter.format(uiState.until)}
              </CardDescription>
            ) : null
          }
          footer={<ProCardButtons uiState={uiState} />}
          highlight={
            uiState.kind === 'active' ||
            uiState.kind === 'pending' ||
            uiState.kind === 'cancelled-grace'
          }
          plan={PRO_PLAN}
        />

        <Card className="flex flex-col">
          <CardHeader className="flex-1">
            <CardTitle className="text-lg">{ENTERPRISE_CARD.name}</CardTitle>
            <CardDescription>{ENTERPRISE_CARD.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid flex-1 place-items-start gap-6">
            <div className="font-bold text-3xl">A medida</div>
            <div className="w-full space-y-2">
              {ENTERPRISE_CARD.features.map((feature) => (
                <FeatureRow feature={feature} key={feature} />
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <Button asChild className="w-full" variant="outline">
              <a href={ENTERPRISE_CARD.contactUrl}>Contactanos</a>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  )
}

function PlanCard({
  plan,
  highlight = false,
  banner,
  footer,
}: {
  plan: Plan
  highlight?: boolean
  banner?: ReactNode
  footer: ReactNode
}) {
  return (
    <Card className={cn('flex flex-col', highlight ? 'border-foreground' : '')}>
      <CardHeader className="flex-1">
        <CardTitle className="text-lg">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        {banner}
      </CardHeader>
      <CardContent className="grid flex-1 place-items-start gap-6">
        <div className="font-bold text-3xl">
          {plan.priceArs === 0 ? 'Gratis' : arsFormatter.format(plan.priceArs)}
          {plan.priceArs > 0 ? (
            <span className="font-normal text-muted-foreground text-sm">
              /mes
            </span>
          ) : null}
        </div>
        <div className="w-full space-y-2">
          {plan.features.map((feature) => (
            <FeatureRow feature={feature} key={feature} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-4">{footer}</CardFooter>
    </Card>
  )
}

function FeatureRow({ feature }: { feature: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="aspect-square shrink-0 rounded-full bg-foreground p-px text-background">
        <CheckIcon aria-hidden="true" className="size-3.5" />
      </div>
      <span className="text-muted-foreground text-sm">{feature}</span>
    </div>
  )
}

function BasicCardButton({ uiState }: { uiState: SubscriptionUiState }) {
  if (uiState.kind === 'free' || uiState.kind === 'cancelled-expired') {
    return (
      <Button className="w-full" disabled>
        Plan actual
      </Button>
    )
  }

  return (
    <Button className="w-full" disabled variant="outline">
      Disponible al cancelar Pro
    </Button>
  )
}

function ProCardButtons({ uiState }: { uiState: SubscriptionUiState }) {
  if (uiState.kind === 'active') {
    return (
      <div className="flex w-full flex-col gap-2">
        <Button className="w-full" disabled>
          Plan actual
        </Button>
        <CancelSubscriptionButton />
      </div>
    )
  }

  if (uiState.kind === 'pending') {
    return (
      <Button className="w-full" disabled>
        Pago pendiente
      </Button>
    )
  }

  if (uiState.kind === 'cancelled-grace') {
    return (
      <SubscriptionButton className="w-full" label="Reactivar suscripción" />
    )
  }

  return <SubscriptionButton className="w-full" label="Suscribirse" />
}
