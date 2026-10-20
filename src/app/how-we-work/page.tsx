import { Icon, type IconName } from "@/components/Icon";
import { CtaBand, PageHero } from "@/components/sections";
import { Container, Placeholder, SectionHeading } from "@/components/ui";
import { workflowSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How We Work",
  description:
    "Our five-stage way of working: Understand, Plan, Execute, Qualify, and Report & Improve. A systematic approach to dependable business process support.",
  path: "/how-we-work",
});

/** Extra detail for each stage, in the same order as workflowSteps. */
const stageDetail: { icon: IconName; activities: string[]; outcome: string }[] = [
  {
    icon: "search",
    activities: ["Discovery conversation", "Review of your current workflow", "Requirements and constraints captured"],
    outcome: "A shared understanding of what success looks like.",
  },
  {
    icon: "compass",
    activities: ["Roles and responsibilities", "Documented process steps", "Communication channels and contacts"],
    outcome: "An agreed plan, with criteria we can both measure against.",
  },
  {
    icon: "flow",
    activities: ["Team briefed on your process", "Work carried out to documented procedures", "Issues raised early"],
    outcome: "Consistent, traceable day-to-day delivery.",
  },
  {
    icon: "check-shield",
    activities: ["Records checked against your criteria", "Incomplete items followed up", "Exceptions flagged to you"],
    outcome: "Outputs you can rely on.",
  },
  {
    icon: "chart",
    activities: ["Progress updates", "Bottlenecks identified", "Improvement suggestions"],
    outcome: "A process that gets better over time.",
  },
];

/**
 * Operating details that differ per client. Replace the placeholder text
 * once the company confirms its standard practices.
 */
const operatingDetails: { icon: IconName; title: string; text: string; placeholder: string }[] = [
  {
    icon: "check-shield",
    title: "Quality assurance",
    text: "Outputs are reviewed against the criteria agreed during planning before they are handed over.",
    placeholder: "Describe review method, e.g. sample checks or second review",
  },
  {
    icon: "calendar",
    title: "Reporting",
    text: "Progress reports are shared at an interval agreed with each client.",
    placeholder: "Standard reporting frequency and format",
  },
  {
    icon: "database",
    title: "CRM & communication tools",
    text: "We can work within your existing CRM and communication tools, or agree a setup with you.",
    placeholder: "Tools the team is experienced with",
  },
  {
    icon: "refresh",
    title: "Client feedback",
    text: "Feedback is reviewed regularly and used to adjust procedures and training.",
    placeholder: "How and how often feedback reviews take place",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A systematic process, from first conversation to continuous improvement."
        intro="Dependable outsourcing depends on clear structure. Every engagement follows the same five stages, so you always know what is happening and what comes next."
      />

      <section className="py-20 sm:py-28" aria-label="Five-stage workflow">
        <Container>
          <ol className="relative">
            <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-gradient-to-b from-accent via-accent/40 to-line sm:left-[2.1rem]" />
            {workflowSteps.map((step, i) => {
              const detail = stageDetail[i];
              return (
                <li key={step.title} className="reveal relative grid gap-6 pb-14 pl-20 last:pb-0 sm:pl-28 lg:grid-cols-12 lg:gap-10">
                  <span className="absolute left-0 top-0 flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full border border-accent/40 bg-paper font-display text-sm font-bold text-accent sm:h-[4.2rem] sm:w-[4.2rem] sm:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 text-accent">
                      <Icon name={detail.icon} className="h-5 w-5" />
                      <span className="text-xs font-semibold uppercase tracking-[0.16em]">Stage {i + 1}</span>
                    </div>
                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{step.title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-muted">{step.text}</p>
                  </div>
                  <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 lg:col-span-7">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">What happens</h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-3 sm:gap-4">
                      {detail.activities.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-[0.95rem] sm:block">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent sm:mb-2" />
                          {a}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 border-t border-line pt-4 text-[0.95rem]">
                      <span className="font-semibold">Result: </span>
                      <span className="text-muted">{detail.outcome}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Operating details"
            title="Agreed with you, written down, reviewed regularly."
            intro="Specific tools, reporting schedules and quality checks are confirmed for each engagement during planning."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {operatingDetails.map((d) => (
              <li key={d.title} className="reveal rounded-[var(--radius-card)] border border-line p-7">
                <Icon name={d.icon} className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-xl font-bold">{d.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d.text}</p>
                <p className="mt-4">
                  <Placeholder>{d.placeholder}</Placeholder>
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title="Let's map out your process together." />
    </>
  );
}
