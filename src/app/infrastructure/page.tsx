import { Icon, type IconName } from "@/components/Icon";
import { Fill } from "@/components/Sample";
import { CtaBand, PageHero, Spacer } from "@/components/sections";
import { ButtonLink, HeadingPanel, Lead, Row } from "@/components/ui";
import { IsoRow, PhotoSlot } from "@/components/visuals";
import { pageMetadata } from "@/lib/metadata";
import { type FactKey, sampleLists } from "@/lib/placeholders";

export const metadata = pageMetadata({
  title: "Our Kanpur Operations Centre",
  description:
    "The floor behind every call: seats, shifts, calling system, power backup, internet and security at our operations centre in Kanpur.",
  path: "/infrastructure",
});

const specs: { icon: IconName; label: string; k: FactKey }[] = [
  { icon: "grid", label: "Floor area", k: "floorArea" },
  { icon: "users", label: "Seats", k: "seatCount" },
  { icon: "moon", label: "Shifts", k: "shifts" },
  { icon: "headset", label: "Calling system", k: "dialer" },
  { icon: "bolt", label: "Power backup", k: "power" },
  { icon: "wifi", label: "Internet", k: "connectivity" },
  { icon: "lock", label: "Security", k: "security" },
  { icon: "database", label: "CRM & reporting", k: "tools" },
];

export default function InfrastructurePage() {
  const photos = sampleLists.photos;

  return (
    <div className="wrap @container">
      <PageHero
        label="Infrastructure"
        title={"Infra\nstructure"}
        intro="One operations centre in Kanpur, built for long shifts, clear calls and data that stays where it should."
        actions={
          <ButtonLink href="/contact" arrow>
            Book a visit
          </ButtonLink>
        }
        visual={
          <IsoRow
            items={[
              { icon: "bolt", label: "Power" },
              { icon: "wifi", label: "Internet" },
              { icon: "lock", label: "Security" },
              { icon: "headset", label: "Calling" },
            ]}
            className="absolute inset-0"
          />
        }
        aside={
          <div className="flex h-full flex-col justify-end gap-3 p-6 md:p-7 lg:py-9">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">Address</p>
            <p className="text-sm leading-relaxed">
              <Fill k="address" />
            </p>
          </div>
        }
      />

      <section aria-labelledby="specs-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="specs-title" text="The floor" className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead title="What’s behind every call" sub="Seats, shifts, power, internet and the systems we call from" />
          </div>
        </Row>
        <Row as="dl" className="max-md:grid-cols-2">
          {specs.map((s) => (
            <div
              key={s.label}
              className="brackets relative flex min-h-56 flex-col justify-between gap-8 border-b border-line p-5 [--b-inset:0.75rem] md:p-8"
            >
              <span className="grid size-11 place-items-center border border-line bg-panel">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <div>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">{s.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed md:text-base">
                  <Fill k={s.k} />
                </dd>
              </div>
            </div>
          ))}
        </Row>
      </section>

      <section aria-labelledby="photos-title">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="photos-title" text="Photos" className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead title="See it for yourself" sub="Real photos of the floor are on the way. Or visit us in Kanpur." />
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
