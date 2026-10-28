import type { NextConfig } from 'next'

// Permanent redirects that must work at the edge, before the CMS is reached.
// Editors manage everyday redirects in the CMS (Admin → Redirects).
export const redirects: NextConfig['redirects'] = async () => [
  // URLs from the previous version of the site
  { source: '/how-we-work', destination: '/about#how-we-work', permanent: true },
  { source: '/home', destination: '/', permanent: true },
  { source: '/index.html', destination: '/', permanent: true },
]
