import type { ReactNode } from "react";
import { faqs, industries, roles } from "@/lib/content";
import { fact, sampleLists } from "@/lib/placeholders";
import { site } from "@/lib/site";
import { CaseCard, IndustryCard, RoleCard, TeamCard, TestimonialCard } from "./cards";
import { Icon, type IconName } from "./Icon";
import { SliderButtons } from "./motion";
import { Fill, SampleTag } from "./Sample";
import {
  ArrowBox,
  ButtonLink,
  Crosshair,
  DisplayHeading,
  HeadingPanel,
  Lead,
  Micro,
  RadioDot,
  Row,
  Slider,
  cx,
} from "./ui";
import { Bars3D, CubeCluster, CubeTile, SphereCluster } from "./visuals";

/** An empty grid row, for breathing room between sections. */
export function Spacer({ className }: { className?: string }) {
  return <Row className={cx("h-16 md:h-24", className)} />;
}

/** Stacked contact links that sit just outside the grid on wide screens. */
export function SocialRail({ className }: { className?: string }) {
  const items: { href: string; label: string; icon: IconName; external?: boolean }[] = [
    { href: site.contact.phoneHref, label: `Call ${site.contact.phoneDisplay}`, icon: "phone" },
    { href: site.contact.emailHref, label: `Email ${site.contact.email}`, icon: "mail" },
    { href: fact("linkedin"), label: "SS Universal Communication Services on LinkedIn", icon: "linkedin", external: true },
  ];
  return (
    <div className={cx("flex-col", className)}>
      <RadioDot />
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          aria-label={i.label}
          className="-mt-px grid size-[2.65rem] place-items-center border border-line bg-panel transition-colors hover:bg-ink hover:text-panel"
          {...(i.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Icon name={i.icon} className="h-4 w-4" strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}

/** Title block at the top of inner pages: huge title, intro, actions and side content. */
export function PageHero({
  title,
  label,
  intro,
  actions,
  visual,
  aside,
  size = "lg",
}: {
  title: string;
  label: string;
  intro: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  aside?: ReactNode;
  /** "md" for text-heavy pages such as the legal pages. */
  size?: "lg" | "md";
}) {
  const sq = "absolute size-3 bg-orange";
  return (
    <section aria-labelledby="page-title" className="relative">
      <div className="relative h-10 md:h-[3.9rem]">
        <Crosshair className="absolute right-full top-5 hidden lg:block" />
        <SocialRail className="absolute left-full top-5 hidden lg:flex" />
      </div>
      <div className="relative overflow-hidden border-t border-line px-4 pb-16 pt-14 md:px-5 md:pb-20 md:pt-20">
        <span aria-hidden className={cx(sq, "left-4 top-4 md:left-5 md:top-5")} />
        <span aria-hidden className={cx(sq, "right-4 top-4 md:right-5 md:top-5")} />
        <span aria-hidden className={cx(sq, "bottom-4 right-4 md:bottom-5 md:right-5")} />
        <DisplayHeading
          as="h1"
          id="page-title"
          text={title}
          className={cx(
            "leading-[0.84]",
            size === "lg" ? "text-[clamp(3.1rem,12.4vw,13rem)]" : "text-[clamp(2.6rem,8.4vw,8.75rem)]",
          )}
        />
        <Micro className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
          SS Universal <span className="text-mute">/</span> {label}
        </Micro>
      </div>
      <Row className="lg:min-h-[19rem]">
        <div className="flex flex-col justify-between gap-8 p-6 md:p-7 lg:py-9">
          <p className="text-[1.0625rem] leading-[1.5] md:text-lg">{intro}</p>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>
        <div className="relative max-lg:hidden lg:col-span-2">{visual}</div>
        <div className="relative flex flex-col max-md:border-t max-md:border-line">{aside}</div>
      </Row>
    </section>
  );
}

/** Closing call to action used at the bottom of inner pages. */
export function CtaBand({ text }: { text?: ReactNode }) {
  return (
    <section aria-labelledby="cta-title">
      <Spacer />
      <Row>
        <div className="panel relative z-[2] flex flex-col justify-between gap-10 p-6 md:col-span-2 md:p-10 lg:col-span-3">
          <DisplayHeading id="cta-title" text={"Ready when |you are"} className="h-section" />
          <p className="max-w-xl leading-relaxed text-mute">
            {text ?? (
              <>
                Tell us what you need: more leads, better-qualified leads or a website that works harder. A real person
                replies within <Fill k="replyTime" />.
              </>
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" arrow>
              Free consultation
            </ButtonLink>
            <ButtonLink href={site.contact.phoneHref} variant="line" icon="phone">
              {site.contact.phoneDisplay}
            </ButtonLink>
          </div>
        </div>
        <CubeTile className="min-h-64 md:max-lg:col-span-2" size={32} />
      </Row>
    </section>
  );
}

/** Sample case studies with a 3D bar chart header. */
export function CaseStudiesSection() {
  const cases = sampleLists.caseStudies;
  return (
    <section aria-labelledby="cases-title" id="results">
      <Spacer className="lg:h-28" />
      <Row>
        <div className="panel relative z-[2] flex flex-col justify-between gap-12 p-6 md:col-span-2 md:p-10 lg:min-h-[22rem]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Lead title="Results" as="p" />
            <SampleTag show={!cases.confirmed}>Sample figures</SampleTag>
          </div>
          <DisplayHeading id="cases-title" text={"Case\nstudies"} className="text-[clamp(3.6rem,9vw,7.5rem)] leading-[0.86]" />
        </div>
        <div className="relative min-h-72 md:col-span-2">
          <Bars3D className="absolute inset-0 m-auto h-[80%] w-[80%]" />
          <div className="absolute right-0 top-[14%] flex">
            <div className="panel px-5 py-4">
              <p className="text-sm">Case studies</p>
              <p className="display mt-2 text-5xl">{String(cases.items.length).padStart(2, "0")}</p>
            </div>
            <SliderButtons target="cases" className="h-11 self-start bg-ink text-panel [&_.icon-btn:hover:not(:disabled)]:bg-orange [&_.icon-btn:hover:not(:disabled)]:text-ink" />
          </div>
        </div>
      </Row>
      <Row full>
        <Slider id="cases" label="Case studies" className="gap-[2cqw] px-[2cqw] pb-16 pt-12">
          {cases.items.map((c) => (
            <CaseCard
              key={c.client}
              item={c}
              confirmed={cases.confirmed}
              className="w-[84cqw] shrink-0 snap-center md:w-[45cqw] lg:w-[29.3cqw] lg:snap-start"
            />
          ))}
        </Slider>
      </Row>
    </section>
  );
}

/** Industries we work in, as a slider of bracketed cards. */
export function IndustriesSection({ heading = "Industries" }: { heading?: string }) {
  return (
    <section aria-labelledby="industries-title">
      <Spacer />
      <Row className="lg:min-h-[11.5rem]">
        <HeadingPanel id="industries-title" text={heading} className="md:col-span-2" />
        <div className="relative max-lg:hidden">
          <Crosshair className="absolute left-0 top-0" />
          <div className="panel brackets absolute bottom-0 right-0 top-0 grid w-[11.25rem] place-items-center">
            <SphereCluster />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 p-6 md:col-span-2 md:flex-row md:items-end lg:col-span-1 lg:flex-col lg:items-stretch lg:p-0">
          <Lead title="Where we know the work" sub="United States and India" className="lg:p-8" />
          <SliderButtons target="industries" className="self-start panel lg:self-end" />
        </div>
      </Row>
      <Row full>
        <Slider id="industries" label="Industries">
          {industries.map((ind) => (
            <IndustryCard
              key={ind.title}
              icon={ind.icon}
              market={ind.market}
              title={ind.title}
              text={ind.text}
              className="min-h-[19rem] w-[85cqw] shrink-0 snap-start max-lg:border-r max-lg:border-line md:w-[50cqw] lg:w-[25cqw]"
            />
          ))}
          <IndustryCard
            icon="puzzle"
            market="Ask us"
            title="Something else?"
            text={
              <>
                We also work with <Fill k="otherIndustries" />. If yours isn’t listed, ask. We’ll tell you honestly
                whether we’re a fit.
              </>
            }
            className="min-h-[19rem] w-[85cqw] shrink-0 snap-start md:w-[50cqw] lg:w-[25cqw]"
          >
            <ButtonLink href="/contact" variant="line" className="mt-6 self-start" arrow>
              Ask us
            </ButtonLink>
          </IndustryCard>
        </Slider>
      </Row>
    </section>
  );
}

export function TestimonialsSection() {
  const t = sampleLists.testimonials;
  return (
    <section aria-labelledby="testimonials-title">
      <Spacer />
      <Row className="lg:min-h-[11.5rem]">
        <HeadingPanel id="testimonials-title" text="Testi|monials" className="md:col-span-2" />
        <div className="relative flex flex-col justify-center gap-4 p-6 md:p-8">
          <RadioDot className="absolute right-0 top-0 max-lg:hidden" />
          <Lead title="In their words" />
          <SampleTag show={!t.confirmed} className="self-start">
            Sample quotes
          </SampleTag>
        </div>
        <div className="flex items-end justify-between max-lg:p-6 md:max-lg:col-span-2">
          <CubeTile className="size-[11.25rem] max-lg:hidden lg:self-start" />
          <SliderButtons target="testimonials" className="panel lg:hidden" />
        </div>
      </Row>
      <Row full>
        <div className="relative">
          <Slider id="testimonials" label="Client testimonials" className="gap-[2cqw] px-[2cqw] pb-16 pt-12">
            {t.items.map((item, i) => (
              <TestimonialCard
                key={item.role}
                item={item}
                seed={i * 13 + 5}
                confirmed={t.confirmed}
                className="w-[84cqw] shrink-0 snap-center md:w-[45cqw] lg:w-[29.3cqw] lg:snap-start"
              />
            ))}
          </Slider>
          <SliderButtons target="testimonials" className="panel absolute bottom-0 left-0 max-lg:hidden" />
        </div>
      </Row>
    </section>
  );
}

export function TeamSection() {
  const team = sampleLists.team;
  return (
    <section aria-labelledby="team-title" id="our-team">
      <Spacer />
      <Row className="lg:min-h-[12.5rem]">
        <HeadingPanel id="team-title" text="Our team" className="md:col-span-2" />
        <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
          <Lead title="The people on your account" />
          <SampleTag show={!team.confirmed} className="self-start">
            Sample names
          </SampleTag>
        </div>
        <div className="flex items-end justify-end max-lg:hidden">
          <SliderButtons target="team" className="panel" />
        </div>
      </Row>
      <Row full>
        <Slider id="team" label="Team members" className="pb-16 pt-14">
          {team.items.map((m, i) => (
            <div key={m.role} className="w-[80cqw] shrink-0 snap-start px-5 md:w-[50cqw] lg:w-[25cqw] lg:px-[2cqw]">
              <TeamCard item={m} seed={i * 7 + 3} confirmed={team.confirmed} />
            </div>
          ))}
        </Slider>
      </Row>
    </section>
  );
}

/** FAQ list with orange plus buttons. Uses native <details>, so it works without JavaScript. */
export function FaqSection({ items = faqs }: { items?: { q: string; a: ReactNode }[] }) {
  return (
    <section aria-labelledby="faq-title" id="faq">
      <Spacer />
      <Row className="lg:min-h-[11.5rem]">
        <HeadingPanel id="faq-title" text="FAQ" className="justify-center" />
        <div className="relative max-lg:hidden">
          <div className="panel brackets absolute bottom-0 right-0 top-0 w-[11.25rem]">
            <CubeCluster size={24} className="absolute inset-0" />
          </div>
        </div>
        <div className="flex items-center bg-bg p-6 md:p-8 lg:col-span-2 lg:justify-center">
          <Lead title="Straight answers" sub="What clients ask before they sign" />
        </div>
      </Row>
      <div>
        {items.map((f) => (
          <details key={f.q} name="faq" className="faq cell bg-bg">
            <summary className="flex items-center justify-between gap-6 px-5 py-5 text-base transition-colors hover:bg-panel md:px-10 md:py-6 md:text-lg">
              <span>{f.q}</span>
              <span className="faq-plus grid size-11 shrink-0 place-items-center bg-orange chamfer [--cut:9px] md:size-12">
                <Icon name="plus" className="h-6 w-6" strokeWidth={1.6} />
              </span>
            </summary>
            <div className="max-w-3xl px-5 pb-8 leading-relaxed text-mute md:px-10">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function HiringSection() {
  return (
    <section aria-labelledby="hiring-title">
      <Spacer />
      <Row className="lg:min-h-[11.5rem]">
        <HeadingPanel id="hiring-title" text={"We’re |hiring"} className="md:col-span-2" />
        <div className="brackets relative flex items-center justify-center p-8 [--b-inset:1rem] max-md:justify-start">
          <div className="flex flex-col">
            <span className="border border-line bg-panel px-4 py-3 text-sm">See all open roles</span>
            <ArrowBox href="/careers" label="See all open roles" />
          </div>
        </div>
        <div className="relative flex items-end justify-end max-lg:hidden">
          <RadioDot className="absolute right-0 top-0" />
          <SliderButtons target="roles" className="panel" />
        </div>
      </Row>
      <Row full>
        <Slider id="roles" label="Open roles" className="gap-[2.5cqw] px-[2cqw] pb-16 pt-14">
          {roles.map((r) => (
            <RoleCard key={r.title} role={r} className="w-[80cqw] shrink-0 snap-center md:w-[44cqw] lg:w-[29cqw] lg:snap-start" />
          ))}
        </Slider>
      </Row>
    </section>
  );
}
