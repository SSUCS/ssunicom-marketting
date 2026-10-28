import { RichText } from '@/components/ui/RichText'
import { Section, SectionHeader } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import type { RichContentBlock } from '@/payload-types'

export function RichContent({ eyebrow, heading, content, width, settings }: RichContentBlock) {
  return (
    <Section settings={{ background: 'white', ...settings }}>
      <div className={cn('container-x', width === 'wide' ? 'max-w-[64rem]' : 'max-w-[48rem]')}>
        <SectionHeader eyebrow={eyebrow} heading={heading} align="left" className="!mb-8" />
        <div data-reveal>
          <RichText data={content} />
        </div>
      </div>
    </Section>
  )
}
