/**
 * Hero illustration: inquiries from several sources flow into one organised
 * process and come out as documented, qualified work. Pure SVG + CSS; the
 * motion stops automatically under prefers-reduced-motion (see globals.css).
 */

const sources = [
  { y: 52, label: "Web inquiry", meta: "Form" },
  { y: 178, label: "Inbound call", meta: "Phone" },
  { y: 304, label: "Campaign lead", meta: "Partner list" },
];

const inPaths = [
  "M176 84 C 220 84, 214 214, 258 214",
  "M176 210 C 214 210, 220 240, 258 240",
  "M176 336 C 220 336, 214 266, 258 266",
];
const outPath = "M402 240 C 420 240, 416 196, 436 196";

const rows = [
  { label: "Intake", done: true },
  { label: "Qualify", done: true },
  { label: "Process", done: false },
];

export function HeroVisual() {
  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-white/70 p-3 shadow-[0_30px_80px_-40px_rgb(10_22_38/0.35)] sm:p-5">
        <div className="bg-grid absolute inset-0 opacity-70" aria-hidden />
        <svg
          viewBox="0 0 560 400"
          className="relative block h-auto w-full"
          role="img"
          aria-labelledby="hero-visual-title"
        >
          <title id="hero-visual-title">
            Illustration: inquiries from forms, calls and campaigns flow into one organised process and come out
            qualified and documented.
          </title>
          <defs>
            <linearGradient id="hub" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#12233a" />
              <stop offset="1" stopColor="#0a1626" />
            </linearGradient>
          </defs>

          {/* Connectors */}
          {inPaths.map((d, i) => (
            <g key={d}>
              <path d={d} fill="none" stroke="#ddd8cc" strokeWidth="2" />
              <path
                d={d}
                fill="none"
                stroke="#0d7a72"
                strokeWidth="2"
                strokeDasharray="4 8"
                className="animate-flow"
                style={{ animationDelay: `${i * -0.6}s` }}
              />
              <circle
                r="4"
                fill="#0d7a72"
                className="hero-traveller"
                style={{ offsetPath: `path("${d}")`, animationDelay: `${i * 1.1}s` }}
              />
            </g>
          ))}
          <path d={outPath} fill="none" stroke="#0d7a72" strokeWidth="2" />
          <circle r="4" fill="#45d6c4" className="hero-traveller" style={{ offsetPath: `path("${outPath}")`, animationDelay: "1.8s" }} />

          {/* Source cards */}
          {sources.map((s) => (
            <g key={s.label} transform={`translate(16 ${s.y})`}>
              <rect width="160" height="64" rx="14" fill="#fff" stroke="#ddd8cc" />
              <circle cx="26" cy="32" r="12" fill="#d6ede9" />
              <circle cx="26" cy="32" r="4" fill="#0d7a72" />
              <text x="48" y="28" fontSize="13" fontWeight="600" fill="#0a1626">
                {s.label}
              </text>
              <text x="48" y="45" fontSize="11" fill="#566173">
                {s.meta}
              </text>
            </g>
          ))}

          {/* Process hub */}
          <g transform="translate(258 132)">
            <rect width="144" height="216" rx="18" fill="url(#hub)" />
            <text x="18" y="32" fontSize="10" letterSpacing="1.6" fill="#45d6c4" fontWeight="700">
              WORKFLOW
            </text>
            <text x="18" y="52" fontSize="15" fontWeight="700" fill="#fff">
              One process
            </text>
            {rows.map((r, i) => (
              <g key={r.label} transform={`translate(18 ${78 + i * 44})`}>
                <rect width="108" height="34" rx="9" fill="#1d3352" />
                <circle cx="17" cy="17" r="8" fill={r.done ? "#45d6c4" : "none"} stroke="#45d6c4" strokeWidth="1.5" />
                {r.done ? (
                  <path d="m13 17 3 3 5-6" fill="none" stroke="#0a1626" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <circle cx="17" cy="17" r="3" fill="#45d6c4" className="animate-pulse-soft" />
                )}
                <text x="33" y="21" fontSize="12" fill="#fff" fontWeight="500">
                  {r.label}
                </text>
              </g>
            ))}
          </g>

          {/* Outcome card */}
          <g transform="translate(436 128)">
            <rect width="112" height="136" rx="16" fill="#fff" stroke="#0d7a72" strokeWidth="1.5" />
            <circle cx="24" cy="26" r="11" fill="#0d7a72" />
            <path d="m19 26 3.5 3.5 6-7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="14" y="62" fontSize="12.5" fontWeight="700" fill="#0a1626">
              Qualified &amp;
            </text>
            <text x="14" y="78" fontSize="12.5" fontWeight="700" fill="#0a1626">
              documented
            </text>
            <rect x="14" y="94" width="84" height="5" rx="2.5" fill="#ece8df" />
            <rect x="14" y="94" width="58" height="5" rx="2.5" fill="#45d6c4" />
            <rect x="14" y="108" width="84" height="5" rx="2.5" fill="#ece8df" />
            <rect x="14" y="108" width="70" height="5" rx="2.5" fill="#0d7a72" />
          </g>

          {/* Report loop back to the start */}
          <path
            d="M492 264 C 492 380, 300 384, 120 384 C 92 384, 96 370, 96 368"
            fill="none"
            stroke="#a9b6c8"
            strokeWidth="1.5"
            strokeDasharray="3 6"
          />
          <path d="m91 372 5-6 5 6" fill="none" stroke="#a9b6c8" strokeWidth="1.5" strokeLinecap="round" />
          <text x="300" y="370" fontSize="11" fill="#566173" textAnchor="middle">
            Report &amp; improve
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">Illustrative workflow, not a software product.</figcaption>
    </figure>
  );
}
