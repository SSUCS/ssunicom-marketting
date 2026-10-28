import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Hero } from '@/components/heroes/Hero'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { Crumb } from '@/components/ui/Breadcrumbs'
import { getDocBySlug } from '@/lib/payload'

/** Renders a CMS page (hero + blocks). Used by the homepage, /[slug] and section index pages. */
export async function PageView({ slug, crumbs }: { slug: string; crumbs?: Crumb[] }) {
  const page = await getDocBySlug('pages', slug)
  const { isEnabled: draft } = await draftMode()
  if (!page) {
    await PayloadRedirects({ url: slug === 'home' ? '/' : `/${slug}` })
    notFound()
  }
  return (
    <>
      {draft && <LivePreviewListener />}
      <Hero hero={page.hero} crumbs={crumbs ?? (slug === 'home' ? undefined : [{ label: page.title, href: `/${slug}` }])} />
      <RenderBlocks blocks={page.layout} />
    </>
  )
}
