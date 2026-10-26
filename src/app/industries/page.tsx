import Link from "next/link";
import { IndustryCard } from "@/components/cards";
import { DualClock } from "@/components/Clocks";
import { Icon } from "@/components/Icon";
import { Fill } from "@/components/Sample";
import { CtaBand, PageHero, Spacer, TestimonialsSection } from "@/components/sections";
import { ButtonLink, HeadingPanel, Lead, Micro, Row, Tick } from "@/components/ui";
import { SphereCluster } from "@/components/visuals";
import { industries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Industries & Markets — Finance, EdTech, SMBs",
  description:
    "Lead generation and calling for US student-loan document services and consumer finance, admissions support for EdTech in India, and web and marketing for growing businesses.",
  path: "/industries",
});

/** What we usually run for each industry, in the same order as `industries`. */
const work: string[][] = [
  ["Outbound outreach", "Lead qualification", "Document collection", "Live transfers"],
  ["Lead qualification", "Live transfers", "Appointment setting", "CRM updates"],
  ["Enquiry call-backs", "Counselling calls", "Admission follow-ups", "Daily reports"],
  ["Websites & landing pages", "SEO & ads", "Lead capture", "Enquiry follow-up"],
];

export default function IndustriesPage() {
  return (
    <div className="wrap @container">
      <PageHero
        label="Industries"
        title="Industries"
        intro="Four markets where we know the work, the rules and the people on the other end of the phone."
        actions={
          <ButtonLink href="/contact" arrow>
            Free consultation
          </ButtonLink>
        }
        visual={<DualClock className="absolute inset-x-[5cqw] top-1/2 -translate-y-1/2" />}
        aside={
          <div className="flex h-full flex-col justify-end gap-4 p-6 md:p-7 lg:py-9">
            <Micro>Your daytime</Micro>
            <p className="text-sm leading-relaxed text-mute">
              When it’s 9:00 in New York, it’s evening in Kanpur. Our US team works the night shift, so your prospects
              are called during their day.
            </p>
          </div>
        }
      />

      {/* Industry cards */}
      <section aria-labelledby="sectors-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="sectors-title" text={"Who we\nwork for"} className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead title="Where we know the work" sub="The industries we run campaigns for today" />
          </div>
        </Row>
        <Row>
          {industries.map((ind, i) => (
            <IndustryCard key={ind.title} icon={ind.icon} market={ind.market} title={ind.title} text={ind.text} className="min-h-[30rem]">
              <div className="mt-auto pt-8">
                <ul className="border-t border-line pt-5">
                  {work[i]?.map((w) => (
                    <li key={w} className="flex items-center gap-3 py-1.5 text-sm">
                      <Tick className="h-3 w-4" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </IndustryCard>
          ))}
        </Row>
      </section>

      {/* Markets */}
      <section aria-labelledby="markets-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <div className="relative grid place-items-center max-lg:hidden">
            <SphereCluster />
          </div>
          <div className="max-lg:hidden" />
          <HeadingPanel id="markets-title" text="Markets" className="justify-center md:col-span-2" />
        </Row>
        <Row>
          <div className="flex flex-col justify-between gap-10 p-6 md:p-8 lg:min-h-[19rem]">
            <Micro>United States</Micro>
            <p className="display text-[5rem] leading-none">US</p>
            <p className="text-sm leading-relaxed text-mute">
              Lead generation, live transfers and appointment setting, on <Fill k="coverage" />.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-10 p-6 md:p-8">
            <Micro>India</Micro>
            <p className="display text-[5rem] leading-none">IN</p>
            <p className="text-sm leading-relaxed text-mute">
              Admissions calling for EdTech, plus websites and campaigns for growing businesses.
            </p>
          </div>
          <div className="panel relative z-[2] flex flex-col justify-between gap-10 p-6 md:col-span-2 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <Micro>Operations centre</Micro>
              <span className="font-mono text-xs text-mute">26.45° N, 80.33° E</span>
            </div>
            <p className="display text-[clamp(3rem,7cqw,6rem)] leading-none">Kanpur</p>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="max-w-sm text-sm leading-relaxed text-mute">
                Every campaign is run from one floor in Kanpur, Uttar Pradesh, with the same training and quality checks.
              </p>
              <Link
                href="/infrastructure"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] hover:text-orange-deep"
              >
                See the floor
                <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </Row>
        <Row>
          <div className="flex flex-col justify-center gap-2 bg-bg p-6 md:col-span-2 md:p-8 lg:col-span-3">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">Not on the list?</p>
            <p className="leading-relaxed">
              Also on our radar: <Fill k="otherIndustries" />. If your process runs on phone calls or web enquiries, ask
              us.
            </p>
          </div>
          <div className="flex items-center p-6 md:col-span-2 md:p-8 lg:col-span-1">
            <ButtonLink href="/contact?service=Custom%20solution" variant="line" arrow className="w-full">
              Ask us
            </ButtonLink>
          </div>
        </Row>
      </section>

      <TestimonialsSection />
      <CtaBand />
    </div>
  );
}
