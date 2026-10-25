import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { Fill } from "@/components/Sample";
import { CaseStudiesSection, CtaBand, FaqSection, PageHero, Spacer } from "@/components/sections";
import { ButtonLink, HeadingPanel, Lead, Micro, Row, Tick } from "@/components/ui";
import { IsoIcon, IsoRow } from "@/components/visuals";
import { disclaimer, enquireHref, services, type Service } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "US Lead Generation, Web Apps & EdTech Support",
  description:
    "US lead generation and live transfers, websites and web apps, SEO and ads, and admissions calling for EdTech teams in India. One team in Kanpur.",
  path: "/services",
});

/** Section headings: "\n" breaks the line everywhere, "|" on phones only. */
const headings: Record<string, string> = {
  "us-lead-generation": "US Lead\nGeneration",
  "web-apps-digital-marketing": "Web Apps &\nMarketing",
  "india-edtech": "EdTech |Support",
  "custom-solutions": "Custom\nSolutions",
};

/** The working details of each service. Unconfirmed facts use <Fill>. */
const details: Record<string, { label: string; value: ReactNode }[]> = {
  "us-lead-generation": [
    { label: "You get", value: <Fill k="deliveryType" /> },
    { label: "Hours", value: <Fill k="coverage" /> },
    { label: "Tools", value: <Fill k="tools" /> },
    { label: "Reports", value: <Fill k="reportingFrequency" /> },
  ],
  "web-apps-digital-marketing": [
    { label: "Built with", value: <Fill k="techStack" /> },
    { label: "Pricing", value: <Fill k="engagement" /> },
    { label: "Follow-up", value: "Our calling team can ring every enquiry the site brings in." },
    { label: "Reports", value: "Traffic, enquiries and cost per lead." },
  ],
  "india-edtech": [
    { label: "Call-backs", value: "Fast, while the enquiry is still warm." },
    { label: "Partner", value: <Fill k="edtechPartner" /> },
    { label: "Tracking", value: "Every enquiry logged, from first call to admission." },
    { label: "Reports", value: <Fill k="reportingFrequency" /> },
  ],
  "custom-solutions": [
    {
      label: "Start",
      value: (
        <>
          Live within <Fill k="launchTime" /> of sign-off
        </>
      ),
    },
    { label: "Tools", value: "Yours or ours." },
    { label: "Team", value: "Sized to your volume, on your hours." },
    { label: "Reports", value: <Fill k="reportingFrequency" /> },
  ],
};

export default function ServicesPage() {
  return (
    <div className="wrap @container">
      <PageHero
        label="Services"
        title="Services"
        intro="Four service lines, one team. Use one, or combine them so the campaign that brings in enquiries and the people who call them work as one."
        actions={
          <ButtonLink href="/contact" arrow>
            Free consultation
          </ButtonLink>
        }
        visual={
          <IsoRow items={services.map((s) => ({ icon: s.icon, label: s.short }))} className="absolute inset-0" />
        }
        aside={
          <nav aria-label="Services on this page" className="flex h-full flex-col">
            <p className="px-6 pb-4 pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute md:px-7">
              Jump to
            </p>
            <ul className="mt-auto">
              {services.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex items-center justify-between gap-3 border-t border-line px-6 py-4 transition-colors hover:bg-panel md:px-7"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-orange-deep">{String(i + 1).padStart(2, "0")}</span>
                      {s.short}
                    </span>
                    <Icon
                      name="arrow-right"
                      className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5"
                      strokeWidth={2}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {services.map((s, i) => (
        <ServiceSection key={s.id} service={s} index={i} />
      ))}

      <CaseStudiesSection />
      <FaqSection />
      <CtaBand />
    </div>
  );
}

function ServiceSection({ service: s, index }: { service: Service; index: number }) {
  const titleId = `${s.id}-title`;
  return (
    <section id={s.id} aria-labelledby={titleId} className="scroll-mt-24">
      <Spacer />
      <Row className="lg:min-h-[12rem]">
        <HeadingPanel id={titleId} text={headings[s.id] ?? s.title} className="md:col-span-2" />
        <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
          <Micro>
            {String(index + 1).padStart(2, "0")} <span className="text-mute">/</span> {String(services.length).padStart(2, "0")}
          </Micro>
          <Lead title={s.kicker} size="md" />
        </div>
        <div className="grid place-items-center p-6 max-lg:hidden">
          <IsoIcon name={s.icon} className="w-full max-w-[10rem]" />
        </div>
      </Row>

      <Row>
        <div className="flex flex-col gap-8 bg-bg p-6 md:col-span-2 md:p-8 lg:py-10">
          <p className="text-lg leading-relaxed md:text-xl">{s.summary}</p>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {details[s.id]?.map((d) => (
              <div key={d.label}>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">{d.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col md:col-span-2">
          <p className="px-6 pb-4 pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute md:px-8 lg:pt-10">
            What’s included
          </p>
          <ul className="grid flex-1 content-start md:grid-cols-2">
            {s.includes.map((item) => (
              <li
                key={item}
                className="brackets relative flex min-h-[4.25rem] items-center gap-3 border-t border-line px-6 [--b-inset:0.6rem] md:px-8"
              >
                <Tick />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Row>

      <Row>
        <div className="flex flex-col justify-center gap-2 bg-bg p-6 md:col-span-2 md:p-8 lg:col-span-3">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">Best for</p>
          <p className="leading-relaxed">{s.bestFor}</p>
          {s.id === "us-lead-generation" && <p className="mt-2 text-xs leading-relaxed text-mute">{disclaimer}</p>}
        </div>
        <div className="flex items-center p-6 md:col-span-2 md:p-8 lg:col-span-1">
          <ButtonLink href={enquireHref(s)} arrow className="w-full">
            Enquire
          </ButtonLink>
        </div>
      </Row>
    </section>
  );
}
