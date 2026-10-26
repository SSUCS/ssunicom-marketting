import { Icon, type IconName } from "@/components/Icon";
import { CtaBand, PageHero } from "@/components/sections";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "SS Unicom Service is a Kanpur-based BPO and call centre company with over 10 years of experience in customer support, outbound campaigns, lead generation and back-office services.",
  path: "/about",
});

const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "check-shield",
    title: "Quality",
    text: "We check our work against your requirements before it leaves our hands.",
  },
  {
    icon: "chat",
    title: "Communication",
    text: "Clear updates, agreed channels and honest answers when something needs attention.",
  },
  {
    icon: "refresh",
    title: "Continuous improvement",
    text: "We look for bottlenecks and suggest better ways of working as we learn your process.",
  },
  {
    icon: "users",
    title: "Client focus",
    text: "Your goals and constraints shape how we work, not a one-size-fits-all template.",
  },
];

const infrastructure: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "layers",
    title: "Dedicated work floor",
    text: "A centrally air-conditioned office with ergonomic workstations, training rooms and supervisor stations.",
  },
  {
    icon: "headset",
    title: "Call centre technology",
    text: "Predictive dialer, call recording and blended inbound and outbound routing on enterprise-grade headsets.",
  },
  {
    icon: "database",
    title: "CRM and reporting tools",
    text: "We work in your CRM or ours, with live dashboards and daily reports on calls, leads and quality.",
  },
  {
    icon: "refresh",
    title: "Power and network backup",
    text: "Power backup and redundant internet connections keep operations running through outages.",
  },
  {
    icon: "check-shield",
    title: "Data security",
    text: "Access-controlled systems, confidentiality agreements and clean-desk rules protect your customer data.",
  },
  {
    icon: "calendar",
    title: "24/7 shift operations",
    text: "Day, evening and night shifts cover Indian, UK and US business hours, including weekends.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Your outsourced customer team in Kanpur."
        intro="SS Unicom Service is a business process outsourcing and call centre company based in Kanpur, Uttar Pradesh. Businesses in India and abroad rely on us to talk to their customers, generate sales opportunities and run the back-office work behind them."
      />

      {/* Introduction */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Our background</Eyebrow>
            <p className="font-display text-7xl font-extrabold tracking-tight text-accent sm:text-8xl">{site.experience}</p>
            <p className="mt-3 max-w-xs text-muted">
              of experience in the business process outsourcing industry.
            </p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-7">
            <p className="reveal font-display text-2xl font-semibold leading-snug text-ink">
              Over the past decade we have grown from a small calling team into a full-service BPO, handling voice and
              non-voice processes for clients of every size.
            </p>
            <p className="reveal">
              Our work covers inbound customer support, outbound sales and telemarketing campaigns, lead generation with
              live transfers, appointment setting, surveys, chat and email support, data management and back-office
              processing. We also run digital marketing campaigns, so the enquiries we generate go straight to the
              people who call them back.
            </p>
            <p className="reveal">
              Every programme starts with understanding the client&apos;s goals. We then build a trained team, documented
              procedures and clear reporting around them, and scale it up or down as the business changes. Our aim is
              simple: lower operating costs for our clients, better experiences for their customers and measurable
              growth.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="on-dark relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden />
        <Container className="relative">
          <Eyebrow dark>Our mission</Eyebrow>
          <blockquote className="reveal max-w-4xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            To give every client a customer and sales operation they can rely on, delivered by skilled people at a cost
            that helps their business grow.
          </blockquote>
          <div className="mt-12 max-w-3xl border-t border-white/15 pt-8">
            <Eyebrow dark>Our vision</Eyebrow>
            <p className="reveal text-xl leading-relaxed text-mist sm:text-2xl">
              To become one of the most trusted outsourcing partners from India, known for the quality of our people as
              much as the results we deliver, and to create rewarding careers for young professionals in Kanpur.
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we value"
            title="The principles behind every engagement."
          />
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li
                key={v.title}
                className="reveal border-t-2 border-ink pt-6"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <Icon name={v.icon} className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-xl font-bold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Infrastructure */}
      <section className="border-t border-line bg-paper-2/60 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our infrastructure"
            title="A modern delivery centre in Kanpur."
            intro="Our operations run from a dedicated facility built for voice and non-voice work, so your programme keeps running whatever the time or volume."
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {infrastructure.map((item, i) => (
              <li
                key={item.title}
                className="reveal bg-white p-7"
                style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <Icon name={item.icon} className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Team */}
      <section className="border-t border-line bg-white py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our team"
              title="People trained on your business, not just a script."
              intro="Before our agents speak to your customers, they are trained on your products, processes and quality standards. Team leaders and quality analysts monitor their work every day."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Product and process training before go-live",
                "Call monitoring and quality scoring",
                "Team leaders on every shift",
                "Trained back-ups for continuity",
                "Ongoing coaching and skills development",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/how-we-work" variant="secondary" arrow>
                How we work
              </ButtonLink>
            </div>
          </div>
          {/* PLACEHOLDER: replace with an approved founder or team photograph (next/image, with descriptive alt text). */}
          <div
            className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.75rem] border border-dashed border-ink/20 bg-paper"
            role="img"
            aria-label="Placeholder for a team or founder photograph"
          >
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
            <svg viewBox="0 0 320 200" className="relative w-3/4 text-accent" fill="none" aria-hidden>
              <path d="M60 140 C110 140 110 60 160 60 S 210 140 260 140" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
              {[60, 160, 260].map((x, i) => (
                <g key={x} transform={`translate(${x} ${i === 1 ? 60 : 140})`}>
                  <circle r="26" className="fill-white" stroke="currentColor" strokeWidth="1.5" />
                  <circle cy="-6" r="8" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M-13 14a13 13 0 0 1 26 0" stroke="currentColor" strokeWidth="1.5" />
                </g>
              ))}
            </svg>
            <span className="absolute bottom-4 left-4 rounded-md bg-white px-2 py-1 text-xs text-muted">
              Team photo placeholder
            </span>
          </div>
        </Container>
      </section>

      <CtaBand title="Looking for a process partner you can rely on?" />
    </>
  );
}
