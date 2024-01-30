import "@/styles/globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "TRPC",
    "T3-App",
    "Carta",
    "Menu",
  ],
  authors: [
    {
      name: "Facundo Perez Montalvo",
      url: "https://github.com/facuperezm",
    },
  ],
  creator: "Facundo Perez Montalvo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/api/og.tsx`],
    creator: "@facuperezm",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
          termsPageUrl: "https://clerk.com/terms",
        },
      }}
    >
      <html
        lang="en"
        className={cn(
          "min-h-screen scroll-smooth bg-background antialiased",
          roboto.className,
        )}
        suppressHydrationWarning
      >
        <Providers>
          <body>{children}</body>
          <Toaster richColors closeButton />
        </Providers>
      </html>
    </ClerkProvider>
  );
}
