import { LinkRow } from '@/components/ui/CMSLink'
import { Media } from '@/components/ui/Media'
import { RichText } from '@/components/ui/RichText'
import { Section, stagger } from '@/components/ui/Section'
import { cn } from '@/lib/cn'
import type { MediaContentBlock } from '@/payload-types'

export function MediaContent({ eyebrow, heading, headingHighlight, body, bullets, image, imagePosition, links, settings }: MediaContentBlock) {
  return (
    <Section settings={settings}>
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div className={cn(imagePosition === 'left' && 'lg:order-2')}>
          {eyebrow && (
            <p data-reveal className="mb-5">
              <span className="eyebrow">{eyebrow}</span>
            </p>
          )}
          {heading && (
            <h2 data-reveal style={stagger(1)}>
              <span className="block text-2xl font-semibold text-ink sm:text-3xl">{heading}</span>
              {headingHighlight && <span className="display mt-2 block text-[2.4rem] text-cobalt-950 sm:text-[3.6rem]">{headingHighlight}</span>}
            </h2>
          )}
          <div data-reveal style={stagger(2)}>
            <RichText data={body} className="mt-6 text-lg" />
          </div>
          {bullets?.length ? (
            <ul className="mt-6 space-y-4">
              {bullets.map((b, i) => (
                <li key={b.id || i} data-reveal style={stagger(3 + i)} className="flex gap-3 text-lg leading-relaxed">
                  <span className="mt-[0.7em] size-2 shrink-0 rounded-full bg-cobalt-700" />
                  <span>
                    {b.lead && <strong className="font-semibold text-cobalt-950">{b.lead} </strong>}
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          <div data-reveal style={stagger(6)}>
            <LinkRow links={links} className="mt-9" />
          </div>
        </div>
        <div className={cn('relative mx-auto w-full max-w-md', imagePosition === 'left' && 'lg:order-1')}>
          <div data-reveal="scale" className="relative">
            <div aria-hidden className="absolute -top-10 -left-10 h-[85%] w-[80%] rounded-lg bg-gradient-to-b from-cobalt-200 to-amber-200" />
            <div className="relative ml-auto aspect-[3/4] w-[88%] overflow-hidden rounded-lg shadow-2xl shadow-cobalt-950/15">
              <Media resource={image} fill imgClassName="object-cover hero-art" sizes="(min-width:1024px) 420px, 90vw" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
