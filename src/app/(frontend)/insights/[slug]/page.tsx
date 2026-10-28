import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PostCard, formatDate } from '@/components/cards/PostCard'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ContactCta } from '@/components/ui/ContactCta'
import { Media } from '@/components/ui/Media'
import { RichText } from '@/components/ui/RichText'
import { pathFor } from '@/lib/paths'
import { getAll, getDocBySlug, getSlugs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { getCanonicalURL, getServerSideURL } from '@/lib/url'
import type { Service } from '@/payload-types'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getSlugs('posts')).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const doc = await getDocBySlug('posts', (await params).slug)
  return doc ? buildMetadata({ collection: 'posts', doc, fallbackDescription: doc.excerpt, fallbackImage: doc.heroImage, type: 'article', publishedTime: doc.publishedAt }) : {}
}

function readingTime(content: unknown) {
  const words = JSON.stringify(content || '').replace(/"[a-zA-Z]+":/g, ' ').split(/\s+/).length
  return Math.max(2, Math.round(words / 230))
}

export default async function PostPage({ params }: Args) {
  const { slug } = await params
  const post = await getDocBySlug('posts', slug)
  const { isEnabled: draft } = await draftMode()
  if (!post) {
    await PayloadRedirects({ url: `/insights/${slug}` })
    notFound()
  }
  const services = (post.relatedServices || []).filter((s): s is Service => typeof s === 'object')
  const more = (await getAll('posts', 1, { and: [{ _status: { equals: 'published' } }, { id: { not_equals: post.id } }] }, '-publishedAt')).slice(0, 3)
  const img = post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null
  const topic = post.categories?.find((c) => typeof c === 'object')
  return (
    <>
      {draft && <LivePreviewListener />}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: img?.url ? `${getServerSideURL()}${img.url}` : undefined,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: { '@type': 'Person', name: post.authorName || 'SS Unicom Team', jobTitle: post.authorRole || undefined },
          publisher: { '@id': `${getCanonicalURL()}/#organization` },
          mainEntityOfPage: `${getCanonicalURL()}${pathFor('posts', post.slug)}`,
        }}
      />
      <article>
        <header className="relative overflow-hidden bg-stone-50">
          <div aria-hidden className="orb pointer-events-none absolute -top-40 right-0 size-[30rem] rounded-full bg-cobalt-100/60 blur-3xl" />
          <div className="container-x relative max-w-[56rem] pt-10 pb-12 sm:pt-14">
            <Breadcrumbs items={[{ label: 'Insights', href: '/insights' }, { label: post.title, href: pathFor('posts', post.slug) }]} />
            <p className="mt-10 text-[0.75rem] font-bold tracking-[0.14em] text-teal-700 uppercase">
              {topic && typeof topic === 'object' ? `${topic.title} · ` : ''}
              {formatDate(post.publishedAt)} · {readingTime(post.content)} min read
            </p>
            <h1 className="mt-4 text-[2.2rem] leading-[1.1] sm:text-[3rem]">{post.title}</h1>
            <p className="lead mt-5">{post.excerpt}</p>
            <p className="mt-6 text-[0.95rem]">
              By <strong className="text-cobalt-950">{post.authorName || 'SS Unicom Team'}</strong>
              {post.authorRole && <span className="text-ink/60">, {post.authorRole}</span>}
            </p>
          </div>
        </header>
        {img && (
          <div className="container-x max-w-[64rem]">
            <div className="card-frame -mb-8">
              <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
                <Media resource={img} fill priority imgClassName="object-cover" sizes="(min-width:1024px) 1000px, 100vw" />
              </div>
            </div>
          </div>
        )}
        <div className="bg-white pt-20 pb-16 sm:pb-24">
          <div className="container-x grid max-w-[64rem] gap-12 lg:grid-cols-[1fr_240px]">
            <RichText data={post.content} className="max-w-[44rem]" />
            {services.length > 0 && (
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <p className="text-[0.72rem] font-bold tracking-[0.14em] text-ink/50 uppercase">Related services</p>
                <ul className="mt-3 space-y-2">
                  {services.map((s) => (
                    <li key={s.id}>
                      <Link href={pathFor('services', s.slug)} className="group inline-flex items-center gap-1 font-semibold text-cobalt-800">
                        {s.title} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </article>
      {more.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="container-x">
            <h2 className="h-section mb-10">More insights</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {more.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <ContactCta />
    </>
  )
}
