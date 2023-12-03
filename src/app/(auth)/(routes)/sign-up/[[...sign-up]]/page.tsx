import { OAuthSignIn } from "@/components/auth/oauth-signin"
import { Shell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Signin() {
  const user = await currentUser()
  if (user) redirect("/")

  return (
    <Shell className="h-screen max-w-lg">
      <div className="align-center flex justify-center">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Registrate</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <OAuthSignIn />
          </CardContent>
          <CardFooter>
            <div className="text-muted-foreground text-sm">
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
  )
}
