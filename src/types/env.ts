import { z } from "zod";

export const env = z.object({
  DATABASE_URL: z.string(),
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  AUTH_EMAIL_ADMIN: z.string().email(),
});

env.parse(process.env);
