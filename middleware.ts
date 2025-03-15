import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/posts(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = auth(); // Ensure auth is being called within middleware scope
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
  }
});


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // Ignore static files and Next.js internals
    "/(api|trpc)(.*)", // Match API and trpc routes
  ],
};

