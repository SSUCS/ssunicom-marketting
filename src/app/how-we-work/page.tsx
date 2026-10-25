import { CtaStrip, PageHero } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { Fill } from "@/components/Sample";
import { Bullets, Container, DraftNotice, Label, SectionHeading, Tile, cx } from "@/components/ui";
import { compliancePoints, workflowSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How We Work — Process, Quality & Reporting",
  description: "Our five-step process, quality checks, reporting and compliance practices for every engagement.",
  path: "/how-we-work",
});

const reportItems = [
  "Leads received or dialled",
  "Contacts made",
  "Leads qualified",
  "Transfers or appointments delivered",
  "Rejection reasons",
  "Recommendations for the next period",
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        label="How we work"
        title="Five steps, agreed before work starts."
        intro="Outsourcing works when both sides know exactly what will happen, who does it and how results are measured. Every engagement follows the same five steps."
      />

      {/* Steps */}
      <Container className="mt-3">
        <ol className="grid gap-3 lg:grid-cols-6">
          {workflowSteps.map((step, i) => (
            <Tile
              as="li"
              key={step.title}
              delay={i * 60}
              className={cx("flex flex-col justify-between gap-10", i < 2 ? "lg:col-span-3" : "lg:col-span-2")}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-signal">Step 0{i + 1}</span>
                <span aria-hidden className="font-display text-6xl font-semibold leading-none text-surface-3">
                  {i + 1}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{step.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              </div>
            </Tile>
          ))}
        </ol>
      </Container>

      {/* Quality + reporting + tools */}
      <Container className="mt-24">
        <SectionHeading index="02" label="Operations" title="Quality, reporting and tools." />
        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          <Tile className="lg:col-span-5">
            <div className="flex items-center justify-between">
              <Label>Quality checks</Label>
              <Icon name="check-shield" className="h-5 w-5 text-signal" />
            </div>
            <Bullets
              className="mt-5"
              items={[
                <>
                  Call monitoring and scoring by dedicated quality analysts (<Fill k="qaShare" /> reviewed)
                </>,
                "Lead verification before every handover",
                "Regular calibration sessions with your team so our idea of a “qualified lead” matches yours",
                "Coaching for agents based on call reviews",
              ]}
            />
          </Tile>
          <Tile delay={80} className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Label>Reporting</Label>
              <span className="rounded-full border border-line-strong px-3 py-1 text-sm">
                Frequency: <Fill k="reportingFrequency" />
              </span>
            </div>
            <p className="mt-5 text-muted">Each report covers:</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {reportItems.map((r, i) => (
                <li key={r} className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3 text-[0.95rem]">
                  <span className="font-mono text-xs text-signal">0{i + 1}</span>
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Web and marketing clients also receive traffic, enquiry and campaign performance figures.
            </p>
          </Tile>
          <Tile className="flex flex-col gap-4 lg:col-span-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Icon name="sliders" className="h-5 w-5 text-signal" />
              <div>
                <Label>Tools</Label>
                <p className="mt-1.5 text-lg font-medium">We can work inside your CRM or provide our own.</p>
              </div>
            </div>
            <p className="text-muted lg:max-w-md lg:text-right">
              <Fill k="tools" />
            </p>
          </Tile>
        </div>
      </Container>

      {/* Compliance */}
      <Container className="mt-24">
        <div className="grid gap-3 lg:grid-cols-12">
          <Tile className="bg-grid flex flex-col justify-between gap-8 p-7 sm:p-9 lg:col-span-5">
            <div>
              <Label index="03">Compliance and data handling</Label>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">Part of the process, not an afterthought.</h2>
            </div>
            <p className="leading-relaxed text-muted">
              We contact consumers on behalf of US and Indian businesses, so we treat compliance as part of the process,
              not an afterthought.
            </p>
          </Tile>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {compliancePoints.map((point, i) => (
              <Tile as="li" key={point} delay={(i % 2) * 60} className="p-5">
                <Icon name="check" className="h-5 w-5 text-signal" />
                <p className="mt-4 text-[0.95rem] leading-relaxed text-fg/85">
                  {point === "Calls recorded and stored" ? (
                    <>
                      Calls recorded and stored: <Fill k="retention" />
                    </>
                  ) : (
                    point
                  )}
                </p>
              </Tile>
            ))}
          </ul>
        </div>
        <div className="mt-3">
          <DraftNotice>The company must confirm each compliance point above is accurate before publishing.</DraftNotice>
        </div>
      </Container>

      <CtaStrip />
    </>
  );
}
