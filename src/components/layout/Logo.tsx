import { cn } from '@/lib/cn'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="3" fill="#007DFF" />
      <path d="M11.5 26.8c1.6 1.4 3.7 2.2 5.8 2.2 3.1 0 5-1.6 5-3.9 0-5.2-9.9-3.2-9.9-8.9 0-2.5 2.2-4.4 5.5-4.4 2 0 3.7.6 5 1.7" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M25 13v8.6c0 3.3 1.8 5.2 4.5 5.2" fill="none" stroke="#5CECD3" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoMark className="size-10 shrink-0 sm:size-11" />
      <span className="leading-none">
        <span className={cn('block text-[1.3rem] font-extrabold tracking-tight', tone === 'light' ? 'text-white' : 'text-cobalt-950')}>SS Unicom</span>
        <span className={cn('mt-1 block text-[0.6rem] font-bold tracking-[0.18em] uppercase', tone === 'light' ? 'text-white/60' : 'text-ink/50')}>
          Outsourcing · Kanpur
        </span>
      </span>
    </span>
  )
}
