import { NumberCard } from "@/components/cards";
import { Icon } from "@/components/Icon";
import { Fill, SampleTag } from "@/components/Sample";
import { CtaBand, PageHero, Spacer } from "@/components/sections";
import { ButtonLink, HeadingPanel, Lead, RadioDot, Row, Tick } from "@/components/ui";
import { Bars3D, IsoIcon, ProcessRail, SphereTile } from "@/components/visuals";
import { compliance, disclaimer, steps } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How We Work — Process, Quality & Reporting",
  description:
    "Five steps agreed in writing before day one, recorded and reviewed calls, plain daily reporting and strict calling rules.",
  path: "/how-we-work",
});

/** An illustrative report, so visitors can see the shape of what they receive. */
const exampleReport = [
  { label: "Leads dialled", value: "412" },
  { label: "Conversations", value: "156" },
  { label: "Qualified", value: "61" },
  { label: "Handed to your team", value: "48" },
  { label: "Rejected, with reasons", value: "13" },
];

const mono = "font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute";

export default function HowWeWorkPage() {
  return (
    <div className="wrap @container">
      <PageHero
        label="How we work"
        title="How we |work"
        intro="Five steps, agreed in writing before day one. Then daily numbers, recorded calls and a team that tunes the work every week."
        actions={
          <ButtonLink href="/contact" arrow>
            Plan a campaign
          </ButtonLink>
        }
        visual={<ProcessRail items={steps} className="absolute inset-x-[2cqw] top-1/2 -translate-y-1/2" />}
        aside={
          <dl className="flex h-full flex-col justify-end">
            {[
              { label: "Live in", value: <Fill k="launchTime" /> },
              { label: "Calls reviewed", value: <Fill k="qaShare" /> },
              { label: "Reports", value: <Fill k="reportingFrequency" /> },
            ].map((d) => (
              <div key={d.label} className="border-t border-line px-6 py-4 md:px-7">
                <dt className={mono}>{d.label}</dt>
                <dd className="mt-1">{d.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* The five steps */}
      <section aria-labelledby="steps-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="steps-title" text="The process" className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead title="Five steps, every time" sub="For a calling team, a website or an ad campaign" />
          </div>
        </Row>
        <ol>
          {steps.map((s, i) => (
            <li key={s.title}>
              <Row>
                <div className="flex flex-col justify-between gap-6 p-6 md:p-8">
                  <span className="display text-[3.5rem] leading-none md:text-[4.5rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex items-center gap-3 text-xl md:text-2xl">
                    <span aria-hidden className="size-2.5 shrink-0 bg-orange" />
                    {s.title}
                  </h3>
                </div>
                <div className="grid place-items-center p-6 max-lg:hidden">
                  <IsoIcon name={s.icon} className="w-full max-w-[8.5rem]" />
                </div>
                <p className="flex items-center bg-bg p-6 leading-relaxed text-mute md:p-8 md:text-lg lg:col-span-2">
                  {s.text}
                </p>
              </Row>
            </li>
          ))}
        </ol>
      </section>

      {/* Quality */}
      <section aria-labelledby="quality-title">
        <Spacer />
        <Row className="lg:min-h-[11.25rem]">
          <div className="flex items-start max-lg:hidden">
            <SphereTile className="size-[11.25rem]" />
            <RadioDot />
          </div>
          <div className="max-lg:hidden" />
          <HeadingPanel id="quality-title" text="Quality" className="justify-center md:col-span-2" />
        </Row>
        <Row className="max-md:grid-cols-2">
          <NumberCard
            n={1}
            icon="check-shield"
            title="Calls reviewed"
            text={
              <>
                <Fill k="qaShare" /> scored by quality analysts.
              </>
            }
            className="min-h-[20rem]"
          />
          <NumberCard
            n={2}
            icon="database"
            title="Every call recorded"
            text={
              <>
                Recordings kept for <Fill k="retention" />.
              </>
            }
            className="min-h-[20rem]"
          />
          <NumberCard
            n={3}
            icon="document"
            title="Written criteria"
            text="Your definition of a qualified lead, agreed before the first call."
            className="min-h-[20rem]"
          />
          <NumberCard
            n={4}
            icon="users"
            title="Weekly coaching"
            text="Agents coached on their own recorded calls."
            className="min-h-[20rem]"
          />
        </Row>
      </section>

      {/* Reporting */}
      <section aria-labelledby="reporting-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="reporting-title" text="Reporting" className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead
              title={
                <>
                  <Fill k="reportingFrequency" /> reports
                </>
              }
              sub="Plain numbers, with a reason for every rejected lead"
            />
          </div>
        </Row>
        <Row>
          <div className="panel relative z-[2] p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className={mono}>Example daily report</p>
              <SampleTag>Example</SampleTag>
            </div>
            <dl className="mt-6">
              {exampleReport.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-4 border-t border-line py-3">
                  <dt className="text-sm">{r.label}</dt>
                  <dd className="display text-2xl">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-72 max-md:hidden">
            <Bars3D className="absolute inset-0 m-auto h-[78%] w-[86%]" />
          </div>
          <div className="flex flex-col justify-between gap-8 bg-bg p-6 md:col-span-2 md:p-8">
            <p className="text-lg leading-relaxed md:text-xl">
              You see what we see: every lead dialled, reached, qualified and handed over, plus the reason behind every
              rejection. Recordings are there when you want to listen.
            </p>
            <div>
              <p className={mono}>Tools</p>
              <p className="mt-1.5 leading-relaxed">
                <Fill k="tools" />
              </p>
            </div>
          </div>
        </Row>
      </section>

      {/* Compliance */}
      <section aria-labelledby="compliance-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="compliance-title" text="Compliance" className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead title="Rules we don’t bend" sub={disclaimer} />
          </div>
        </Row>
        <Row as="ul">
          {compliance.map((c, i) => (
            <li
              key={i}
              className="brackets relative flex items-center gap-4 border-b border-line bg-bg px-6 py-6 [--b-inset:0.6rem] md:px-8 lg:col-span-2"
            >
              <Tick />
              <span className="leading-relaxed">{c}</span>
            </li>
          ))}
        </Row>
        <Row>
          <div className="flex flex-col justify-center gap-4 p-6 md:col-span-2 md:p-8 lg:col-span-3">
            <p className="flex items-center gap-3 leading-relaxed">
              <Icon name="document" className="h-5 w-5 shrink-0" />
              Need it in writing for your compliance team? We’ll walk them through our process before you sign.
            </p>
          </div>
          <div className="flex items-center p-6 md:col-span-2 md:p-8 lg:col-span-1">
            <ButtonLink href="/contact" variant="line" arrow className="w-full">
              Ask about compliance
            </ButtonLink>
          </div>
        </Row>
      </section>

      <CtaBand />
    </div>
  );
}
