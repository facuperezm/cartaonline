import { OAuthSignIn } from "@/components/auth/oauth-signin"
import { Shell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function Signin() {
  return (
    <Shell className="h-screen max-w-lg">
      <div className="align-center m-auto flex h-screen justify-center">
        <Card className="bg-background m-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Inicia sesion</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <OAuthSignIn />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-muted-foreground text-sm">
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
  )
}
