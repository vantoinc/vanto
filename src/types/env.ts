import { z } from "zod";

export const env = z.object({
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
});

env.parse(process.env);
