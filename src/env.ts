import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

/**
 * Environment variables, validated with t3-env.
 *
 * - Production (NODE_ENV=production, i.e. `next build` and `next start`): every variable
 *   the live site needs must be set, or the build / server stops with a list of what is missing.
 * - Local development: everything is optional, so the site runs on SQLite and local media.
 *
 * Set SKIP_ENV_VALIDATION=1 to bypass the check (for example a throwaway preview deploy).
 */
const isProduction = process.env.NODE_ENV === 'production'

/** Required in production, optional everywhere else. */
function required<T extends z.ZodType>(schema: T) {
  return isProduction ? schema : schema.optional()
}

export const env = createEnv({
  server: {
    PAYLOAD_SECRET: required(z.string().min(32, 'Use a long random string (32+ characters)')),
    // Turso
    DATABASE_URI: required(z.url()),
    DATABASE_AUTH_TOKEN: required(z.string()),
    // UploadThing
    UPLOADTHING_TOKEN: required(z.string()),
    // Resend: form notifications and password resets
    RESEND_API_KEY: required(z.string()),
    EMAIL_FROM_ADDRESS: required(z.email()),
    EMAIL_FROM_NAME: required(z.string()),
  },
  client: {
    NEXT_PUBLIC_SERVER_URL: required(z.url()),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  emptyStringAsUndefined: true,
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
})
