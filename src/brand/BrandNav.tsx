'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'

import { SECTIONS } from './ui'

export function BrandNav() {
  const path = usePathname()
  return (
    <nav aria-label="Brand guide" className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
      {SECTIONS.map((s) => {
        const active = path === s.href
        return (
          <Link
            key={s.href}
            href={s.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'shrink-0 rounded-md px-3 py-2 text-[0.95rem] font-semibold transition-colors',
              active ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/6 hover:text-white',
            )}
          >
            {active && <span aria-hidden className="mr-2 inline-block size-1.5 -translate-y-0.5 rounded-full bg-brand-300" />}
            {s.label}
          </Link>
        )
      })}
    </nav>
  )
}
