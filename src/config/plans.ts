export const PLANS = [
  {
    planType: 'BASIC',
    name: 'Gratis',
    slug: 'gratis',
    description: 'Para empezar',
    priceArs: 0,
    storeLimit: 1,
    productLimit: 3,
    features: ['1 tienda', 'Hasta 3 productos', 'URL pública con código QR'],
  },
  {
    planType: 'PRO',
    name: 'Pro',
    slug: 'pro',
    description: 'Para negocios en crecimiento',
    priceArs: 15_000,
    storeLimit: 3,
    productLimit: null,
    features: [
      'Hasta 3 tiendas',
      'Productos ilimitados',
      'URL pública con código QR',
      'Soporte prioritario',
    ],
  },
] as const

export type Plan = (typeof PLANS)[number]
export type PlanType = Plan['planType']

export const PAYABLE_PLAN_TYPES = ['PRO'] as const
export type PayablePlanType = (typeof PAYABLE_PLAN_TYPES)[number]

export const ENTERPRISE_CARD = {
  name: 'Enterprise',
  description: 'Para grandes empresas',
  features: [
    'Tiendas ilimitadas',
    'Productos ilimitados',
    'Soporte 24/7',
    'API personalizada',
  ],
  contactUrl: 'mailto:hola@cartaonline.app',
} as const
