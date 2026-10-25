import Link from "next/link";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Icon, type IconName } from "@/components/Icon";
import { Fill, SampleTag } from "@/components/Sample";
import { PageHero, Spacer } from "@/components/sections";
import { ButtonLink, HeadingPanel, Lead, Row } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { fact, facts } from "@/lib/placeholders";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact SS Unicom Service",
  description:
    "Ask for a free consultation on lead generation, web apps, digital marketing or EdTech support. Call +91 97947 74773 or email info@ssunicomservice.com.",
  path: "/contact",
});

const mono = "font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute";

export default function ContactPage() {
  const details: { icon: IconName; label: string; value: ReactNode; href?: string }[] = [
    { icon: "phone", label: "Phone", value: site.contact.phoneDisplay, href: site.contact.phoneHref },
    { icon: "mail", label: "Email", value: site.contact.email, href: site.contact.emailHref },
    { icon: "pin", label: "Office", value: <Fill k="address" /> },
    { icon: "clock", label: "Hours", value: <Fill k="hours" /> },
  ];

  return (
    <div className="wrap @container">
      <PageHero
        label="Contact"
        title="Contact"
        intro={
          <>
            Tell us what you need: more leads, better leads or a website that works harder. A real person replies within{" "}
            <Fill k="replyTime" />.
          </>
        }
        actions={
          <>
            <ButtonLink href="#enquiry" arrow>
              Send an enquiry
            </ButtonLink>
            <ButtonLink href={site.contact.phoneHref} variant="line" icon="phone">
              Call us
            </ButtonLink>
          </>
        }
        visual={
          <div className="absolute inset-0 grid place-items-center p-8">
            <a href={site.contact.phoneHref} className="group flex flex-col items-center gap-5 text-center">
              <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.12em] text-mute">
                <span aria-hidden className="size-2 animate-pulse bg-orange" />
                Call us now
              </span>
              <span className="display text-[clamp(2.4rem,4.6cqw,4.4rem)] leading-none transition-colors group-hover:text-orange-deep">
                {site.contact.phoneDisplay}
              </span>
              <span className="font-mono text-sm uppercase tracking-[0.06em]">{site.contact.email}</span>
            </a>
          </div>
        }
        aside={
          <div className="flex h-full flex-col justify-end gap-3 p-6 md:p-7 lg:py-9">
            <p className={mono}>Looking for a job?</p>
            <p className="text-sm leading-relaxed">
              See open roles on our{" "}
              <Link href="/careers" className="underline decoration-orange underline-offset-4 hover:text-orange-deep">
                careers page
              </Link>
              .
            </p>
          </div>
        }
      />

      {/* Enquiry form */}
      <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-24">
        <Spacer />
        <Row className="lg:min-h-[11.5rem]">
          <HeadingPanel id="enquiry-title" text={"Free\nconsultation"} className="md:col-span-2" />
          <div className="flex items-center bg-bg p-6 md:col-span-2 md:p-8 lg:justify-center">
            <Lead title="No cost, no obligation" sub="Tell us about your leads, your site or your process" />
          </div>
        </Row>
        <Row>
          <div className="panel relative z-[2] p-6 md:col-span-2 md:p-10 lg:col-span-3">
            <ContactForm />
          </div>
          <ul className="flex flex-col md:col-span-2 lg:col-span-1">
            {details.map((d) => {
              const body = (
                <>
                  <span className="flex items-center justify-between gap-3">
                    <span className={mono}>{d.label}</span>
                    <Icon name={d.icon} className="h-4 w-4" />
                  </span>
                  <span className="mt-3 block break-words leading-relaxed">{d.value}</span>
                </>
              );
              return (
                <li key={d.label} className="border-b border-line">
                  {d.href ? (
                    <a href={d.href} className="block p-6 transition-colors hover:bg-panel md:px-7">
                      {body}
                    </a>
                  ) : (
                    <div className="p-6 md:px-7">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Row>
      </section>

      {/* Map */}
      <section aria-labelledby="visit-title">
        <Spacer />
        <Row>
          <HeadingPanel id="visit-title" text="Visit us" className="md:col-span-2 lg:col-span-1" />
          <div className="flex flex-col justify-center gap-4 p-6 md:col-span-2 md:p-8 lg:col-span-1">
            <p className="leading-relaxed">
              <Fill k="address" />
            </p>
            <SampleTag show={!facts.mapEmbed.confirmed} className="self-start">
              Approximate location
            </SampleTag>
          </div>
          <div className="photo-slot relative min-h-80 md:col-span-2">
            <span className="absolute left-5 top-5 font-mono text-xs uppercase tracking-[0.06em] text-mute">Loading map…</span>
            <iframe
              title="Map showing the office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(fact("mapEmbed"))}&output=embed`}
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(1.05)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Row>
      </section>
    </div>
  );
}
