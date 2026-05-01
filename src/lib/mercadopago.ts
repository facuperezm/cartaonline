import 'server-only'

import crypto from 'node:crypto'
import { MercadoPagoConfig } from 'mercadopago'

import { serverEnv } from '@/env'

export const mercadopago = new MercadoPagoConfig({
  accessToken: serverEnv.MP_ACCESS_TOKEN ?? '',
})

export type SignatureVerifyResult =
  | { valid: true; reason?: string }
  | { valid: false; reason: string }

/**
 * Verify a MercadoPago webhook signature.
 *
 * MP signs each request with HMAC-SHA256 over the manifest
 *   `id:<dataId>;request-id:<x-request-id>;ts:<ts>;`
 * where `dataId` is taken from the URL query (`?data.id=...`),
 * the request id from the `x-request-id` header, and ts from
 * `x-signature: ts=...,v1=...`.
 *
 * If `MP_WEBHOOK_SECRET` is not configured we return valid=true with a
 * reason and log a warning, so local dev (no tunnel/secret) still works.
 */
export function verifyMercadoPagoSignature(
  request: Request,
  secret: string | undefined,
): SignatureVerifyResult {
  if (!secret) {
    console.warn(
      '[MP_WEBHOOK] MP_WEBHOOK_SECRET not configured — skipping verification',
    )
    return { valid: true, reason: 'no-secret-configured' }
  }

  const sigHeader = request.headers.get('x-signature')
  const requestId = request.headers.get('x-request-id')
  if (!(sigHeader && requestId)) {
    return { valid: false, reason: 'missing-headers' }
  }

  const parts = Object.fromEntries(
    sigHeader.split(',').map((kv) => {
      const [k, v] = kv.split('=').map((s) => s.trim())
      return [k ?? '', v ?? '']
    }),
  )

  const ts = parts.ts
  const v1 = parts.v1
  if (!(ts && v1)) {
    return { valid: false, reason: 'malformed-signature' }
  }

  const url = new URL(request.url)
  const dataId =
    url.searchParams.get('data.id') ?? url.searchParams.get('id') ?? ''
  if (!dataId) {
    return { valid: false, reason: 'missing-data-id' }
  }

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`
  const computed = crypto
    .createHmac('sha256', secret)
    .update(manifest)
    .digest('hex')

  let valid = false
  try {
    valid = crypto.timingSafeEqual(
      Buffer.from(computed, 'hex'),
      Buffer.from(v1, 'hex'),
    )
  } catch {
    valid = false
  }

  return valid
    ? { valid: true }
    : { valid: false, reason: 'signature-mismatch' }
}

export type AuthorizedPaymentDto = {
  id?: number | string
  preapproval_id?: string
  status?: string
  transaction_amount?: number
  currency_id?: string
  payment_id?: number | string
  payment_method_id?: string
  payment_date?: string | null
  debit_date?: string | null
  date_created?: string
}

/**
 * Fetch an authorized payment by id via the MP REST API. The v2 SDK
 * doesn't ship a client for `/authorized_payments/{id}` so we hit it
 * directly. Used inside the webhook handler for
 * `subscription_authorized_payment` events.
 */
export async function fetchAuthorizedPayment(
  id: string,
): Promise<AuthorizedPaymentDto> {
  if (!serverEnv.MP_ACCESS_TOKEN) {
    throw new Error('MP_ACCESS_TOKEN missing')
  }
  const res = await fetch(
    `https://api.mercadopago.com/authorized_payments/${id}`,
    {
      headers: { Authorization: `Bearer ${serverEnv.MP_ACCESS_TOKEN}` },
      cache: 'no-store',
    },
  )
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`fetchAuthorizedPayment ${res.status}: ${detail}`)
  }
  return res.json() as Promise<AuthorizedPaymentDto>
}
