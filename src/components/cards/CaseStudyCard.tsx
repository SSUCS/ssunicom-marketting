import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Media } from '@/components/ui/Media'
import { pathFor } from '@/lib/paths'
import type { CaseStudy } from '@/payload-types'

export function CaseStudyCard({ cs, style }: { cs: CaseStudy; style?: React.CSSProperties }) {
  return (
    <Link href={pathFor('case-studies', cs.slug)} data-reveal style={style} className="group lift card flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-50">
        <Media resource={cs.image} fill imgClassName="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width:1024px) 400px, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[0.72rem] font-bold tracking-[0.14em] text-brand-700 uppercase">{cs.client}</p>
        {cs.headlineMetric?.value && (
          <p className="mt-3">
            <span className="display text-4xl text-brand-700">{cs.headlineMetric.value}</span>
            <span className="ml-2 font-medium text-ink/80">{cs.headlineMetric.label}</span>
          </p>
        )}
        <h3 className="mt-3 text-xl leading-snug">{cs.title}</h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold text-brand-700">
          Read the case study <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
