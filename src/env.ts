import { z } from "zod";

/**
 * Environment variable validation schema.
 * Validates at build time and runtime to catch missing/invalid env vars early.
 */

const serverEnvSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // Clerk (server-side)
  CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),

  // UploadThing
  UPLOADTHING_SECRET: z.string().min(1, "UPLOADTHING_SECRET is required"),
  UPLOADTHING_APP_ID: z.string().min(1, "UPLOADTHING_APP_ID is required"),

  // OpenAI (optional - only needed for AI menu import)
  OPENAI_API_KEY: z.string().optional(),

  // MercadoPago (optional - payments feature in development)
  MP_ACCESS_TOKEN: z.string().optional(),

  // Node environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const clientEnvSchema = z.object({
  // App URL - required for metadata, OG images, etc.
  NEXT_PUBLIC_APP_URL: z.string().url("NEXT_PUBLIC_APP_URL must be a valid URL"),

  // Clerk (client-side)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required"),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default("/sign-in"),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default("/sign-up"),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().default("/dashboard/stores"),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().default("/dashboard/stores"),
});

// Validate server environment variables
const serverEnvResult = serverEnvSchema.safeParse(process.env);

if (!serverEnvResult.success) {
  console.error(
    "Invalid server environment variables:",
    serverEnvResult.error.flatten().fieldErrors,
  );
  throw new Error("Invalid server environment variables");
}

// Validate client environment variables
const clientEnvResult = clientEnvSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
});

if (!clientEnvResult.success) {
  console.error(
    "Invalid client environment variables:",
    clientEnvResult.error.flatten().fieldErrors,
  );
  throw new Error("Invalid client environment variables");
}

export const serverEnv = serverEnvResult.data;
export const clientEnv = clientEnvResult.data;

// Type-safe environment access
export const env = {
  ...serverEnv,
  ...clientEnv,
} as const;
