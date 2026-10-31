import { FONTS, TYPE_SCALE } from '@/brand/tokens'
import { Block, NextLink, PageHead } from '@/brand/ui'

export const metadata = { title: 'Typography' }

const WEIGHTS = [
  { w: 400, label: 'Regular' },
  { w: 500, label: 'Medium' },
  { w: 600, label: 'Semibold' },
  { w: 700, label: 'Bold' },
  { w: 800, label: 'Extra bold' },
]

export default function TypographyPage() {
  return (
    <>
      <PageHead
        eyebrow="Typography"
        title="Archivo and Figtree"
        intro="Two free Google fonts. Archivo, stretched wide, gives big moments their confidence. Figtree is friendly and very readable, and does everything else."
      />

      <Block title="Typefaces">
        <div className="grid gap-4 lg:grid-cols-2">
          {FONTS.map((f) => (
            <div key={f.name} className="flex flex-col rounded-lg border border-line bg-white p-6">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-semibold text-brand-700">{f.role}</p>
                <a href={f.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-muted hover:text-brand-700">
                  Get the font ↗
                </a>
              </div>
              <p className={f.name === 'Archivo' ? 'display mt-3 text-6xl text-navy-900' : 'mt-3 text-6xl font-bold text-navy-900'}>Aa</p>
              <p className={f.name === 'Archivo' ? 'display mt-4 text-2xl leading-tight text-navy-900' : 'mt-4 text-2xl font-semibold leading-tight text-navy-900'}>{f.sample}</p>
              <dl className="mt-6 grid gap-2 border-t border-line pt-4 text-sm">
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-semibold text-navy-900">Family</dt>
                  <dd className="text-muted">{f.name}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-semibold text-navy-900">Weights</dt>
                  <dd className="text-muted">{f.weights}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-semibold text-navy-900">Use for</dt>
                  <dd className="text-muted">{f.usage}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-semibold text-navy-900">In code</dt>
                  <dd className="font-mono text-xs text-muted">{f.cssVar}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Figtree weights">
        <div className="grid gap-2 rounded-lg border border-line bg-white p-6">
          {WEIGHTS.map((w) => (
            <div key={w.w} className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <span className="w-28 shrink-0 text-sm text-muted tabular-nums">
                {w.w} · {w.label}
              </span>
              <span className="text-2xl text-navy-900" style={{ fontWeight: w.w }}>
                Customer experience from Kanpur
              </span>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Type scale" intro="Sizes the website uses. On phones, display and section headings step down about one size.">
        <div className="divide-y divide-line rounded-lg border border-line bg-white">
          {TYPE_SCALE.map((t) => (
            <div key={t.name} className="grid gap-2 p-5 md:grid-cols-[12rem_minmax(0,1fr)] md:items-baseline md:gap-6">
              <div>
                <p className="font-semibold text-navy-900">{t.name}</p>
                <p className="text-xs text-muted">{t.spec}</p>
              </div>
              <p className={`${t.className} min-w-0 text-navy-900`}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Rules of thumb">
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            'Use Archivo only for headlines and big numbers. Never for paragraphs or buttons.',
            'Keep paragraphs to about 65 characters per line.',
            'Write headings in sentence case: “Industries we serve”, not “Industries We Serve”.',
            'Capitals are for short eyebrow labels only, always with extra letter spacing.',
            'In Word, PowerPoint or Canva, use Figtree for everything if Archivo is not available.',
            'If neither font is installed, fall back to Arial. Don’t substitute a decorative font.',
          ].map((r) => (
            <li key={r} className="rounded-lg border border-line bg-white px-5 py-4 leading-relaxed text-ink/85">
              {r}
            </li>
          ))}
        </ul>
      </Block>

      <NextLink href="/brand/components" label="Components" />
    </>
  )
}
