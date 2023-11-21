import { LogOutButtons } from "@/components/auth/log-out-buttons";
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
import Link from "next/link";

export default function Signout() {
  return (
    <Shell className="max-w-lg h-screen">
      <div className="flex justify-center align-center m-auto h-screen">
        <Card className="m-auto bg-background">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Queres desloguear?</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4"></CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <LogOutButtons />
          </CardFooter>
        </Card>
      </div>
    </Shell>
  );
}
