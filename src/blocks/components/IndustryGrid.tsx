import { IndustryCard } from '@/components/cards/IndustryCard'
import { Section, SectionHeader, stagger } from '@/components/ui/Section'
import { getAll } from '@/lib/payload'
import type { Industry, IndustryGridBlock } from '@/payload-types'

export async function IndustryGrid({ heading, intro, industries, settings }: IndustryGridBlock) {
  const picked = (industries || []).filter((i): i is Industry => typeof i === 'object')
  const list = picked.length ? picked : await getAll('industries', 1, { _status: { equals: 'published' } }, 'order')
  return (
    <Section settings={settings}>
      <div className="container-x">
        <SectionHeader heading={heading} intro={intro} />
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {list.map((ind, i) => (
            <IndustryCard key={ind.id} industry={ind} style={stagger(i % 4)} />
          ))}
        </div>
      </div>
    </Section>
  )
}
