import { NextResponse } from "next/server";
import { authMiddleware, clerkClient } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/stores",
    "/stores/(.*)",
    "sign-up",
    "signup",
    "/sso-callback(.*)",
    "/api/uploadthing",
    "/api/uploadthing/(.*)",
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }

    const user = await clerkClient.users.getUser(auth.userId);

    if (!user) {
      throw new Error("User not found.");
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
