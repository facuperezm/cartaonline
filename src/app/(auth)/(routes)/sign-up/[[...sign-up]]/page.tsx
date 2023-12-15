import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/components/auth-sign-up";
import { OAuthSignIn } from "@/components/auth/oauth-signin";
import { Shell } from "@/components/shell";

export default async function Signin() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <Shell className="h-screen max-w-lg">
      <div className="flex items-center justify-center">
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
                  Or continue with
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
                href="/signin"
                className="text-primary underline-offset-4 transition-colors hover:underline"
              >
                Inicia sesion
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Shell>
  );
}
