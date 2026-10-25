import type { ReactNode } from "react";
import { NumberCard } from "@/components/cards";
import { type IconName } from "@/components/Icon";
import { Fill, SampleMark, SampleTag } from "@/components/Sample";
import { CtaBand, PageHero, Spacer, TeamSection } from "@/components/sections";
import { ArrowBox, ButtonLink, Crosshair, HeadingPanel, Lead, Micro, Row } from "@/components/ui";
import { CubeCluster, PhotoSlot, PixelPortrait, SphereTile } from "@/components/visuals";
import { mission, training, values, vision } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { facts, sampleLists } from "@/lib/placeholders";

export const metadata = pageMetadata({
  title: "About SS Universal Communication Services — Kanpur BPO",
  description:
    "A Kanpur team that builds the campaigns, makes the calls and owns the numbers. Our story, values, training and the people on your account.",
  path: "/about",
});

const stats: { value: ReactNode; label: string }[] = [
  { value: <Fill k="yearStarted" />, label: "Started in Kanpur" },
  { value: <Fill k="teamSize" />, label: "People on the team" },
  { value: <Fill k="seatCount" />, label: "Seats on the floor" },
  { value: <Fill k="combinedExperience" />, label: "Years of BPO experience" },
];

const trainingIcons: IconName[] = ["flow", "chat", "check-shield", "users"];

export default function AboutPage() {
  const founder = sampleLists.team.items[0];
  const photos = sampleLists.photos;

  return (
    <div className="wrap @container">
      <PageHero
        label="About us"
        title="About us"
        intro="A Kanpur team that builds the campaigns, makes the calls and owns the numbers, for businesses in the US and India."
        actions={
          <>
            <ButtonLink href="#our-team" arrow>
              Meet the team
            </ButtonLink>
          </>
        }
        visual={<CubeCluster size={46} className="absolute inset-0" />}
        aside={
          <div className="flex h-full flex-col justify-end gap-3 p-6 md:p-7 lg:py-9">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">Operated by</p>
            <p className="text-lg leading-snug">
              <Fill k="legalEntity" />
            </p>
            <p className="text-sm text-mute">Kanpur, Uttar Pradesh, India</p>
          </div>
        }
      />

      {/* Facts */}
      <section aria-label="SS Universal in numbers">
        <Spacer />
        <Row as="dl" className="max-md:grid-cols-2">
          {stats.map((s) => (
            <div key={s.label} className="panel flex min-h-48 flex-col justify-between gap-8 p-5 md:p-7">
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">{s.label}</dt>
              <dd className="display text-[clamp(2.6rem,6cqw,4.5rem)] leading-none">{s.value}</dd>
            </div>
          ))}
        </Row>
      </section>

      {/* Story */}
      <section aria-labelledby="story-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="story-title" text="Our story" className="md:col-span-2" />
          <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
            <Lead title="From one client to two countries" />
            <SampleTag show={!facts.story.confirmed} className="self-start" />
          </div>
          <div className="relative max-lg:hidden">
            <Crosshair className="absolute right-0 top-0" />
          </div>
        </Row>
        <Row>
          <div className="bg-bg p-6 md:col-span-2 md:p-8 lg:col-span-3 lg:py-12">
            <p className="max-w-4xl text-xl leading-relaxed md:text-2xl">
              <Fill k="story" />
            </p>
          </div>
          <SphereTile className="min-h-64 md:max-lg:col-span-2" />
        </Row>
      </section>

      {/* Mission and vision */}
      <section aria-label="Mission and vision">
        <Spacer />
        <Row>
          {[
            { label: "Mission", text: mission },
            { label: "Vision", text: vision },
          ].map((m) => (
            <div key={m.label} className="panel flex min-h-72 flex-col justify-between gap-10 p-6 md:p-10 lg:col-span-2">
              <Micro>{m.label}</Micro>
              <p className="display text-[clamp(1.9rem,3.4cqw,3rem)] leading-[1.02]">{m.text}</p>
            </div>
          ))}
        </Row>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="values-title" text="Values" className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead title="How we work with you" sub="Five rules we hold ourselves to" />
          </div>
        </Row>
        <ol>
          {values.map((v, i) => (
            <li key={v.title}>
              <Row>
                <div className="flex items-center gap-5 bg-bg p-6 md:p-8 lg:col-span-2">
                  <span className="font-mono text-sm text-orange-deep">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display text-[1.75rem] leading-none md:text-[2rem] lg:text-[2.5rem]">{v.title}</h3>
                </div>
                <p className="flex items-center bg-bg p-6 text-lg leading-relaxed text-mute max-md:pt-0 md:p-8 lg:col-span-2">
                  {v.text}
                </p>
              </Row>
            </li>
          ))}
        </ol>
      </section>

      {/* Training */}
      <section aria-labelledby="training-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="training-title" text="Training" className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead title="Before the first call, and every week after" sub="No one talks to your customers untrained" />
          </div>
        </Row>
        <Row className="max-md:grid-cols-2">
          {training.map((t, i) => (
            <NumberCard key={t.title} n={i + 1} icon={trainingIcons[i] ?? "users"} title={t.title} text={t.text} className="min-h-[20rem]" />
          ))}
        </Row>
      </section>

      <TeamSection />

      {/* Founder's note */}
      <section aria-labelledby="founder-title">
        <Spacer />
        <Row>
          <figure className="panel relative z-[2] flex flex-col justify-between gap-10 p-6 md:col-span-2 md:p-10 lg:col-span-3">
            <div className="flex items-center justify-between gap-4">
              <h2 id="founder-title" className="font-mono text-[0.8125rem] uppercase tracking-[0.04em]">
                A note from the founder
              </h2>
              <SampleTag show={!facts.founderMessage.confirmed} />
            </div>
            <blockquote className="max-w-4xl text-[clamp(1.4rem,2.3cqw,2.1rem)] leading-[1.35]">
              <p>“{facts.founderMessage.value}”</p>
            </blockquote>
            <figcaption className="flex items-center gap-4">
              <PixelPortrait seed={3} className="size-14 shrink-0" />
              <span>
                <span className="block">
                  {sampleLists.team.confirmed ? founder.name : <SampleMark>{founder.name}</SampleMark>}
                </span>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-mute">{founder.role}</span>
              </span>
            </figcaption>
          </figure>
          <div className="relative min-h-64 bg-ink md:max-lg:col-span-2">
            <CubeCluster size={30} className="absolute inset-0" />
          </div>
        </Row>
      </section>

      {/* Photos */}
      <section aria-labelledby="photos-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="photos-title" text="The office" className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:p-8">
            <Lead title="Real photos, coming soon" sub="No stock photos, ever" />
          </div>
          <div className="flex items-center justify-between gap-4 p-6 md:p-8">
            <span className="text-sm">See the operations centre</span>
            <ArrowBox href="/infrastructure" label="See the operations centre" />
          </div>
        </Row>
        <Row className="max-md:grid-cols-2">
          {photos.items.map((p) => (
            <PhotoSlot key={p} label={p} confirmed={photos.confirmed} />
          ))}
        </Row>
      </section>

      <CtaBand />
    </div>
  );
}
