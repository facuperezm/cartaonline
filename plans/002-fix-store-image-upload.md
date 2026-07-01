# Plan 002: Fix store logo/banner uploads (allow replacement; stop orphan Logo rows)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 2f46689..HEAD -- src/lib/actions/store.tsx src/app/api/uploadthing/core.ts prisma/schema.prisma`
> If any changed since this plan was written, compare the "Current state"
> excerpts against the live code before proceeding; on a mismatch, treat it as
> a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S–M
- **Risk**: LOW
- **Depends on**: none (tests in Step 4 assume plan 001's `pnpm test` exists; if
  it doesn't, skip only the test-authoring sub-step and note it)
- **Category**: bug
- **Planned at**: commit `2f46689`, 2026-07-01

## Why this matters

A store's logo and banner can each be set **only once**. Because the DB keys the
`Logo`/`Banner` row by the UploadThing `key` (a fresh value on every upload)
while `storeId` is a `@unique` column that already belongs to the first row,
the *second* upload for a store hits a Prisma unique-constraint violation
(P2002) on `storeId`. The error is swallowed and the user sees no change. Every
banner upload additionally inserts a stray `Logo` row (wrong table, `storeId`
null) via the UploadThing completion callback, which is never linked or cleaned
up. Fixing this restores a core advertised feature (logo/banner management) and
stops orphan-row accumulation.

## Current state

**The upload flow** (two writes happen per upload):

1. Server callback fires after every upload —
`src/app/api/uploadthing/core.ts:17-30`:
```ts
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ file }) => {
      await db.logo.create({
        data: {
          name: file.name,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          status: 'SUCCESS',
          key: file.key,
        },
      })
    }),
} satisfies FileRouter
```
This *always* creates a `Logo` row with no `storeId`, for BOTH logo and banner
uploads (both buttons use `imageUploader` — see
`upload-btn-banner.tsx:84 createImage={createBanner}` and
`upload-btn-logo.tsx:66 createImage={createLogo}`, both routed through
`upload-dropzone.tsx:30 useUploadThing('imageUploader', …)`).

2. Client then calls `createImage({ key, storeId })`
(`upload-dropzone.tsx:31-34`), which reaches
`src/lib/actions/store.tsx:313-347`:
```ts
async function upsertStoreImage(
  kind: 'banner' | 'logo',
  { key, storeId }: { key: string; storeId: string },
) {
  try {
    await requireStoreOwner(storeId)

    const url = `${UPLOADTHING_S3_URL}/${key}`
    const create = { key, name: key, url, status: 'SUCCESS' as const, storeId }
    const update = { storeId, url }

    await (kind === 'banner'
      ? db.banner.upsert({ where: { key }, create, update })
      : db.logo.upsert({ where: { key }, create, update }))

    revalidateTag(`store-${storeId}`, 'max')
    return { success: true }
  } catch (error: unknown) {
    console.error(
      `Store ${kind} upsert error:`,
      error instanceof Error ? error.stack : error,
    )
    return { success: false, error: `Error al crear el ${kind}` }
  }
}

export async function createBanner(data: { key: string; storeId: string }) {
  return await upsertStoreImage('banner', data)
}

export async function createLogo(data: { key: string; storeId: string }) {
  return await upsertStoreImage('logo', data)
}
```
`UPLOADTHING_S3_URL` is defined at `store.tsx:13`.

**The schema** — `prisma/schema.prisma`:
```prisma
model Logo {
  id     String @id @default(cuid())
  key    String @unique
  ...
  store   Store?  @relation("StoreLogo", fields: [storeId], references: [id], onDelete: Cascade)
  storeId String? @unique   // line 36 — ONE logo per store
}
model Banner {  // same shape, storeId String? @unique  — line 51
```

**Why it breaks**: `upsert({ where: { key } })` with a new `key` every time
always takes the `create`/insert path for a *new row*, then tries to write a
`storeId` that another row for that store already holds → P2002 on the unique
`storeId`. The root cause is that the upsert should be keyed by the
**one-per-store relation (`storeId`)**, not by the per-upload `key`.

Ownership is already enforced inside `upsertStoreImage` via `requireStoreOwner`
(`store.tsx:19-40`) — keep that.

## Commands you will need

| Purpose   | Command            | Expected on success       |
|-----------|--------------------|---------------------------|
| Install   | `pnpm install`     | exit 0                    |
| Typecheck | `pnpm typecheck`   | exit 0 (needs plan 001; else `pnpm exec tsc --noEmit`) |
| Prisma    | `pnpm exec prisma generate` | exit 0           |
| Tests     | `pnpm test`        | pass (only if plan 001 landed) |
| Build     | `pnpm build`       | exit 0 (needs a DB URL)   |

## Scope

**In scope**:
- `src/app/api/uploadthing/core.ts` — stop the unconditional `db.logo.create`
- `src/lib/actions/store.tsx` — key the upsert by `storeId`

**Out of scope** (do NOT touch):
- `prisma/schema.prisma` — the `storeId @unique` (one-image-per-store) rule is
  correct and stays. Do NOT add a migration.
- The upload button/dropzone components (`upload-btn-*.tsx`,
  `upload-dropzone.tsx`) — the client contract (`{ key, storeId }`) is unchanged.
- The `imageUploader` file-size/type config — unrelated (see plan for
  import-menu validation, not this one).

## Git workflow

- Branch: `advisor/002-fix-store-image-upload`
- Commit style: `fix(stores): allow logo/banner replacement and stop orphan rows`
- No AI/Claude attribution in commits — repo owner is sole author.
- Do NOT push or open a PR unless instructed.

## Steps

### Step 1: Stop the UploadThing callback from writing a Logo row

In `src/app/api/uploadthing/core.ts`, the `onUploadComplete` callback must no
longer persist anything — persistence is owned by `createLogo`/`createBanner`,
which know the `storeId` and the correct table. Replace the `db.logo.create`
body so the callback is a no-op (or returns lightweight metadata) and no DB
write happens there. Keep the `handleAuth` middleware unchanged.

**Verify**: `grep -n "db.logo.create\|db.banner.create" src/app/api/uploadthing/core.ts`
→ no matches.

### Step 2: Key the image upsert on `storeId`, not `key`

In `src/lib/actions/store.tsx`, change `upsertStoreImage` so the upsert targets
the unique `storeId` relation. Target shape:
```ts
const create = { key, name: key, url, status: 'SUCCESS' as const, storeId }
const update = { key, url, status: 'SUCCESS' as const }

await (kind === 'banner'
  ? db.banner.upsert({ where: { storeId }, create, update })
  : db.logo.upsert({ where: { storeId }, create, update }))
```
This means: first upload → insert; every later upload → update the existing
row's `key`/`url` in place. No new row, so no `storeId` collision.

**Verify**: `grep -n "where: { storeId }" src/lib/actions/store.tsx` → matches
in `upsertStoreImage`; `pnpm exec tsc --noEmit` → exit 0 (Prisma's generated
types accept `where: { storeId }` because `storeId` is `@unique`; if it does
not typecheck, STOP — see conditions).

### Step 3: Typecheck and regenerate the client

**Verify**: `pnpm exec prisma generate` → exit 0, then
`pnpm typecheck` (or `pnpm exec tsc --noEmit`) → exit 0.

### Step 4: (If plan 001 landed) add a regression test

Only if `pnpm test` exists: add a test that documents the invariant — one
`Logo` and one `Banner` per `storeId`, and that a second `createLogo`/
`createBanner` with a different `key` updates the same row rather than throwing.
This needs the DB harness; if the integration harness from plan 001's follow-up
is not present, SKIP this step and note it in the status row instead of building
a DB harness here.

**Verify**: `pnpm test` → passes (or step skipped and noted).

### Step 5: Manual verification (required — the real bug is runtime)

With a working DB + UploadThing creds and `pnpm dev`: create a store, upload a
logo, then upload a *different* logo. Confirm the second upload succeeds and the
displayed logo changes. Repeat for the banner. Confirm no new `Logo` row with a
null `storeId` is created on a banner upload (check the DB, e.g.
`select id, "storeId" from "Logo" where "storeId" is null;` → no new rows from
banner uploads).

**Verify**: second logo AND second banner upload both succeed and update; no
null-`storeId` `Logo` rows accrue.

## Test plan

- Regression test (Step 4) asserts: replacing an image updates the single
  per-store row (no P2002), and no orphan `Logo` row is created. Model its
  structure after whatever the plan-001 test files established.
- If no DB test harness exists yet, the Step 5 manual check is the gate; record
  in the PR description exactly what was exercised.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -n "db.logo.create" src/app/api/uploadthing/core.ts` → no matches
- [ ] `grep -n "where: { storeId }" src/lib/actions/store.tsx` → matches inside
      `upsertStoreImage`
- [ ] `pnpm exec prisma generate` exits 0
- [ ] `pnpm typecheck` (or `pnpm exec tsc --noEmit`) exits 0
- [ ] Manual check (Step 5): second logo and second banner upload both replace
      successfully
- [ ] Only the two in-scope files changed (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The excerpts in "Current state" don't match the live code.
- `where: { storeId }` does not typecheck against the generated Prisma client
  (would mean `storeId` is no longer `@unique` — a schema change happened).
- Removing the `onUploadComplete` write breaks the logo flow because
  `createLogo` is NOT actually being called by the client (verify
  `upload-dropzone.tsx` still calls `createImage` before you conclude this).
- You find a data-migration need for existing orphan `Logo` rows — cleaning
  historical orphans is a separate task; report it, don't do it here.

## Maintenance notes

- After this, persistence of store images lives solely in
  `createLogo`/`createBanner` → `upsertStoreImage`. If a future change wants
  multiple images per store, the `storeId @unique` constraint AND this upsert
  key must both change together.
- A reviewer should confirm the callback no longer writes to the DB and that
  the upsert is keyed on the unique relation column.
- Follow-up (not in scope): a one-off cleanup of pre-existing null-`storeId`
  `Logo` rows created by the old callback.
