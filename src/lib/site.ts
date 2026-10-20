/**
 * Central company details and site-wide settings.
 *
 * Edit this file to change contact details, navigation and placeholders.
 * Values set to `null` are unconfirmed and are hidden on the site until
 * they are filled in. Never add facts here that the company has not confirmed.
 */

export const site = {
  name: "SS Unicom Service",
  shortName: "SS Unicom",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://ssunicomservice.com",
  description:
    "Business process support for lead generation, customer operations and back-office workflows, delivered from India for clients in the United States, Canada and India.",

  contact: {
    phoneDisplay: "+91 97947 74773",
    phoneHref: "tel:+919794774773",
    email: "info@ssunicomservice.com",
    emailHref: "mailto:info@ssunicomservice.com",
    // PLACEHOLDER: add the confirmed registered/office address, e.g. "Street, City, State PIN, India".
    address: null as string | null,
    // PLACEHOLDER: add confirmed business hours including time zone, e.g. "Mon–Sat, 10:00–19:00 IST".
    hours: null as string | null,
  },

  // Company-provided positioning. Do not turn this into a founding date.
  experience: "10+ years",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
] as const;

export const serviceOptions = [
  "US Lead Generation & Process Support",
  "Canadian Business Services",
  "India EdTech Solutions",
  "Custom Business Process Solutions",
  "Not sure yet",
] as const;
