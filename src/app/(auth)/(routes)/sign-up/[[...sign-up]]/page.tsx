import { type Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shell } from "@/components/shell";
import { SignUpForm } from "@/app/(auth)/_components/auth-sign-up";
import { OAuthSignIn } from "@/app/(auth)/_components/oauth-signin";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Registrate",
  description: "Registrá tu cuenta en Carta Online",
};

async function AuthCheck() {
  await connection();
  const user = await currentUser();
  if (user) redirect("/");
  return null;
}

export default function SignUp() {
  return (
    <Shell className="h-screen max-w-lg">
      <Suspense fallback={null}>
        <AuthCheck />
      </Suspense>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Registrate</CardTitle>
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
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Ya tenes una cuenta?{" "}
            <Link
              aria-label="Sign in"
              href="/sign-in"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Inicia sesion
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  );
}
