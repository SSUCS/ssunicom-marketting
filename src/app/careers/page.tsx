import { PageHero } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { Fill, SampleMark, SampleTag } from "@/components/Sample";
import { Bullets, Container, IconBadge, Label, SectionHeading, Tile, cx } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { fact, facts, sampleLists } from "@/lib/placeholders";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Careers — International BPO Jobs in Kanpur",
  description: "Voice process, trainer, quality and EdTech counsellor roles in Kanpur. We never charge candidates a fee.",
  path: "/careers",
});

const roles: { title: string; text: string; icon: IconName; tag?: string }[] = [
  {
    title: "International voice process associates",
    text: "Outbound and inbound calls for US clients.",
    icon: "headset",
    tag: "Night shift",
  },
  { title: "Voice and accent trainers", text: "Coach agents on clarity, tone and international communication.", icon: "chat" },
  { title: "Quality analysts", text: "Review calls, score quality and give agents feedback.", icon: "check-shield" },
  { title: "EdTech counsellors", text: "Handle student enquiries and admission follow-ups.", icon: "graduation" },
];

export default function CareersPage() {
  const benefits = sampleLists.benefits;

  return (
    <>
      <PageHero
        label="Careers"
        title="Build your career with us."
        intro="We are growing our team in Kanpur. If you communicate well, like working with people and want to learn international business processes or digital work, we want to hear from you."
        aside={
          <div role="note" className="tile flex flex-col justify-between gap-6 border-sample/40 p-6">
            <div className="flex items-center gap-3">
              <Icon name="check-shield" className="h-5 w-5 text-sample" />
              <Label className="text-sample">No fees, ever</Label>
            </div>
            <p className="leading-relaxed text-fg/90">
              SS Unicom Service never charges candidates any fee for jobs, interviews or training. If anyone asks you for
              money in our name, do not pay and contact us at{" "}
              <a href={site.contact.emailHref} className="font-semibold text-signal underline underline-offset-2">
                {site.contact.email}
              </a>
              .
            </p>
          </div>
        }
      />

      <Container className="mt-24">
        <SectionHeading index="01" label="Roles we hire for" title="Where you could start." />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r, i) => (
            <Tile as="li" key={r.title} delay={(i % 3) * 60} className={cx("flex flex-col justify-between gap-10", i === 0 && "lg:row-span-2 bg-grid")}>
              <div className="flex items-center justify-between">
                <IconBadge name={r.icon} />
                {r.tag && (
                  <span className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                    {r.tag}
                  </span>
                )}
              </div>
              <div>
                <h3 className={cx("font-semibold leading-tight", i === 0 ? "text-3xl" : "text-xl")}>{r.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{r.text}</p>
              </div>
            </Tile>
          ))}
          <Tile as="li" delay={120} className="flex flex-col justify-between gap-10">
            <div className="flex items-center justify-between">
              <IconBadge name="layers" />
              <Fill k="hiringWeb" className="font-mono text-[0.65rem] uppercase tracking-wider" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Web developers and digital marketers</h3>
              <p className="mt-2 leading-relaxed text-muted">Build and grow websites, web apps and campaigns for our clients.</p>
            </div>
          </Tile>
        </ul>
      </Container>

      <Container className="mt-24">
        <div className="grid gap-3 lg:grid-cols-12">
          <Tile className="lg:col-span-6">
            <div className="flex items-center justify-between gap-3">
              <Label index="02">What we offer</Label>
              <SampleTag show={!benefits.confirmed}>Some benefits are samples</SampleTag>
            </div>
            <Bullets
              className="mt-6"
              items={[
                "Structured training before you start on any process",
                "Performance-based incentives",
                "A clear path to team lead, trainer and quality roles",
                ...benefits.items.map((b) => (benefits.confirmed ? b : <SampleMark key={b}>{b}</SampleMark>)),
              ]}
            />
          </Tile>
          <Tile delay={80} className="bg-grid flex flex-col justify-between gap-8 lg:col-span-6">
            <div>
              <Label index="03">How to apply</Label>
              <p className="mt-6 text-lg leading-relaxed text-fg/85">
                Send your CV to <Fill k="hrEmail" /> or call <Fill k="hrPhone" />. Current openings are also posted on our
                LinkedIn page.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${fact("hrEmail")}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-signal px-5 py-2.5 font-semibold text-signal-ink hover:bg-signal-strong"
              >
                <Icon name="mail" className="h-4 w-4" /> Email your CV
              </a>
              <a
                href={fact("linkedin")}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-semibold hover:border-fg/40"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn {!facts.linkedin.confirmed && <SampleTag className="ml-1" />}
              </a>
            </div>
          </Tile>
        </div>
      </Container>
    </>
  );
}
