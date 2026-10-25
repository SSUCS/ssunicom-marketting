import { Icon } from "./Icon";

/**
 * Two market markers (US, India) joined by the site's call line to a single
 * Kanpur origin. Deliberately schematic: no office pins in either country.
 */
export function ReachMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 200" className={className} role="img" aria-label="Work for the United States and India, delivered from Kanpur">
      <defs>
        <pattern id="reach-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#2e353f" />
        </pattern>
      </defs>
      <rect width="400" height="200" fill="url(#reach-dots)" opacity="0.6" />
      <path d="M290 112 C220 20 120 20 70 78" fill="none" stroke="#c4f54a" strokeWidth="2" strokeDasharray="4 8" className="animate-flow" />
      <path d="M290 112 C300 140 310 150 320 150" fill="none" stroke="#c4f54a" strokeWidth="2" strokeDasharray="4 8" className="animate-flow" />
      <g transform="translate(70 78)">
        <circle r="16" fill="#c4f54a" opacity="0.12" />
        <circle r="6" fill="#0d0f12" stroke="#c4f54a" strokeWidth="2" />
        <text y="32" textAnchor="middle" fontSize="13" fontFamily="var(--font-code)" fill="#f2f4f5">US</text>
      </g>
      <g transform="translate(320 150)">
        <circle r="6" fill="#0d0f12" stroke="#c4f54a" strokeWidth="2" />
        <text x="12" y="5" fontSize="13" fontFamily="var(--font-code)" fill="#f2f4f5">India</text>
      </g>
      <g transform="translate(290 112)">
        <circle r="20" fill="#c4f54a" opacity="0.15" className="animate-blink" />
        <circle r="8" fill="#c4f54a" />
        <text x="0" y="-28" textAnchor="middle" fontSize="13" fontFamily="var(--font-code)" fill="#c4f54a">Kanpur</text>
      </g>
    </svg>
  );
}

const pipeline = [
  { name: "Website enquiry", status: "Contacted", icon: "mail" as const },
  { name: "Google Ads lead", status: "Qualified", icon: "check-shield" as const },
  { name: "Inbound call", status: "Live transfer", icon: "phone" as const },
  { name: "Demo request", status: "Booked", icon: "calendar" as const },
];

/** Illustrative pipeline card for the home hero. Not real data. */
export function PipelineCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">Follow-through</p>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-signal">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal" /> Illustration
        </span>
      </div>
      <ul className="mt-5 space-y-2">
        {pipeline.map((row, i) => (
          <li
            key={row.name}
            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 text-sm"
            style={{ animation: `fade-up 0.6s ${200 + i * 140}ms both ease-out` }}
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Icon name={row.icon} className="h-4 w-4 shrink-0 text-signal" />
              <span className="truncate">{row.name}</span>
            </span>
            <span className="shrink-0 rounded-full bg-signal/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-signal">
              {row.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
