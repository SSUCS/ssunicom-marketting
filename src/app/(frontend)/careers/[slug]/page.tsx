import { Briefcase, Clock, MapPin, Users } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { pathFor } from '@/lib/paths'
import { getDocBySlug, getGlobal, getSlugs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { getCanonicalURL } from '@/lib/url'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getSlugs('jobs')).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const doc = await getDocBySlug('jobs', (await params).slug)
  return doc ? buildMetadata({ collection: 'jobs', doc, fallbackTitle: `${doc.title}, ${doc.location}`, fallbackDescription: doc.summary }) : {}
}

const typeLabel: Record<string, string> = { FULL_TIME: 'Full time', PART_TIME: 'Part time', CONTRACTOR: 'Contract', INTERN: 'Internship' }

export default async function JobPage({ params }: Args) {
  const job = await getDocBySlug('jobs', (await params).slug)
  if (!job || !job.open) notFound()
  const site = await getGlobal('site-settings', 0)
  const a = site.address
  const applyEmail = site.careersEmail || site.email
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: job.title,
          description: [job.summary, ...(job.responsibilities || []).map((r) => r.item), ...(job.requirements || []).map((r) => r.item)].join(' '),
          datePosted: job.datePosted || job.createdAt,
          validThrough: job.validThrough || undefined,
          employmentType: job.employmentType,
          hiringOrganization: { '@type': 'Organization', name: site.legalName, sameAs: getCanonicalURL(), logo: `${getCanonicalURL()}/icon.svg` },
          jobLocation: {
            '@type': 'Place',
            address: { '@type': 'PostalAddress', streetAddress: a?.street || undefined, addressLocality: a?.locality || 'Kanpur', addressRegion: a?.region || 'Uttar Pradesh', postalCode: a?.postalCode || undefined, addressCountry: 'IN' },
          },
          baseSalary:
            job.salaryMin && job.salaryMax
              ? { '@type': 'MonetaryAmount', currency: 'INR', value: { '@type': 'QuantitativeValue', minValue: job.salaryMin, maxValue: job.salaryMax, unitText: 'MONTH' } }
              : undefined,
          directApply: true,
          url: `${getCanonicalURL()}${pathFor('jobs', job.slug)}`,
        }}
      />
      <section className="bg-stone-50">
        <div className="container-x max-w-[56rem] pt-10 pb-12 sm:pt-14">
          <Breadcrumbs items={[{ label: 'Careers', href: '/careers' }, { label: job.title, href: pathFor('jobs', job.slug) }]} />
          <p className="mt-10 text-[0.75rem] font-bold tracking-[0.14em] text-teal-700 uppercase">{job.department}</p>
          <h1 className="mt-3 text-[2.2rem] leading-[1.1] sm:text-[3rem]">{job.title}</h1>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-ink/75">
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-cobalt-700" /> {job.location}
            </li>
            <li className="inline-flex items-center gap-2">
              <Briefcase className="size-4 text-cobalt-700" /> {typeLabel[job.employmentType || 'FULL_TIME']}
            </li>
            {job.shift && (
              <li className="inline-flex items-center gap-2">
                <Clock className="size-4 text-cobalt-700" /> {job.shift}
              </li>
            )}
            {job.experience && (
              <li className="inline-flex items-center gap-2">
                <Users className="size-4 text-cobalt-700" /> {job.experience}
              </li>
            )}
          </ul>
        </div>
      </section>
      <section className="bg-white py-14 sm:py-20">
        <div className="container-x grid max-w-[64rem] gap-12 lg:grid-cols-[1fr_300px]">
          <div className="prose-cms">
            <p className="text-lg">{job.summary}</p>
            {job.responsibilities?.length ? (
              <>
                <h2>What you will do</h2>
                <ul>
                  {job.responsibilities.map((r) => (
                    <li key={r.id}>{r.item}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {job.requirements?.length ? (
              <>
                <h2>What we look for</h2>
                <ul>
                  {job.requirements.map((r) => (
                    <li key={r.id}>{r.item}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-lg bg-cobalt-950 p-7 text-white">
              <p className="text-lg font-semibold">Apply for this role</p>
              <p className="mt-2 text-white/75">Email your CV with the role title in the subject line. We reply to every application within a week.</p>
              <a href={`mailto:${applyEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`} className="btn btn-mint mt-6 w-full">
                Apply by email
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="mt-3 block text-center text-sm text-white/75 hover:text-white">
                or call {site.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
