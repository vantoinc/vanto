import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const urlError = new URL("/", nextUrl.origin);

  const publicPaths = ["/"];
  if (
    publicPaths.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(urlError);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
