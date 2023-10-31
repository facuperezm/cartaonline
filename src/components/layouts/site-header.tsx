import Link from "next/link";

import { BookOpenCheck } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import {
  auth,
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  clerkClient,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function SiteHeader() {
  const { userId } = auth();

  let user = null;
  if (userId) {
    user = await clerkClient.users.getUser(userId);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex flex-row container items-center h-16">
        <MobileNav />
        <nav className="flex justify-between w-full items-center space-x-2">
          <Link href="/" className="font-bold flex gap-3">
            <BookOpenCheck />
            <span className="relative">
              <span
                className="absolute block -skew-y-3 bg-pink-400 -inset-1"
                aria-hidden="true"
              ></span>
              <span className="relative text-white">Carta Online</span>
            </span>
          </Link>
          <SignedIn>
            <div className="flex gap-3 items-center">
              {user && <p>Hey {user.firstName || "stranger"}!</p>}
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton />
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
