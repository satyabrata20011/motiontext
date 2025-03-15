import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/posts(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = auth(); // Ensure auth is being called within middleware scope
    if (!userId) {
      throw new Error("Unauthorized");
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // Match all routes except static files (_next/* or .*)
    "/(api|trpc)(.*)", // Match API and trpc routes
  ],
};
