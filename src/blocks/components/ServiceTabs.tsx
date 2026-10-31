'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/cn'

type Group = {
  id: string
  title: string
  code: string
  tagline: string
  href: string
  icon: React.ReactNode
  activeIcon: React.ReactNode
  services: { id: string; number: number; title: string; text: string; href: string; icon: React.ReactNode }[]
}

export function ServiceTabs({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(0)
  const g = groups[active]
  if (!g) return null
  return (
    <div data-reveal className="grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-10">
      <div role="tablist" aria-label="Service groups" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
        {groups.map((grp, i) => (
          <button
            key={grp.id}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'group flex shrink-0 items-center gap-3 rounded-md border px-4 py-3 text-left transition-all duration-300 lg:px-5 lg:py-4',
              i === active ? 'border-brand-700 bg-navy-900 text-white shadow-lg shadow-navy-900/20' : 'border-line bg-white text-ink hover:border-brand-300',
            )}
          >
            {i === active ? grp.activeIcon : grp.icon}
            <span>
              <span className={cn('block text-[0.68rem] font-bold tracking-[0.14em] uppercase', i === active ? 'text-white/60' : 'text-ink/50')}>{grp.code}</span>
              <span className="block font-semibold whitespace-nowrap">{grp.title}</span>
            </span>
          </button>
        ))}
      </div>
      <div role="tabpanel" key={g.id} className="animate-[word-up_0.6s_var(--ease-out-expo)]">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-lg text-ink/80">{g.tagline}</p>
          <Link href={g.href} className="btn btn-arrow shrink-0">
            All {g.title} services <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {g.services.map((s) => (
            <Link key={s.id} href={s.href} className="group lift card flex gap-4 p-6">
              {s.icon}
              <span>
                <span className="block text-[0.72rem] font-bold tracking-[0.14em] text-ink/40">{String(s.number).padStart(2, '0')}</span>
                <span className="block text-lg font-semibold text-navy-900">{s.title}</span>
                <span className="mt-1 block text-[0.97rem] leading-relaxed text-ink/75">{s.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
