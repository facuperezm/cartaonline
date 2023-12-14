import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Manage Store",
  description: "Manage your store",
};

interface UpdateStorePageProps {
  params: {
    id: string;
  };
}

export default async function UpdateStorePage({
  params,
}: UpdateStorePageProps) {
  const storeId = Number(params.id);

  return (
    <div className="space-y-10">
      <Card as="section">
        <CardHeader className="space-y-1">
          <CardTitle className="line-clamp-1 text-2xl">
            Manage Stripe account
          </CardTitle>
          <CardDescription>
            Manage your Stripe account and view your payouts
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2.5">
            <Label htmlFor="stripe-account-email">Email</Label>
            <Input
              id="stripe-account-email"
              name="stripeAccountEmail"
              readOnly
            />
          </div>
          <div className="grid gap-2.5">
            <Label htmlFor="stripe-account-country">Country</Label>
            <Input
              id="stripe-account-country"
              name="stripeAccountCountry"
              readOnly
            />
          </div>
          <div className="grid gap-2.5">
            <Label htmlFor="stripe-account-currency">Currency</Label>
            <Input
              id="stripe-account-currency"
              name="stripeAccountCurrency"
              className="uppercase"
              readOnly
            />
          </div>
          <div className="grid gap-2.5">
            <Label htmlFor="stripe-account-created">Created</Label>
            <Input
              id="stripe-account-created"
              name="stripeAccountCreated"
              readOnly
            />
          </div>
        </CardContent>
        <CardFooter>
          <Link
            aria-label="Manage Stripe account"
            href="https://dashboard.stripe.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({
                className: "text-center",
              }),
            )}
          >
            Manage Stripe account
          </Link>
        </CardFooter>
      </Card>

      <Card as="section">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update your store</CardTitle>
          <CardDescription>
            Update your store name and description, or delete it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid w-full max-w-xl gap-5">
            <div className="grid gap-2.5">
              <Label htmlFor="update-store-name">Name</Label>
              <Input
                id="update-store-name"
                aria-describedby="update-store-name-description"
                name="name"
                required
                minLength={3}
                maxLength={50}
                placeholder="Type store name here."
              />
            </div>
            <div className="grid gap-2.5">
              <Label htmlFor="update-store-description">Description</Label>
              <Textarea
                id="update-store-description"
                aria-describedby="update-store-description-description"
                name="description"
                minLength={3}
                maxLength={255}
                placeholder="Type store description here."
              />
            </div>
            <div className="xs:flex-row flex flex-col gap-2"></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
