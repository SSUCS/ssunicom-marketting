import Link from "next/link";
import { CtaStrip, Marquee } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { LeadJourney } from "@/components/LeadJourney";
import { Fill, SampleMark, SampleTag } from "@/components/Sample";
import { ButtonLink, Container, IconBadge, Label, SectionHeading, TextLink, Tile, cx } from "@/components/ui";
import { PipelineCard, ReachMap } from "@/components/visuals";
import { enquireHref, services, whyChooseUs, workflowSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { sampleLists } from "@/lib/placeholders";

export const metadata = pageMetadata({
  title: "SS Unicom Service — Lead Generation & Web Apps, India",
  description:
    "Outsourced lead generation, live transfers, web apps and digital marketing from Kanpur, India. Digital reach with human follow-through.",
  path: "/",
});

export default function HomePage() {
  const [usLeads, web, edtech] = services;
  const clients = sampleLists.clients;

  return (
    <>
      {/* Hero */}
      <Container className="pt-6 sm:pt-10">
        <div className="grid gap-3 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <div className="tile bg-grid relative flex flex-col justify-between p-7 sm:p-10 lg:col-span-8 lg:row-span-2 lg:min-h-[560px] lg:p-12">
            <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-signal/15 blur-[110px]" />
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-teal/10 blur-[100px]" />
            <Label>Lead generation · Web apps · Digital marketing</Label>
            <div className="relative mt-12 lg:mt-0">
              <h1 className="max-w-3xl text-[2.7rem] font-semibold leading-[0.98] sm:text-6xl lg:text-[4.1rem] xl:text-[4.6rem]">
                Digital reach. <span className="text-signal sm:whitespace-nowrap">Human follow-through.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
                We build the websites and campaigns that bring you new enquiries — and run the trained team that calls,
                qualifies and hands them to your sales team, ready to talk.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact" arrow>
                  Free Consultation
                </ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  Our Services
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="tile p-6 lg:col-span-4">
            <PipelineCard />
          </div>
          <div className="tile flex flex-col p-6 lg:col-span-4">
            <div className="flex items-center justify-between">
              <Label>Markets</Label>
              <span className="text-sm text-muted">Serving the US and India</span>
            </div>
            <ReachMap className="mt-3 h-auto w-full" />
          </div>
        </div>

        {/* Proof strip */}
        <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="At a glance">
          {[
            { k: "yearsOperating" as const, suffix: "years" },
            { k: "seatCount" as const, suffix: "seats" },
            { k: "coverage" as const, suffix: "coverage" },
          ].map(({ k, suffix }, i) => (
            <Tile key={k} as="li" delay={i * 60} className="p-5 sm:p-6">
              <p className="font-display text-3xl font-semibold sm:text-4xl">
                <Fill k={k} className={k === "coverage" ? "text-xl sm:text-[1.6rem]" : undefined} />
              </p>
              <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">{suffix}</p>
            </Tile>
          ))}
          <Tile as="li" delay={180} className="p-5 sm:p-6">
            <p className="font-display text-3xl font-semibold sm:text-4xl">US + IN</p>
            <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">Serving the US and India</p>
          </Tile>
        </ul>

        {/* Sample client strip */}
        <div className="tile reveal mt-3 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <div className="flex shrink-0 items-center gap-3">
            <Label>Working with</Label>
            <SampleTag show={!clients.confirmed}>Sample clients</SampleTag>
          </div>
          <Marquee
            className="min-w-0 flex-1"
            items={clients.items.map((name) => (
              <span key={name} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-2 font-display text-[0.95rem] font-medium text-fg/80">
                <span aria-hidden className="h-2 w-2 rounded-sm bg-signal/70" />
                {clients.confirmed ? name : <SampleMark title={`Sample: ${clients.ask}`}>{name}</SampleMark>}
              </span>
            ))}
          />
        </div>
      </Container>

      {/* Who we are */}
      <Container className="mt-24">
        <div className="grid gap-3 lg:grid-cols-12">
          <Tile className="p-7 sm:p-10 lg:col-span-8">
            <Label index="01">Who we are</Label>
            <p className="mt-6 font-display text-2xl font-medium leading-snug sm:text-[2rem]">
              SS Unicom Service is a business process outsourcing company based in Kanpur, India.{" "}
              <span className="text-muted">
                We work as an extension of our clients&apos; teams: generating and qualifying leads, supporting customer
                and document workflows, and building the digital channels that keep new enquiries coming in.
              </span>
            </p>
            <div className="mt-8">
              <TextLink href="/about">More about us</TextLink>
            </div>
          </Tile>
          <Tile delay={80} className="flex flex-col justify-between gap-10 p-7 lg:col-span-4">
            <div className="flex items-center justify-between">
              <Label>Operations</Label>
              <Icon name="headset" className="h-5 w-5 text-signal" />
            </div>
            <div>
              <p className="font-display text-5xl font-semibold">
                <Fill k="teamSize" />
              </p>
              <p className="mt-2 text-muted">people across calling, quality, training, development and marketing.</p>
            </div>
            <TextLink href="/infrastructure">Inside our operations centre</TextLink>
          </Tile>
        </div>
      </Container>

      <LeadJourney />

      {/* Services */}
      <Container className="mt-24">
        <SectionHeading
          index="04"
          label="Our services"
          title="Four service lines, one team."
          aside={<ButtonLink href="/services" variant="secondary" arrow>All services</ButtonLink>}
        />
        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          <ServiceTile service={usLeads} className="lg:col-span-7 lg:row-span-2" large />
          <ServiceTile service={web} className="lg:col-span-5" delay={80} />
          <ServiceTile service={edtech} className="lg:col-span-5" delay={160} />
          <Link
            href="/services#custom-solutions"
            className="tile reveal group flex items-center justify-between gap-4 p-6 lg:col-span-12"
          >
            <span className="flex items-center gap-4">
              <IconBadge name="puzzle" />
              <span className="font-display text-lg font-medium sm:text-xl">
                Need something different? <span className="text-muted">See our custom solutions</span>
              </span>
            </span>
            <Icon name="arrow-up-right" className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-signal" />
          </Link>
        </div>
      </Container>

      {/* Why choose us */}
      <Container className="mt-24">
        <div className="grid gap-3 lg:grid-cols-12">
          <Tile className="bg-grid flex flex-col justify-between gap-8 p-7 sm:p-9 lg:col-span-4 lg:row-span-2">
            <div>
              <Label index="05">Why choose us</Label>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.05] sm:text-4xl">What to look for in an outsourcing partner</h2>
            </div>
            <p className="leading-relaxed text-muted">
              Ask any outsourcing provider three things: do they have experience in your kind of work, trained people to
              do it, and the setup to deliver it every day? Here is how we answer.
            </p>
          </Tile>
          {whyChooseUs.map((item, i) => (
            <Tile key={item.title} delay={(i % 2) * 80} className={cx("flex flex-col", i === 4 ? "lg:col-span-12" : "lg:col-span-4")}>
              <div className={cx(i === 4 && "lg:flex lg:items-center lg:gap-8")}>
                <div className="flex items-center justify-between lg:shrink-0">
                  <IconBadge name={item.icon} />
                  <span className="font-mono text-xs text-dim lg:hidden">0{i + 1}</span>
                </div>
                <div className={cx(i === 4 ? "mt-6 lg:mt-0" : "mt-6")}>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">
                    {item.title === "Clear reporting" ? (
                      <>
                        <Fill k="reportingFrequency" /> {item.text}
                      </>
                    ) : (
                      item.text
                    )}
                  </p>
                </div>
              </div>
            </Tile>
          ))}
        </div>
      </Container>

      {/* How we work preview */}
      <Container className="mt-24">
        <Tile className="p-7 sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Label index="06">How we work</Label>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A structured five-step process</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">
                From understanding your goals to improving results every reporting cycle.
              </p>
            </div>
            <TextLink href="/how-we-work">See how we work</TextLink>
          </div>
          <ol className="mt-10 grid gap-2 sm:grid-cols-5">
            {workflowSteps.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border border-line bg-surface-2 p-5">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <p className="mt-6 font-display text-lg font-semibold">{step.title}</p>
                {i < workflowSteps.length - 1 && (
                  <Icon
                    name="arrow-right"
                    className="absolute -right-[13px] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-void p-0.5 text-signal sm:block"
                  />
                )}
              </li>
            ))}
          </ol>
        </Tile>
      </Container>

      <CtaStrip />
    </>
  );
}

function ServiceTile({
  service,
  className,
  large = false,
  delay,
}: {
  service: (typeof services)[number];
  className?: string;
  large?: boolean;
  delay?: number;
}) {
  return (
    <Tile as="article" delay={delay} className={cx("flex flex-col justify-between gap-10", large && "bg-grid sm:p-10", className)}>
      {large && <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-signal/10 blur-3xl" />}
      <div className="flex items-start justify-between">
        <IconBadge name={service.icon} className={large ? "h-14 w-14" : undefined} />
        <Label>{service.short}</Label>
      </div>
      <div>
        <h3 className={cx("font-semibold leading-tight", large ? "text-3xl sm:text-[2.6rem]" : "text-2xl")}>{service.title}</h3>
        <p className={cx("mt-3 leading-relaxed text-muted", large && "max-w-lg text-lg")}>{service.summary}</p>
        <Link
          href={enquireHref(service)}
          className="group mt-6 inline-flex items-center gap-1.5 font-semibold text-signal underline-offset-4 hover:underline"
        >
          Enquire Now <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          <span className="sr-only"> about {service.title}</span>
        </Link>
      </div>
    </Tile>
  );
}
