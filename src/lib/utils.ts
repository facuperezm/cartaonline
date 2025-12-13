import { isClerkAPIResponseError } from '@clerk/nextjs/errors'
import type { User } from '@clerk/nextjs/server'
import { type ClassValue, clsx } from 'clsx'
// Lazy import heavy image-conversion only when needed
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import * as z from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    return (
      err.issues[0]?.message ??
      'Hubo un error, porfavor probá denuevo más tarde'
    )
  }
  if (isClerkAPIResponseError(err)) {
    return (
      err.errors[0]?.longMessage ??
      'Hubo un error, porfavor probá denuevo más tarde'
    )
  }
  if (err instanceof Error) {
    return err.message
  }
  return 'Hubo un error, porfavor probá denuevo más tarde'
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err)
  return toast.error(errorMessage)
}

export function getUserEmail(user: User | null) {
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ''

  return email
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat('en-US', {
    month: opts.month ?? 'long',
    day: opts.day ?? 'numeric',
    year: opts.year ?? 'numeric',
    ...opts,
  }).format(new Date(date))
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message)
    return toast(errors.join('\n'))
  }
  if (err instanceof Error) {
    return toast(err.message)
  }
  return toast('Something went wrong, please try again later.')
}

export async function compressImage(file: Blob, quality: number, name: string) {
  try {
    const imageConversion = await import('image-conversion')
    const compressedBlob = await imageConversion.compress(file, {
      quality,
    })
    // Create a File object with the compressedBlob
    const compressedFile = new File(
      [compressedBlob],
      `${name.split('.')[0]}.webp`,
      {
        lastModified: Date.now(),
      },
    )
    return compressedFile
  } catch (error) {
    console.error('Compression failed:', error)
    throw error
  }
}

export function normalizeCityName(city: string) {
  return city
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l: string) => l.toUpperCase())
}
