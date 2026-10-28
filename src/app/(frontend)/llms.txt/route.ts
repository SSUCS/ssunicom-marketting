import { pathFor } from '@/lib/paths'
import { getAll, getGlobal } from '@/lib/payload'
import { getCanonicalURL } from '@/lib/url'

export const revalidate = 3600

/** llms.txt: a plain-text map of the site for AI assistants and answer engines. */
export async function GET() {
  const base = getCanonicalURL()
  const [site, groups, services, industries] = await Promise.all([
    getGlobal('site-settings', 0),
    getAll('service-categories', 0, undefined, 'order'),
    getAll('services', 0, { _status: { equals: 'published' } }, 'number'),
    getAll('industries', 0, { _status: { equals: 'published' } }, 'order'),
  ])
  const lines = [
    `# ${site.siteName} (${site.legalName})`,
    '',
    `> ${site.defaultDescription}`,
    '',
    `Contact: ${site.phone} · ${site.email} · ${site.address?.locality || 'Kanpur'}, India`,
    '',
    ...groups.flatMap((g) => [
      `## ${g.title}`,
      `${g.tagline}`,
      ...services
        .filter((s) => (typeof s.category === 'object' ? s.category.id : s.category) === g.id)
        .map((s) => `- [${s.title}](${base}${pathFor('services', s.slug)}): ${s.shortDescription}`),
      '',
    ]),
    '## Industries',
    ...industries.map((i) => `- [${i.title}](${base}${pathFor('industries', i.slug)}): ${i.summary}`),
    '',
    '## Company',
    `- [About](${base}/about)`,
    `- [Why SS Unicom](${base}/why-ss-unicom)`,
    `- [Trust & security](${base}/trust-and-security)`,
    `- [Case studies](${base}/case-studies)`,
    `- [Careers](${base}/careers)`,
    `- [Contact](${base}/contact)`,
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
