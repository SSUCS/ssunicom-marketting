import { cn } from '@/lib/cn'

// The SS Unicom crown mark, traced from the brand logo (150px artwork, cropped to the mark).
export const MARK_VIEWBOX = '8 20 134 94'
export const MARK_PATHS = [
  'M12.5 50 28.5 95 75 110 121.5 95 137.5 50',
  'M12.5 50 55 68 75 76 95 68 137.5 50',
  'M28.5 95 47.5 84 75 24 102.5 84 121.5 95',
  'M75 24V110',
  'M12.5 50 75 110 137.5 50',
  'M55 68 75 110 95 68',
]
export const MARK_STOPS = {
  dark: ['#16807f', '#2a9d9a', '#3aa98f'],
  light: ['#6cc6c0', '#a2ddd8', '#aae8d3'],
} as const

export function LogoMark({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  const id = `ssu-mark-${tone}`
  const [a, b, c] = MARK_STOPS[tone]
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="12" y1="110" x2="138" y2="24">
          <stop offset="0" stopColor={a} />
          <stop offset="0.55" stopColor={b} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="3.6" strokeLinejoin="round" strokeLinecap="round">
        {MARK_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
}

export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark tone={tone} className="h-9 w-auto shrink-0 sm:h-10" />
      <span className="leading-none">
        <span className={cn('block text-[1.3rem] font-extrabold tracking-tight', tone === 'light' ? 'text-white' : 'text-cobalt-950')}>SS Unicom</span>
        <span className={cn('mt-1 block text-[0.6rem] font-bold tracking-[0.18em] uppercase', tone === 'light' ? 'text-white/60' : 'text-ink/50')}>
          Outsourcing · Kanpur
        </span>
      </span>
    </span>
  )
}
