import { LinkRow } from '@/components/ui/CMSLink'
import { Section, stagger } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import type { CtaBannerBlock } from '@/payload-types'

export function CtaBanner({ heading, text, links, style, width, settings }: CtaBannerBlock) {
  const full = width === 'full'
  const surface = style === 'navy' ? 'bg-cobalt-950' : 'cta-gradient'
  const inner = (
    <div className={cn('light-sweep relative overflow-hidden text-center text-white', surface, full ? 'py-16 sm:py-20' : 'rounded-sm px-6 py-12 sm:px-12 sm:py-14')}>
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1200 300">
        <path d="M0 220 C 300 120, 500 320, 800 180 S 1100 80, 1200 140" fill="none" stroke="white" strokeWidth="40" strokeOpacity="0.25" />
        <path d="M0 80 C 250 160, 600 20, 900 120 S 1150 240, 1200 200" fill="none" stroke="white" strokeWidth="18" strokeOpacity="0.2" />
      </svg>
      <div className={cn('relative', full && 'container-x')}>
        <h2 data-reveal className="display text-[1.9rem] text-white sm:text-[2.6rem]">
          {heading}
        </h2>
        {text && (
          <p data-reveal style={stagger(1)} className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            {text}
          </p>
        )}
        <div data-reveal style={stagger(2)}>
          <LinkRow links={links} className="mt-8 justify-center" />
        </div>
      </div>
    </div>
  )
  if (full) return <section id={settings?.anchor || undefined}>{inner}</section>
  return (
    <Section settings={{ spacing: 'compact', ...settings }}>
      <div data-reveal="scale" className="container-x">
        {inner}
      </div>
    </Section>
  )
}
