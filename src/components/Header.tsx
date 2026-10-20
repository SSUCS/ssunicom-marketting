"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { ButtonLink, Container, cx } from "./ui";

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
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-paper",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx(
                    "relative rounded-full px-3.5 py-2 text-[0.93rem] font-medium transition-colors",
                    isActive(item.href) ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/contact" arrow>
              Free Consultation
            </ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <Container className="py-6">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-line">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "flex items-center justify-between py-4 font-display text-2xl font-semibold",
                      isActive(item.href) ? "text-accent" : "text-ink",
                    )}
                  >
                    {item.label}
                    <Icon name="arrow-right" className="h-5 w-5 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 grid gap-3">
            <ButtonLink href="/contact" arrow>
              Free Consultation
            </ButtonLink>
            <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 py-2 text-muted">
              <Icon name="phone" className="h-4 w-4" /> {site.contact.phoneDisplay}
            </a>
            <a href={site.contact.emailHref} className="inline-flex items-center gap-2 py-2 text-muted">
              <Icon name="mail" className="h-4 w-4" /> {site.contact.email}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
