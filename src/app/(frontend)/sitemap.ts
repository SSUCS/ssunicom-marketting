import type { MetadataRoute } from 'next'

import { pathFor } from '@/lib/paths'
import { getPayloadClient } from '@/lib/payload'
import { getCanonicalURL } from '@/lib/url'

export const revalidate = 3600

type Row = { slug: string; updatedAt: string; meta?: { noIndex?: boolean | null } | null; open?: boolean | null }

const priority: Record<string, number> = {
  pages: 0.8,
  services: 0.9,
  'service-categories': 0.85,
  industries: 0.8,
  'case-studies': 0.6,
  posts: 0.6,
  jobs: 0.4,
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()
  const base = getCanonicalURL()
  const collections = ['pages', 'services', 'service-categories', 'industries', 'case-studies', 'posts', 'jobs'] as const
  const out: MetadataRoute.Sitemap = []
  for (const collection of collections) {
    const versioned = Boolean(payload.collections[collection].config.versions?.drafts)
    const { docs } = await payload.find({
      collection,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: versioned ? { _status: { equals: 'published' } } : undefined,
    })
    for (const d of docs as unknown as Row[]) {
      if (d.meta?.noIndex || d.open === false) continue
      const path = pathFor(collection, d.slug)
      out.push({
        url: `${base}${path === '/' ? '' : path}`,
        lastModified: new Date(d.updatedAt),
        changeFrequency: collection === 'posts' || collection === 'jobs' ? 'weekly' : 'monthly',
        priority: path === '/' ? 1 : priority[collection],
      })
    }
  }
  return out
}
