import { type Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shell } from "@/components/shell";
import { VerifyEmailForm } from "@/app/(auth)/(routes)/sign-up/verify-email/_components/verify-email-form";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "Verificá tu mail",
  description: "Verificá tu casilla de entrada",
};

export default function VerifyEmailPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Verifica tu cuenta de email
          </CardTitle>
          <CardDescription>
            Te enviamos un email con un link para verificar tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </Shell>
  );
}
