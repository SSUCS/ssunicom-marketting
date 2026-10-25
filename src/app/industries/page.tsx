import { CtaStrip, PageHero } from "@/components/blocks";
import { Fill } from "@/components/Sample";
import { Container, IconBadge, Label, SectionHeading, Tile, cx } from "@/components/ui";
import { ReachMap } from "@/components/visuals";
import type { IconName } from "@/components/Icon";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Industries & Markets — Finance, EdTech, SMBs",
  description:
    "Lead generation and process support for US financial-services businesses, EdTech support in India, and web projects for growing companies.",
  path: "/industries",
});

const industries: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Financial services and document preparation",
    text: "Lead generation, qualification and document-collection support for US businesses working on student-loan and other finance-related matters.",
    icon: "document",
  },
  {
    title: "Education and EdTech",
    text: "Enquiry handling, counselling calls and admission follow-ups for education businesses in India.",
    icon: "graduation",
  },
  {
    title: "Small businesses and startups",
    text: "Websites, web applications and digital marketing for companies that want to bring in more customers online.",
    icon: "layers",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Industries & markets"
        title="Where every enquiry matters."
        intro="We work where trained people and a clear process make the biggest difference: industries where every enquiry matters and every conversation has to be handled correctly."
      />

      <Container className="mt-3">
        <div className="grid gap-3 lg:grid-cols-12">
          {industries.map((ind, i) => (
            <Tile key={ind.title} delay={i * 60} className={cx("flex flex-col justify-between gap-10", i === 0 ? "bg-grid p-7 sm:p-9 lg:col-span-6 lg:row-span-2" : "lg:col-span-6")}>
              <div className="flex items-center justify-between">
                <IconBadge name={ind.icon} className={i === 0 ? "h-14 w-14" : undefined} />
                <span className="font-mono text-xs text-dim">0{i + 1}</span>
              </div>
              <div>
                <h2 className={cx("font-semibold leading-tight", i === 0 ? "text-3xl sm:text-4xl" : "text-2xl")}>{ind.title}</h2>
                <p className={cx("mt-3 leading-relaxed text-muted", i === 0 && "text-lg")}>{ind.text}</p>
              </div>
            </Tile>
          ))}
          <Tile className="lg:col-span-12">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <IconBadge name="puzzle" />
                <div>
                  <h2 className="text-xl font-semibold">Other industries</h2>
                  <p className="mt-1 text-muted">We take on other processes where our team and workflow are a good fit.</p>
                </div>
              </div>
              <p className="text-fg/85 lg:max-w-sm lg:text-right">
                <Fill k="otherIndustries" />
              </p>
            </div>
          </Tile>
        </div>
      </Container>

      <Container className="mt-24">
        <SectionHeading index="02" label="Markets" title="Two markets, one origin." />
        <div className="mt-10 grid gap-3 lg:grid-cols-12">
          <Tile className="flex flex-col justify-center p-4 sm:p-6 lg:col-span-6 lg:row-span-2">
            <ReachMap className="h-auto w-full" />
            <p className="mt-2 px-2 text-center text-sm text-muted">All work is delivered from our team in Kanpur, India.</p>
          </Tile>
          <Tile delay={60} className="lg:col-span-6">
            <Label>United States</Label>
            <p className="mt-4 text-lg leading-relaxed text-fg/85">
              Lead generation, live transfers, appointment setting and process support, delivered during US business hours.
            </p>
          </Tile>
          <Tile delay={120} className="lg:col-span-6">
            <Label>India</Label>
            <p className="mt-4 text-lg leading-relaxed text-fg/85">EdTech support, web app development and digital marketing.</p>
          </Tile>
        </div>
      </Container>

      <CtaStrip />
    </>
  );
}
