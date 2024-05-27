import "@/styles/globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Provider from "@/components/Providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Carta Online",
    "Menu digital",
    "Restaurantes",
    "Bares",
    "Cafeterias",
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
          "min-h-screen scroll-smooth antialiased",
          roboto.className,
        )}
        suppressHydrationWarning
      >
        <Provider>
          <body>{children}</body>
          <Toaster richColors closeButton />
        </Provider>
      </html>
    </ClerkProvider>
  );
}
