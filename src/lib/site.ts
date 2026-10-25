/**
 * Central company details and site-wide settings.
 *
 * Confirmed details (name, phone, email, domain) live here. Anything the
 * company still has to confirm lives in ./placeholders.ts.
 */

export const site = {
  name: "SS Unicom Service",
  shortName: "SS Unicom",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://ssunicomservice.com",
  tagline: "Digital reach. Human follow-through.",
  description:
    "Outsourced lead generation, live transfers, web apps and digital marketing from Kanpur, India. Digital reach with human follow-through.",
  positioning:
    "SS Unicom Service builds the websites and campaigns that bring businesses new enquiries, and runs the trained calling team that turns those enquiries into qualified, sales-ready conversations.",
  about:
    "Outsourced lead generation, process support, web apps and digital marketing — delivered from Kanpur, India.",

  contact: {
    phoneDisplay: "+91 97947 74773",
    phoneHref: "tel:+919794774773",
    email: "info@ssunicomservice.com",
    emailHref: "mailto:info@ssunicomservice.com",
  },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/industries", label: "Industries" },
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
