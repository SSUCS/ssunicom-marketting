import { Icon, type IconName } from "@/components/Icon";
import { CtaBand, PageHero } from "@/components/sections";
import { Container, Eyebrow, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Industries & Markets",
  description:
    "Business process support for lead generation, document preparation, student-loan and finance-related processes and education technology, for clients in the United States, Canada and India.",
  path: "/industries",
});

const industries: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "document",
    title: "Lead generation & document preparation",
    text: "Lead intake, information collection and workflow support for businesses that prepare documents for their customers.",
  },
  {
    icon: "briefcase",
    title: "Student-loan & finance-related processes",
    text: "Operational support such as qualification, follow-up and record-keeping. We do not give financial advice or make lending decisions.",
  },
  {
    icon: "graduation",
    title: "Education technology",
    text: "Inquiry management, student follow-up, customer support and reporting for EdTech businesses.",
  },
  {
    icon: "layers",
    title: "Other business operations",
    text: "Customer support, data management and back-office processes where our way of working is a good fit.",
  },
];

const markets = [
  { code: "US", name: "United States", note: "Lead generation and document-preparation workflows" },
  { code: "CA", name: "Canada", note: "Client coordination and administrative support" },
  { code: "IN", name: "India", note: "EdTech and business operations support" },
];

const tailoring: { title: string; text: string }[] = [
  {
    title: "Your market's requirements",
    text: "Time zones, communication norms and any rules your business works under are built into the process plan.",
  },
  {
    title: "Your criteria",
    text: "Qualification rules, scripts and quality checks are defined by you, not imposed by us.",
  },
  {
    title: "Your tools",
    text: "We work within your CRM and communication setup wherever possible, so nothing has to change on your side.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries & markets"
        title="Focused expertise, adapted to each market we support."
        intro="Our experience is concentrated in lead generation and the processes around it. We deliver from India for clients in the United States, Canada and India."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Areas of focus" title="Where our experience is deepest." />
          <ul className="mt-14 grid gap-x-12 sm:grid-cols-2">
            {industries.map((ind, i) => (
              <li key={ind.title} className="reveal flex gap-5 border-t border-line py-8">
                <span className="font-display text-sm font-bold tabular-nums text-accent">0{i + 1}</span>
                <div>
                  <Icon name={ind.icon} className="h-6 w-6 text-ink/60" />
                  <h3 className="mt-3 text-xl font-bold">{ind.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{ind.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Market diagram: delivery hub connected to client markets (no map, no office pins). */}
      <section className="on-dark relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" aria-hidden />
        <Container className="relative grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow dark>Geographic focus</Eyebrow>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">One delivery team, three client markets.</h2>
            <p className="mt-5 text-lg leading-relaxed text-mist">
              Our team works from India. We support clients in the United States, Canada and India remotely, using
              communication channels and working hours agreed with each client.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-mist">
              Markets listed here reflect where our clients operate. They do not indicate a local office or a
              professional licence in that country.
            </p>
          </div>
          <div className="lg:col-span-7">
            <svg viewBox="0 0 560 360" className="h-auto w-full" role="img" aria-labelledby="markets-title">
              <title id="markets-title">
                Diagram: a delivery team in India connected to client markets in the United States, Canada and India.
              </title>
              {[70, 180, 290].map((y) => (
                <path key={y} d={`M170 180 C 280 180, 300 ${y}, 390 ${y}`} fill="none" stroke="#45d6c4" strokeOpacity="0.6" strokeWidth="1.5" />
              ))}
              <g transform="translate(30 120)">
                <rect width="140" height="120" rx="18" fill="#12233a" stroke="#45d6c4" />
                <text x="20" y="34" fontSize="10" letterSpacing="1.6" fontWeight="700" fill="#45d6c4">
                  DELIVERY
                </text>
                <text x="20" y="62" fontSize="18" fontWeight="700" fill="#fff">
                  Team in
                </text>
                <text x="20" y="86" fontSize="18" fontWeight="700" fill="#fff">
                  India
                </text>
              </g>
              <circle cx="170" cy="180" r="5" fill="#45d6c4" />
              {markets.map((m, i) => (
                <g key={m.code} transform={`translate(390 ${40 + i * 110})`}>
                  <rect width="160" height="60" rx="14" fill="#0a1626" stroke="#1d3352" />
                  <circle cy="30" r="5" fill="#45d6c4" />
                  <text x="18" y="38" fontSize="22" fontWeight="800" fill="#45d6c4">
                    {m.code}
                  </text>
                  <text x="62" y="35" fontSize="13" fontWeight="600" fill="#fff">
                    {m.name}
                  </text>
                </g>
              ))}
            </svg>
            <ul className="mt-6 grid gap-4 text-sm text-mist sm:grid-cols-3">
              {markets.map((m) => (
                <li key={m.code} className="border-t border-white/15 pt-3">
                  <span className="font-semibold text-white">{m.name}:</span> {m.note}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Tailored delivery"
              title="Built around your workflow, not the other way round."
            />
          </div>
          <ol className="grid gap-5 lg:col-span-7">
            {tailoring.map((t, i) => (
              <li key={t.title} className="reveal flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-bold text-accent">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{t.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand title="Working in one of these markets? Let's talk." />
    </>
  );
}
