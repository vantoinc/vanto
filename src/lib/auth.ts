import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Session } from "next-auth";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user && user.id) {
        token.id = user.id;
      }
      if (user && user.email === process.env.AUTH_EMAIL_ADMIN) {
        token.role = "admin";
      } else {
        token.role = "user";
      }
      return token;
    },
    session: ({ session, token }: { session: Session; token: JWT }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && session.user.email === process.env.AUTH_EMAIL_ADMIN) {
        session.user.role = "admin";
      } else {
        session.user.role = "user";
      }
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
});
