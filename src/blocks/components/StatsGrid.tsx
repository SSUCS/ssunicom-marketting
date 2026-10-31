import { CountUp } from '@/components/motion/CountUp'
import { Media } from '@/components/ui/Media'
import { Section, stagger } from '@/components/ui/Section'
import type { StatsGridBlock } from '@/payload-types'

export function StatsGrid({ heading, intro, stats, image, settings }: StatsGridBlock) {
  return (
    <Section settings={settings}>
      <div aria-hidden className="orb pointer-events-none absolute top-40 -left-40 size-[30rem] rounded-full bg-coral-200/40 blur-3xl" />
      <div className="container-x relative">
        {heading && (
          <h2 data-reveal className="h-section mb-4 text-center !text-ink">
            {heading}
          </h2>
        )}
        {intro && (
          <p data-reveal style={stagger(1)} className="lead mx-auto mb-12 max-w-2xl text-center">
            {intro}
          </p>
        )}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <dl className="grid grid-cols-2 [&>div:nth-child(odd)]:border-r [&>div]:border-line [&>div:not(:nth-last-child(-n+2))]:border-b">
            {stats?.map((s, i) => (
              <div key={s.id || i} data-reveal style={stagger(i % 2)} className="px-4 py-8 sm:px-8">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp value={s.value} className="display block text-[2.6rem] text-ink sm:text-[4.2rem]" />
                  <span className="mt-3 block text-lg font-medium text-ink sm:text-[1.35rem]">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div data-reveal="scale" className="relative hidden min-h-[420px] overflow-hidden rounded-sm lg:block">
            <Media resource={image} fill imgClassName="object-cover hero-art" sizes="420px" />
          </div>
        </div>
      </div>
    </Section>
  )
}
