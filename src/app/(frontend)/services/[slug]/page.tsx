import { ArrowRight, Check, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ServiceListCard } from '@/blocks/components/ServiceDirectory'
import { CaseStudyCard } from '@/components/cards/CaseStudyCard'
import { IndustryCard } from '@/components/cards/IndustryCard'
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
import { CountUp } from '@/components/motion/CountUp'
import { pathFor } from '@/lib/paths'
import { getAll, getDocBySlug, getGlobal, getSlugs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { getCanonicalURL } from '@/lib/url'
import type { CaseStudy, Industry, Service, ServiceCategory } from '@/payload-types'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const [services, groups] = await Promise.all([getSlugs('services'), getSlugs('service-categories')])
  return [...services, ...groups].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const service = await getDocBySlug('services', slug)
  if (service)
    return buildMetadata({ collection: 'services', doc: service, fallbackTitle: service.heroHeading || service.title, fallbackDescription: service.shortDescription, fallbackImage: service.image })
  const group = await getDocBySlug('service-categories', slug)
  if (group) return buildMetadata({ collection: 'service-categories', doc: group, fallbackTitle: group.heroHeading || `${group.title} Services`, fallbackDescription: group.tagline, fallbackImage: group.image })
  return {}
}

export default async function ServiceOrGroup({ params }: Args) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const service = await getDocBySlug('services', slug)
  if (service) return <ServiceView service={service} draft={draft} />
  const group = await getDocBySlug('service-categories', slug)
  if (group) return <GroupView group={group} />
  await PayloadRedirects({ url: `/services/${slug}` })
  notFound()
}

async function ServiceView({ service: s, draft }: { service: Service; draft: boolean }) {
  const site = await getGlobal('site-settings', 0)
  const group = typeof s.category === 'object' ? s.category : null
  const related = (s.relatedServices || []).filter((r): r is Service => typeof r === 'object')
  const industries = (s.industries || []).filter((r): r is Industry => typeof r === 'object')
  const cases = (s.caseStudies || []).filter((r): r is CaseStudy => typeof r === 'object')
  const faqs = s.faqs || []
  const url = `${getCanonicalURL()}${pathFor('services', s.slug)}`
  const contactHref = `/contact?service=${s.slug}#form`

  return (
    <>
      {draft && <LivePreviewListener />}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.title,
          serviceType: s.title,
          description: s.meta?.description || s.shortDescription,
          url,
          category: group?.title,
          provider: { '@id': `${getCanonicalURL()}/#organization` },
          areaServed: (site.areaServed || []).map((name) => ({ '@type': 'Country', name })),
          hasOfferCatalog: s.deliverables?.length
            ? { '@type': 'OfferCatalog', name: `${s.title} deliverables`, itemListElement: s.deliverables.map((d) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: d.item } })) }
            : undefined,
        }}
      />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}

      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-50">
        <div aria-hidden className="orb pointer-events-none absolute -top-32 left-1/3 size-[36rem] rounded-full bg-cobalt-100/70 blur-3xl" />
        <div className="container-x relative grid items-center gap-10 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:pb-24">
          <div>
            <Breadcrumbs
              items={[
                { label: 'Services', href: '/services' },
                ...(group ? [{ label: group.title, href: pathFor('service-categories', group.slug) }] : []),
                { label: s.title, href: pathFor('services', s.slug) },
              ]}
            />
            <p data-reveal className="mt-8 mb-5 flex items-center gap-3">
              <span className="eyebrow">{group?.title || 'Service'}</span>
              <span className="display text-lg text-cobalt-300">{String(s.number).padStart(2, '0')}</span>
            </p>
            <h1 className="text-[2.3rem] leading-[1.06] sm:text-[3.1rem] lg:text-[3.6rem]">{s.heroHeading || s.title}</h1>
            <p data-reveal style={stagger(2)} className="lead mt-6 max-w-2xl">
              {s.heroText || s.shortDescription}
            </p>
            <div data-reveal style={stagger(3)} className="mt-9 flex flex-wrap gap-4">
              <Link href={contactHref} className="btn btn-primary">
                Discuss this service <ArrowRight className="size-4" />
              </Link>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn btn-outline text-cobalt-950">
                <Phone className="size-4" /> {site.phone}
              </a>
            </div>
          </div>
          <div data-reveal="scale" style={stagger(2)} className="card-frame">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cobalt-50">
              <Media resource={s.image || group?.image} fill priority imgClassName="object-cover hero-art" sizes="(min-width:1024px) 520px, 100vw" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-md bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
                <Icon name={s.icon} className="size-7 text-cobalt-800" />
                <span className="text-sm font-semibold text-cobalt-950">{s.title}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      {s.deliverables?.length ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-x">
            <SectionHeader eyebrow="What's included" heading={`What our ${s.title.toLowerCase()} team handles`} align="left" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {s.deliverables.map((d, i) => (
                <li key={d.id} data-reveal style={stagger(i)} className="lift rounded-lg border border-line bg-stone-50 p-6">
                  <span className="grid size-10 place-items-center rounded-full bg-cobalt-950 text-teal-300">
                    <Check className="size-5" />
                  </span>
                  <p className="mt-5 text-lg leading-snug font-semibold text-cobalt-950">{d.item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Overview */}
      {s.overview && (
        <section className="py-16 sm:py-24">
          <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
            <div data-reveal>
              <RichText data={s.overview} />
            </div>
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div data-reveal className="rounded-lg bg-cobalt-950 p-7 text-white sm:p-8">
                <p className="text-[0.72rem] font-bold tracking-[0.14em] text-teal-300 uppercase">At a glance</p>
                <dl className="mt-5 space-y-4 text-[0.98rem]">
                  {[
                    ['Team model', 'Dedicated or shared agents'],
                    ['Coverage', 'Your hours, including US and UK shifts'],
                    ['Start', 'Pilot live in 2–3 weeks'],
                    ['Quality', 'Weekly QA scorecards and reports'],
                  ].map(([k, v]) => (
                    <div key={k} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <dt className="text-white/60">{k}</dt>
                      <dd className="mt-0.5 font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={contactHref} className="btn btn-mint mt-7 w-full">
                  Get a proposal <ArrowRight className="size-4" />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* Stats */}
      {s.stats?.length ? (
        <section className="border-y border-line bg-white py-12">
          <div className="container-x grid gap-8 text-center sm:grid-cols-3">
            {s.stats.map((st, i) => (
              <div key={st.id} data-reveal style={stagger(i)}>
                <CountUp value={st.value} className="display block text-5xl text-cobalt-700" />
                <p className="mt-3 text-lg font-medium">{st.label}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Benefits */}
      {s.benefits?.length ? (
        <section className="relative overflow-hidden bg-cobalt-50 py-16 sm:py-24">
          <div aria-hidden className="orb pointer-events-none absolute -top-24 -right-24 size-[28rem] rounded-full bg-cobalt-200/60 blur-3xl" />
          <div className="container-x relative">
            <SectionHeader heading={`Why teams choose SS Unicom for ${s.title.toLowerCase()}`} />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {s.benefits.map((b, i) => (
                <div key={b.id} data-reveal style={stagger(i)} className="rounded-xl border border-white/80 bg-white/50 p-2 backdrop-blur">
                  <div className="lift h-full rounded-lg bg-white p-7">
                    <Icon name={b.icon} className="size-12 text-cobalt-900" strokeWidth={1.2} />
                    <h3 className="mt-5 text-xl">{b.title}</h3>
                    {b.text && <p className="mt-3 leading-relaxed text-ink/80">{b.text}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Process */}
      {s.process?.length ? (
        <section className="py-16 sm:py-24">
          <div className="container-x">
            <SectionHeader eyebrow="How it works" heading="From first call to a running team" />
            <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {s.process.map((p, i) => (
                <li key={p.id} data-reveal style={stagger(i)} className="relative rounded-lg border border-line bg-white p-7">
                  <span className="display text-4xl text-cobalt-100">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-xl">{p.title}</h3>
                  {p.text && <p className="mt-2 leading-relaxed text-ink/80">{p.text}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {cases.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="container-x">
            <SectionHeader eyebrow="Results" heading="Proof from similar engagements" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((c, i) => (
                <CaseStudyCard key={c.id} cs={c} style={stagger(i)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="relative overflow-hidden bg-cobalt-50 py-16 sm:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
            <div>
              <h2 data-reveal className="h-section">
                Questions buyers ask us
              </h2>
              <p data-reveal className="mt-5 text-lg text-ink/80">
                Straight answers about {s.title.toLowerCase()} with SS Unicom.
              </p>
            </div>
            <div data-reveal>
              <Accordion items={faqs.map((f) => ({ question: f.question, answer: <p>{f.answer}</p> }))} />
            </div>
          </div>
        </section>
      )}

      {industries.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="container-x">
            <SectionHeader heading="Industries we run this for" />
            <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
              {industries.slice(0, 4).map((ind, i) => (
                <IndustryCard key={ind.id} industry={ind} style={stagger(i)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="container-x">
            <SectionHeader heading="Related services" />
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((r, i) => (
                <Link key={r.id} href={pathFor('services', r.slug)} data-reveal style={stagger(i)} className="group lift card flex flex-col p-7">
                  <Icon name={r.icon} className="size-10 text-cobalt-800" strokeWidth={1.3} />
                  <h3 className="mt-5 text-xl">{r.title}</h3>
                  <p className="mt-2 text-ink/75">{r.shortDescription}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold text-cobalt-700">
                    Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCta heading={`Ready to talk about ${s.title.toLowerCase()}?`} href={contactHref} />
    </>
  )
}

async function GroupView({ group }: { group: ServiceCategory }) {
  const services = await getAll('services', 0, { and: [{ category: { equals: group.id } }, { _status: { equals: 'published' } }] }, 'number')
  const faqs = group.faqs || []
  return (
    <>
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${group.title} services`,
          itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: `${getCanonicalURL()}${pathFor('services', s.slug)}` })),
        }}
      />
      <section className="relative overflow-hidden bg-stone-50">
        <div aria-hidden className="orb pointer-events-none absolute -top-32 left-1/3 size-[36rem] rounded-full bg-cobalt-100/70 blur-3xl" />
        <div className="container-x relative grid items-center gap-10 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:pb-24">
          <div>
            <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: group.title, href: pathFor('service-categories', group.slug) }]} />
            {group.code && (
              <p data-reveal className="mt-8 mb-5">
                <span className="eyebrow">{group.code}</span>
              </p>
            )}
            <h1 className="text-[2.4rem] leading-[1.06] sm:text-[3.2rem] lg:text-[3.8rem]">{group.heroHeading || `${group.title} services`}</h1>
            <p data-reveal style={stagger(2)} className="lead mt-6 max-w-2xl">
              {group.tagline}
            </p>
            <div data-reveal style={stagger(3)} className="mt-9">
              <Link href="/contact#form" className="btn btn-primary">
                Talk to a specialist <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div data-reveal="scale" className="card-frame">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Media resource={group.image} fill priority imgClassName="object-cover hero-art" sizes="(min-width:1024px) 520px, 100vw" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          {group.description && (
            <div data-reveal className="mx-auto mb-14 max-w-3xl">
              <RichText data={group.description} />
            </div>
          )}
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <ServiceListCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>
      {faqs.length > 0 && (
        <section className="bg-cobalt-50 py-16 sm:py-24">
          <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
            <h2 data-reveal className="h-section">
              {group.title}: common questions
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
