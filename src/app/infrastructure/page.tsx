import { CtaStrip, PageHero, PhotoSlot } from "@/components/blocks";
import type { IconName } from "@/components/Icon";
import { Icon } from "@/components/Icon";
import { Fill } from "@/components/Sample";
import { Container, Label, SectionHeading, Tile, cx } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import type { FactKey } from "@/lib/placeholders";
import { sampleLists } from "@/lib/placeholders";

export const metadata = pageMetadata({
  title: "Our Kanpur Operations Centre",
  description: "Seats, shifts, calling systems and backups at our Kanpur operations centre.",
  path: "/infrastructure",
});

const items: { label: string; k: FactKey; icon: IconName; suffix?: string }[] = [
  { label: "Location", k: "address", icon: "compass" },
  { label: "Floor area", k: "floorArea", icon: "layers" },
  { label: "Seats", k: "seatCount", icon: "users", suffix: "seats" },
  { label: "Shifts", k: "shifts", icon: "calendar" },
  { label: "Calling system", k: "dialer", icon: "headset", suffix: "with call recording" },
  { label: "Power", k: "power", icon: "refresh" },
  { label: "Connectivity", k: "connectivity", icon: "flow" },
  { label: "Security", k: "security", icon: "check-shield" },
];

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        label="Infrastructure"
        title="Built to deliver every shift."
        intro="Our Kanpur operations centre is set up for international work around the clock, with the systems and backups a client needs to rely on us day after day."
      />

      <Container className="mt-3">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Tile
              as="li"
              key={item.label}
              delay={(i % 4) * 60}
              className={cx("flex min-h-48 flex-col justify-between gap-8", (i === 0 || i === 3) && "lg:col-span-2")}
            >
              <div className="flex items-center justify-between">
                <Label>{item.label}</Label>
                <Icon name={item.icon} className="h-5 w-5 text-signal" />
              </div>
              <p className="font-display text-xl font-semibold leading-snug">
                <Fill k={item.k} />
                {item.suffix && <span className="font-normal text-muted"> {item.suffix}</span>}
              </p>
            </Tile>
          ))}
        </ul>
      </Container>

      <Container className="mt-24">
        <SectionHeading index="02" label="Gallery" title="The floor, the training room, the team." intro="Real photos only." />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sampleLists.photos.items.map((p, i) => (
            <PhotoSlot key={p} label={p} className={cx(i === 0 && "sm:col-span-2 sm:row-span-2 sm:min-h-[360px]", i === 1 && "lg:col-span-2")} />
          ))}
        </div>
      </Container>

      <CtaStrip />
    </>
  );
}
