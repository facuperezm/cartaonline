import { OAuthSignIn } from "@/components/auth/oauth-signin";
import { Shell } from "@/components/shell";
import { SignInForm } from "@/components/forms/signin-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Signin() {
  return (
    <Shell className="max-w-lg">
      <div className="flex justify-center align-center m-auto h-screen">
        <Card className="m-auto bg-background">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Bienvenido a Cartaonline</CardTitle>
            <CardDescription>
              Inicia sesion para administrar tu empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <OAuthSignIn />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O continua con
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
      </div>
    </Shell>
  );
}
