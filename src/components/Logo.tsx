import { cx } from "./ui";

/**
 * Temporary typographic identity. Replace with the official logo asset
 * when one is available (keep the accessible name "SS Unicom Service").
 */
export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" className={dark ? "fill-white/10" : "fill-ink"} />
        <path
          d="M8 22c0-3 2-4 4-4h8c2 0 4-1 4-4s-2-4-4-4"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-accent-bright"
        />
        <circle cx="8" cy="22" r="2.6" className="fill-white" />
        <circle cx="20" cy="10" r="2.6" className="fill-accent-bright" />
      </svg>
      <span className={cx("font-display text-[1.05rem] leading-none tracking-tight", dark ? "text-white" : "text-ink")}>
        <span className="font-extrabold">SS Unicom</span>{" "}
        <span className={cx("font-medium", dark ? "text-mist" : "text-muted")}>Service</span>
      </span>
    </span>
  );
}
