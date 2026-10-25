"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Scramble } from "./motion";
import { lockScroll } from "./site-effects";
import { ButtonLink, cx } from "./ui";

// Bottom corners are cut diagonally; --hc is the size of the cut.
const CLIP =
  "polygon(0 0, 100% 0, 100% calc(100% - var(--hc)), calc(100% - var(--hc)) 100%, var(--hc) 100%, 0 calc(100% - var(--hc)))";

function Dots({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className={cx("size-3 text-orange", className)} fill="currentColor">
      <rect x="0" y="0" width="4" height="4" />
      <rect x="8" y="0" width="4" height="4" />
      <rect x="0" y="8" width="4" height="4" />
      <rect x="8" y="8" width="4" height="4" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 h-[var(--header-h)] [--hc:1.42rem] max-sm:[--hc:1.2rem]">
      <div className="relative h-full bg-bg" style={{ clipPath: CLIP }}>
        <span aria-hidden className="absolute bottom-0 h-px bg-line" style={{ left: "var(--hc)", right: "var(--hc)" }} />
        <svg aria-hidden className="absolute bottom-0 left-0 size-[var(--hc)] text-line" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        </svg>
        <svg aria-hidden className="absolute bottom-0 right-0 size-[var(--hc)] text-line" preserveAspectRatio="none">
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
        </svg>
        {[0.25, 0.75].map((f) => (
          <span
            key={f}
            aria-hidden
            className="absolute inset-y-0 hidden w-px bg-line xl:block"
            style={{ left: `calc(var(--gutter) + (100% - 2 * var(--gutter)) * ${f})` }}
          />
        ))}

        <div className="relative flex h-full items-center justify-between gap-6 px-[max(1rem,calc(var(--gutter)/2))]">
          <Link href="/" aria-label={`${site.name}, home`} className="shrink-0">
            <Logo compact />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-2 2xl:gap-5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link text-[0.9375rem]"
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <Scramble text={item.label} trigger="hover" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={site.contact.phoneHref}
              className="hidden items-center gap-2.5 text-[0.9375rem] transition-colors hover:text-orange-deep 2xl:flex"
            >
              <Dots />
              {site.contact.phoneDisplay}
            </a>
            <ButtonLink href="/contact" className="max-md:hidden">
              Free consultation
            </ButtonLink>
            <button
              type="button"
              className="flex h-11 items-center gap-2.5 border border-line bg-panel px-3 font-mono text-xs uppercase tracking-wide xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? "close" : "menu"} className="h-5 w-5" strokeWidth={2} />
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          data-lenis-prevent
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto overscroll-contain bg-bg xl:hidden"
        >
          <nav aria-label="Main" className="wrap pb-10">
            <ul className="border-x border-line">
              {nav.map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    ref={i === 0 ? firstLink : undefined}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group flex items-center justify-between px-4 py-4 aria-[current=page]:bg-panel"
                  >
                    <span className="display text-[2.4rem] sm:text-5xl">{item.label}</span>
                    <span className="flex items-center gap-2 font-mono text-xs text-mute">
                      {String(i + 1).padStart(2, "0")}
                      <span aria-hidden className="size-2 bg-orange opacity-0 group-aria-[current=page]:opacity-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="grid gap-px border-x border-b border-line bg-line sm:grid-cols-2">
              <a href={site.contact.phoneHref} className="flex items-center gap-3 bg-bg p-4">
                <Icon name="phone" className="h-5 w-5" />
                {site.contact.phoneDisplay}
              </a>
              <a href={site.contact.emailHref} className="flex items-center gap-3 break-all bg-bg p-4">
                <Icon name="mail" className="h-5 w-5" />
                {site.contact.email}
              </a>
            </div>
            <ButtonLink href="/contact" arrow className="mt-6 w-full">
              Free consultation
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
