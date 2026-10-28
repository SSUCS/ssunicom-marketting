import { Section } from '@/components/ui/Section'
import { Media } from '@/components/ui/Media'
import type { LogoMarqueeBlock } from '@/payload-types'

export function LogoMarquee({ eyebrow, items, settings }: LogoMarqueeBlock) {
  if (!items?.length) return null
  const loop = [...items, ...items]
  return (
    <Section settings={{ spacing: 'compact', ...settings }}>
      {eyebrow && (
        <p data-reveal className="container-x mb-8 text-center text-[0.72rem] font-bold tracking-[0.16em] text-stone-500 uppercase">
          {eyebrow}
        </p>
      )}
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="marquee-track flex w-max items-center gap-14 sm:gap-20">
          {loop.map((item, i) => (
            <li key={i} aria-hidden={i >= items.length} className="flex h-12 shrink-0 items-center">
              {item.logo && typeof item.logo === 'object' ? (
                <Media resource={item.logo} imgClassName="h-9 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" sizes="160px" />
              ) : (
                <span className="text-xl font-bold tracking-tight whitespace-nowrap text-ink/45 transition-colors hover:text-cobalt-900 sm:text-2xl">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
