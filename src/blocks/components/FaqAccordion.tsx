import { Accordion } from '@/components/ui/Accordion'
import { Media } from '@/components/ui/Media'
import { Section, stagger } from '@/components/ui/Section'
import { JsonLd, faqSchema } from '@/components/seo/JsonLd'
import type { FaqAccordionBlock } from '@/payload-types'

export function FaqAccordion({ heading, intro, image, items, addSchema, settings }: FaqAccordionBlock) {
  const list = items || []
  return (
    <Section settings={{ background: 'sky', ...settings }}>
      {addSchema && <JsonLd data={faqSchema(list.map(({ question, answer }) => ({ question, answer })))} />}
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.9fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          {image && (
            <div data-reveal="scale" className="relative mb-8 hidden aspect-[4/5] max-w-[280px] overflow-hidden rounded-sm lg:block">
              <Media resource={image} fill imgClassName="object-cover" sizes="280px" />
            </div>
          )}
          {heading && (
            <h2 data-reveal style={stagger(1)} className="h-section">
              {heading}
            </h2>
          )}
          {intro && (
            <p data-reveal style={stagger(2)} className="mt-5 text-lg text-ink/85">
              {intro}
            </p>
          )}
        </div>
        <div data-reveal style={stagger(1)}>
          <Accordion items={list.map((i) => ({ question: i.question, answer: <p>{i.answer}</p>, expert: i.expert }))} />
        </div>
      </div>
    </Section>
  )
}
