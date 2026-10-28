import Link from 'next/link'

import { CMSLink, hrefFor } from '@/components/ui/CMSLink'
import { getGlobal } from '@/lib/payload'

import { LogoMark } from './Logo'
import { SocialIcon } from './SocialIcon'

export async function Footer() {
  const [footer, site] = await Promise.all([getGlobal('footer', 1), getGlobal('site-settings', 0)])
  const a = site.address
  return (
    <footer className="relative overflow-hidden bg-cobalt-950 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(0,125,255,0.45),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(43,214,190,0.12),transparent_50%)]" />
      <div className="container-x relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_2fr_1fr]">
        <div className="flex flex-col">
          <Link href="/" aria-label="SS Unicom home" className="inline-flex items-center gap-3">
            <LogoMark className="size-14" />
            <span className="text-2xl font-extrabold tracking-tight">SS Unicom</span>
          </Link>
          {footer.blurb && <p className="mt-6 max-w-sm leading-relaxed text-white/70">{footer.blurb}</p>}
          {!!site.markets?.length && (
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-white/70">
              <span className="font-semibold text-white">Serving: </span>
              {site.markets.map((m) => m.name).join(' · ')}
            </p>
          )}
          <address className="mt-6 space-y-1 text-[0.95rem] text-white/70 not-italic">
            <span className="block font-semibold text-white">{site.legalName}</span>
            {a?.street && <span className="block">{a.street}</span>}
            <span className="block">
              {[a?.locality, a?.region, a?.postalCode].filter(Boolean).join(', ')}, India
            </span>
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="block pt-2 text-white hover:text-teal-300">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block text-white hover:text-teal-300">
              {site.email}
            </a>
          </address>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {footer.columns?.map((col) => (
            <div key={col.id}>
              <h2 className="mb-4 text-base font-bold text-white">{col.heading}</h2>
              <ul className="space-y-2.5">
                {col.links?.map(({ link, id }) => (
                  <li key={id}>
                    <CMSLink link={link} appearance="none" className="underline-grow text-[0.93rem] text-white/70 hover:text-white" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="space-y-8">
          {footer.actions?.map((act) => (
            <div key={act.id}>
              <h2 className="mb-3 text-base font-bold text-white">{act.heading}</h2>
              <Link href={hrefFor(act.link)} className="btn border border-white/60 !py-2.5 text-[0.95rem] text-white hover:border-teal-300 hover:bg-white/5 hover:text-teal-300">
                {act.link.label}
              </Link>
            </div>
          ))}
          {site.socials?.length ? (
            <div>
              <h2 className="mb-3 text-base font-bold text-white">Follow us</h2>
              <ul className="flex gap-4">
                {site.socials.map((s) => (
                  <li key={s.id}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform} className="block text-white/80 transition hover:-translate-y-0.5 hover:text-teal-300">
                      <SocialIcon platform={s.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <div className="container-x relative flex flex-col gap-4 border-t border-white/10 py-6 text-[0.85rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {footer.legalLinks?.map(({ link, id }) => (
            <li key={id}>
              <CMSLink link={link} appearance="none" className="hover:text-white" />
            </li>
          ))}
        </ul>
      </div>
      {footer.band?.text && (
        <div className="relative bg-[#0d0d0f]">
          <div className="container-x flex items-center gap-6 py-6">
            <p className="shrink-0 text-lg font-medium sm:text-2xl">
              {footer.band.text} <span className="text-cobalt-400">{footer.band.highlight}</span>
            </p>
            <span aria-hidden className="hidden h-px flex-1 bg-white/40 sm:block" />
          </div>
        </div>
      )}
    </footer>
  )
}
