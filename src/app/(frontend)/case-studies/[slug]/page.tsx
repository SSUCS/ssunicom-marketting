import { Quote } from 'lucide-react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CountUp } from '@/components/motion/CountUp'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ContactCta } from '@/components/ui/ContactCta'
import { Media } from '@/components/ui/Media'
import { RichText } from '@/components/ui/RichText'
import { stagger } from '@/components/ui/Section'
import { pathFor } from '@/lib/paths'
import { getDocBySlug, getSlugs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { getCanonicalURL } from '@/lib/url'
import type { Service } from '@/payload-types'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getSlugs('case-studies')).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const doc = await getDocBySlug('case-studies', (await params).slug)
  return doc ? buildMetadata({ collection: 'case-studies', doc, fallbackDescription: doc.summary, fallbackImage: doc.image, type: 'article', publishedTime: doc.publishedAt }) : {}
}

export default async function CaseStudyPage({ params }: Args) {
  const { slug } = await params
  const cs = await getDocBySlug('case-studies', slug)
  const { isEnabled: draft } = await draftMode()
  if (!cs) {
    await PayloadRedirects({ url: `/case-studies/${slug}` })
    notFound()
  }
  const services = (cs.services || []).filter((s): s is Service => typeof s === 'object')
  const industry = typeof cs.industry === 'object' ? cs.industry : null
  return (
    <>
      {draft && <LivePreviewListener />}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: cs.title,
          description: cs.summary,
          datePublished: cs.publishedAt,
          dateModified: cs.updatedAt,
          mainEntityOfPage: `${getCanonicalURL()}${pathFor('case-studies', cs.slug)}`,
          author: { '@id': `${getCanonicalURL()}/#organization` },
          publisher: { '@id': `${getCanonicalURL()}/#organization` },
        }}
      />
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 opacity-40">
          <Media resource={cs.image} fill priority imgClassName="object-cover hero-art" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/30" />
        <div className="container-x relative py-14 sm:py-20">
          <Breadcrumbs tone="light" items={[{ label: 'Case studies', href: '/case-studies' }, { label: cs.client, href: pathFor('case-studies', cs.slug) }]} />
          <p className="mt-10 text-[0.75rem] font-bold tracking-[0.16em] text-brand-300 uppercase">{cs.client}</p>
          <h1 className="mt-4 max-w-4xl text-[2.2rem] leading-[1.08] text-white sm:text-[3rem]">{cs.title}</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/85">{cs.summary}</p>
          <div className="mt-10 flex flex-wrap gap-x-16 gap-y-6">
            {[cs.headlineMetric, ...(cs.results || [])].slice(0, 4).map((r, i) =>
              r?.value ? (
                <div key={i} data-reveal style={stagger(i)}>
                  <CountUp value={r.value} className="display block text-4xl text-brand-300 sm:text-5xl" />
                  <p className="mt-2 text-white/80">{r.label}</p>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div className="space-y-12">
            {cs.challenge && (
              <div data-reveal>
                <h2 className="text-3xl">The challenge</h2>
                <p className="mt-5 text-lg leading-relaxed text-ink/85">{cs.challenge}</p>
              </div>
            )}
            {cs.solution && (
              <div data-reveal>
                <h2 className="text-3xl">What we did</h2>
                <RichText data={cs.solution} className="mt-5" />
              </div>
            )}
            {cs.quote?.text && (
              <figure data-reveal className="rounded-lg bg-brand-50 p-8 sm:p-10">
                <Quote className="size-9 text-brand-700" />
                <blockquote className="mt-4 text-xl leading-relaxed text-navy-900 sm:text-2xl">“{cs.quote.text}”</blockquote>
                <figcaption className="mt-5 font-semibold">
                  {cs.quote.author}
                  {cs.quote.role && <span className="font-normal text-ink/60">, {cs.quote.role}</span>}
                </figcaption>
              </figure>
            )}
          </div>
          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-lg border border-line bg-mist-50 p-7">
              {industry && (
                <>
                  <p className="text-[0.72rem] font-bold tracking-[0.14em] text-ink/50 uppercase">Industry</p>
                  <Link href={pathFor('industries', industry.slug)} className="mt-1 block font-semibold text-brand-800 hover:underline">
                    {industry.title}
                  </Link>
                </>
              )}
              {services.length > 0 && (
                <>
                  <p className="mt-6 text-[0.72rem] font-bold tracking-[0.14em] text-ink/50 uppercase">Services</p>
                  <ul className="mt-1 space-y-1">
                    {services.map((s) => (
                      <li key={s.id}>
                        <Link href={pathFor('services', s.slug)} className="font-semibold text-brand-800 hover:underline">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>
      <ContactCta heading="Want results like these?" />
    </>
  )
}
