import type { Metadata } from "next";
import { HeroVisual } from "@/components/HeroVisual";
import { Icon, type IconName } from "@/components/Icon";
import { LeadJourney } from "@/components/LeadJourney";
import { CtaBand, ProcessSteps, ServiceCard } from "@/components/sections";
import { ButtonLink, Container, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { commitments, services, workflowSteps } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | BPO, Call Centre & Lead Generation Services` },
  description: site.description,
  alternates: { canonical: "/" },
};

const capabilities: { icon: IconName; title: string; text: string }[] = [
  { icon: "headset", title: "Inbound support", text: "Customer calls answered, resolved and logged." },
  { icon: "phone", title: "Outbound campaigns", text: "Telemarketing, follow-ups and win-back calls." },
  { icon: "target", title: "Lead generation", text: "Qualified leads, live transfers and appointments." },
  { icon: "database", title: "Back office", text: "Data entry, processing and CRM upkeep." },
];

const markets = [
  { code: "IN", name: "India", focus: "Domestic processes in English and Hindi: customer support, telesales, lead generation and back office." },
  { code: "US", name: "United States", focus: "International voice and non-voice processes run in US time zones, including overnight shifts." },
  { code: "UK", name: "United Kingdom", focus: "Customer service, outbound campaigns and lead generation for UK businesses, during UK hours." },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" aria-hidden />
        <Container className="relative grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-24">
          <div className="lg:col-span-6">
            <Eyebrow>BPO &amp; call centre services from Kanpur, India</Eyebrow>
            <h1 className="text-[2.6rem] font-extrabold leading-[1.03] sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]">
              Your customers, answered.{" "}
              <span className="text-accent">Your sales pipeline, filled.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              We run inbound and outbound call centre programmes, lead generation, chat and email support and back-office
              work for growing businesses, with trained teams, round-the-clock shifts and reporting you can measure.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" arrow>
                Get a Free Consultation
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore Our Services
              </ButtonLink>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 border-t border-line pt-6">
              <div>
                <dt className="text-sm text-muted">Industry experience</dt>
                <dd className="mt-1 font-display text-xl font-bold">{site.experience} in BPO</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Operations</dt>
                <dd className="mt-1 font-display text-xl font-bold">24/7 · India · US · UK</dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-6">
            <HeroVisual />
          </div>
        </Container>
      </section>

      {/* 2. Positioning */}
      <section className="border-y border-line bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Who we are</Eyebrow>
              <p className="text-sm leading-relaxed text-muted">
                A BPO and call centre company based in Kanpur, Uttar Pradesh.
              </p>
            </div>
            <p className="reveal font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl lg:col-span-8 lg:text-[2.35rem] lg:leading-[1.2]">
              For over ten years, businesses have trusted us with their customer conversations:{" "}
              <span className="text-muted">
                answering support calls, running sales campaigns, generating qualified leads and handling the back-office
                work behind them, so their own teams can focus on growth.
              </span>
            </p>
          </div>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <li
                key={c.title}
                className="reveal bg-white p-6"
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <Icon name={c.icon} className="h-6 w-6 text-accent" />
                <h2 className="mt-5 font-display text-lg font-bold">{c.title}</h2>
                <p className="mt-1.5 text-[0.95rem] text-muted">{c.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 3. Signature animation */}
      <LeadJourney />

      {/* 4. Services overview */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Services"
              title="Everything your customer operations need, under one roof."
              intro="Pick a single service or combine several into one programme. Every engagement is set up around your goals."
            />
            <TextLink href="/services" className="shrink-0">
              View all services
            </TextLink>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {services.slice(0, 6).map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
          <div className="reveal mt-5 flex flex-col gap-5 rounded-[var(--radius-card)] border border-dashed border-ink/20 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <Icon name="puzzle" className="mt-1 h-6 w-6 shrink-0 text-accent" />
              <div>
                <h3 className="text-lg font-bold">{services[services.length - 1].title}</h3>
                <p className="mt-1 text-muted">{services[services.length - 1].summary}</p>
              </div>
            </div>
            <ButtonLink href="/contact" variant="secondary" className="shrink-0">
              Describe your workflow
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* 5. Why choose us */}
      <section className="border-y border-line bg-paper-2/60 py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Why choose us"
                title="The advantages of outsourcing to our team."
                intro="Reliable people, modern infrastructure and clear reporting, at a cost that makes sense for businesses of every size."
              />
            </div>
          </div>
          <ul className="lg:col-span-7">
            {commitments.map((c, i) => (
              <li key={c.title} className="reveal flex gap-6 border-t border-line py-7 last:border-b">
                <span className="font-display text-sm font-bold tabular-nums text-accent">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{c.text}</p>
                </div>
                <Icon name={c.icon} className="hidden h-6 w-6 shrink-0 text-ink/40 sm:block" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6. How we work */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="How we work"
              title="A clear, repeatable way of working."
              intro="Five stages take an engagement from first conversation to ongoing improvement."
            />
            <TextLink href="/how-we-work" className="shrink-0">
              See our process in detail
            </TextLink>
          </div>
          <div className="mt-14">
            <ProcessSteps steps={workflowSteps} />
          </div>
        </Container>
      </section>

      {/* 7. Markets & industries */}
      <section className="border-t border-line bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Markets & industries"
            title="Domestic and international processes, from one Kanpur centre."
            intro="We work in our clients' time zones and adapt every programme to their market, customers and tools."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
            {markets.map((m, i) => (
              <div
                key={m.code}
                className="reveal bg-white p-8"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <p className="font-display text-6xl font-extrabold tracking-tight text-ink/10" aria-hidden>
                  {m.code}
                </p>
                <h3 className="mt-4 text-xl font-bold">{m.name}</h3>
                <p className="mt-2 leading-relaxed text-muted">{m.focus}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Industries: banking and finance, insurance, telecom, healthcare, e-commerce and retail, real estate,
              education, travel and IT services.
            </p>
            <TextLink href="/industries" className="shrink-0">
              Industries &amp; markets
            </TextLink>
          </div>
        </Container>
      </section>

      {/* 8. Final CTA */}
      <CtaBand />
    </>
  );
}
