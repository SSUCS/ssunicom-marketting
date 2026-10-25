import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { Fill, SampleTag } from "@/components/Sample";
import { Container, Label, Tile } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { fact, facts } from "@/lib/placeholders";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact SS Unicom Service",
  description:
    "Discuss your lead generation, web or process requirements. Call +91 97947 74773 or email info@ssunicomservice.com.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="pt-6 sm:pt-10">
      <div className="grid gap-3 lg:grid-cols-12">
        <div className="tile bg-grid relative p-7 sm:p-10 lg:col-span-12 lg:p-12">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal/10 blur-3xl" />
          <Label>Contact us</Label>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[4.1rem]">
            Let&apos;s discuss your requirements.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Tell us what you need — more enquiries, better-qualified leads, a new website, or support for an existing
            process. We reply within <Fill k="replyTime" />.
          </p>
        </div>

        <div className="tile p-6 sm:p-9 lg:col-span-7 lg:row-span-4">
          <h2 className="font-display text-2xl font-semibold">Enquiry form</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
          <p className="mt-8 border-t border-line pt-6 text-muted">
            Looking for a job? Visit our{" "}
            <Link href="/careers" className="font-semibold text-signal underline-offset-4 hover:underline">
              Careers page
            </Link>
            .
          </p>
        </div>

        <a href={site.contact.phoneHref} className="tile group flex flex-col justify-between gap-8 p-6 lg:col-span-5">
          <span className="flex items-center justify-between">
            <Label>Phone</Label>
            <Icon name="phone" className="h-5 w-5 text-signal" />
          </span>
          <span className="font-display text-2xl font-semibold group-hover:text-signal">{site.contact.phoneDisplay}</span>
        </a>
        <a href={site.contact.emailHref} className="tile group flex flex-col justify-between gap-8 p-6 lg:col-span-5">
          <span className="flex items-center justify-between">
            <Label>Email</Label>
            <Icon name="mail" className="h-5 w-5 text-signal" />
          </span>
          <span className="break-all font-display text-2xl font-semibold group-hover:text-signal">{site.contact.email}</span>
        </a>
        <Tile className="lg:col-span-5">
          <Label>Office</Label>
          <p className="mt-4 leading-relaxed">
            <Fill k="address" />
          </p>
          <Label className="mt-6">Working hours</Label>
          <p className="mt-4 leading-relaxed">
            <Fill k="hours" />
          </p>
        </Tile>
        <Tile className="overflow-hidden p-0 lg:col-span-5">
          <div className="flex items-center justify-between p-5">
            <Label>Map</Label>
            <SampleTag show={!facts.mapEmbed.confirmed}>Approximate location</SampleTag>
          </div>
          <iframe
            title="Map showing the office location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(fact("mapEmbed"))}&output=embed`}
            className="h-64 w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Tile>
      </div>
    </Container>
  );
}
