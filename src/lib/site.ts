/**
 * Central company details and site-wide settings.
 *
 * Confirmed details (name, phone, email, domain) live here. Anything the
 * company still has to confirm lives in ./placeholders.ts.
 */

export const site = {
  name: "SS Universal Communication Services",
  shortName: "SS Universal",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://ssunicomservice.com",
  tagline: "Digital reach. Human follow-through.",
  description:
    "Lead generation, live call transfers, web apps and digital marketing from Kanpur, India. We bring in the leads, then call every one.",

  contact: {
    phoneDisplay: "+91 97947 74773",
    phoneHref: "tel:+919794774773",
    email: "info@ssunicomservice.com",
    emailHref: "mailto:info@ssunicomservice.com",
  },
} as const;

/** Main navigation, in header order. */
export const nav = [
  { href: "/services", label: "Services" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const companyNav = [
  { href: "/about", label: "About" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/industries", label: "Industries" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/careers", label: "Careers" },
] as const;

export const legalNav = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
] as const;

export const serviceOptions = [
  "US lead generation & process support",
  "Web apps & digital marketing",
  "India EdTech support",
  "Custom solution",
  "Something else",
] as const;
