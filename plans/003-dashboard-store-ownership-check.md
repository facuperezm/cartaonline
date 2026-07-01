# Plan 003: Add an ownership check to the dashboard store-settings page (fix IDOR)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 2f46689..HEAD -- "src/app/(dashboard)/(routes)/dashboard/stores/[id]/page.tsx" src/lib/queries/store.ts`
> If either changed since this plan was written, compare the "Current state"
> excerpts against the live code first; on a mismatch, treat it as a STOP
> condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: security (broken object-level authorization / IDOR)
- **Planned at**: commit `2f46689`, 2026-07-01

## Why this matters

The dashboard store-settings page loads a store **by id with no ownership
check**. Any authenticated user can open `/dashboard/stores/<any-store-id>` and
render another tenant's management view — store info, product table, QR code,
and danger zone. Today the exposed data is also reachable via the public
storefront and all *mutations* are separately ownership-checked, so the concrete
leak is limited; but this is a latent IDOR that becomes a real data breach the
moment any owner-only field (revenue, private notes, contact) is added to that
page. The middleware only enforces *authentication*, not *ownership*.

## Current state

Middleware protects `/dashboard(.*)` for auth only —
`src/proxy.ts:3-9`:
```ts
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})
```

The page fetches with no `userId` scope —
`src/app/(dashboard)/(routes)/dashboard/stores/[id]/page.tsx:50-57`:
```ts
export default async function StorePage({ params }: PageProps) {
  const { id } = await params
  const store = await getStoreById(id)

  if (!store) {
    notFound()
  }
  ...
```
`generateMetadata` in the same file (lines 31-48) also calls `getStoreById(id)`.

The query is not owner-scoped — `src/lib/queries/store.ts:27-45`:
```ts
export const getStoreById = async (id: string) => {
  'use cache'
  cacheTag(`store-${id}`)
  cacheLife({ stale: 300, revalidate: 3600, expire: 86_400 })
  const store = await db.store.findFirst({
    where: { id, deletedAt: null },
    include: { banner: true, logo: true, products: { orderBy: { category: 'asc' } } },
  })
  return store
}
```
Note: `getStoreById` is a **public, cached** query intentionally shared with the
public storefront (`stores/[city]/[id]/page.tsx`). Do NOT add `userId` scoping
*inside* `getStoreById` — that would break the public page and its caching.
The ownership check must live in the dashboard page.

The established ownership pattern for the authed dashboard is
`requireStoreOwner` in `src/lib/actions/store.tsx:19-40`:
```ts
async function requireStoreOwner(storeId: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('No autorizado. Por favor, inicia sesión.')
  const store = await db.store.findFirst({ where: { id: storeId, userId } })
  if (!store) throw new Error('Tienda no encontrada o no tienes permiso ...')
  return store
}
```
`auth` is imported from `@clerk/nextjs/server`. The dashboard page currently
does NOT import `auth`.

## Commands you will need

| Purpose   | Command            | Expected on success       |
|-----------|--------------------|---------------------------|
| Typecheck | `pnpm typecheck` (or `pnpm exec tsc --noEmit`) | exit 0 |
| Build     | `pnpm build`       | exit 0 (needs a DB URL)   |
| Tests     | `pnpm test`        | pass (only if plan 001 landed) |

## Scope

**In scope**:
- `src/app/(dashboard)/(routes)/dashboard/stores/[id]/page.tsx` — add the
  ownership guard in the default export (and, if trivial, guard the metadata).

**Out of scope** (do NOT touch):
- `src/lib/queries/store.ts` — `getStoreById` stays public/cached; do not add
  `userId` there.
- `src/proxy.ts` — middleware stays auth-only; per-object ownership is a page
  concern, not a matcher concern.
- The store-detail child components (`StoreInfoTab`, `StoreProductsTab`,
  `QRCodeCustomizer`, `StoreDangerZone`) — their mutations are already
  ownership-checked.

## Git workflow

- Branch: `advisor/003-dashboard-store-ownership-check`
- Commit style: `fix(dashboard): enforce store ownership on settings page`
- No AI/Claude attribution in commits.
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Guard the page render by ownership

In `src/app/(dashboard)/(routes)/dashboard/stores/[id]/page.tsx`, import `auth`
from `@clerk/nextjs/server`, and in the default `StorePage` component compare
the fetched store's `userId` to the authenticated user, calling `notFound()`
(already imported) on mismatch. Target shape:
```ts
import { auth } from '@clerk/nextjs/server'
...
export default async function StorePage({ params }: PageProps) {
  const { id } = await params
  const { userId } = await auth()
  const store = await getStoreById(id)

  if (!store || store.userId !== userId) {
    notFound()
  }
  ...
```
Use `notFound()` (not a permission-specific error) so the page does not reveal
that a store with that id exists but belongs to someone else.

**Verify**: `grep -n "store.userId !== userId" "src/app/(dashboard)/(routes)/dashboard/stores/[id]/page.tsx"`
→ one match.

### Step 2: Keep metadata from leaking the store name to non-owners (optional but recommended)

`generateMetadata` (same file) also fetches the store and returns its name in
the `<title>`. This is low-signal (the name is public elsewhere), but for
consistency you may guard it the same way, returning the generic
"Tienda no encontrada" branch when `store.userId !== userId`. If doing so adds
meaningful complexity, skip it and note the decision — the render guard in Step 1
is the security-critical one.

**Verify**: `pnpm typecheck` (or `pnpm exec tsc --noEmit`) → exit 0.

### Step 3: Manual verification

With `pnpm dev` and two accounts (A and B): as user B, navigate to
`/dashboard/stores/<a-store-id-owned-by-A>`. Confirm a 404 (not-found) renders,
and that user A still sees their own store settings normally.

**Verify**: cross-tenant access 404s; owner access unaffected.

## Test plan

- If plan 001's DB/integration harness exists: add a test asserting the
  dashboard loader returns not-found for a non-owner and the store for the
  owner. Model after the harness plan 001 established.
- Otherwise the Step 3 manual check is the gate; record what was exercised in
  the PR description.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "store.userId !== userId" "src/app/(dashboard)/(routes)/dashboard/stores/[id]/page.tsx"` → one match
- [ ] `grep -n "userId" src/lib/queries/store.ts` shows **no** new `userId`
      filter added to `getStoreById` (public query left intact)
- [ ] `pnpm typecheck` (or `pnpm exec tsc --noEmit`) exits 0
- [ ] Manual check (Step 3): non-owner gets 404, owner unaffected
- [ ] Only the in-scope page file changed (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The "Current state" excerpts don't match the live code.
- `getStoreById` has changed to already be owner-scoped (then this may be
  partially done — verify and report rather than double-guarding).
- Adding the `auth()` call forces the page out of its current caching mode and
  breaks the build in an unexpected way — report the exact error; do not work
  around it by weakening the check.

## Maintenance notes

- The public store page (`stores/[city]/[id]/page.tsx`) must keep using the
  unscoped `getStoreById` — do not "consolidate" the two callers into one
  owner-scoped query.
- If owner-only fields are later added to this page, this guard is what keeps
  them private — call it out in any future PR that touches this route.
- A reviewer should verify the guard uses `notFound()` (avoids existence
  disclosure) and that the public query was not modified.
