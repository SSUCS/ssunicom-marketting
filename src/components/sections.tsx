import Link from "next/link";
import type { ReactNode } from "react";
import type { Service, Step } from "@/lib/content";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import { ButtonLink, Container, Eyebrow, cx } from "./ui";

/** Standard inner-page hero with a fine connected-line motif. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" aria-hidden />
      <svg
        className="pointer-events-none absolute -right-10 top-10 hidden h-64 w-[28rem] text-accent/30 lg:block"
        viewBox="0 0 440 260"
        fill="none"
        aria-hidden
      >
        <path d="M0 200 C120 200 120 80 240 80 S 360 160 440 160" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="240" cy="80" r="6" className="fill-accent" />
        <circle cx="120" cy="140" r="4" className="fill-paper stroke-accent" strokeWidth="1.5" />
        <circle cx="380" cy="148" r="4" className="fill-paper stroke-accent" strokeWidth="1.5" />
      </svg>
      <Container className="relative py-20 sm:py-24 lg:py-28">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      className="reveal group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_20px_50px_-30px_rgb(10_22_38/0.35)]"
      style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{service.market}</span>
      </div>
      <h3 className="mt-6 text-xl font-bold leading-snug">{service.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{service.summary}</p>
      <Link
        href={`/services#${service.id}`}
        className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent after:absolute after:inset-0 after:rounded-[var(--radius-card)]"
      >
        Learn more<span className="sr-only"> about {service.title}</span>
        <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}

/** Horizontal (desktop) / vertical (mobile) connected process steps. */
export function ProcessSteps({ steps, dark = false }: { steps: Step[]; dark?: boolean }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-5 md:gap-6">
      <span
        aria-hidden
        className={cx(
          "absolute left-[1.375rem] top-2 bottom-2 w-px md:inset-x-0 md:top-[1.375rem] md:bottom-auto md:h-px md:w-auto",
          dark ? "bg-white/15" : "bg-line",
        )}
      />
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="reveal relative flex gap-5 md:block"
          style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
        >
          <span
            className={cx(
              "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-bold tabular-nums",
              dark ? "border-accent-bright/50 bg-ink text-accent-bright" : "border-accent/40 bg-paper text-accent",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="md:mt-5">
            <h3 className={cx("text-lg font-bold", dark ? "text-white" : "text-ink")}>{step.title}</h3>
            <p className={cx("mt-2 text-[0.95rem] leading-relaxed", dark ? "text-mist" : "text-muted")}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Closing call to action used at the bottom of most pages. */
export function CtaBand({
  title = "Let's talk about the process you want to improve.",
  text = "Tell us how your workflow runs today and where you need support. We'll come back with a practical proposal, with no obligation.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="on-dark reveal relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
          <div className="bg-grid-dark absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_75%)]" aria-hidden />
          <svg className="absolute -right-6 bottom-0 hidden h-full w-1/2 text-accent-bright/40 md:block" viewBox="0 0 400 300" fill="none" aria-hidden>
            <path d="M0 260 C140 260 160 120 260 120 S 380 60 420 40" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="260" cy="120" r="7" fill="currentColor" />
            <circle cx="120" cy="226" r="4" fill="currentColor" />
          </svg>
          <div className="relative max-w-2xl">
            <Eyebrow dark>Free consultation</Eyebrow>
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-mist">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" arrow>
                Discuss Your Requirements
              </ButtonLink>
              <a
                href={site.contact.phoneHref}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-semibold transition-colors hover:border-white/50 hover:bg-white/5"
              >
                <Icon name="phone" className="h-4 w-4" />
                {site.contact.phoneDisplay}
              </a>
            </div>
            <p className="mt-6 text-sm text-mist">
              Or email{" "}
              <a href={site.contact.emailHref} className="font-semibold text-white underline-offset-4 hover:underline">
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
