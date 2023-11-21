import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { OAuthSignIn } from "@/components/auth/oauth-signin";
import { Shell } from "@/components/shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Signin() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <Shell className="max-w-lg h-screen">
      <div className="flex justify-center align-center">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Registrate</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <OAuthSignIn />
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
