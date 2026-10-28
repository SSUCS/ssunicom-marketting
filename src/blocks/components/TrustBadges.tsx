import { Icon } from '@/components/ui/Icon'
import { Section, SectionHeader, stagger } from '@/components/ui/Section'
import type { TrustBadgesBlock } from '@/payload-types'

export function TrustBadges({ eyebrow, heading, intro, items, settings }: TrustBadgesBlock) {
  return (
    <Section settings={{ background: 'navy', ...settings }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,125,255,0.35),transparent_60%)]" />
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className="grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {items?.map((b, i) => (
            <div key={b.id || i} data-reveal style={stagger(i % 3)} className="bg-cobalt-950 p-7 transition-colors hover:bg-[#03306a] sm:p-8">
              <Icon name={b.icon} className="size-10 text-teal-300" strokeWidth={1.3} />
              <h3 className="mt-5 text-xl text-white">{b.title}</h3>
              {b.text && <p className="mt-2 leading-relaxed text-white/70">{b.text}</p>}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
