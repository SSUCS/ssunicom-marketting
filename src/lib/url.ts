export const getServerSideURL = (): string =>
  (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000')
  ).replace(/\/$/, '')

/** Canonical domain for SEO. Preview deployments still point canonicals at the real domain. */
export const getCanonicalURL = (): string =>
  (process.env.NEXT_PUBLIC_SERVER_URL || 'https://ssunicomservice.com').replace(/\/$/, '')
