import type { MetadataRoute } from 'next'

import { getCanonicalURL } from '@/lib/url'

export default function robots(): MetadataRoute.Robots {
  const base = getCanonicalURL()
  // Preview deployments must never be indexed.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/next/'] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
