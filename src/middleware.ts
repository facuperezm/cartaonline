import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// export default authMiddleware({
//   publicRoutes: ,
//   async afterAuth(auth, req) {
//     if (auth.isPublicRoute) {
//       return NextResponse.next();
//     }

//     const url = new URL(req.nextUrl.origin);

//     if (!auth.userId) {
//       url.pathname = "/sign-in";
//       return NextResponse.redirect(url);
//     }

//     const user = await clerkClient.users.getUser(auth.userId);

//     if (!user) {
//       throw new Error("User not found.");
//     }
//   },
// });

const isPublicRoute = createRouteMatcher([
  "/",
  "/share/(.*)",
  "/stores",
  "/stores/(.*)",
  "/pricing",
  "sign-up",
  "signup",
  "/sso-callback(.*)",
  "/api/uploadthing",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
