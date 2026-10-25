import type { ReactNode } from "react";
import { CtaStrip, PageHero, PhotoSlot } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { Fill, SampleMark, SampleTag } from "@/components/Sample";
import { Bullets, ButtonLink, Container, IconBadge, Label, Tile } from "@/components/ui";
import { enquireHref, services, type Service } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { facts, sampleLists } from "@/lib/placeholders";

export const metadata = pageMetadata({
  title: "US Lead Generation, Web Apps & EdTech Support",
  description:
    "US lead generation services, document-preparation support, web app development, digital marketing and EdTech enquiry handling.",
  path: "/services",
});

const [usLeads, web, edtech, custom] = services;

export default function ServicesPage() {
  const projects = sampleLists.projects;

  return (
    <>
      <PageHero
        label="Services"
        title="Four service lines, one team."
        intro="Choose one, or combine them so the channel that brings in your enquiries and the people who follow them up work as a single process."
        aside={
          <nav aria-label="Services on this page" className="tile p-5">
            <Label>Jump to</Label>
            <ul className="mt-4 space-y-1.5">
              {services.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3 transition-colors hover:border-signal/50"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-signal">0{i + 1}</span>
                      <span className="font-medium">{s.short}</span>
                    </span>
                    <Icon name="arrow-right" className="h-4 w-4 rotate-90 text-muted group-hover:text-signal" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* 3.1 US Lead Generation */}
      <ServiceBlock service={usLeads} index="01">
        <Tile className="lg:col-span-7">
          <Label>What we do</Label>
          <Bullets
            className="mt-5"
            items={[
              "Outbound lead generation and prospecting",
              "Live call transfers: qualified prospects transferred to your team while still on the line",
              "Appointment setting for your sales or advisory staff",
              "Inbound call handling and enquiry response",
              "Lead qualification against your criteria",
              "Document collection and preparation support: gathering and organising customer information and paperwork for your team to review",
              "Data entry, CRM updates and follow-up calls",
              "Customer surveys and feedback calls",
            ]}
          />
        </Tile>
        <Tile delay={80} className="lg:col-span-5">
          <Label>What you get</Label>
          <Bullets
            className="mt-5"
            items={[
              <>
                <Fill k="deliveryType" /> in an agreed format
              </>,
              "Written qualification criteria agreed before launch",
              "Call recordings available for review",
              <>
                <Fill k="reportingFrequency" /> performance reports
              </>,
            ]}
          />
        </Tile>
        <div role="note" className="tile reveal flex gap-4 border-signal/25 p-6 lg:col-span-12">
          <Icon name="check-shield" className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
          <p className="leading-relaxed text-fg/85">
            <strong className="font-semibold text-fg">Important:</strong> We work on behalf of our clients. We do not
            provide legal or financial advice, approve loans or loan forgiveness, or represent any government agency.
          </p>
        </div>
      </ServiceBlock>

      {/* 3.2 Web Apps & Digital Marketing */}
      <ServiceBlock service={web} index="02">
        <Tile className="lg:col-span-4">
          <div className="flex items-center justify-between">
            <Label>Build</Label>
            <Icon name="layers" className="h-5 w-5 text-signal" />
          </div>
          <Bullets
            className="mt-5"
            items={[
              "Business websites and landing pages",
              "Custom web applications and customer portals",
              "Dashboards and internal tools",
              <>
                Built with <Fill k="techStack" />
              </>,
            ]}
          />
        </Tile>
        <Tile delay={60} className="lg:col-span-4">
          <div className="flex items-center justify-between">
            <Label>Market</Label>
            <Icon name="search" className="h-5 w-5 text-signal" />
          </div>
          <Bullets
            className="mt-5"
            items={[
              "Search engine optimisation (SEO)",
              "Google and Meta advertising",
              "Social media management",
              "Email campaigns",
              "Analytics and conversion tracking",
            ]}
          />
        </Tile>
        <Tile delay={120} className="flex flex-col justify-between gap-6 lg:col-span-4">
          <div>
            <Label>What you get</Label>
            <p className="mt-5 leading-relaxed text-fg/85">
              A launched website or app that you own, campaign reports showing where enquiries come from, and the option
              to route new leads straight to our calling team.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface-2 p-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">Engagement</p>
            <p className="mt-1.5 font-medium">
              <Fill k="engagement" />
            </p>
          </div>
        </Tile>
        <Tile className="lg:col-span-12">
          <Label>How a project runs</Label>
          <ol className="mt-5 grid gap-2 sm:grid-cols-5">
            {["Discover", "Design", "Build", "Launch", "Grow"].map((step, i) => (
              <li key={step} className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3.5">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <span className="font-display text-lg font-semibold">{step}</span>
              </li>
            ))}
          </ol>
        </Tile>
        <div className="lg:col-span-12">
          <div className="mb-3 mt-3 flex items-center gap-3 px-1">
            <Label>Recent work</Label>
            <SampleTag show={!projects.confirmed}>Sample projects</SampleTag>
          </div>
          <ul className="grid gap-3 md:grid-cols-3">
            {projects.items.map((p, i) => (
              <Tile as="li" key={p.client} delay={i * 60} className="p-5">
                <PhotoSlot label="Project screenshot" className="min-h-40" />
                <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">{p.type}</p>
                <p className="mt-1 font-display text-lg font-semibold">
                  {projects.confirmed ? p.client : <SampleMark>{p.client}</SampleMark>}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.outcome}</p>
              </Tile>
            ))}
          </ul>
        </div>
      </ServiceBlock>

      {/* 3.3 India EdTech Support */}
      <ServiceBlock service={edtech} index="03">
        <Tile className="lg:col-span-7">
          <Label>What we do</Label>
          <Bullets
            className="mt-5"
            items={[
              "Handling incoming course and admission enquiries",
              "Counselling calls to understand each student's needs",
              "Scheduling demo classes and counsellor appointments",
              "Application and enrolment follow-ups",
              "CRM updates and enquiry status tracking",
            ]}
          />
        </Tile>
        <div className="grid gap-3 lg:col-span-5">
          <Tile delay={80}>
            <Label>What you get</Label>
            <p className="mt-5 leading-relaxed text-fg/85">
              Every enquiry contacted and recorded, clear status for each student, and regular reports on enquiries,
              demos and enrolments.
            </p>
          </Tile>
          <Tile delay={140} className="flex items-center justify-between gap-4">
            <div>
              <Label>Partner</Label>
              <p className="mt-2 font-display text-lg font-semibold">
                <Fill k="edtechPartner" />
              </p>
            </div>
            {!facts.edtechPartner.confirmed && <span className="text-right text-xs text-muted">Named only if permitted</span>}
          </Tile>
        </div>
      </ServiceBlock>

      {/* 3.4 Custom Solutions */}
      <ServiceBlock service={custom} index="04">
        <Tile className="lg:col-span-12">
          <Label>Examples</Label>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Back-office processing and data entry", i: "document" as const },
              { t: "Data management, cleansing and validation", i: "database" as const },
              { t: "Customer support by voice, email and chat", i: "chat" as const },
              { t: "Research and market surveys", i: "compass" as const },
            ].map(({ t, i }) => (
              <li key={t} className="flex min-h-28 flex-col justify-between gap-4 rounded-xl border border-line bg-surface-2 p-4">
                <Icon name={i} className="h-5 w-5 text-signal" />
                <span className="font-medium leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </Tile>
      </ServiceBlock>

      <CtaStrip />
    </>
  );
}

function ServiceBlock({ service, index, children }: { service: Service; index: string; children: ReactNode }) {
  return (
    <section id={service.id} aria-labelledby={`${service.id}-title`} className="scroll-mt-24">
      <Container className="mt-24">
        <div className="grid gap-3 lg:grid-cols-12">
          <Tile className="bg-grid flex flex-col justify-between gap-8 p-7 sm:p-10 lg:col-span-12 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <IconBadge name={service.icon} />
                <Label index={index}>Service</Label>
              </div>
              <h2 id={`${service.id}-title`} className="mt-6 text-3xl font-semibold leading-[1.05] sm:text-5xl">
                {service.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{service.description}</p>
            </div>
            <ButtonLink href={enquireHref(service)} arrow className="shrink-0 self-start lg:self-end">
              Enquire Now
            </ButtonLink>
          </Tile>
          {children}
        </div>
      </Container>
    </section>
  );
}
