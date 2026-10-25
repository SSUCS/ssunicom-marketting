"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { ButtonLink, cx } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-signal-ink"
      >
        Skip to content
      </a>
      <div
        className={cx(
          "mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-4 rounded-full border pl-4 pr-2 transition-[background-color,border-color] duration-300 sm:pl-5",
          scrolled || open ? "border-line-strong bg-surface/85 backdrop-blur-xl" : "border-line bg-surface/50 backdrop-blur-md",
        )}
      >
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx(
                    "rounded-full px-3.5 py-2 text-[0.9rem] font-medium transition-colors",
                    isActive(item.href) ? "bg-surface-3 text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/contact" arrow className="min-h-10 py-2">
              Contact Us
            </ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-auto mt-2 max-h-[calc(100svh-5.5rem)] max-w-[1280px] overflow-y-auto rounded-3xl border border-line-strong bg-surface/95 p-5 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="grid grid-cols-2 gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx(
                    "flex min-h-14 items-center justify-between rounded-2xl border px-4 font-display text-lg font-medium",
                    isActive(item.href) ? "border-signal/50 bg-signal/10 text-signal" : "border-line bg-surface-2 text-fg",
                  )}
                >
                  {item.label}
                  <Icon name="arrow-up-right" className="h-4 w-4 opacity-50" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 grid gap-2">
          <ButtonLink href="/contact" arrow>
            Free Consultation
          </ButtonLink>
          <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 px-1 py-2 text-muted">
            <Icon name="phone" className="h-4 w-4" /> {site.contact.phoneDisplay}
          </a>
          <a href={site.contact.emailHref} className="inline-flex items-center gap-2 px-1 py-2 text-muted">
            <Icon name="mail" className="h-4 w-4" /> {site.contact.email}
          </a>
        </div>
      </div>
    </header>
  );
}
