import { NumberCard } from "@/components/cards";
import { HeroFunnel } from "@/components/HeroFunnel";
import { LeadTube, TubeBase, TubeCollar, TubeShowcase } from "@/components/LeadTube";
import { SliderButtons } from "@/components/motion";
import { SampleTag } from "@/components/Sample";
import {
  CaseStudiesSection,
  FaqSection,
  HiringSection,
  IndustriesSection,
  SocialRail,
  TeamSection,
  TestimonialsSection,
} from "@/components/sections";
import { ButtonLink, Crosshair, HeadingPanel, Lead, RadioDot, Row, Slider, Tick, cx } from "@/components/ui";
import { ClientLogo, CubeTile, SphereTile } from "@/components/visuals";
import { capabilities, services } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { sampleLists } from "@/lib/placeholders";

export const metadata = pageMetadata({
  title: "SS Universal Communication Services — Lead Generation & Web Apps, India",
  description:
    "We build the websites and campaigns that bring in leads, then our Kanpur team calls, qualifies and hands every one to your sales team. Serving the US and India.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="wrap @container [--collar-w:27.5cqw] [--tube-w:22.5cqw]">
      <Hero />
      {/* The lead tube runs behind everything from the client strip to the hand-off platform. */}
      <div className="relative">
        <LeadTube />
        <ClientsRow />
        <BeyondTheClick />
        <FullFunnel />
      </div>
      <CaseStudiesSection />
      <IndustriesSection />
      <TestimonialsSection />
      <TeamSection />
      <FaqSection />
      <HiringSection />
    </div>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const sq = "absolute size-3 bg-orange";
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="relative h-10 md:h-[3.9rem]">
        <Crosshair className="absolute right-full top-5 hidden lg:block" />
        <SocialRail className="absolute left-full top-5 z-[3] hidden lg:flex" />
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden border-t border-line pb-16 pt-10 md:pb-20 md:pt-14">
        <span aria-hidden className={cx(sq, "left-4 top-4 md:left-5 md:top-5")} />
        <span aria-hidden className={cx(sq, "right-4 top-4 md:right-5 md:top-5")} />
        <span aria-hidden className={cx(sq, "bottom-4 right-4 md:bottom-5 md:right-5")} />
        <h1 id="hero-title" className="sr-only">
          Digital reach. Human follow-through. Lead generation, web apps and digital marketing from Kanpur, India.
        </h1>
        <div aria-hidden="true" className="marquee-track flex w-max">
          {[0, 1].map((k) => (
            <span
              key={k}
              className="display flex shrink-0 items-center whitespace-nowrap text-[clamp(5.6rem,min(21vh,24vw),14.5rem)] leading-[0.8]"
            >
              Digital reach
              <span className="mx-[0.32em] inline-block size-[0.15em] bg-orange" />
              Human follow-through
              <span className="mx-[0.32em] inline-block size-[0.15em] bg-orange" />
            </span>
          ))}
        </div>
        <p aria-hidden="true" className="absolute bottom-4 left-4 flex items-center gap-3 font-mono text-[0.8125rem] uppercase md:bottom-5 md:left-5">
          <span className="size-3 bg-orange" />
          <span>Digital reach</span>
          <span className="ml-3 max-sm:hidden">Human follow-through</span>
        </p>
      </div>

      {/* Intro, funnel and side tile */}
      <div className="grid grid-cols-1 border-t border-line md:grid-cols-2 lg:h-[max(22rem,28cqw)] lg:grid-cols-4">
        <div className="flex flex-col justify-between gap-8 p-6 md:p-7 lg:py-9">
          <p className="text-[1.0625rem] leading-[1.5] md:text-lg">
            We build the websites and ads that bring in leads. Then our team calls every one, qualifies it and hands you
            the ones ready to buy.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">Free consultation</ButtonLink>
          </div>
        </div>
        <div className="relative h-[17rem] overflow-hidden sm:h-[21rem] lg:col-span-2 lg:h-auto">
          <HeroFunnel />
        </div>
        <div className="relative hidden flex-col justify-between lg:flex">
          <CubeTile className="size-[11.25rem]" />
          <ClientsBar />
        </div>
      </div>
    </section>
  );
}

function ClientsBar({ className }: { className?: string }) {
  const clients = sampleLists.clients;
  return (
    <div className={cx("panel relative z-[2] flex items-stretch justify-between", className)}>
      <p className="flex flex-1 items-center gap-3 px-5 py-3 font-mono text-[0.8125rem] uppercase">
        Our clients:
        <SampleTag show={!clients.confirmed} />
      </p>
      <SliderButtons target="clients" className="border-l border-line" />
    </div>
  );
}

function ClientsRow() {
  const clients = sampleLists.clients;
  return (
    <div className="relative z-[2] border-t border-line">
      <ClientsBar className="lg:hidden" />
      <Slider id="clients" label="Client logos" className="bleed-r">
        {clients.items.map((c) => (
          <div
            key={c.name}
            className="panel brackets group relative grid h-[6.7rem] w-[70cqw] shrink-0 snap-start place-items-center px-4 transition-colors duration-300 [--b-color:transparent] [--b-inset:1.4rem] hover:bg-ink hover:text-panel hover:[--b-color:var(--color-orange)] hover:[--b-inset:0.6rem] sm:w-[50cqw] md:w-[33.333cqw] lg:w-[25cqw]"
          >
            <ClientLogo name={c.name} glyph={c.glyph} font={c.font} className="max-sm:scale-[0.82]" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

/* ---------- Beyond the click ---------- */

function BeyondTheClick() {
  return (
    <section aria-labelledby="beyond-title">
      <Row className="mt-16 lg:mt-24">
        <HeadingPanel
          id="beyond-title"
          text="Beyond the click"
          className="md:col-span-2 lg:col-span-4 lg:justify-end lg:pr-16"
        />
      </Row>
      <Row>
        <div className="p-6 md:p-8 lg:py-12">
          <Lead title="What we run" sub="For businesses in the US and India" as="h3" />
        </div>
        <div className="max-lg:hidden lg:col-span-2" />
        <div className="p-6 md:p-8 lg:py-12">
          <Lead title="One team" sub="Two capabilities" as="h3" />
        </div>
      </Row>
      <Row className="relative">
        <TubeCollar className="top-[30%]" />
        <div className="flex flex-col">
          <ul>
            {services.map((s) => (
              <li
                key={s.id}
                className="brackets relative flex h-[4.5rem] items-center justify-center gap-3 border-b border-line text-[1.0625rem] [--b-inset:0.75rem]"
              >
                <Tick />
                {s.short}
              </li>
            ))}
          </ul>
          <div className="p-6 md:p-8">
            <ButtonLink href="/services" className="w-full" arrow>
              Explore services
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-2">
          <TubeShowcase className="my-10" />
        </div>
        <div className="grid grid-cols-2 self-start md:max-lg:col-span-2">
          <NumberCard n={1} icon="globe" title="Digital reach" text="Websites, SEO and ads that bring in enquiries." className="min-h-[19rem]" />
          <NumberCard
            n={2}
            icon="headset"
            title="Human follow-through"
            text="Trained callers who reach every lead, fast."
            className="min-h-[19rem]"
          />
        </div>
      </Row>
    </section>
  );
}

/* ---------- Full funnel ---------- */

function FullFunnel() {
  return (
    <section aria-labelledby="funnel-title">
      <Row className="relative mt-16 lg:mt-24">
        <TubeCollar marker={false} className="top-[38%]" />
        <div className="flex items-start max-lg:hidden">
          <SphereTile className="size-[11.25rem]" />
          <RadioDot />
        </div>
        <div className="max-lg:hidden" />
        <HeadingPanel id="funnel-title" text="Full funnel" className="justify-center md:col-span-2 lg:min-h-[11.25rem]" />
      </Row>
      <Row>
        <div className="p-6 md:p-8 lg:py-12">
          <Lead title="End-to-end" sub="From first click to qualified call" as="h3" />
        </div>
        <div className="max-lg:hidden lg:col-span-2" />
        <div className="p-6 md:p-8 lg:py-12">
          <Lead title="No hand-offs" sub="One team owns the whole funnel" as="h3" />
        </div>
      </Row>
      <Row className="relative">
        <TubeCollar band className="top-[22%]" />
        <TubeCollar className="bottom-[4%]" />
        <div className="min-w-0 md:col-span-2 lg:col-span-1">
          <Slider id="capabilities" label="What we do" className="border-b border-line">
            {capabilities.map((c, i) => (
              <NumberCard
                key={c.title}
                n={i + 1}
                icon={c.icon}
                title={c.title}
                text={c.text}
                className="min-h-[21rem] w-[46cqw] shrink-0 snap-start md:w-[25cqw] lg:w-[12.5cqw]"
              />
            ))}
          </Slider>
          <SliderButtons target="capabilities" className="panel w-fit" />
        </div>
        <div className="max-lg:hidden lg:col-span-2" />
        <div className="flex items-center p-6 md:col-span-2 md:p-8 lg:col-span-1">
          <p className="text-[1.0625rem] leading-[1.6]">
            Most agencies stop at the click. Most call centres start cold. We run both halves, the campaign that creates
            the enquiry and the call that qualifies it, so no lead goes cold in between.
          </p>
        </div>
      </Row>
      <Row>
        <div className="flex flex-col justify-end p-6 md:p-8">
          <ButtonLink href="/how-we-work" variant="line" arrow className="self-start">
            How we work
          </ButtonLink>
        </div>
        <div className="max-lg:hidden lg:col-span-2">
          <TubeBase />
        </div>
        <div className="flex flex-col justify-end p-6 md:p-8">
          <Lead title="Your team" sub="Live transfers, booked calls or full lead records" size="md" />
        </div>
      </Row>
    </section>
  );
}
