import type { Metadata } from "next";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "page-header";

import { Shell } from "@/components/shell";
import { UserProfile } from "@/app/(auth)/_components/user-profile";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account settings",
};

export default function AccountPage() {
  return (
    <Shell variant="sidebar">
      <PageHeader
        id="account-header"
        aria-labelledby="account-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Account</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your account settings
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="w-full overflow-hidden"
      >
        <UserProfile />
      </section>
    </Shell>
  );
}
