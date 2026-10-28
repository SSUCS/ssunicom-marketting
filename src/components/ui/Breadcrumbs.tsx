import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { JsonLd } from '@/components/seo/JsonLd'
import { cn } from '@/lib/cn'
import { getCanonicalURL } from '@/lib/url'

export type Crumb = { label: string; href: string }

export function Breadcrumbs({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'dark' | 'light' }) {
  const all = [{ label: 'Home', href: '/' }, ...items]
  const base = getCanonicalURL()
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: `${base}${c.href === '/' ? '' : c.href}` })),
        }}
      />
      <nav aria-label="Breadcrumb" className={cn('text-[0.8rem] font-semibold tracking-wide', tone === 'light' ? 'text-white/70' : 'text-ink/55')}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 opacity-60" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className={tone === 'light' ? 'text-white' : 'text-cobalt-950'}>
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="hover:underline">
                  {c.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
