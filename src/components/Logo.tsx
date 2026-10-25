import { cx } from "./ui";

/**
 * Temporary typographic identity. Replace with the official logo asset
 * when one is available (keep the accessible name "SS Unicom Service").
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#c4f54a" />
        <path d="M8 22c0-3 2-4 4-4h8c2 0 4-1 4-4s-2-4-4-4" fill="none" strokeWidth="2.2" strokeLinecap="round" stroke="#10140a" />
        <circle cx="8" cy="22" r="2.6" fill="#10140a" />
        <circle cx="20" cy="10" r="2.6" fill="#10140a" />
      </svg>
      <span className="font-display text-[1.05rem] leading-none tracking-tight text-fg">
        <span className="font-bold">SS Unicom</span> <span className="font-normal text-muted">Service</span>
      </span>
    </span>
  );
}
