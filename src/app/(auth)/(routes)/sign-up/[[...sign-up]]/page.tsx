import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
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

export default async function Signin() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <Shell className="max-w-lg">
      <div className="flex justify-center align-center m-auto h-screen">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>
              Choose your preferred sign up method
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
                  Or continue with
                </span>
              </div>
            </div>
            <SignUpForm />
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                aria-label="Sign in"
                href="/signin"
                className="text-primary underline-offset-4 transition-colors hover:underline"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Shell>
  );
}
