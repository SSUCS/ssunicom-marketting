import { cn } from '@/lib/cn'
import type { SectionSettings } from '@/payload-types'

const bg: Record<string, string> = {
  stone: 'bg-stone-50',
  white: 'bg-white',
  sky: 'bg-cobalt-50',
  navy: 'bg-cobalt-950 text-white [&_h2]:text-white [&_h3]:text-white [&_.lead]:text-white/80',
}
const pad: Record<string, string> = {
  compact: 'py-12 sm:py-16',
  normal: 'py-16 sm:py-24',
  spacious: 'py-20 sm:py-32',
}

export function Section({
  settings,
  className,
  children,
  overflow = true,
}: {
  settings?: SectionSettings | null
  className?: string
  children: React.ReactNode
  overflow?: boolean
}) {
  const b = settings?.background || 'stone'
  return (
    <section
      id={settings?.anchor || undefined}
      className={cn('relative', overflow && 'overflow-hidden', bg[b], pad[settings?.spacing || 'normal'], className)}
    >
      {b === 'sky' && (
        <>
          <div aria-hidden className="orb pointer-events-none absolute -top-24 -right-24 size-[28rem] rounded-full bg-cobalt-200/60 blur-3xl" />
          <div aria-hidden className="orb pointer-events-none absolute -bottom-32 -left-24 size-[24rem] rounded-full bg-cobalt-300/40 blur-3xl [animation-delay:-6s]" />
        </>
      )}
      <div className="relative">{children}</div>
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  heading,
  intro,
  align = 'center',
  className,
  as: H = 'h2',
}: {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  align?: 'center' | 'left'
  className?: string
  as?: 'h1' | 'h2'
}) {
  if (!eyebrow && !heading && !intro) return null
  return (
    <div className={cn('mb-10 sm:mb-14', align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl', className)}>
      {eyebrow && (
        <p data-reveal className="mb-4">
          <span className="eyebrow">{eyebrow}</span>
        </p>
      )}
      {heading && (
        <H data-reveal style={{ '--i': 1 } as React.CSSProperties} className="h-section">
          {heading}
        </H>
      )}
      {intro && (
        <p data-reveal style={{ '--i': 2 } as React.CSSProperties} className="lead mt-5">
          {intro}
        </p>
      )}
    </div>
  )
}

export const stagger = (i: number) => ({ '--i': i }) as React.CSSProperties
