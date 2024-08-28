import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

const publicPaths = ["/login", "/product/:id"];

const isPublicPath = (path: string): boolean => {
  if (path === "/") return false;
  return publicPaths.some((pattern) => {
    const regexPattern = pattern
      .replace(/\//g, "\\/")
      .replace(/:[\w]+/g, "[^\\/]+");
    return new RegExp(`^${regexPattern}$`).test(path);
  });
};

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;
  const urlError = new URL("/login", nextUrl.origin);
  const dashboard = new URL("/dashboard", nextUrl.origin);

  if (nextUrl.pathname === "/") {
    return NextResponse.redirect(dashboard);
  }

  if (isPublicPath(nextUrl.pathname)) {
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
