import Link from "next/link";
import { services } from "@/lib/content";
import { legalNav, nav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-mist">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo dark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Business process support for lead generation, customer operations and back-office workflows.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>
              <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
                <Icon name="phone" className="h-4 w-4" /> {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.contact.emailHref} className="inline-flex items-center gap-2 hover:text-white">
                <Icon name="mail" className="h-4 w-4" /> {site.contact.email}
              </a>
            </li>
            {site.contact.address && <li className="max-w-xs">{site.contact.address}</li>}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 md:col-span-8">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Services</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Legal</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Process support services. We do not provide legal, financial or immigration advice.</p>
        </Container>
      </div>
    </footer>
  );
}
