import { CopyHex } from '@/brand/CopyHex'
import { COLOURS, PAIRINGS, STATUS_COLOURS, TEXT_COLOURS, contrast, onColour } from '@/brand/tokens'
import { Block, Grade, NextLink, PageHead } from '@/brand/ui'

export const metadata = { title: 'Colour' }

const MIX = [
  { name: 'Mist and white', share: 60, hex: '#edf1f5', text: '#111827' },
  { name: 'Navy', share: 25, hex: '#13294b', text: '#ffffff' },
  { name: 'Teal', share: 12, hex: '#187a7b', text: '#ffffff' },
  { name: 'Coral', share: 3, hex: '#c2412d', text: '#ffffff' },
]

export default function ColourPage() {
  return (
    <>
      <PageHead
        eyebrow="Colour"
        title="Teal and Navy"
        intro="Teal comes straight from the crown logo and marks what people should act on. Navy carries headings and dark sections. Coral is a small spark of warmth. Cool Mist neutrals keep pages light. Click any value to copy it."
      />

      <Block title="How much of each" intro="A typical page is mostly light, with navy for structure, teal for actions and only a touch of coral.">
        <div className="flex h-20 overflow-hidden rounded-lg border border-line">
          {MIX.map((m) => (
            <div key={m.name} className="flex min-w-0 items-end p-3 text-xs font-semibold sm:text-sm" style={{ flexGrow: m.share, flexBasis: 0, background: m.hex, color: m.text }}>
              <span className="truncate">{m.share >= 10 ? `${m.name} ${m.share}%` : `${m.share}%`}</span>
            </div>
          ))}
        </div>
      </Block>

      {COLOURS.map((c) => (
        <Block key={c.id} id={c.id} title={c.name} intro={c.role}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {c.swatches.map((s) => {
              const isMain = s.step === c.main
              return (
                <div key={s.step} className={isMain ? 'overflow-hidden rounded-lg border-2 border-navy-900 bg-white' : 'overflow-hidden rounded-lg border border-line bg-white'}>
                  <div className="flex h-24 items-start justify-between p-3 text-xs font-bold" style={{ background: s.hex, color: onColour(s.hex) }}>
                    <span>{s.step}</span>
                    {isMain && <span className="rounded-full bg-white/90 px-2 py-0.5 text-navy-900">Main</span>}
                  </div>
                  <div className="grid gap-0.5 p-3 text-sm">
                    <CopyHex value={s.hex.toUpperCase()} className="font-mono font-semibold text-navy-900" />
                    <CopyHex value={`${c.token}-${s.step}`} className="font-mono text-xs text-muted" />
                    {s.note && <span className="mt-1 text-xs leading-snug text-muted">{s.note}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </Block>
      ))}

      <Block title="Text and surfaces">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TEXT_COLOURS.map((t) => (
            <div key={t.name} className="overflow-hidden rounded-lg border border-line bg-white">
              <div className="h-16 border-b border-line" style={{ background: t.hex }} />
              <div className="grid gap-0.5 p-3 text-sm">
                <span className="font-semibold text-navy-900">{t.name}</span>
                <CopyHex value={t.hex.toUpperCase()} className="font-mono text-xs text-muted" />
                <span className="text-xs text-muted">{t.note}</span>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Status colours" intro="For form messages and alerts only. They are kept clearly different from brand teal, so a success message never looks like a button.">
        <div className="grid gap-3 sm:grid-cols-2">
          {STATUS_COLOURS.map((s) => (
            <div key={s.name} className="flex items-center gap-4 rounded-lg border border-line bg-white p-4">
              <span className="size-12 shrink-0 rounded-md" style={{ background: s.hex }} />
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-semibold text-navy-900">
                  {s.name} <span className="font-normal text-muted">· {s.note}</span>
                </p>
                <p className="mt-1 flex flex-wrap gap-x-3">
                  <CopyHex value={s.hex.toUpperCase()} className="font-mono text-muted" />
                  <CopyHex value={`text-${s.token}`} className="font-mono text-muted" />
                </p>
              </div>
              <span className="hidden rounded-full px-3 py-1 text-xs font-semibold sm:inline" style={{ background: s.tint, color: s.hex }}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Accessible pairings" intro="Text must reach a contrast ratio of 4.5:1 (WCAG AA) so it reads for everyone, including on a phone in sunlight. Large text (24px, or 19px bold) needs 3:1.">
        <div className="overflow-x-auto rounded-lg border border-line bg-white">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b border-line bg-mist-100 text-xs tracking-wider text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-bold">Pairing</th>
                <th className="px-4 py-3 font-bold">Sample</th>
                <th className="px-4 py-3 font-bold">Ratio</th>
                <th className="px-4 py-3 font-bold">Result</th>
                <th className="px-4 py-3 font-bold">Used for</th>
              </tr>
            </thead>
            <tbody>
              {PAIRINGS.map((p) => {
                const r = contrast(p.fg, p.bg)
                return (
                  <tr key={p.label} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium text-navy-900">{p.label}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded px-2.5 py-1 font-semibold whitespace-nowrap" style={{ color: p.fg, background: p.bg, boxShadow: 'inset 0 0 0 1px rgba(17,24,39,0.08)' }}>
                        Aa Sample
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono tabular-nums">{r.toFixed(2)}:1</td>
                    <td className="px-4 py-3">
                      <Grade ratio={r} />
                    </td>
                    <td className="px-4 py-3 text-muted">{p.use}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Block>

      <NextLink href="/brand/typography" label="Typography" />
    </>
  )
}
