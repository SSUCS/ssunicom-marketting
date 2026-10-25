import { CtaStrip, PageHero, PhotoSlot } from "@/components/blocks";
import { Fill, SampleMark, SampleTag } from "@/components/Sample";
import { Container, Label, SectionHeading, TextLink, Tile, cx } from "@/components/ui";
import { values } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { facts, sampleLists } from "@/lib/placeholders";

export const metadata = pageMetadata({
  title: "About SS Unicom Service — Kanpur BPO",
  description: "Who we are, our mission and values, and how we train the team behind every call and project.",
  path: "/about",
});

const training = [
  { title: "Process and product training", text: "On the client's workflow, scripts and qualification criteria." },
  { title: "Voice and accent coaching", text: "For international calls, led by dedicated trainers." },
  { title: "Compliance training", text: "On consent, Do-Not-Call rules and what agents may and may not say." },
  { title: "Ongoing quality feedback", text: "From quality analysts who review calls and coach agents every week." },
];

export default function AboutPage() {
  const leaders = sampleLists.leaders;
  const photos = sampleLists.photos;

  return (
    <>
      <PageHero
        label="About us"
        title="An extension of your team, based in Kanpur."
        intro={
          <>
            SS Unicom Service is an outsourcing company in Kanpur, India, serving businesses in the United States and
            India. Our team brings over <Fill k="combinedExperience" /> years of combined experience in business process
            outsourcing, across both technical and non-technical processes.
          </>
        }
        aside={
          <>
            <div className="tile flex flex-col justify-between gap-6 p-6">
              <Label>Established</Label>
              <p className="font-display text-5xl font-semibold">
                <Fill k="yearStarted" />
              </p>
            </div>
            <div className="tile flex flex-col justify-between gap-6 p-6">
              <Label>Operated by</Label>
              <p className="font-display text-xl font-semibold leading-snug">
                <Fill k="legalEntity" />
              </p>
            </div>
          </>
        }
      />

      {/* Who we are + story */}
      <Container className="mt-3">
        <div className="grid gap-3 lg:grid-cols-12">
          <Tile className="p-7 sm:p-10 lg:col-span-7">
            <Label index="01">Who we are</Label>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-fg/85">
              <p>
                We specialise in lead generation and process support for finance-related businesses, especially those
                working on student-loan matters. We also design, build and market web applications for companies that
                want more customers online.
              </p>
              <p className="text-muted">
                Whether the work is reaching new prospects, supporting customer conversations or managing back-office
                tasks, our aim is the same: help clients grow with confidence.
              </p>
            </div>
          </Tile>
          <Tile delay={80} className="p-7 sm:p-10 lg:col-span-5">
            <div className="flex items-center justify-between gap-3">
              <Label>Our story</Label>
              <SampleTag show={!facts.story.confirmed} />
            </div>
            <p className="mt-6 leading-relaxed text-fg/85">
              <Fill k="story" />
            </p>
          </Tile>
        </div>
      </Container>

      {/* Mission, vision, values */}
      <Container className="mt-24">
        <SectionHeading index="02" label="Mission, vision & values" title="What we work towards." />
        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          <Tile className="bg-grid border-signal/25 p-7 sm:p-9 lg:col-span-6">
            <Label>Mission</Label>
            <p className="mt-6 font-display text-2xl font-medium leading-snug sm:text-3xl">
              To help businesses grow by bringing them better enquiries and following up on every one with care,
              consistency and honesty.
            </p>
          </Tile>
          <Tile delay={80} className="p-7 sm:p-9 lg:col-span-6">
            <Label>Vision</Label>
            <p className="mt-6 font-display text-2xl font-medium leading-snug sm:text-3xl">
              To be the outsourcing partner businesses keep for years, known for the quality of our people and the
              transparency of our work.
            </p>
          </Tile>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-5">
            {values.map((v, i) => (
              <Tile as="li" key={v.title} delay={i * 60} className="p-6">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{v.text}</p>
              </Tile>
            ))}
          </ul>
        </div>
      </Container>

      {/* Team and training */}
      <Container className="mt-24">
        <div className="grid gap-3 lg:grid-cols-12">
          <Tile className="flex flex-col justify-between gap-10 p-7 sm:p-9 lg:col-span-4">
            <div>
              <Label index="03">Our team</Label>
              <h2 className="mt-5 text-3xl font-semibold leading-tight">How we train</h2>
            </div>
            <div>
              <p className="font-display text-6xl font-semibold text-signal">
                <Fill k="teamSize" />
              </p>
              <p className="mt-3 leading-relaxed text-muted">
                people across calling, quality, training, development and marketing.
              </p>
            </div>
          </Tile>
          <ol className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {training.map((t, i) => (
              <Tile as="li" key={t.title} delay={i * 60}>
                <span className="font-mono text-xs text-signal">Step 0{i + 1}</span>
                <h3 className="mt-5 text-xl font-semibold">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{t.text}</p>
              </Tile>
            ))}
          </ol>
        </div>
        <p className="mt-4 px-1 text-sm text-muted">Every agent goes through all four steps.</p>
      </Container>

      {/* Leadership + founder */}
      <Container className="mt-24">
        <SectionHeading
          index="04"
          label="Leadership"
          title="The people accountable for your work."
          aside={<SampleTag show={!leaders.confirmed}>Sample names</SampleTag>}
        />
        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          {leaders.items.map((l, i) => (
            <Tile key={l.role} delay={i * 60} className="p-5 lg:col-span-3">
              <PhotoSlot label="Headshot" className="min-h-48" />
              <p className="mt-5 font-display text-lg font-semibold">
                {leaders.confirmed ? l.name : <SampleMark>{l.name}</SampleMark>}
              </p>
              <p className="text-sm text-muted">{l.role}</p>
            </Tile>
          ))}
          <Tile delay={180} className="flex flex-col justify-between gap-8 p-7 lg:col-span-3">
            <div className="flex items-center justify-between gap-3">
              <Label>From the founder</Label>
              <SampleTag show={!facts.founderMessage.confirmed} />
            </div>
            <blockquote className="font-display text-lg leading-snug">
              &ldquo;<Fill k="founderMessage" />&rdquo;
            </blockquote>
          </Tile>
        </div>
      </Container>

      {/* Office */}
      <Container className="mt-24">
        <SectionHeading
          index="05"
          label="Inside our office"
          title="Real photos only."
          intro="Office and team photos will appear here. No stock photography."
          aside={<TextLink href="/infrastructure">See our infrastructure</TextLink>}
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {photos.items.map((p, i) => (
            <PhotoSlot key={p} label={p} className={cx(i === 0 && "sm:col-span-2 sm:row-span-2 sm:min-h-[360px]", i === 1 && "lg:col-span-2")} />
          ))}
        </div>
      </Container>

      <CtaStrip />
    </>
  );
}
