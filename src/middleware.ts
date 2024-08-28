import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

const publicPaths = ["/", "/login", "/product/:id"];

const isPublicPath = (path: string): boolean => {
  return publicPaths.some((pattern) => {
    const regexPattern = pattern
      .replace(/\//g, "\\/")
      .replace(/:[\w]+/g, "[^\\/]+");
    return new RegExp(`^${regexPattern}$`).test(path);
  });
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const urlError = new URL("/", nextUrl.origin);

  if (isPublicPath(nextUrl.pathname) || nextUrl.pathname.startsWith("/api/")) {
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
