# Plan 004: Harden the MercadoPago webhook (fail closed; consistent data.id; replay window)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 2f46689..HEAD -- src/lib/mercadopago.ts src/app/api/mercadopago/route.ts src/env.ts`
> If any changed since this plan was written, compare the "Current state"
> excerpts against the live code first; on a mismatch, treat it as a STOP
> condition.

## Status

- **Priority**: P1
- **Effort**: S–M
- **Risk**: MED
- **Depends on**: none (but pairs well with plan 001 for regression tests)
- **Category**: security / bug (webhook authenticity)
- **Planned at**: commit `2f46689`, 2026-07-01

## Why this matters

The MercadoPago webhook is the source of truth for subscription/payment state
(who is entitled to the paid plan). Three weaknesses sit on that money path:

1. **Fails open**: when `MP_WEBHOOK_SECRET` is unset, signature verification
   returns `valid: true`. `MP_WEBHOOK_SECRET` is `optional` in `env.ts`, so a
   production deploy that forgot the secret silently accepts **unauthenticated**
   webhook POSTs that mutate subscription state.
2. **Verified id ≠ processed id**: the signature is computed over the URL query
   `data.id`, but the handler acts on the JSON **body** `data.id`. If a delivery
   carries the id only in the body, verification fails with `missing-data-id`
   and a *legitimate* webhook is dropped (401).
3. **No replay/freshness check**: the signed `ts` is concatenated into the HMAC
   but never validated against the clock; a captured valid request can be
   replayed.

The HMAC comparison itself is already constant-time (`crypto.timingSafeEqual`)
— that part is correct and must be preserved.

## Current state

`src/lib/mercadopago.ts:47-103` — `verifyMercadoPagoSignature`:
```ts
export function verifyMercadoPagoSignature(
  request: Request,
  secret: string | undefined,
): SignatureVerifyResult {
  if (!secret) {
    console.warn('[MP_WEBHOOK] MP_WEBHOOK_SECRET not configured — skipping verification')
    return { valid: true, reason: 'no-secret-configured' }   // <-- fails OPEN
  }

  const sigHeader = request.headers.get('x-signature')
  const requestId = request.headers.get('x-request-id')
  if (!(sigHeader && requestId)) return { valid: false, reason: 'missing-headers' }

  const parts = Object.fromEntries(
    sigHeader.split(',').map((kv) => {
      const [k, v] = kv.split('=').map((s) => s.trim())
      return [k ?? '', v ?? '']
    }),
  )
  const ts = parts.ts
  const v1 = parts.v1
  if (!(ts && v1)) return { valid: false, reason: 'malformed-signature' }

  const url = new URL(request.url)
  const dataId = url.searchParams.get('data.id') ?? url.searchParams.get('id') ?? ''
  if (!dataId) return { valid: false, reason: 'missing-data-id' }

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`
  const computed = crypto.createHmac('sha256', secret).update(manifest).digest('hex')

  let valid = false
  try {
    valid = crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(v1, 'hex'))
  } catch { valid = false }

  return valid ? { valid: true } : { valid: false, reason: 'signature-mismatch' }
}
```

`src/env.ts:26-28`:
```ts
  MP_ACCESS_TOKEN: z.string().optional(),
  MP_WEBHOOK_SECRET: z.string().optional(),
```
and `NODE_ENV` is validated at `env.ts:31-33` (`z.enum(['development','production','test']).default('development')`).

`src/app/api/mercadopago/route.ts:104-142` — the handler verifies, then reads
`body?.data?.id` and dispatches on `body?.type`
(`subscription_preapproval` / `subscription_authorized_payment`). The MP docs'
manifest uses the `data.id` value from the notification; MP also lowercases
alphanumeric ids before signing.

Per-request behavior today: on invalid signature it returns 401
(`route.ts:109-112`); on missing `data.id` it returns `{ ok: true }`
(`route.ts:125-127`).

## Commands you will need

| Purpose   | Command            | Expected on success       |
|-----------|--------------------|---------------------------|
| Typecheck | `pnpm typecheck` (or `pnpm exec tsc --noEmit`) | exit 0 |
| Tests     | `pnpm test`        | pass (only if plan 001 landed) |
| Build     | `pnpm build`       | exit 0 (needs a DB URL)   |

## Scope

**In scope**:
- `src/lib/mercadopago.ts` — fail-closed logic, `data.id` source, freshness check
- `src/app/api/mercadopago/route.ts` — pass the body `data.id` into verification
  so the verified id equals the processed id

**Out of scope** (do NOT touch):
- The subscription state-machine bugs (stale-preapproval clobber, ACTIVE→PENDING
  regression, double-subscribe) — those are separate findings/plans.
- `src/env.ts` schema change is optional (see Step 1); prefer the code-level
  fail-closed so local dev still works without the secret.
- The `Payment.rawPayload` PII-minimization finding — separate.

## Git workflow

- Branch: `advisor/004-harden-mercadopago-webhook`
- Commit style: `fix(mp): fail closed on missing webhook secret and verify processed id`
- No AI/Claude attribution in commits.
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Fail closed in production when the secret is missing

In `verifyMercadoPagoSignature`, keep the dev escape hatch but make production
reject. When `!secret`:
- if `process.env.NODE_ENV === 'production'` → return
  `{ valid: false, reason: 'secret-not-configured' }` (fail CLOSED).
- otherwise → keep the current warn + `{ valid: true, reason: 'no-secret-configured' }`
  so local dev without a tunnel/secret still works.

Document the dev-only skip in a one-line comment.

**Verify**: `grep -n "NODE_ENV === 'production'" src/lib/mercadopago.ts` → one
match inside the `!secret` branch.

### Step 2: Verify and process the SAME `data.id`

Change the contract so the value the signature is checked against is the value
the handler acts on. Preferred approach: pass the body `data.id` into the
verifier and prefer it, falling back to the URL param.

- In `route.ts`, parse the body first (it is already parsed at lines 118-124),
  then call verification with the body id available. Because the current code
  verifies *before* reading the body, restructure so the body is read once and
  reused: read `body`, extract `dataId = body?.data?.id`, then verify using that
  `dataId` (falling back to the URL `data.id`/`id` param when the body lacks it).
- In `verifyMercadoPagoSignature`, accept the resolved `dataId` (e.g. add a
  parameter, or a small options object) instead of only reading it from the URL.
  Keep MP's manifest format `id:<dataId>;request-id:<requestId>;ts:<ts>;`.

Keep the existing 401-on-invalid and constant-time comparison. Ensure a
delivery that carries the id only in the body now verifies instead of 401ing.

**Verify**: `pnpm typecheck` (or `pnpm exec tsc --noEmit`) → exit 0; and the id
used in the manifest is the same variable later passed to the sync handlers.

### Step 3: Reject stale requests (replay window)

After a valid signature, reject requests whose `ts` is outside a small window
(e.g. more than a few minutes from now, in either direction). `ts` is the value
already parsed from `x-signature`. Return 401 (or a 4xx) with a `reason` like
`stale-timestamp` when out of window. Use a named constant for the window (e.g.
`WEBHOOK_MAX_SKEW_MS`) rather than a magic number.

**Verify**: `grep -n "MAX_SKEW\|stale" src/lib/mercadopago.ts src/app/api/mercadopago/route.ts`
→ matches.

### Step 4: (If plan 001 landed) unit-test the verifier

Only if `pnpm test` exists: add `src/lib/mercadopago.test.ts` covering
`verifyMercadoPagoSignature` as a pure function (build a `Request` with crafted
`x-signature`/`x-request-id` headers and a known secret). Cases:
- correct signature over the resolved `data.id` → `valid: true`.
- wrong `v1` → `valid: false, signature-mismatch`.
- missing headers → `missing-headers`.
- no secret + `NODE_ENV==='production'` → `valid: false`.
- no secret + `NODE_ENV!=='production'` → `valid: true` (dev skip).
- `ts` outside the window → rejected.
Also test `mapMercadoPagoStatus` for each MP status → enum mapping.

**Verify**: `pnpm test` → passes.

### Step 5: Manual sanity (if a test MP tunnel is available)

Point the MP panel webhook at a tunnel, trigger a subscription event, and
confirm the handler still returns `{ ok: true }` for a genuinely signed request
and 401 for a tampered one. If no tunnel is available, note that Step 4's unit
tests are the gate.

## Test plan

- `src/lib/mercadopago.test.ts` (Step 4) is the primary automated gate; it tests
  the security-critical pure function without a network/DB.
- Model the test file after the plan-001 test files.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "NODE_ENV === 'production'" src/lib/mercadopago.ts` → matches in
      the `!secret` branch (fails closed in prod)
- [ ] The `data.id` used to build the HMAC manifest is the same value passed to
      the sync handlers (verified by reading `route.ts`)
- [ ] A replay/freshness window constant exists and is enforced
- [ ] `crypto.timingSafeEqual` is still used for the v1 comparison (unchanged)
- [ ] `pnpm typecheck` exits 0; `pnpm test` passes if plan 001 landed
- [ ] Only the two in-scope files changed (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The "Current state" excerpts don't match the live code.
- You cannot restructure the handler to read the body before verifying without
  changing external behavior for genuinely-signed requests — report the exact
  constraint (e.g. body already consumed) rather than guessing.
- Enforcing the freshness window would reject MercadoPago's own retry deliveries
  (MP may redeliver hours later) — if unsure of MP's retry timing, choose a
  generous window and NOTE the assumption; do not silently pick a tight one.
- Making the secret required at the env layer (if you chose that instead of the
  code-level guard) would break local `pnpm dev` — prefer the code-level guard.

## Maintenance notes

- The subscription state-machine hardening (stale-webhook clobber,
  ACTIVE→PENDING regression, double-subscribe guard) is deliberately NOT in this
  plan — those are tracked separately and should land with their own tests.
- A reviewer should scrutinize that the fail-closed branch is keyed on
  `NODE_ENV` and that the verified id and processed id are provably identical.
- If MP changes its manifest format or id-casing rules, this verifier must be
  revisited.
