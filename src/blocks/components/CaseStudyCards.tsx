import { CaseStudyCard } from '@/components/cards/CaseStudyCard'
import { Section, SectionHeader, stagger } from '@/components/ui/Section'
import { getAll } from '@/lib/payload'
import type { CaseStudy, CaseStudyCardsBlock } from '@/payload-types'

export async function CaseStudyCards({ eyebrow, heading, intro, caseStudies, settings }: CaseStudyCardsBlock) {
  const picked = (caseStudies || []).filter((c): c is CaseStudy => typeof c === 'object')
  const list = picked.length ? picked : (await getAll('case-studies', 1, { _status: { equals: 'published' } }, '-publishedAt')).slice(0, 3)
  return (
    <Section settings={settings}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((cs, i) => (
            <CaseStudyCard key={cs.id} cs={cs} style={stagger(i)} />
          ))}
        </div>
      </div>
    </Section>
  )
}
