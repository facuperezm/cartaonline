"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  EmailLinkErrorCode,
  isEmailLinkError,
  useClerk,
  useSignUp,
} from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { catchClerkError } from "@/lib/utils";
import { authSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

type Inputs = z.infer<typeof authSchema>;

  function Verification() {
    const [
      verificationStatus,
      setVerificationStatus,
    ] = React.useState("loading");
    
    const { handleMagicLinkVerification } = useClerk();
    
    React.useEffect(() => {
      async function verify() {
        try {
          await handleMagicLinkVerification();
          setVerificationStatus("verified");
        } catch (err) {
          // Verification has failed.
          let status = "failed";
          if (isEmailLinkError(err) && err.code === EmailLinkErrorCode.Expired) {
            status = "expired";
          }
          setVerificationStatus(status);
        }
      }
      verify();
    }, []);


export function SignUpForm() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isPending, startTransition] = React.useTransition();
  const [verified, setVerified] = React.useState(false);
  const [expired, setExpired] = React.useState(false);
  const { startMagicFlow, cancelMagicLinkFlow } =

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: Inputs) {
    if (!isLoaded) return;
    setVerified(false);

    startTransition(async () => {
      try {
        await signUp.create({
          emailAddress: data.email,
        });

        const su = await startMagicFlow({
          redirectUrl: "http://localhost:3000/signup",
        });
        // Send email verification code
        // await signUp.prepareEmailAddressVerification({
        //   strategy: "email_link",
        //   redirectUrl: `${window.location.origin}/signup/verify-email`,
        // });

        const verification = su.verifications.emailAddress;
        if (verification.verifiedFromTheSameClient()) {
          setVerified(true);
          // If you're handling the verification result from
          // another route/component, you should return here.
          // See the <MagicLinkVerification/> component as an
          // example below.
          // If you want to complete the flow on this tab,
          // don't return. Check the sign up status instead.
          return;
        } else if (verification.status === "expired") {
          setExpired(true);
        }

        if (su.status === "complete") {
          // Sign up is complete, we have a session.
          // Navigate to the after sign up URL.
          setActive({
            session: su.createdSessionId,
            beforeEmit: () => router.push("/dashboard/stores"),
          });
          return;
        }

        toast.message("Check your email", {
          description: "We sent you a 6-digit verification code.",
        });
      } catch (err) {
        catchClerkError(err);
      }
    });
  }

  if (expired) {
    return <div>Magic link has expired</div>;
  }

  if (verified) {
    return <div>Signed in on other tab</div>;
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="rodneymullen180@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  );
}
