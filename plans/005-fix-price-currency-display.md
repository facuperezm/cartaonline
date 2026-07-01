# Plan 005: Fix product-price display (ARS currency, no fake decimals)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 2f46689..HEAD -- src/lib/utils.ts "src/app/(dashboard)/_components/tables/columns.tsx" "src/app/(lobby)/_components/product-list.tsx"`
> If any changed since this plan was written, compare the "Current state"
> excerpts against the live code first; on a mismatch, treat it as a STOP
> condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug (display correctness)
- **Planned at**: commit `2f46689`, 2026-07-01

## Why this matters

Product prices are stored as **integer Argentine pesos** (`Product.price Int`,
seed uses whole pesos like `1000`). But two places render them wrong:

- The dashboard products table formats them as **US dollars**:
  `Intl.NumberFormat('en-US', { currency: 'USD' })` → shows "$1,000.00" USD for
  an ARS price.
- The public menu renders `product.price.toFixed(2)` → "$1000.00", inventing two
  decimal places on whole-peso prices.

Both the restaurant owner and their customers see incorrect currency/format on
the core menu surface. The repo already has a correct ARS formatter in the
billing UI; this plan extracts a shared helper and uses it in both broken spots.

## Current state

Prices are integer ARS — `prisma/schema.prisma:87` `price Int`; `prisma/seed.ts`
uses whole pesos.

Bug 1 — dashboard table
(`src/app/(dashboard)/_components/tables/columns.tsx:71-79`):
```ts
cell: ({ row }) => {
  const price = Number.parseFloat(row.getValue('price'))
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
  return <div className="text-center font-medium">{formatted}</div>
},
```

Bug 2 — public menu (`src/app/(lobby)/_components/product-list.tsx:52-54`):
```tsx
<p className="font-semibold">
  ${product.price.toFixed(2)}
</p>
```

Correct exemplar already in the repo —
`src/app/(dashboard)/(routes)/dashboard/billing/_components/billing.tsx:27-31`:
```ts
const arsFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})
```

Shared utils live in `src/lib/utils.ts` (exports `cn`, `showErrorToast`,
`getUserEmail`, `catchError`, `compressImage`, `normalizeCityName`). This is the
right home for a shared `formatArs`.

Note: there are also two inline `formatArs` copies using `toLocaleString('es-AR')`
in `page.tsx:34` and `hero-preview.tsx:57`. Converging those is **optional
follow-up**, not required here (see Out of scope).

## Commands you will need

| Purpose   | Command            | Expected on success       |
|-----------|--------------------|---------------------------|
| Typecheck | `pnpm typecheck` (or `pnpm exec tsc --noEmit`) | exit 0 |
| Lint      | `pnpm lint`        | exit 0                    |
| Tests     | `pnpm test`        | pass (only if plan 001 landed) |

## Scope

**In scope**:
- `src/lib/utils.ts` — add a shared `formatArs(amount: number): string`
- `src/app/(dashboard)/_components/tables/columns.tsx` — use it (drop USD)
- `src/app/(lobby)/_components/product-list.tsx` — use it (drop `.toFixed(2)`)

**Out of scope** (do NOT touch):
- `billing.tsx` — already correct; leave its local `arsFormatter` as is (or, if
  you want, it *may* switch to the shared helper, but that is not required and
  changes an unrelated file).
- The inline `formatArs` in `page.tsx` and `hero-preview.tsx` — optional
  follow-up; do not fold them in here to keep the change surgical.
- `Product.price` type or any schema/data change — the storage is correct;
  only display changes.

## Git workflow

- Branch: `advisor/005-fix-price-currency-display`
- Commit style: `fix(products): show prices as ARS instead of USD`
- No AI/Claude attribution in commits.
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Add a shared `formatArs` helper

In `src/lib/utils.ts`, add a module-level `Intl.NumberFormat` (created once, not
per call — matches the "no regex/formatter in loops" performance convention) and
export a `formatArs`:
```ts
const ARS_FORMATTER = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export function formatArs(amount: number) {
  return ARS_FORMATTER.format(amount)
}
```

**Verify**: `grep -n "export function formatArs" src/lib/utils.ts` → one match.

### Step 2: Use it in the dashboard table

In `columns.tsx`, replace the `en-US`/USD `Intl.NumberFormat` block with
`formatArs(Number.parseFloat(row.getValue('price')))` (import `formatArs` from
`@/lib/utils`). Remove the now-unused inline formatter.

**Verify**: `grep -n "en-US\|USD" src/app/\(dashboard\)/_components/tables/columns.tsx`
→ no matches.

### Step 3: Use it in the public menu

In `product-list.tsx`, replace `${product.price.toFixed(2)}` with
`{formatArs(product.price)}` (import `formatArs` from `@/lib/utils`).

**Verify**: `grep -n "toFixed(2)" src/app/\(lobby\)/_components/product-list.tsx`
→ no matches.

### Step 4: Typecheck and lint

**Verify**: `pnpm typecheck` (or `pnpm exec tsc --noEmit`) → exit 0;
`pnpm lint` → exit 0.

### Step 5: (Optional) tiny unit test

If `pnpm test` exists (plan 001): add a case to a utils test asserting
`formatArs(1000)` yields an ARS-formatted string with no decimal places and
`formatArs` is stable for `0`. Keep it minimal.

## Test plan

- Optional `formatArs` unit test (Step 5). The behavioral gate is the grep
  checks plus a visual confirmation that the dashboard table and a public store
  menu now show ARS (e.g. "$1.000") rather than "$1,000.00" / "$1000.00".

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "export function formatArs" src/lib/utils.ts` → one match
- [ ] `grep -n "en-US\|currency: 'USD'" "src/app/(dashboard)/_components/tables/columns.tsx"` → no matches
- [ ] `grep -n "toFixed(2)" "src/app/(lobby)/_components/product-list.tsx"` → no matches
- [ ] `pnpm typecheck` exits 0 and `pnpm lint` exits 0
- [ ] Only the three in-scope files changed (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The "Current state" excerpts don't match the live code.
- `row.getValue('price')` is not a number/number-string as assumed (the table's
  data shape changed) — report rather than guessing a conversion.

## Maintenance notes

- Follow-up (deferred): converge the two inline `formatArs` copies in `page.tsx`
  and `hero-preview.tsx` onto the shared helper so there is one currency
  formatter in the codebase.
- A reviewer should confirm no code still formats product prices as USD or with
  `.toFixed(2)`.
