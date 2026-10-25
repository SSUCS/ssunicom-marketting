import Link from "next/link";
import { services } from "@/lib/content";
import { SHOW_SAMPLE_MARKERS, fact } from "@/lib/placeholders";
import { companyNav, legalNav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Fill } from "./Sample";
import { CornerSquares, Row, Wrap, cx } from "./ui";

const colTitle = "mb-6 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-mute";
const linkCls = "inline-block py-1.5 text-sm transition-colors hover:text-orange-deep";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 md:mt-32">
      <Wrap>
        {/* Call-back request: the email is passed to the contact form. */}
        <Row>
          <div className="flex items-start p-6">
            <Link href="/" aria-label={`${site.name}, home`}>
              <Logo />
            </Link>
          </div>
          <form id="footer-callback" action="/contact" method="get" className="p-6 lg:col-span-2">
            <label htmlFor="footer-email" className="text-lg md:text-xl">
              Start with your email<span className="text-orange">*</span>
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your e-mail"
              className="mt-4 block w-full border-0 border-b border-line bg-transparent py-3 text-base placeholder:text-mute focus:border-ink focus:outline-none"
            />
          </form>
          <div className="flex flex-col items-start justify-between gap-6 p-6 md:col-span-2 lg:col-span-1 lg:items-end">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-mute lg:text-right">
              *A real person replies within <Fill k="replyTime" />
            </p>
            <button type="submit" form="footer-callback" className="btn">
              Get a call back
            </button>
          </div>
        </Row>

        <Row>
          <nav aria-label="Services" className="p-6 pb-10">
            <p className={colTitle}>Services</p>
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className={linkCls}>
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company" className="p-6 pb-10">
            <p className={colTitle}>Company</p>
            <ul>
              {companyNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal" className="p-6 pb-10">
            <p className={colTitle}>Legal</p>
            <ul>
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
              {SHOW_SAMPLE_MARKERS && (
                <li>
                  <Link href="/placeholders" className={linkCls}>
                    Placeholder checklist
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="p-6 pb-10 lg:text-right">
            <p className={colTitle}>Contact</p>
            <ul className="flex flex-col gap-1 lg:items-end">
              {[
                { href: site.contact.phoneHref, label: site.contact.phoneDisplay },
                { href: site.contact.emailHref, label: site.contact.email },
                { href: fact("linkedin"), label: "LinkedIn", external: true },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className={cx(linkCls, "inline-flex items-center gap-2 uppercase")}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.label}
                    <Icon name="arrow-up-right" className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </a>
                </li>
              ))}
              <li className="mt-3 max-w-[16rem] text-sm text-mute">
                <Fill k="address" />
              </li>
            </ul>
          </div>
        </Row>

        <Row className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-mute">
          <p className="flex flex-wrap gap-x-10 gap-y-2 p-6 lg:col-span-2">
            <span>© {year}</span>
            <span>
              All rights reserved by <Fill k="legalEntity" />
            </span>
          </p>
          <p className="p-6 max-lg:pt-0">Kanpur, Uttar Pradesh, India</p>
          <p className="p-6 max-lg:pt-0 lg:text-right">Digital reach. Human follow-through.</p>
        </Row>

        {/* Closing grid area with the oversized wordmark */}
        <div className="relative overflow-hidden border-y border-line">
          <CornerSquares />
          <p
            aria-hidden
            className="display select-none whitespace-nowrap px-4 pb-9 pt-24 text-center text-[13.5vw] leading-[0.8] text-transparent [-webkit-text-stroke:1px_var(--color-line)] md:pb-4 md:pt-40 md:text-[15vw]"
          >
            SS Unicom
          </p>
        </div>
      </Wrap>
      <div className="h-10" />
    </footer>
  );
}
