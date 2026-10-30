export const getServerSideURL = (): string =>
  (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000')
  ).replace(/\/$/, '')

/**
 * Canonical site URL for SEO, from NEXT_PUBLIC_SERVER_URL. Set it to the real domain on preview
 * deployments too, so their canonicals point at the live site.
 */
export const getCanonicalURL = (): string => getServerSideURL()

/** Bare host of the canonical URL, e.g. www.example.com, for display. */
export const getSiteHost = (): string => new URL(getCanonicalURL()).host
