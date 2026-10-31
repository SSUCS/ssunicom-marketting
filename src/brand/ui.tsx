import Link from 'next/link'

import { cn } from '@/lib/cn'

import { grade } from './tokens'

export const SECTIONS = [
  { href: '/brand', label: 'Overview' },
  { href: '/brand/logo', label: 'Logo' },
  { href: '/brand/colour', label: 'Colour' },
  { href: '/brand/typography', label: 'Typography' },
  { href: '/brand/components', label: 'Components' },
]

export function PageHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: React.ReactNode }) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow-plain">{eyebrow}</p>
      <h1 className="mt-3 text-[2.2rem] leading-[1.08] sm:text-[2.8rem]">{title}</h1>
      {intro && <div className="mt-4 text-lg leading-relaxed text-muted">{intro}</div>}
    </header>
  )
}

export function Block({ title, intro, children, id }: { title: string; intro?: React.ReactNode; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="mt-14 border-t border-line pt-10">
      <h2 className="text-2xl">{title}</h2>
      {intro && <div className="mt-2 max-w-3xl leading-relaxed text-muted">{intro}</div>}
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function Grade({ ratio }: { ratio: number }) {
  const g = grade(ratio)
  return (
    <span
      className={cn(
        'inline-block rounded-full px-2 py-0.5 text-[0.7rem] font-bold whitespace-nowrap',
        g.tone === 'pass' && 'bg-[#e3f4ea] text-success',
        g.tone === 'large' && 'bg-[#fdf0dc] text-warning',
        g.tone === 'fail' && 'bg-[#fbe4e1] text-danger',
      )}
    >
      {g.label}
    </span>
  )
}

export function DoDont({ kind, children, caption }: { kind: 'do' | 'dont'; children: React.ReactNode; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-white">
      <div className="flex min-h-40 items-center justify-center p-6">{children}</div>
      <figcaption className={cn('flex gap-2 border-t px-4 py-3 text-sm', kind === 'do' ? 'border-success/30 bg-[#e3f4ea]' : 'border-danger/30 bg-[#fbe4e1]')}>
        <strong className={kind === 'do' ? 'text-success' : 'text-danger'}>{kind === 'do' ? 'Do' : 'Don’t'}</strong>
        <span className="text-ink/80">{caption}</span>
      </figcaption>
    </figure>
  )
}

export function NextLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-16 border-t border-line pt-6">
      <Link href={href} className="btn-arrow btn text-lg">
        Next: {label} →
      </Link>
    </div>
  )
}
