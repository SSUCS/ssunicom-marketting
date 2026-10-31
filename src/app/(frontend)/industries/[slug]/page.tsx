import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { JsonLd, faqSchema } from '@/components/seo/JsonLd'
import { Accordion } from '@/components/ui/Accordion'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ContactCta } from '@/components/ui/ContactCta'
import { Icon } from '@/components/ui/Icon'
import { Media } from '@/components/ui/Media'
import { RichText } from '@/components/ui/RichText'
import { SectionHeader, stagger } from '@/components/ui/Section'
import { pathFor } from '@/lib/paths'
import { getDocBySlug, getSlugs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import type { Service } from '@/payload-types'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getSlugs('industries')).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const doc = await getDocBySlug('industries', (await params).slug)
  return doc ? buildMetadata({ collection: 'industries', doc, fallbackTitle: doc.heroHeading || `${doc.title} Outsourcing`, fallbackDescription: doc.summary, fallbackImage: doc.image }) : {}
}

export default async function IndustryPage({ params }: Args) {
  const { slug } = await params
  const ind = await getDocBySlug('industries', slug)
  const { isEnabled: draft } = await draftMode()
  if (!ind) {
    await PayloadRedirects({ url: `/industries/${slug}` })
    notFound()
  }
  const services = (ind.services || []).filter((s): s is Service => typeof s === 'object')
  const faqs = ind.faqs || []
  return (
    <>
      {draft && <LivePreviewListener />}
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <section className="relative overflow-hidden bg-mist-50">
        <div aria-hidden className="orb pointer-events-none absolute -top-32 left-1/3 size-[36rem] rounded-full bg-brand-100/70 blur-3xl" />
        <div className="container-x relative grid items-center gap-10 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:pb-24">
          <div>
            <Breadcrumbs items={[{ label: 'Industries', href: '/industries' }, { label: ind.title, href: pathFor('industries', ind.slug) }]} />
            <p data-reveal className="mt-8 mb-5">
              <span className="eyebrow">{ind.title}</span>
            </p>
            <h1 className="text-[2.3rem] leading-[1.06] sm:text-[3.1rem] lg:text-[3.6rem]">{ind.heroHeading || ind.title}</h1>
            <p data-reveal style={stagger(2)} className="lead mt-6 max-w-2xl">
              {ind.heroText || ind.summary}
            </p>
            <div data-reveal style={stagger(3)} className="mt-9">
              <Link href="/contact#form" className="btn btn-primary">
                Talk to an industry lead <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div data-reveal="scale" className="card-frame">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Media resource={ind.image} fill priority imgClassName="object-cover hero-art" sizes="(min-width:1024px) 520px, 100vw" />
            </div>
          </div>
        </div>
      </section>

      {ind.overview && (
        <section className="bg-white py-16 sm:py-24">
          <div data-reveal className="container-x max-w-[48rem]">
            <RichText data={ind.overview} />
          </div>
        </section>
      )}

      {ind.challenges?.length ? (
        <section className="relative overflow-hidden bg-brand-50 py-16 sm:py-24">
          <div className="container-x relative">
            <SectionHeader heading={`${ind.title} problems we take off your desk`} />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {ind.challenges.map((c, i) => (
                <div key={c.id} data-reveal style={stagger(i % 3)} className="rounded-xl border border-white/80 bg-white/50 p-2 backdrop-blur">
                  <div className="lift h-full rounded-lg bg-white p-7">
                    <Icon name={c.icon} className="size-12 text-brand-900" strokeWidth={1.2} />
                    <h3 className="mt-5 text-xl">{c.title}</h3>
                    {c.text && <p className="mt-3 leading-relaxed text-ink/80">{c.text}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {services.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="container-x">
            <SectionHeader eyebrow="Services" heading={`Services ${ind.title.toLowerCase()} teams outsource to us`} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Link key={s.id} href={pathFor('services', s.slug)} data-reveal style={stagger(i % 3)} className="group lift card flex gap-4 p-6">
                  <Icon name={s.icon} className="size-9 shrink-0 text-brand-800" strokeWidth={1.3} />
                  <span>
                    <span className="block text-lg font-semibold text-navy-900">{s.title}</span>
                    <span className="mt-1 block text-[0.97rem] leading-relaxed text-ink/75">{s.shortDescription}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="bg-brand-50 py-16 sm:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
            <h2 data-reveal className="h-section">
              {ind.title} outsourcing FAQs
            </h2>
            <div data-reveal>
              <Accordion items={faqs.map((f) => ({ question: f.question, answer: <p>{f.answer}</p> }))} />
            </div>
          </div>
        </section>
      )}
      <ContactCta />
    </>
  )
}
