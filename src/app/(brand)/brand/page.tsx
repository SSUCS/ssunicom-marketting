import Link from 'next/link'

import { LogoMark } from '@/components/layout/Logo'
import { COLOURS, FONTS, onColour } from '@/brand/tokens'
import { Block } from '@/brand/ui'

export const metadata = { title: { absolute: 'Brand guide | SS Unicom' } }

const PRINCIPLES = [
  { title: 'Dependable', text: 'We look like a team you can hand your operations to. Calm layouts, plenty of white space, nothing flashy.' },
  { title: 'Clear', text: 'Plain words, real numbers, one idea per section. Teal points to what matters; everything else stays quiet.' },
  { title: 'Rooted in Kanpur', text: 'Proud of where the work happens, and fluent with clients in the Middle East, India, the USA, the UK, Canada and Australia.' },
]

export default function BrandHome() {
  const core = COLOURS.map((c) => ({ ...c, hex: c.swatches.find((s) => s.step === c.main)!.hex }))
  return (
    <>
      <div className="relative overflow-hidden rounded-xl bg-navy-900 px-6 py-10 text-white sm:px-10 sm:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_10%,rgba(24,122,123,0.65),transparent_60%)]" />
        <div className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="text-[0.72rem] font-bold tracking-[0.14em] text-brand-300 uppercase">SS Universal Communication Services Pvt Ltd</p>
            <h1 className="display mt-4 text-[2.6rem] text-white sm:text-[3.6rem]">The SS Unicom brand</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              How we look and sound, in one place. Use this guide when you build a web page, design a proposal, post on social media or brief a printer.
            </p>
          </div>
          <LogoMark tone="light" className="hidden h-36 w-auto md:block" />
        </div>
      </div>

      <Block title="What the brand stands for">
        <div className="grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-lg border border-line bg-white p-6">
              <h3 className="text-lg">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="At a glance" intro="The four colours and two typefaces that make up almost everything we produce.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {core.map((c) => (
            <Link key={c.id} href={`/brand/colour#${c.id}`} className="group overflow-hidden rounded-lg border border-line bg-white">
              <div className="flex h-28 items-end p-4 text-sm font-semibold" style={{ background: c.hex, color: onColour(c.hex) }}>
                {c.hex.toUpperCase()}
              </div>
              <div className="p-4">
                <p className="font-bold text-navy-900 group-hover:text-brand-700">{c.name}</p>
                <p className="text-sm text-muted">{c.role.split('.')[0]}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {FONTS.map((f) => (
            <Link key={f.name} href="/brand/typography" className="rounded-lg border border-line bg-white p-6 hover:border-brand-300">
              <p className="text-sm font-semibold text-muted">{f.role}</p>
              <p className={f.name === 'Archivo' ? 'display mt-2 text-4xl text-navy-900' : 'mt-2 text-4xl font-bold text-navy-900'}>{f.name}</p>
            </Link>
          ))}
        </div>
      </Block>

      <Block
        title="Using the brand in code"
        intro={
          <>
            The website is built with Tailwind. Every colour here is a class: <code className="rounded bg-mist-100 px-1.5 py-0.5 text-[0.9em]">bg-brand-700</code>,{' '}
            <code className="rounded bg-mist-100 px-1.5 py-0.5 text-[0.9em]">text-navy-900</code>, <code className="rounded bg-mist-100 px-1.5 py-0.5 text-[0.9em]">border-mist-200</code>. The values live in{' '}
            <code className="rounded bg-mist-100 px-1.5 py-0.5 text-[0.9em]">src/app/(frontend)/globals.css</code>, and this guide reads from{' '}
            <code className="rounded bg-mist-100 px-1.5 py-0.5 text-[0.9em]">src/brand/tokens.ts</code>. Change both together.
          </>
        }
      >
        <pre className="overflow-x-auto rounded-lg bg-navy-950 p-5 text-sm leading-relaxed text-brand-100">
          {`<a className="btn btn-primary">Book a consultation</a>
<h2 className="text-navy-900">Industries we serve</h2>
<p className="eyebrow-plain">Who we are</p>
<section className="bg-navy-900 text-white">…</section>`}
        </pre>
      </Block>
    </>
  )
}
