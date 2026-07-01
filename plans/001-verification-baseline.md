# Plan 001: Establish a verification baseline (typecheck script + vitest + pure-function tests)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 2f46689..HEAD -- package.json tsconfig.json src/lib/site-url.ts src/lib/location.ts src/lib/subscription.ts`
> If any of these changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: tests / dx
- **Planned at**: commit `2f46689`, 2026-07-01

## Why this matters

This repo has **zero automated tests, no `typecheck` script, and no CI**. The
only thing that surfaces a type error today is a full `next build`, and the
only thing that surfaces a logic regression is manual clicking. The
highest-churn area (subscription billing) has been built across ~10 recent
commits with no safety net. This plan establishes the minimum verification
baseline so that later plans — especially the Clerk/Next upgrade (007) — can be
executed and verified safely. It deliberately covers only **pure functions**
that need no database or React, to keep the harness small and prove it works.

A test-DB container already exists in `docker-compose.yml` (`postgres-test`,
port 5433) — that is for *later* integration tests and is out of scope here.

## Current state

- `package.json` scripts today (lines 6–13): `dev`, `build`, `start`, `lint`,
  `lint:fix`, `format`, `seed`. There is **no** `test` and **no** `typecheck`.
  `tsconfig.json` sets `"noEmit": true`, so `tsc --noEmit` already works —
  running it on the current tree exits 0 with no errors (verified 2026-07-01).
- Package manager is **pnpm**. Lint/format is Biome via `ultracite`.
- The three modules this plan tests are pure (no DB, no React, no `@/env`
  import — so importing them will not trigger env validation):

`src/lib/site-url.ts` (whole file):
```ts
const TRAILING_SLASH_REGEX = /\/$/

export function getSiteUrl() {
  const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? vercelUrl ?? 'http://localhost:3000'

  return baseUrl.replace(TRAILING_SLASH_REGEX, '')
}
```

`src/lib/location.ts` exports `slugifyCityName(cityName)` (NFD-normalize, strip
diacritics, lowercase, non-alphanumeric → `-`, trim edge dashes) and
`humanizeCitySlug(citySlug)` (split on `[-_]`, title-case each word).

`src/lib/subscription.ts:24-71` exports `getActivePlan(subscription)` (returns
the BASIC plan unless status is `ACTIVE`, or `CANCELLED` with
`currentPeriodEnd > new Date()` — the grace period) and
`getSubscriptionUiState(subscription)` (a 5-way discriminated union: `free`,
`pending`, `active`, `cancelled-grace`, `cancelled-expired`). `getActivePlan`
depends on `PLANS` from `src/config/plans.ts` (BASIC storeLimit 1/productLimit 3;
PRO storeLimit 3/productLimit null).

- Convention for new config-style modules: TypeScript, ESM, 2-space indent, no
  semicolons (Biome/ultracite enforced). The `@/*` path alias maps to `./src/*`
  (`tsconfig.json` `paths`).

## Commands you will need

| Purpose   | Command                     | Expected on success        |
|-----------|-----------------------------|----------------------------|
| Install   | `pnpm install`              | exit 0                     |
| Typecheck | `pnpm typecheck`            | exit 0, no errors          |
| Tests     | `pnpm test`                 | all pass                   |
| Lint      | `pnpm lint`                 | exit 0 (see STOP note)     |
| Build     | `pnpm build`                | exit 0 (needs a DB URL)    |

Note: `pnpm lint` (`ultracite check`) currently prints a Biome config-parse
warning but exits 0; do not try to "fix" that here — it is out of scope.

## Scope

**In scope** (the only files you should create or modify):
- `package.json` — add `typecheck`, `test`, `test:watch` scripts + devDeps
- `vitest.config.ts` (create)
- `src/lib/site-url.test.ts` (create)
- `src/lib/location.test.ts` (create)
- `src/lib/subscription.test.ts` (create)

**Out of scope** (do NOT touch):
- Any source module under `src/` other than adding the three `*.test.ts` files.
  This plan tests existing behavior; it does not change it.
- `src/lib/limits.ts` — pure logic but imports `server-only` + `db`; it needs
  a DB/mock harness that is deliberately deferred.
- `docker-compose.yml` and any integration/DB test setup.
- `biome.jsonc`, CI workflows.

## Git workflow

- Branch: `advisor/001-verification-baseline`
- Conventional-commit style, matching `git log` (e.g. `test: add vitest and
  pure-function coverage for url/location/subscription`,
  `chore: add typecheck and test scripts`).
- Do NOT add any AI/Claude co-author trailer or attribution — the repo owner is
  the sole author.
- Do NOT push or open a PR unless the operator instructs it.

## Steps

### Step 1: Add scripts and dev dependencies

In `package.json`, add to `scripts`:
```json
"typecheck": "tsc --noEmit",
"test": "vitest run",
"test:watch": "vitest"
```
Add to `devDependencies` (let the executor's package manager resolve current
versions compatible with the installed toolchain):
- `vitest`
- `vite-tsconfig-paths` (so tests honor the `@/*` alias without duplicating it)

Then `pnpm install`.

**Verify**: `pnpm typecheck` → exit 0, no errors.

### Step 2: Add vitest config

Create `vitest.config.ts` at the repo root:
```ts
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
```

**Verify**: `pnpm test` → exits 0 with "no test files found" (or runs 0 tests)
— confirms vitest is wired before any test exists.

### Step 3: Test `getSiteUrl` precedence and trailing-slash strip

Create `src/lib/site-url.test.ts`. Cover, each as its own `it()` with an
explicit assertion of WHY:
- `NEXT_PUBLIC_APP_URL` wins over `VERCEL_URL` (app URL is the canonical
  override used in MercadoPago `back_url` / OG metadata).
- falls back to `https://<VERCEL_URL>` when `NEXT_PUBLIC_APP_URL` is unset.
- falls back to `http://localhost:3000` when both are unset.
- strips exactly one trailing slash (a trailing `/` would double-slash every
  built URL).

Save and restore `process.env` around each case (set the vars, call, delete).

**Verify**: `pnpm test` → these tests pass.

### Step 4: Test slug round-trip in `location.ts`

Create `src/lib/location.test.ts`. Cover:
- `slugifyCityName('Villa Carlos Paz')` → `'villa-carlos-paz'`.
- diacritics removed: `slugifyCityName('Río Cuarto')` → `'rio-cuarto'`.
- edge dashes trimmed and repeated separators collapsed.
- `humanizeCitySlug('villa-carlos-paz')` → `'Villa Carlos Paz'` (title case).
- Why it matters (put in a comment): these feed the canonical-URL redirect in
  `stores/[city]/[id]/page.tsx` and the payment `back_url`; a slug bug breaks
  SEO redirects and payment return.

**Verify**: `pnpm test` → these tests pass.

### Step 5: Test entitlement logic in `subscription.ts`

Create `src/lib/subscription.test.ts`. Cover `getActivePlan`:
- `null` subscription → BASIC.
- `{ status: 'ACTIVE', planType: 'PRO' }` → PRO.
- `{ status: 'CANCELLED', planType: 'PRO', currentPeriodEnd: <1h in future> }`
  → PRO (grace period still entitled).
- `{ status: 'CANCELLED', planType: 'PRO', currentPeriodEnd: <1h in past> }`
  → BASIC (grace expired).
- `{ status: 'PENDING', planType: 'PRO' }` → BASIC (never paid).

And `getSubscriptionUiState`: assert each of the 5 kinds is produced by the
corresponding input (free / pending / active / cancelled-grace /
cancelled-expired). Construct dates relative to `new Date()` inside the test so
they are not brittle.

**Verify**: `pnpm test` → all tests pass; total suite has ≥ 3 files and passes.

## Test plan

- Three new files: `src/lib/site-url.test.ts`, `src/lib/location.test.ts`,
  `src/lib/subscription.test.ts`. Structure them table-driven (an array of
  `[input, expected]` cases inside one `it()` per function is acceptable, or one
  `it()` per case). No mocking, no DB.
- There is no existing test to model after (this is the first). Follow the
  vitest `describe`/`it`/`expect` idiom; keep `describe` nesting flat (one level).
- Verification: `pnpm test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm typecheck` exits 0
- [ ] `pnpm test` exits 0; the three new test files exist and pass
- [ ] `grep -q '"typecheck"' package.json && grep -q '"test"' package.json` succeeds
- [ ] No source module under `src/` other than the three `*.test.ts` files was
      modified (`git status` shows only `package.json`, `pnpm-lock.yaml`,
      `vitest.config.ts`, and the three test files)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The "Current state" excerpts of `site-url.ts` / `location.ts` /
  `subscription.ts` don't match the live code (the codebase drifted).
- `pnpm typecheck` reports pre-existing errors on the unmodified tree (it
  should be clean — if not, report them; do not fix unrelated code here).
- A pure-function test reveals the code returns something different from what
  this plan expects — that may be a real bug. Do NOT change the source to make
  the test pass; instead write the test to assert the ACTUAL current behavior,
  add a `// NOTE: possible bug — see plan 001` comment, and report it.
- vitest cannot resolve the `@/*` alias after Step 2 — report rather than
  hard-coding paths.

## Maintenance notes

- This harness is the foundation later plans build on. Plans 002–006 add their
  own tests assuming `pnpm test` exists.
- Deferred on purpose: integration tests against the `postgres-test` container
  (webhook idempotency, ownership/IDOR, plan-limit races) — those need a DB
  setup/teardown and a mocked MercadoPago client. Track as a follow-up.
- A reviewer should confirm the tests assert *intent* (why the value matters),
  not just mirror the implementation.
