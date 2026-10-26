import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { Container, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact SS Unicom Service to discuss call centre, lead generation, customer support or back-office services. Call +91 97947 74773 or email info@ssunicomservice.com.",
  path: "/contact",
});

const nextSteps = [
  "We review your inquiry and reply by email or phone.",
  "A short call to understand your workflow and requirements.",
  "A practical proposal for how we could support you.",
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[32rem] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <Container className="relative grid gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-5">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">Let&apos;s discuss your requirements.</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Tell us about the process you need support with. A free, no-obligation consultation is the first step.
          </p>

          <ul className="mt-10 space-y-3">
            <li>
              <a
                href={site.contact.phoneHref}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-accent/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon name="phone" />
                </span>
                <span>
                  <span className="block text-sm text-muted">Call us</span>
                  <span className="block font-display text-lg font-bold">{site.contact.phoneDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.contact.emailHref}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-accent/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon name="mail" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">Email us</span>
                  <span className="block break-all font-display text-lg font-bold">{site.contact.email}</span>
                </span>
              </a>
            </li>
            {/* Address and hours appear automatically once set in src/lib/site.ts. */}
            {site.contact.address && (
              <li className="rounded-2xl border border-line bg-white p-5">
                <span className="block text-sm text-muted">Address</span>
                <address className="mt-1 not-italic">{site.contact.address}</address>
              </li>
            )}
            {site.contact.hours && (
              <li className="rounded-2xl border border-line bg-white p-5">
                <span className="block text-sm text-muted">Business hours</span>
                <span className="mt-1 block">{site.contact.hours}</span>
              </li>
            )}
          </ul>

          <div className="mt-12">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">What happens next</h2>
            <ol className="mt-5 space-y-4">
              {nextSteps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-muted">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_30px_80px_-50px_rgb(10_22_38/0.4)] sm:p-10">
            <h2 className="text-2xl font-bold">Send us an inquiry</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
