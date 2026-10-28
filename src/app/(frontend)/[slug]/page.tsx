import type { Metadata } from 'next'

import { PageView } from '@/components/PageView'
import { getDocBySlug, getSlugs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

// Section index pages have their own routes.
const reserved = new Set(['home', 'services', 'industries', 'insights', 'case-studies', 'careers'])

export async function generateStaticParams() {
  return (await getSlugs('pages')).filter((slug) => !reserved.has(slug)).map((slug) => ({ slug }))
}

type Args = { params: Promise<{ slug: string }> }

export default async function Page({ params }: Args) {
  const { slug } = await params
  return <PageView slug={decodeURIComponent(slug)} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  return buildMetadata({ collection: 'pages', doc: await getDocBySlug('pages', decodeURIComponent(slug)) })
}
