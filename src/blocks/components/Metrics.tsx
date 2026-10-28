import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { CountUp } from '@/components/motion/CountUp'
import { Section, SectionHeader, stagger } from '@/components/ui/Section'
import { pathFor } from '@/lib/paths'
import type { MetricsBlock } from '@/payload-types'

export function Metrics({ eyebrow, heading, intro, items, settings }: MetricsBlock) {
  return (
    <Section settings={settings}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items?.map((m, i) => {
            const cs = m.caseStudy && typeof m.caseStudy === 'object' ? m.caseStudy : null
            return (
              <div key={m.id || i} data-reveal style={stagger(i)} className="px-6 py-8 text-center sm:py-4">
                <CountUp value={m.value} className="display block text-5xl text-cobalt-700 sm:text-[4.2rem]" />
                <p className="mt-4 text-2xl font-medium text-ink sm:text-[1.7rem]">{m.label}</p>
                {cs && (
                  <Link href={pathFor('case-studies', cs.slug)} className="group mt-4 inline-flex items-center gap-1.5 text-cobalt-700 hover:text-cobalt-950">
                    Read the case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
