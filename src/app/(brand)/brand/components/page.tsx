import { ArrowRight, CheckCircle2, CircleAlert, Info, TriangleAlert } from 'lucide-react'

import { Block, PageHead } from '@/brand/ui'

export const metadata = { title: 'Components' }

const input = 'w-full rounded-sm border border-line bg-white px-4 py-3 text-[1rem] text-ink outline-none transition focus:border-brand-700 focus:ring-4 focus:ring-brand-100'

function Spec({ name, code, children, dark }: { name: string; code: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <div className={dark ? 'flex min-h-28 flex-wrap items-center gap-3 bg-navy-900 p-6' : 'flex min-h-28 flex-wrap items-center gap-3 p-6'}>{children}</div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line bg-mist-50 px-4 py-2.5 text-sm">
        <span className="font-semibold text-navy-900">{name}</span>
        <code className="font-mono text-xs text-muted">{code}</code>
      </div>
    </div>
  )
}

const ALERTS = [
  { icon: CheckCircle2, title: 'Thanks, your message is on its way.', text: 'A specialist will reply within one working day.', fg: 'text-success', bg: 'bg-[#e3f4ea]' },
  { icon: TriangleAlert, title: 'Your session is about to expire.', text: 'Save your changes to keep them.', fg: 'text-warning', bg: 'bg-[#fdf0dc]' },
  { icon: CircleAlert, title: 'We couldn’t send your message.', text: 'Check your connection and try again, or email info@ssunicomservice.com.', fg: 'text-danger', bg: 'bg-[#fbe4e1]' },
  { icon: Info, title: 'Our Kanpur centre runs 24/7.', text: 'Calls outside Indian hours are answered by the night shift.', fg: 'text-info', bg: 'bg-[#e3ecfa]' },
]

export default function ComponentsPage() {
  return (
    <>
      <PageHead
        eyebrow="Components"
        title="Building blocks"
        intro="These are the live components from the website, so what you see here is exactly what ships. Each one shows the class to use."
      />

      <Block title="Buttons" intro="One primary button per section. Use coral only for a single standout action, such as a limited offer.">
        <div className="grid gap-4 md:grid-cols-2">
          <Spec name="Primary" code="btn btn-primary">
            <span className="btn btn-primary">
              Book a consultation <ArrowRight className="size-4" />
            </span>
          </Spec>
          <Spec name="Dark" code="btn btn-dark">
            <span className="btn btn-dark">Talk to a specialist</span>
          </Spec>
          <Spec name="Mint, on dark" code="btn btn-mint" dark>
            <span className="btn btn-mint">See the results</span>
            <span className="btn btn-outline text-white">Our services</span>
          </Spec>
          <Spec name="Coral accent" code="btn btn-coral">
            <span className="btn btn-coral">Start a 30-day pilot</span>
          </Spec>
          <Spec name="Text link" code="btn btn-arrow">
            <span className="btn btn-arrow">
              Read the case study <ArrowRight className="size-4" />
            </span>
          </Spec>
          <Spec name="Labels" code="eyebrow · eyebrow-plain">
            <span className="eyebrow">What we deliver</span>
            <span className="eyebrow-plain">Who we are</span>
          </Spec>
        </div>
      </Block>

      <Block title="Cards">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card lift p-6">
            <p className="eyebrow-plain">Back office</p>
            <h3 className="mt-3 text-xl">Medical billing and coding</h3>
            <p className="mt-2 leading-relaxed text-muted">Certified coders, double-checked claims and denial follow-up.</p>
            <span className="btn btn-arrow mt-4">
              Explore <ArrowRight className="size-4" />
            </span>
          </div>
          <div className="card p-6">
            <p className="display text-[3rem] text-brand-700">38%</p>
            <p className="mt-2 text-lg font-semibold text-navy-900">Lower cost per contact</p>
            <p className="mt-1 text-sm text-muted">Statistic card. The number is Archivo in brand teal.</p>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-navy-900 p-6 text-white">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(24,122,123,0.45),transparent_60%)]" />
            <div className="relative">
              <p className="text-[0.72rem] font-bold tracking-[0.14em] text-brand-300 uppercase">Trust and security</p>
              <h3 className="mt-3 text-xl text-white">ISO-aligned processes</h3>
              <p className="mt-2 leading-relaxed text-white/70">Dark card for trust signals and calls to action.</p>
            </div>
          </div>
        </div>
      </Block>

      <Block title="Form fields" intro="Labels sit above fields, in Navy semibold. Required fields get a coral star. Focus shows a teal border and a soft teal ring.">
        <div className="grid gap-5 rounded-lg border border-line bg-white p-6 sm:grid-cols-2">
          <div>
            <label htmlFor="demo-name" className="mb-1.5 block text-sm font-semibold text-navy-900">
              Full name <span className="text-coral-600">*</span>
            </label>
            <input id="demo-name" className={input} defaultValue="Ayesha Khan" />
          </div>
          <div>
            <label htmlFor="demo-email" className="mb-1.5 block text-sm font-semibold text-navy-900">
              Work email <span className="text-coral-600">*</span>
            </label>
            <input id="demo-email" type="email" className={`${input} !border-danger`} defaultValue="ayesha@" aria-invalid aria-describedby="demo-email-err" />
            <p id="demo-email-err" className="mt-1.5 text-sm text-danger">
              Enter a full email address, like name@company.com.
            </p>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="demo-msg" className="mb-1.5 block text-sm font-semibold text-navy-900">
              How can we help?
            </label>
            <textarea id="demo-msg" rows={3} className={input} placeholder="Tell us about the process you want to outsource" />
          </div>
          <label className="flex items-start gap-3 text-[0.95rem] text-ink/80 sm:col-span-2">
            <input type="checkbox" defaultChecked className="mt-1 size-4 accent-brand-700" />
            Send me occasional updates about SS Unicom services.
          </label>
        </div>
      </Block>

      <Block title="Alerts and messages">
        <div className="grid gap-3">
          {ALERTS.map((a) => (
            <div key={a.title} className={`flex gap-3 rounded-lg p-4 ${a.bg}`}>
              <a.icon className={`mt-0.5 size-5 shrink-0 ${a.fg}`} />
              <div>
                <p className={`font-semibold ${a.fg}`}>{a.title}</p>
                <p className="text-sm text-ink/80">{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Section backgrounds" intro="Alternate light sections to separate content. Use one Navy section per page for emphasis, usually trust signals or the closing call to action.">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ['White', 'bg-white', 'text-navy-900'],
            ['Mist 50 (page)', 'bg-mist-50', 'text-navy-900'],
            ['Mist 100', 'bg-mist-100', 'text-navy-900'],
            ['Navy 900', 'bg-navy-900', 'text-white'],
          ].map(([n, bg, fg]) => (
            <div key={n} className={`${bg} flex h-28 items-end rounded-lg border border-line p-4`}>
              <span className={`text-sm font-semibold ${fg}`}>{n}</span>
            </div>
          ))}
        </div>
      </Block>
    </>
  )
}
