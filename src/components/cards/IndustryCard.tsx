import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { Media } from '@/components/ui/Media'
import { pathFor } from '@/lib/paths'
import type { Industry } from '@/payload-types'

export function IndustryCard({ industry, style }: { industry: Industry; style?: React.CSSProperties }) {
  return (
    <Link
      href={pathFor('industries', industry.slug)}
      data-reveal
      style={style}
      className="group lift flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgba(19,41,75,0.06)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-50">
        <Media resource={industry.image} fill imgClassName="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width:1024px) 300px, 50vw" />
      </div>
      <div className="flex flex-1 items-start justify-between gap-3 p-5 sm:p-6">
        <h3 className="text-xl leading-snug sm:text-[1.45rem]">{industry.title}</h3>
        <ArrowUpRight className="mt-1 size-5 shrink-0 text-brand-700 opacity-0 transition-all duration-300 group-hover:opacity-100" />
      </div>
    </Link>
  )
}
