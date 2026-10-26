import type { ReactNode } from "react";
import { NumberCard } from "@/components/cards";
import { Icon, type IconName } from "@/components/Icon";
import { Fill, SampleMark, SampleTag } from "@/components/Sample";
import { CtaBand, PageHero, Spacer } from "@/components/sections";
import { ButtonLink, HeadingPanel, Lead, Row } from "@/components/ui";
import { IsoIcon, PixelPortrait } from "@/components/visuals";
import { roles } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { fact, facts, sampleLists } from "@/lib/placeholders";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Careers — International BPO Jobs in Kanpur",
  description:
    "Voice process, trainer, quality, EdTech, web and marketing roles in Kanpur. Full training before your first call. We never charge candidates a fee.",
  path: "/careers",
});

const mono = "font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute";
const applyHref = (role: string) => `mailto:${fact("hrEmail")}?subject=${encodeURIComponent(`Application: ${role}`)}`;

const offers: { icon: IconName; title: string; text: ReactNode }[] = [
  { icon: "graduation", title: "Training first", text: "Structured training before you start on any process." },
  { icon: "chart", title: "Incentives", text: "Performance-based incentives on top of your salary." },
  { icon: "users", title: "Room to grow", text: "A clear path to team lead, trainer and quality roles." },
];

export default function CareersPage() {
  const benefits = sampleLists.benefits;

  return (
    <div className="wrap @container">
      <PageHero
        label="Careers"
        title="Careers"
        intro="Start a career in international BPO or digital work. Full training before your first call, steady shifts and coaching every week."
        actions={
          <>
            <ButtonLink href="#roles" arrow>
              See open roles
            </ButtonLink>
            <ButtonLink href={applyHref("General application")} variant="line" icon="mail">
              Email your CV
            </ButtonLink>
          </>
        }
        visual={
          <div aria-hidden="true" className="absolute inset-0 grid grid-cols-3 content-center gap-[1.5cqw] px-[4cqw]">
            {[5, 12, 19, 26, 33, 40].map((seed) => (
              <PixelPortrait key={seed} seed={seed} res={36} className="aspect-square w-full chamfer [--cut:12px]" />
            ))}
          </div>
        }
        aside={
          <div role="note" aria-labelledby="no-fee-title" className="flex h-full flex-col justify-between gap-6 bg-ink p-6 text-panel md:p-7">
            <p id="no-fee-title" className="flex items-center gap-3 font-mono text-[0.8125rem] uppercase tracking-[0.04em]">
              <span aria-hidden className="size-3 bg-orange" />
              No fees, ever
            </p>
            <p className="text-sm leading-relaxed">
              We never charge a fee for jobs, interviews or training. If anyone asks you for money in our name, don’t
              pay. Email{" "}
              <a href={site.contact.emailHref} className="underline decoration-orange underline-offset-4 hover:text-orange">
                {site.contact.email}
              </a>
              .
            </p>
          </div>
        }
      />

      {/* Roles */}
      <section id="roles" aria-labelledby="roles-title" className="scroll-mt-24">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="roles-title" text="Open roles" className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead title="Six ways in" sub="Full-time, at our office in Kanpur" />
          </div>
        </Row>
        <ul>
          {roles.map((r) => (
            <li key={r.title}>
              <Row>
                <div className="flex flex-col items-start justify-between gap-6 p-6 md:p-8">
                  <span className="border border-line bg-panel px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em]">
                    {r.tag}
                  </span>
                  <h3 className="text-xl leading-snug md:text-2xl">{r.title}</h3>
                </div>
                <div className="grid place-items-center p-6 max-lg:hidden">
                  <IsoIcon name={r.icon} className="w-full max-w-[8.5rem]" />
                </div>
                <div className="flex flex-col justify-between gap-6 bg-bg p-6 md:p-8 lg:col-span-2">
                  <p className="leading-relaxed md:text-lg">{r.text}</p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className={mono}>Kanpur · Full-time</span>
                    <ButtonLink href={applyHref(r.title)} variant="line" arrow>
                      Apply
                    </ButtonLink>
                  </div>
                </div>
              </Row>
            </li>
          ))}
        </ul>
      </section>

      {/* What we offer */}
      <section aria-labelledby="offer-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="offer-title" text="What you get" className="md:col-span-2" />
          <div className="flex flex-col justify-center gap-4 bg-bg p-6 md:col-span-2 md:p-8 lg:items-center">
            <Lead title="More than a seat on the floor" />
          </div>
        </Row>
        <Row className="max-md:grid-cols-2">
          {offers.map((o, i) => (
            <NumberCard key={o.title} n={i + 1} icon={o.icon} title={o.title} text={o.text} className="min-h-[19rem]" />
          ))}
          <div className="panel flex flex-col p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs">04</span>
              <SampleTag show={!benefits.confirmed} />
            </div>
            <h3 className="mt-auto pt-6 text-[1.0625rem] leading-snug">Benefits</h3>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-mute">
              {benefits.items.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span aria-hidden className="size-1.5 shrink-0 bg-orange" />
                  {benefits.confirmed ? b : <SampleMark>{b}</SampleMark>}
                </li>
              ))}
            </ul>
          </div>
        </Row>
      </section>

      {/* How to apply */}
      <section aria-labelledby="apply-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="apply-title" text="How to apply" className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead title="Two minutes, no forms" sub="Send your CV and the role you want" />
          </div>
        </Row>
        <Row>
          {[
            { icon: "mail" as IconName, label: "Email your CV", value: <Fill k="hrEmail" />, href: applyHref("General application") },
            { icon: "phone" as IconName, label: "Call HR", value: <Fill k="hrPhone" />, href: `tel:${fact("hrPhone").replace(/\s/g, "")}` },
            { icon: "linkedin" as IconName, label: "Openings on LinkedIn", value: "SS Universal Communication Services", href: fact("linkedin"), external: true },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="brackets group relative flex min-h-52 flex-col justify-between gap-8 p-6 transition-colors [--b-color:transparent] hover:bg-panel hover:[--b-color:var(--color-orange)] md:p-8"
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="grid size-11 place-items-center border border-line bg-panel">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <span>
                <span className={mono}>{c.label}</span>
                <span className="mt-2 flex items-center justify-between gap-3 text-[0.9375rem]">
                  <span className="min-w-0 break-words">{c.value}</span>
                  <Icon name="arrow-up-right" className="h-4 w-4 shrink-0" strokeWidth={2} />
                </span>
              </span>
            </a>
          ))}
          <div className="flex flex-col justify-end gap-3 p-6 md:p-8">
            <p className={mono}>What happens next</p>
            <p className="text-sm leading-relaxed">
              Tell us which role you want. If it’s a fit, our HR team will call you to arrange an interview.
            </p>
            {!facts.hrEmail.confirmed && <SampleTag className="self-start">HR contacts are samples</SampleTag>}
          </div>
        </Row>
      </section>

      <CtaBand text="Hiring for a campaign of your own? Tell us the process and the volume, and we’ll staff it, train it and run it." />
    </div>
  );
}
