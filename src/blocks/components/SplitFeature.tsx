import { LinkRow } from '@/components/ui/CMSLink'
import { Media } from '@/components/ui/Media'
import { RichText } from '@/components/ui/RichText'
import { Section, stagger } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import type { SplitFeatureBlock } from '@/payload-types'

const accents = {
  amber: 'from-amber-200 via-amber-400 to-amber-600',
  cobalt: 'from-cobalt-200 via-cobalt-500 to-cobalt-900',
  teal: 'from-teal-100 via-teal-300 to-teal-600',
}
const glows = { amber: 'rgba(245,109,11,0.28)', cobalt: 'rgba(0,125,255,0.25)', teal: 'rgba(43,214,190,0.3)' }

export function SplitFeature({ eyebrow, heading, body, image, accent = 'amber', imagePosition, links, settings }: SplitFeatureBlock) {
  const a = (accent || 'amber') as keyof typeof accents
  return (
    <Section settings={settings}>
      <div className="container-x">
        <div
          data-reveal="scale"
          className="rounded-2xl border border-white bg-white/50 p-2 backdrop-blur"
          style={{ boxShadow: `0 40px 120px -40px ${glows[a]}` }}
        >
          <div className={cn('grid overflow-hidden rounded-xl bg-white lg:grid-cols-2', imagePosition === 'left' && 'lg:[&>*:first-child]:order-2')}>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              {eyebrow && (
                <p data-reveal className="eyebrow-plain mb-5">
                  {eyebrow}
                </p>
              )}
              {heading && (
                <h2 data-reveal style={stagger(1)} className="h-section">
                  {heading}
                </h2>
              )}
              <div data-reveal style={stagger(2)}>
                <RichText data={body} className="mt-6 text-lg" />
              </div>
              <div data-reveal style={stagger(3)}>
                <LinkRow links={links} className="mt-8" />
              </div>
            </div>
            <div className={cn('relative min-h-[320px] bg-gradient-to-br lg:min-h-[520px]', accents[a])}>
              <div className="absolute inset-0 overflow-hidden">
                <Media resource={image} fill imgClassName="object-cover float-y" sizes="(min-width:1024px) 640px, 100vw" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
