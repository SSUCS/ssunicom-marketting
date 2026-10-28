import { hrefFor } from '@/components/ui/CMSLink'
import { pathFor } from '@/lib/paths'
import { getAll, getGlobal } from '@/lib/payload'

import { HeaderClient, type NavData } from './HeaderClient'

export async function Header() {
  const [header, site, categories, services, industries] = await Promise.all([
    getGlobal('header', 1),
    getGlobal('site-settings', 0),
    getAll('service-categories', 0, undefined, 'order'),
    getAll('services', 0, { _status: { equals: 'published' } }, 'number'),
    getAll('industries', 0, { _status: { equals: 'published' } }, 'order'),
  ])

  const data: NavData = {
    utility: (header.utilityLinks || []).map(({ link }) => ({ label: link.label, href: hrefFor(link) })),
    phone: site.phone,
    cta: header.cta?.label ? { label: header.cta.label, href: hrefFor(header.cta) } : null,
    items: (header.navItems || []).map((item) => ({
      label: item.label,
      href: item.link?.label || item.link?.reference || item.link?.url ? hrefFor(item.link) : null,
      menu: item.menu || 'link',
      feature: item.feature?.heading
        ? { heading: item.feature.heading, text: item.feature.text || '', label: item.feature.link?.label || '', href: hrefFor(item.feature.link) }
        : null,
      children: (item.children || []).map((c) => ({ label: c.link.label, href: hrefFor(c.link), description: c.description || '' })),
    })),
    serviceGroups: categories.map((c) => ({
      title: c.title,
      href: pathFor('service-categories', c.slug),
      services: services
        .filter((s) => (typeof s.category === 'object' ? s.category.id : s.category) === c.id)
        .map((s) => ({ label: s.title, href: pathFor('services', s.slug) })),
    })),
    industries: industries.map((i) => ({ label: i.title, href: pathFor('industries', i.slug), description: i.summary })),
    announcement:
      site.announcementEnabled && site.announcementText
        ? { text: site.announcementText, label: site.announcementLink?.label || '', href: site.announcementLink ? hrefFor(site.announcementLink) : '' }
        : null,
  }
  return <HeaderClient data={data} />
}
