# Plan 006: Invoke `deleteProduct` safely (pending state + error handling)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 2f46689..HEAD -- "src/app/(dashboard)/(routes)/dashboard/stores/[id]/_components/delete-product.tsx" src/lib/actions/product.tsx`
> If either changed since this plan was written, compare the "Current state"
> excerpts against the live code first; on a mismatch, treat it as a STOP
> condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `2f46689`, 2026-07-01

## Why this matters

The "Borrar producto" button fires the `deleteProduct` server action
**fire-and-forget**: no `await`, no transition, no `.catch`. The action throws
on unauthorized / not-owner / not-found and calls `redirect()` on success. So on
any failure the rejected promise is unhandled and the user gets **no feedback**;
on success the user is redirected with no pending/disabled state; and a rapid
double-click issues duplicate deletes. This is a small, self-contained fix that
makes a destructive action behave predictably.

## Current state

`src/app/(dashboard)/(routes)/dashboard/stores/[id]/_components/delete-product.tsx`
(whole file — note there is **no** `'use client'` directive today; it works only
because it is imported by the client table `columns.tsx:6,106`):
```tsx
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { deleteProduct } from '@/lib/actions/product'

export default function DeleteProduct({ id }: { id: string }) {
  return (
    <DropdownMenuItem asChild className="">
      <Button
        className="relative flex h-8 w-full cursor-default ..."
        onClick={() => deleteProduct({ productId: id })}
        variant="destructive"
      >
        Borrar producto
      </Button>
    </DropdownMenuItem>
  )
}
```

The action — `src/lib/actions/product.tsx:21-62`:
```ts
export async function deleteProduct({ productId }: { productId: string }) {
  const { userId } = await auth()
  if (!userId) throw new Error('No autorizado. Por favor, inicia sesión.')
  noStore()
  try {
    const product = await db.product.findFirst({ where: { id: productId }, include: { store: true } })
    if (!product) throw new Error('Producto no encontrado.')
    if (product.store.userId !== userId) throw new Error('No tienes permiso para eliminar este producto.')
    await db.product.delete({ where: { id: productId } })
    revalidateTag(`store-${product.storeId}`, 'max')
    revalidatePath('/dashboard/stores')
    redirect('/dashboard/stores')     // throws NEXT_REDIRECT on success — expected
  } catch (err) {
    throw err instanceof Error ? err : new Error('Ocurrió un error. Por favor, intenta de nuevo.')
  }
}
```

Toast convention: the repo uses `sonner` (`import { toast } from 'sonner'`,
e.g. in `upload-dropzone.tsx:7,44`). There is also a `showErrorToast(err)` helper
in `src/lib/utils.ts:33`. Use one of these for the error path.

`useTransition` requires the file to be a client component.

## Commands you will need

| Purpose   | Command            | Expected on success       |
|-----------|--------------------|---------------------------|
| Typecheck | `pnpm typecheck` (or `pnpm exec tsc --noEmit`) | exit 0 |
| Lint      | `pnpm lint`        | exit 0                    |

## Scope

**In scope**:
- `src/app/(dashboard)/(routes)/dashboard/stores/[id]/_components/delete-product.tsx`

**Out of scope** (do NOT touch):
- `src/lib/actions/product.tsx` — the action's ownership checks and redirect are
  correct; this plan only fixes how the client *invokes* it.
- Any change to the redirect target or a confirmation dialog. A confirm-before-
  delete UX is a reasonable follow-up but is NOT part of this plan (and note:
  browser-native `confirm()` must be avoided — that would be a separate,
  component-based dialog task).

## Git workflow

- Branch: `advisor/006-safe-delete-product`
- Commit style: `fix(dashboard): handle deleteProduct pending and error states`
- No AI/Claude attribution in commits.
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Make the component a client component and wrap the call in a transition

Add `'use client'` at the top. Use `useTransition`; in the click handler call
`startTransition` with an async body that `await`s `deleteProduct`, wrapped in
`try/catch`. On error, show a toast (via `sonner`'s `toast.error(...)` or
`showErrorToast(err)` from `@/lib/utils`). Disable the button while `isPending`.

Target shape:
```tsx
'use client'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { deleteProduct } from '@/lib/actions/product'

export default function DeleteProduct({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  return (
    <DropdownMenuItem asChild>
      <Button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            try {
              await deleteProduct({ productId: id })
            } catch (err) {
              toast.error(err instanceof Error ? err.message : 'No se pudo borrar el producto')
            }
          })
        }
        variant="destructive"
        className="..."   // keep the existing className
      >
        {isPending ? 'Borrando…' : 'Borrar producto'}
      </Button>
    </DropdownMenuItem>
  )
}
```
Keep the existing `className` string exactly as-is.

Note on the success redirect: `deleteProduct` calls `redirect()`, which throws a
`NEXT_REDIRECT` sentinel handled by Next's action runtime — it does not surface
as a normal error to the client catch, so the redirect still works. Do not add a
success toast (the user is navigated away).

**Verify**: `grep -n "useTransition\|'use client'\|disabled={isPending}" "src/app/(dashboard)/(routes)/dashboard/stores/[id]/_components/delete-product.tsx"`
→ all three match.

### Step 2: Typecheck and lint

**Verify**: `pnpm typecheck` (or `pnpm exec tsc --noEmit`) → exit 0;
`pnpm lint` → exit 0.

### Step 3: Manual verification

With `pnpm dev`: delete a product you own → the button shows "Borrando…", then
you land on `/dashboard/stores` and the product is gone. Then, to exercise the
error path, you can temporarily confirm that an action rejection surfaces a toast
(e.g. by deleting an already-deleted id via a second rapid click) — a toast
should appear rather than a silent failure.

## Test plan

- This is a UI-interaction fix; the gate is the grep checks + typecheck/lint +
  the Step 3 manual check. No unit test is required (the action itself is covered
  by the ownership-check follow-up in the test backlog).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] The component starts with `'use client'`
- [ ] `grep -n "useTransition" "src/app/(dashboard)/(routes)/dashboard/stores/[id]/_components/delete-product.tsx"` → match
- [ ] `grep -n "disabled={isPending}" "src/app/(dashboard)/(routes)/dashboard/stores/[id]/_components/delete-product.tsx"` → match
- [ ] `pnpm typecheck` exits 0 and `pnpm lint` exits 0
- [ ] Only the one in-scope file changed (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The "Current state" excerpt of `delete-product.tsx` doesn't match the live
  code.
- Adding `'use client'` breaks the build because the file is also imported by a
  server component in a way that conflicts — report the exact error.
- The success path stops redirecting after the change (would indicate the
  `NEXT_REDIRECT` is being swallowed by your `catch` — re-throw redirect
  sentinels if so, matching the pattern in `store.tsx:246-256`).

## Maintenance notes

- Follow-up (deferred): a confirmation dialog before delete (component-based,
  never `window.confirm`) would further protect this destructive action.
- A reviewer should confirm the catch does not swallow the `NEXT_REDIRECT`
  sentinel and that the button is disabled while pending.
