'use client'

import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

import { Logo } from './Logo'

type L = { label: string; href: string }
export type NavData = {
  utility: L[]
  phone: string
  cta: L | null
  items: {
    label: string
    href: string | null
    menu: 'link' | 'services' | 'industries' | 'custom'
    feature: { heading: string; text: string; label: string; href: string } | null
    children: (L & { description: string })[]
  }[]
  serviceGroups: { title: string; href: string; services: L[] }[]
  industries: (L & { description: string })[]
  announcement: { text: string; label: string; href: string } | null
}

export function HeaderClient({ data }: { data: NavData }) {
  const [open, setOpen] = useState<number | null>(null)
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(null)
    setMobile(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setOpen(null), setMobile(false))
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const enter = (i: number) => {
    clearTimeout(closeTimer.current)
    setOpen(i)
  }
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160)
  }

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      {data.announcement && (
        <div className="bg-cobalt-950 px-4 py-2 text-center text-sm text-white">
          {data.announcement.text}{' '}
          {data.announcement.label && (
            <Link href={data.announcement.href} className="font-semibold text-teal-300 underline-offset-2 hover:underline">
              {data.announcement.label} →
            </Link>
          )}
        </div>
      )}
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-300',
          scrolled ? 'border-line bg-white/92 shadow-[0_8px_30px_-12px_rgba(0,37,81,0.18)] backdrop-blur-md' : 'border-transparent bg-white/80 backdrop-blur',
        )}
        onMouseLeave={leave}
      >
        <div className="container-x">
          <div className={cn('hidden items-center justify-end gap-5 overflow-hidden text-[0.72rem] font-semibold tracking-[0.08em] text-ink/60 uppercase transition-all duration-300 lg:flex', scrolled ? 'h-0 opacity-0' : 'h-8 opacity-100')}>
            {data.utility.map((u) => (
              <Link key={u.href} href={u.href} className="hover:text-cobalt-800">
                {u.label}
              </Link>
            ))}
            <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-cobalt-900 hover:text-cobalt-700">
              <Phone className="size-3.5" /> {data.phone}
            </a>
          </div>
          <div className="flex h-[4.5rem] items-center justify-between gap-6">
            <Link href="/" aria-label="SS Unicom home" className="shrink-0">
              <Logo />
            </Link>
            <nav aria-label="Main" className="hidden h-full lg:block">
              <ul className="flex h-full items-center">
                {data.items.map((item, i) => {
                  const hasMenu = item.menu !== 'link'
                  return (
                    <li key={item.label} className="flex h-full items-center" onMouseEnter={() => (hasMenu ? enter(i) : setOpen(null))}>
                      {hasMenu ? (
                        <button
                          type="button"
                          aria-expanded={open === i}
                          onClick={() => setOpen(open === i ? null : i)}
                          className={cn(
                            'relative inline-flex h-full items-center gap-1 px-3 text-[0.8rem] font-semibold tracking-[0.04em] uppercase transition-colors xl:px-4',
                            open === i ? 'text-cobalt-700' : 'text-ink/80 hover:text-cobalt-700',
                          )}
                        >
                          {item.label}
                          <ChevronDown className={cn('size-3.5 transition-transform duration-300', open === i && 'rotate-180')} />
                          <span className={cn('absolute inset-x-3 bottom-0 h-[3px] origin-left bg-cobalt-700 transition-transform duration-300', open === i ? 'scale-x-100' : 'scale-x-0')} />
                        </button>
                      ) : (
                        <Link
                          href={item.href || '#'}
                          className={cn(
                            'inline-flex h-full items-center px-3 text-[0.8rem] font-semibold tracking-[0.04em] uppercase transition-colors xl:px-4',
                            pathname === item.href ? 'text-cobalt-700' : 'text-ink/80 hover:text-cobalt-700',
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              {data.cta && (
                <Link href={data.cta.href} className="btn btn-primary hidden !px-5 !py-2.5 text-[0.8rem] tracking-[0.04em] uppercase sm:inline-flex">
                  {data.cta.label}
                </Link>
              )}
              <button type="button" className="grid size-11 place-items-center rounded-sm text-cobalt-950 lg:hidden" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(true)}>
                <Menu className="size-6" />
              </button>
            </div>
          </div>
        </div>

        {data.items.map((item, i) =>
          item.menu === 'link' ? null : (
            <div
              key={item.label}
              className="mega-panel absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_30px_60px_-20px_rgba(0,37,81,0.25)] lg:block"
              data-open={open === i}
              onMouseEnter={() => enter(i)}
            >
              <div className="container-x grid grid-cols-[1fr_300px] gap-10 py-10">
                <MegaContent item={item} data={data} />
                <FeaturePanel item={item} />
              </div>
            </div>
          ),
        )}
      </header>

      {/* Mobile drawer */}
      <div className={cn('fixed inset-0 z-[60] lg:hidden', mobile ? 'pointer-events-auto' : 'pointer-events-none')} aria-hidden={!mobile}>
        <div className={cn('absolute inset-0 bg-cobalt-950/50 transition-opacity duration-300', mobile ? 'opacity-100' : 'opacity-0')} onClick={() => setMobile(false)} />
        <div className={cn('absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]', mobile ? 'translate-x-0' : 'translate-x-full')}>
          <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
            <Logo />
            <button type="button" aria-label="Close menu" className="grid size-11 place-items-center" onClick={() => setMobile(false)}>
              <X className="size-6" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            <MobileNav data={data} />
          </nav>
          <div className="space-y-3 border-t border-line p-5">
            {data.cta && (
              <Link href={data.cta.href} className="btn btn-primary w-full">
                {data.cta.label} <ArrowRight className="size-4" />
              </Link>
            )}
            <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="btn btn-outline w-full text-cobalt-950">
              <Phone className="size-4" /> {data.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

function MegaContent({ item, data }: { item: NavData['items'][number]; data: NavData }) {
  if (item.menu === 'services') {
    return (
      <div className="grid grid-cols-5 gap-6">
        {data.serviceGroups.map((g) => (
          <div key={g.href}>
            <Link href={g.href} className="group mb-3 flex min-h-[3.6rem] items-end gap-1 border-b border-line pb-3 text-[0.95rem] font-bold text-cobalt-950 hover:text-cobalt-700">
              {g.title}
              <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
            <ul className="space-y-2.5">
              {g.services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="underline-grow text-[0.92rem] leading-snug text-ink/75 hover:text-cobalt-800">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }
  const links = item.menu === 'industries' ? data.industries : item.children
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-1 xl:grid-cols-3">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="group block rounded-md p-3 transition-colors hover:bg-cobalt-50">
            <span className="flex items-center gap-1 font-semibold text-cobalt-950 group-hover:text-cobalt-700">
              {l.label}
              <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
            {l.description && <span className="mt-1 line-clamp-2 block text-[0.88rem] leading-snug text-ink/65">{l.description}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function FeaturePanel({ item }: { item: NavData['items'][number] }) {
  if (!item.feature) return <div />
  return (
    <div className="cta-gradient relative overflow-hidden rounded-lg p-7 text-white">
      <p className="text-xl leading-snug font-bold">{item.feature.heading}</p>
      {item.feature.text && <p className="mt-3 text-[0.95rem] text-white/85">{item.feature.text}</p>}
      {item.feature.label && (
        <Link href={item.feature.href} className="btn btn-mint mt-6 !px-4 !py-2.5 text-sm">
          {item.feature.label} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  )
}

function MobileNav({ data }: { data: NavData }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <ul className="divide-y divide-line">
      {data.items.map((item, i) => {
        if (item.menu === 'link')
          return (
            <li key={item.label}>
              <Link href={item.href || '#'} className="block py-4 text-lg font-semibold text-cobalt-950">
                {item.label}
              </Link>
            </li>
          )
        const links =
          item.menu === 'services'
            ? data.serviceGroups.map((g) => ({ label: g.title, href: g.href, sub: g.services }))
            : (item.menu === 'industries' ? data.industries : item.children).map((l) => ({ label: l.label, href: l.href, sub: [] as L[] }))
        return (
          <li key={item.label}>
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between py-4 text-lg font-semibold text-cobalt-950">
              {item.label}
              <ChevronDown className={cn('size-5 transition-transform', open === i && 'rotate-180')} />
            </button>
            <div className="accordion-panel" data-open={open === i}>
              <div>
                <ul className="space-y-1 pb-4">
                  {item.href && (
                    <li>
                      <Link href={item.href} className="block py-1.5 font-semibold text-cobalt-700">
                        All {item.label.toLowerCase()} →
                      </Link>
                    </li>
                  )}
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-1.5 font-medium text-ink/85">
                        {l.label}
                      </Link>
                      {l.sub.length > 0 && (
                        <ul className="mb-2 ml-3 border-l border-line pl-3">
                          {l.sub.map((s) => (
                            <li key={s.href}>
                              <Link href={s.href} className="block py-1 text-[0.95rem] text-ink/65">
                                {s.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        )
      })}
      {data.utility.map((u) => (
        <li key={u.href}>
          <Link href={u.href} className="block py-3 text-[0.95rem] font-medium text-ink/70">
            {u.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
