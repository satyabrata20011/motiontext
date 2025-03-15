import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function adminAuthMiddleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminPath) {
    const session = request.cookies.get("admin_session");
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}
