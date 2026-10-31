import { Section, SectionHeader, stagger } from '@/components/ui/Section'
import type { ProcessStepsBlock } from '@/payload-types'

export function ProcessSteps({ eyebrow, heading, intro, steps, settings }: ProcessStepsBlock) {
  return (
    <Section settings={settings}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          <div aria-hidden className="absolute top-7 right-0 left-0 hidden h-px bg-gradient-to-r from-brand-200 via-brand-700 to-brand-300 lg:block" />
          {steps?.map((s, i) => (
            <li key={s.id || i} data-reveal style={stagger(i)} className="relative">
              <span className="relative z-10 grid size-14 place-items-center rounded-full border-4 border-mist-50 bg-navy-900 text-lg font-bold text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.duration && <p className="mt-5 text-[0.72rem] font-bold tracking-[0.14em] text-brand-700 uppercase">{s.duration}</p>}
              <h3 className="mt-2 text-xl">{s.title}</h3>
              {s.text && <p className="mt-2 leading-relaxed text-ink/80">{s.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
