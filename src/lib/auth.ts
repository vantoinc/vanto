import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { JWT } from "next-auth/jwt";
import NextAuth, { Session } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user && user.id) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }: { session: Session; token: JWT }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
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
