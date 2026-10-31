import { CMSLink } from '@/components/ui/CMSLink'
import { Icon } from '@/components/ui/Icon'
import { Section, SectionHeader, stagger } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import type { FeatureCardsBlock } from '@/payload-types'

const cols = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-2 lg:grid-cols-3', '4': 'md:grid-cols-2 lg:grid-cols-4' }

export function FeatureCards({ eyebrow, heading, intro, columns, cards, settings }: FeatureCardsBlock) {
  return (
    <Section settings={{ background: 'sky', ...settings }}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className={cn('grid gap-5 sm:gap-6', cols[(columns || '3') as keyof typeof cols])}>
          {cards?.map((c, i) => (
            <div key={c.id || i} data-reveal style={stagger(i)} className="rounded-xl border border-white/80 bg-white/50 p-2 backdrop-blur">
              <article className="lift flex h-full flex-col rounded-lg bg-white p-7 sm:p-8">
                <Icon name={c.icon} className="size-14 text-brand-900" strokeWidth={1.2} />
                <h3 className="mt-6 text-[1.45rem] leading-snug">{c.title}</h3>
                {c.text && <p className="mt-4 text-[1.02rem] leading-relaxed text-ink/80">{c.text}</p>}
                {c.link?.label && (
                  <div className="mt-auto pt-6">
                    <CMSLink link={c.link} appearance="arrow" arrow />
                  </div>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
