import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOutButtons } from "@/components/auth/log-out-buttons";
import { Shell } from "@/components/shell";

export default function Signout() {
  return (
    <Shell className="h-screen max-w-lg">
      <div className="m-auto flex h-screen items-center justify-center">
        <Card className="m-auto bg-background">
          <CardHeader className="">
            <CardTitle className="text-2xl">Queres cerrar sesión?</CardTitle>
          </CardHeader>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <LogOutButtons />
          </CardFooter>
        </Card>
      </div>
    </Shell>
  );
}
