import type { Metadata } from 'next'

import { PageView } from '@/components/PageView'
import { getDocBySlug } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export default function Home() {
  return <PageView slug="home" />
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ collection: 'pages', doc: await getDocBySlug('pages', 'home') })
}
