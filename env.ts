import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod";

export const env = createEnv({
  server: {
    REVALIDATE_SECRET: z.string().min(32),
    PAYLOAD_SECRET: z.string().min(32),
    DATABASE_URL: z.string().url(),
    UPLOADTHING_TOKEN: z.string().min(32),
    UPLOADTHING_SECRET: z.string().min(32),
    UPLOADTHING_APP_ID: z.string().min(10),
  },
  client: {
    NEXT_PUBLIC_WEBSITE_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  }
});