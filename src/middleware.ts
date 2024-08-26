import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const urlError = new URL("/", nextUrl.origin);

  const publicPaths = ["/", "/login"];
  if (
    publicPaths.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(urlError);
  }

  if (
    nextUrl.pathname.startsWith("/dashboard") &&
    req.auth?.user.role !== "admin"
  ) {
    return NextResponse.redirect(urlError);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|upload|favicon.ico).*)"],
};
