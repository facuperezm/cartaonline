"use client";

import { UserProfile as ClerkUserProfile } from "@clerk/nextjs";
import { type Theme } from "@clerk/types";

const appearance: Theme = {
  baseTheme: undefined,
  variables: {
    borderRadius: "0.25rem",
  },
  elements: {
    card: "shadow-none",
    navbar: "hidden",
    navbarMobileMenuButton: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
  },
};

export function UserProfile() {
  return (
    <ClerkUserProfile
      appearance={{
        ...appearance,
        baseTheme: appearance.baseTheme,
        variables: {
          ...appearance.variables,
          colorBackground: "#fafafa",
        },
      }}
    />
  );
}
