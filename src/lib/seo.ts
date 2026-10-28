import type { Metadata } from 'next'

import type { Media, SiteSetting } from '@/payload-types'

import { pathFor } from './paths'
import { getGlobal } from './payload'
import { getCanonicalURL, getServerSideURL } from './url'

type Meta = {
  title?: string | null
  description?: string | null
  image?: number | Media | null
  canonicalUrl?: string | null
  noIndex?: boolean | null
  focusKeyword?: string | null
  secondaryKeywords?: string[] | null
}

type Args = {
  collection: string
  doc?: { slug?: string | null; title?: string | null; meta?: Meta | null } | null
  fallbackTitle?: string | null
  fallbackDescription?: string | null
  fallbackImage?: number | Media | null
  type?: 'website' | 'article'
  publishedTime?: string | null
}

const imageUrl = (img?: number | Media | null) => {
  if (!img || typeof img !== 'object' || !img.url) return null
  const url = img.sizes?.og?.url || img.url
  return url.startsWith('http') ? url : `${getServerSideURL()}${url}`
}

export function applyTemplate(site: SiteSetting, title: string) {
  const tpl = site.titleTemplate || '%s | SS Unicom'
  return title.includes('SS Unicom') ? title : tpl.replace('%s', title)
}

export async function buildMetadata({ collection, doc, fallbackTitle, fallbackDescription, fallbackImage, type = 'website', publishedTime }: Args): Promise<Metadata> {
  const site = await getGlobal('site-settings', 1)
  const meta = doc?.meta || {}
  const rawTitle = meta.title || fallbackTitle || doc?.title || site.defaultTitle
  const isHome = collection === 'pages' && doc?.slug === 'home'
  const title = isHome ? meta.title || site.defaultTitle : applyTemplate(site, rawTitle)
  const description = meta.description || fallbackDescription || site.defaultDescription
  const path = pathFor(collection, doc?.slug)
  const canonical = meta.canonicalUrl || `${getCanonicalURL()}${path === '/' ? '' : path}`
  const ogImage = imageUrl(meta.image) || imageUrl(fallbackImage) || imageUrl(site.defaultOgImage) || `${getServerSideURL()}/opengraph-image`
  const preview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'
  const keywords = [meta.focusKeyword, ...(meta.secondaryKeywords || [])].filter(Boolean) as string[]

  return {
    title: { absolute: title },
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical },
    robots: meta.noIndex || preview ? { index: false, follow: !meta.noIndex } : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type,
      siteName: site.siteName,
      title,
      description,
      url: canonical,
      locale: 'en_IN',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

export function organizationSchema(site: SiteSetting) {
  const base = getCanonicalURL()
  const a = site.address
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${base}/#organization`,
      name: site.siteName,
      legalName: site.legalName,
      url: base,
      logo: `${base}/icon.svg`,
      image: `${base}/opengraph-image`,
      description: site.defaultDescription,
      telephone: site.phone,
      email: site.email,
      foundingDate: site.foundingYear ? String(site.foundingYear) : undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: a?.street || undefined,
        addressLocality: a?.locality || 'Kanpur',
        addressRegion: a?.region || 'Uttar Pradesh',
        postalCode: a?.postalCode || undefined,
        addressCountry: a?.country || 'IN',
      },
      areaServed: (site.areaServed || []).map((name) => ({ '@type': 'Country', name })),
      openingHours: site.hours || undefined,
      sameAs: (site.socials || []).map((s) => s.url),
      contactPoint: [{ '@type': 'ContactPoint', telephone: site.phone, email: site.email, contactType: 'sales', availableLanguage: ['English', 'Hindi'] }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${base}/#website`,
      url: base,
      name: site.siteName,
      publisher: { '@id': `${base}/#organization` },
      inLanguage: 'en',
    },
  ]
}
