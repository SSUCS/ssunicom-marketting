import { Icon, type IconName } from "@/components/Icon";
import { CtaBand, PageHero } from "@/components/sections";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "SS Unicom Service is an India-based BPO and lead generation company with over 10 years of industry experience supporting technical and non-technical business processes.",
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

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A dependable partner for the work behind your growth."
        intro="SS Unicom Service is a business process outsourcing company based in India. We support lead generation, customer interactions and back-office operations for businesses that need reliable, well-run processes."
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
              Over the past decade our team has built its expertise across both technical and non-technical processes,
              providing solutions tailored to the diverse needs of our clients.
            </p>
            <p className="reveal">
              We specialise in lead generation, particularly for student-loan and finance-related processes, and in the
              operational work that surrounds it: collecting information, qualifying leads, following up and keeping
              records accurate. Alongside lead generation, we support customer interactions, data management and
              back-end operations.
            </p>
            <p className="reveal">
              We use practical tools and well-documented procedures to streamline operations, while keeping a strong
              focus on client satisfaction. Whether you need help with customer interactions, qualified leads or
              back-office work, our aim is the same: to help you reach your goals with confidence.
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
            To help businesses operate more efficiently through dependable process support, thoughtful execution and a
            commitment to continuous improvement.
          </blockquote>
          {/* PLACEHOLDER: draft mission statement. Replace with the company's approved wording. */}
          <p className="mt-6 text-sm text-mist">Draft mission statement, pending company approval.</p>
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

      {/* Team */}
      <section className="border-t border-line bg-white py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Our team"
              title="People trained on your process, not just a script."
              intro="Before our team works on a client process, they are briefed on its goals, steps and quality expectations. Procedures are documented so that work stays consistent as volumes change."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Process training before work begins",
                "Documented procedures for each workflow",
                "Regular review of quality and feedback",
                "Experience across technical and non-technical processes",
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
