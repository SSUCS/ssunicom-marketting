import Link from "next/link";
import { services } from "@/lib/content";
import { companyNav, legalNav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Fill } from "./Sample";
import { Container } from "./ui";

export function Footer() {
  const heading = "font-mono text-[0.7rem] uppercase tracking-[0.18em] text-dim";
  const link = "text-[0.95rem] text-muted transition-colors hover:text-fg";

  return (
    <footer className="mt-24 pb-6">
      <Container>
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="tile p-7 lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm leading-relaxed text-muted">{site.about}</p>
            <p className="mt-8 font-display text-2xl font-semibold leading-tight">{site.tagline}</p>
          </div>

          <div className="tile grid gap-8 p-7 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className={heading}>Company</h2>
              <ul className="mt-4 space-y-2.5">
                {companyNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={heading}>Services</h2>
              <ul className="mt-4 space-y-2.5">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={`/services#${s.id}`} className={link}>
                      {s.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={heading}>Contact</h2>
              <ul className="mt-4 space-y-3 text-[0.95rem] text-muted">
                <li>
                  <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 hover:text-fg">
                    <Icon name="phone" className="h-4 w-4 text-signal" />
                    {site.contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={site.contact.emailHref} className="inline-flex items-center gap-2 break-all hover:text-fg">
                    <Icon name="mail" className="h-4 w-4 shrink-0 text-signal" />
                    {site.contact.email}
                  </a>
                </li>
                <li className="leading-relaxed">
                  <Fill k="address" />
                </li>
                <li className="leading-relaxed">
                  <Fill k="hours" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 px-1 text-sm text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 <Fill k="legalEntity" />. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/placeholders" className="hover:text-fg">
                Placeholder checklist
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
