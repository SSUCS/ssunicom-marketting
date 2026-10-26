import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CtaBand, PageHero } from "@/components/sections";
import { ButtonLink, Container, cx } from "@/components/ui";
import { services } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "US lead generation and process support, Canadian business services, India EdTech solutions and custom business process support from SS Unicom Service.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Process support shaped around how your business works."
        intro="We support the operational side of lead generation, client coordination and customer support. Every engagement starts from your requirements, and the activities below are agreed with you before work begins."
      >
        <nav aria-label="Services on this page">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {services.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className={cx("scroll-mt-20 py-20 sm:py-24", i % 2 === 1 && "border-y border-line bg-white")}
        >
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-accent-bright">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {String.fromCharCode(65 + i)} · {s.market}
                </span>
              </div>
              <h2 id={`${s.id}-title`} className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
                {s.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{s.detail}</p>
              <div className="mt-8">
                <ButtonLink href={`/contact?service=${encodeURIComponent(s.title)}`} arrow>
                  Enquire about this service
                </ButtonLink>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="reveal rounded-[var(--radius-card)] border border-line bg-paper p-6 sm:p-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                  Typical activities <span className="font-normal normal-case tracking-normal">(agreed per client)</span>
                </h3>
                <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                  {s.activities.map((a) => (
                    <li key={a} className="flex items-start gap-3 border-b border-line py-3.5">
                      <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
                {s.note && (
                  <p className="mt-6 flex gap-3 rounded-xl bg-white p-4 text-sm leading-relaxed text-muted">
                    <Icon name="check-shield" className="mt-0.5 h-5 w-5 shrink-0 text-ink/50" />
                    <span>
                      <strong className="font-semibold text-ink">Scope note: </strong>
                      {s.note}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>
      ))}

      <CtaBand
        title="Not sure which service fits?"
        text="Describe the process you need help with. We'll tell you honestly whether and how we can support it."
      />
    </>
  );
}
