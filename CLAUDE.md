# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

First rule: Be extremely concise. Sacrifice grammar for the sake of concision.

## Project Overview

**Carta Online** is a streamlined store management application designed for local restaurants. It enables restaurant owners to create digital menus, manage products, and share their menu via custom URLs and QR codes. The application features a public-facing storefront for customers and an authenticated dashboard for store owners.

## Tech Stack

- **Next.js 15** with App Router and React 19
- **Prisma ORM** with PostgreSQL
- **Clerk** for authentication
- **UploadThing** for image uploads
- **Vercel AI SDK** + **OpenAI** for AI menu extraction
- **Tailwind CSS** + **shadcn/ui** for styling
- **Zod** for schema validation
- **React Hook Form** for forms
- **Vitest** for testing
- **MercadoPago** integration for payments (in development)

## Development Commands

```bash
# Start development server with Turbopack
pnpm run dev

# Build for production (generates Prisma client first)
pnpm run build

# Lint code
pnpm run lint

# Fix linting issues
pnpm run lint:fix

# Format code with Prettier
pnpm run format

# Run tests with Vitest
pnpm run test

# Database operations
npx prisma generate           # Generate Prisma client
npx prisma db push            # Push schema changes to database
npx prisma studio             # Open Prisma Studio GUI
npx prisma migrate dev        # Create and apply migrations
tsx prisma/seed.ts            # Seed database
```

## Database Architecture

The application uses Prisma with a PostgreSQL database. Key models:

- **User**: Links to Clerk userId, owns multiple stores
- **Store**: Restaurant/business entity with name, description, address, phone, slug, status (ACTIVE/INACTIVE), and city relationship
- **Product**: Menu items belonging to a store with category (Comida/Bebida/Postre)
- **City**: Geographic locations for organizing stores
- **Logo** & **Banner**: Image uploads for stores (1:1 relationship)
- **Payment**: MercadoPago payment records
- **Subscription**: Store subscription plans (BASIC/PRO/ENTERPRISE)

Important relationships:

- Store belongs to User (via Clerk's userId)
- Store belongs to City
- Store has one Logo and one Banner
- Products belong to Store (cascade delete)
- Store has many Payments and one Subscription

## Application Structure

The app uses Next.js route groups:

### (lobby) - Public Routes

- `/` - Homepage
- `/stores/[city]` - Stores by city
- `/stores/[city]/[id]` - Individual store menu page (public storefront)

### (auth) - Authentication Routes

- `/sign-in`, `/sign-up`, `/sign-out` - Clerk authentication pages
- `/verify-email`, `/sso-callback` - Auth callbacks

### (dashboard) - Protected Routes

Protected by Clerk middleware (see middleware.ts). All routes under `/dashboard`:

- `/dashboard/stores` - List user's stores
- `/dashboard/stores/new` - Create new store
- `/dashboard/stores/[id]` - Store settings with tabs (Configuration, QR Code)
- `/dashboard/billing` - Subscription management
- `/dashboard/account` - User profile (Clerk UserProfile component)

### Key Directories

- `src/lib/actions/` - Server Actions for data mutations (store.tsx, product.tsx)
- `src/lib/queries/` - Database query functions
- `src/lib/validations/` - Zod schemas for form validation
- `src/components/ui/` - shadcn/ui components
- `src/app/(dashboard)/_components/` - Dashboard-specific components (tables, forms, settings)
- `src/app/(lobby)/_components/` - Public storefront components

## Important Patterns

### Server Actions

All data mutations use Next.js Server Actions (marked with `"use server"`):

- Located in `src/lib/actions/store.tsx` and `src/lib/actions/product.tsx`
- Handle CRUD operations with proper error handling
- Use `redirect()` for navigation after mutations
- Use `revalidatePath()` to refresh cached data

### Authentication

- Clerk handles all auth (see src/middleware.ts)
- Protected routes check `isProtectedRoute(["/dashboard(.*)"])`
- Server actions use `auth()` from "@clerk/nextjs/server" to get userId
- User model stores Clerk's external userId

### Image Uploads

- UploadThing handles logo and banner uploads
- File router defined in `src/app/api/uploadthing/core.ts`
- Server actions `createLogo()` and `createBanner()` in lib/actions/store.tsx
- Images stored at `https://uploadthing-prod.s3.us-west-2.amazonaws.com/`

### Form Validation

- All forms use Zod schemas from `src/lib/validations/`
- React Hook Form for form state management
- Server-side validation in Server Actions

### Database Access

- Prisma client exported as `db` from `src/lib/db.ts`
- Uses connection pooling in development (cached global instance)
- Always use `db` instead of creating new PrismaClient instances

## Path Aliases

TypeScript paths configured in tsconfig.json:

- `@/*` maps to `src/*`

Example: `import { db } from "@/lib/db"`

## Environment Variables

Required variables (see .env.example):

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_*` - Clerk authentication keys and URLs
- `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` - UploadThing configuration
- `OPENAI_API_KEY` - OpenAI API key for AI menu extraction
- `MP_ACCESS_TOKEN` - MercadoPago access token (for payments feature)
- `VERCEL_URL` or `NEXT_PUBLIC_APP_URL` - Application base URL

## Key Implementation Notes

1. **Store URLs**: Stores can be accessed via `/stores/[city]/[id]` or via custom slug (if set)
2. **Store Status**: Stores have ACTIVE/INACTIVE status for temporary hiding
3. **Data Tables**: Dashboard uses TanStack Table with custom DataTable components in `src/app/(dashboard)/_components/tables/`
4. **QR Codes**: Generated client-side using qrcode.react for store sharing
5. **Soft Deletes**: Products and stores have deletedAt timestamps but currently use hard deletes
6. **Products**: Categorized as Comida (Food), Bebida (Drink), or Postre (Dessert)
7. **AI Menu Import**: Uses Vercel AI SDK + OpenAI GPT-4o to extract products from uploaded images/PDFs
   - Server Action: `src/lib/actions/import-menu.ts`
   - Dialog component: `src/app/(dashboard)/_components/import-menu-dialog.tsx`
   - Uses `generateObject()` with Zod schema for structured extraction

## Testing

Vitest is configured but test files don't exist yet. When writing tests:

- Use `@testing-library/react` for component tests
- Place test files alongside source files with `.test.ts(x)` extension
- Test utilities are available: `@testing-library/jest-dom`, `jsdom`
