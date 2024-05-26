import type { User } from "@clerk/nextjs/server";
import { clsx, type ClassValue } from "clsx";
import * as imageConversion from "image-conversion";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function catchClerkError(err: z.ZodError) {
  const unknownErr = "Something went wrong, please try again later.";

  const errors = err.issues.map((issue) => {
    return issue.message;
  });
  return toast.error(errors.join("\n") || unknownErr);
}

export function getUserEmail(user: User | null) {
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? "";

  return email;
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast(err.message);
  } else {
    return toast("Something went wrong, please try again later.");
  }
}

export async function compressImage(file: Blob, quality: number, name: string) {
  try {
    const compressedBlob = await imageConversion.compress(file, {
      quality,
    });
    // Create a File object with the compressedBlob
    const compressedFile = new File(
      [compressedBlob],
      `${name.split(".")[0]}.webp`,
      {
        lastModified: Date.now(),
      },
    );
    return compressedFile;
  } catch (error) {
    console.error("Compression failed:", error);
    throw error;
  }
}
