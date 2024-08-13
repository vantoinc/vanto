import { z } from "zod";
import { env } from "./env";
import { DefaultSession } from "next-auth";

declare module "next" {
  type DynamicParams<T extends string> = {
    params: {
      [K in T]: string;
    };
  };
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}
