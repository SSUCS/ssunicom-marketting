import type { CSSProperties, ReactNode } from "react";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import { Fill, SampleTag } from "./Sample";
import { ButtonLink, Container, Label, cx } from "./ui";

/** Top-of-page hero used on inner pages: a large heading tile plus an optional side tile. */
export function PageHero({
  label,
  title,
  intro,
  aside,
}: {
  label: string;
  title: ReactNode;
  intro: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Container className="pt-6 sm:pt-10">
      <div className="grid gap-3 lg:grid-cols-12">
        <div className={cx("tile bg-grid relative p-7 sm:p-10 lg:p-12", aside ? "lg:col-span-8" : "lg:col-span-12")}>
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal/10 blur-3xl" />
          <Label>{label}</Label>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[4.1rem]">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
        </div>
        {aside && <div className="grid gap-3 lg:col-span-4">{aside}</div>}
      </div>
    </Container>
  );
}

/** Horizontally scrolling strip. Items are duplicated so the loop is seamless. */
export function Marquee({ items, className }: { items: ReactNode[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((item, i) => (
        <li key={i} className="shrink-0">
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cx("fade-x overflow-hidden", className)}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap">
        {row(false)}
        <div className="contents motion-reduce:hidden">{row(true)}</div>
      </div>
    </div>
  );
}

/** The closing call-to-action strip used on most pages. */
export function CtaStrip({
  title = "Ready to discuss your requirements?",
  text,
}: {
  title?: string;
  text?: ReactNode;
}) {
  return (
    <Container className="mt-24">
      <section aria-labelledby="cta-title" className="grid gap-3 lg:grid-cols-12">
        <div className="tile reveal relative overflow-hidden border-signal/30 bg-signal p-8 text-signal-ink sm:p-12 lg:col-span-8">
          <div aria-hidden className="bg-dots absolute inset-0 opacity-30 [filter:invert(1)]" />
          <div className="relative">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-signal-ink/70">[ Next step ]</p>
            <h2 id="cta-title" className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.05] sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-signal-ink/80">
              {text ?? (
                <>
                  Tell us what you need — more enquiries, better-qualified leads, or a website that works harder.
                  We&apos;ll reply within <Fill k="replyTime" />.
                </>
              )}
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" variant="ink" arrow>
                Free Consultation
              </ButtonLink>
            </div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          <a href={site.contact.phoneHref} className="tile reveal group flex flex-col justify-between gap-8 p-7" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
            <span className="flex items-center justify-between">
              <Label>Call</Label>
              <Icon name="arrow-up-right" className="h-5 w-5 text-muted transition-colors group-hover:text-signal" />
            </span>
            <span className="font-display text-2xl font-semibold">{site.contact.phoneDisplay}</span>
          </a>
          <a href={site.contact.emailHref} className="tile reveal group flex flex-col justify-between gap-8 p-7" style={{ "--reveal-delay": "160ms" } as CSSProperties}>
            <span className="flex items-center justify-between">
              <Label>Email</Label>
              <Icon name="arrow-up-right" className="h-5 w-5 text-muted transition-colors group-hover:text-signal" />
            </span>
            <span className="break-all font-display text-xl font-semibold sm:text-2xl">{site.contact.email}</span>
          </a>
        </div>
      </section>
    </Container>
  );
}

/** Grey placeholder box for a photo the company must supply. */
export function PhotoSlot({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cx(
        "bg-dots relative flex min-h-44 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-sample/40 bg-surface-2 p-6 text-center",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-dim" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m3 17 5-5 4 4 3-3 6 6" />
      </svg>
      <p className="text-sm text-muted">{label}</p>
      <SampleTag>Photo needed</SampleTag>
    </div>
  );
}
