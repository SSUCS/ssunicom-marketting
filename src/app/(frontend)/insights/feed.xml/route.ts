import { pathFor } from '@/lib/paths'
import { getAll, getGlobal } from '@/lib/payload'
import { getCanonicalURL } from '@/lib/url'

export const revalidate = 3600

// Site settings and posts may be empty before content is added, so treat missing text as ''.
const esc = (s?: string | null) => (s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function GET() {
  const [posts, site] = await Promise.all([getAll('posts', 0, { _status: { equals: 'published' } }, '-publishedAt'), getGlobal('site-settings', 0)])
  const base = getCanonicalURL()
  const items = posts
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${base}${pathFor('posts', p.slug)}</link><guid>${base}${pathFor('posts', p.slug)}</guid><pubDate>${new Date(p.publishedAt || p.createdAt).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description></item>`,
    )
    .join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.siteName || 'SS Unicom')} Insights</title><link>${base}/insights</link><description>${esc(site.defaultDescription)}</description><language>en</language>${items}</channel></rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
