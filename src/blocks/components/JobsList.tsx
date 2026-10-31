import { ArrowRight, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'

import { Section, SectionHeader, stagger } from '@/components/ui/Section'
import { pathFor } from '@/lib/paths'
import { getAll, getGlobal } from '@/lib/payload'
import type { JobsListBlock } from '@/payload-types'

export async function JobsList({ eyebrow, heading, intro, settings }: JobsListBlock) {
  const jobs = await getAll('jobs', 0, { open: { equals: true } }, '-datePosted')
  const site = await getGlobal('site-settings')
  return (
    <Section settings={{ background: 'white', ...settings }}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
        {jobs.length ? (
          <ul className="divide-y divide-line border-y border-line">
            {jobs.map((j, i) => (
              <li key={j.id} data-reveal style={stagger(i % 4)}>
                <Link href={pathFor('jobs', j.slug)} className="group flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[0.72rem] font-bold tracking-[0.14em] text-brand-700 uppercase">{j.department}</p>
                    <h3 className="mt-1 text-xl group-hover:text-brand-800 sm:text-2xl">{j.title}</h3>
                    <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] text-ink/70">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" /> {j.location}
                      </span>
                      {j.shift && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-4" /> {j.shift}
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="btn btn-primary self-start sm:self-auto">
                    View role <ArrowRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg">
            No open roles right now. Send your CV to{' '}
            <a className="text-brand-800 underline" href={`mailto:${site.careersEmail || site.email}`}>
              {site.careersEmail || site.email}
            </a>
            .
          </p>
        )}
      </div>
    </Section>
  )
}
