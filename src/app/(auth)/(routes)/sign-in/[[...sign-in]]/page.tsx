import { type Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shell } from "@/components/shell";
import { SignInForm } from "@/app/(auth)/_components/auth-sign-in";
import { OAuthSignIn } from "@/app/(auth)/_components/oauth-signin";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Iniciar sesión",
  description: "Inicia sesión a tu cuenta en Carta Online",
};

export default function SignIn() {
  return (
    <Shell className="h-screen max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Inicia sesion</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                o podes registrarte con
              </span>
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              Todavía no tenes cuenta?
            </span>
            <Link
              aria-label="Registrate"
              href="/sign-up"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Registrate
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  );
}
