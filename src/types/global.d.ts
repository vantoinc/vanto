import type { DefaultSession } from "next-auth";
import type { z } from "zod";

import type { env } from "./env";

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
