import 'server-only'

import { MercadoPagoConfig } from 'mercadopago'

import { serverEnv } from '@/env'

export const mercadopago = new MercadoPagoConfig({
  accessToken: serverEnv.MP_ACCESS_TOKEN ?? '',
})
