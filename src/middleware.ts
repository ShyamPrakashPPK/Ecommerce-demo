import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("adminToken")?.value;

  // If no token and trying to access any /admin page → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin((?!/login).*)", // ✅ match all /admin routes EXCEPT /admin/login
  ],
};
