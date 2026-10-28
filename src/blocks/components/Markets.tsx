import { Icon } from '@/components/ui/Icon'
import { Section, SectionHeader, stagger } from '@/components/ui/Section'
import { getGlobal } from '@/lib/payload'
import type { MarketsBlock } from '@/payload-types'

export async function Markets({ eyebrow, heading, intro, settings }: MarketsBlock) {
  const site = await getGlobal('site-settings', 0)
  const markets = site.markets || []
  if (!markets.length) return null
  return (
    <Section settings={settings}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((m, i) => (
            <li key={m.id || i} data-reveal style={stagger(i % 3)} className="group relative bg-white p-7 transition-colors hover:bg-cobalt-50 sm:p-8">
              <span className="display text-sm text-cobalt-700/50">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 flex items-center gap-2 text-2xl">
                <Icon name="Globe" className="size-5 text-cobalt-700 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.6} />
                {m.name}
              </h3>
              {m.countries && m.countries !== m.name && <p className="mt-2 text-[0.95rem] text-muted">{m.countries}</p>}
              {m.coverage && (
                <p className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-[0.95rem] text-ink/85">
                  <Icon name="Clock" className="mt-0.5 size-4 shrink-0 text-teal-700" />
                  {m.coverage}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
