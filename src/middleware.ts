import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/share/(.*)",
  "/stores",
  "/stores/(.*)",
  "/pricing",
  "/sign-in",
  "/sign-up",
  "/sso-callback(.*)",
  "/api/uploadthing",
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    const url = new URL(req.nextUrl.origin);
    auth().protect({
      unauthenticatedUrl: `${url.origin}/sign-in`,
      unauthorizedUrl: `${url.origin}/dashboard/stores`,
    });
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
