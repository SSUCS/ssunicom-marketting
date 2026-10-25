/**
 * Shared copy used on more than one page. Page-specific copy lives in each
 * page file under src/app. Unconfirmed facts come from ./placeholders.ts and
 * are rendered with <Fill>.
 */

import type { ReactNode } from "react";
import type { IconName } from "@/components/Icon";
import { Fill } from "@/components/Sample";

export type Service = {
  id: string;
  /** Large display title. */
  title: string;
  /** Short name for tags and lists. */
  short: string;
  kicker: string;
  icon: IconName;
  summary: string;
  includes: string[];
  bestFor: string;
  /** Matches an entry in serviceOptions, for the enquiry link. */
  option: string;
};

export const services: Service[] = [
  {
    id: "us-lead-generation",
    title: "US Lead Generation",
    short: "US Lead Generation",
    kicker: "For US businesses that sell by phone",
    icon: "headset",
    summary:
      "Trained callers work your leads on US hours. Every one is checked against your criteria, then passed to your team live, booked into a calendar or delivered as a complete record.",
    includes: [
      "Outbound prospecting",
      "Inbound call handling",
      "Lead qualification",
      "Live call transfers",
      "Appointment setting",
      "Document collection",
      "CRM updates",
    ],
    bestFor: "Student-loan document services, consumer finance, insurance and other phone-led sales teams.",
    option: "US lead generation & process support",
  },
  {
    id: "web-apps-digital-marketing",
    title: "Web Apps & Marketing",
    short: "Web Apps & Marketing",
    kicker: "For businesses that want more customers online",
    icon: "browser",
    summary:
      "Websites, landing pages and web apps built to turn visitors into enquiries, plus the SEO and ad campaigns that send people to them. And because we run a calling team too, every enquiry gets a follow-up.",
    includes: [
      "Websites & landing pages",
      "Web apps & portals",
      "Lead-capture forms & CRM hookups",
      "SEO & content",
      "Google Ads",
      "Meta ads",
      "Social media",
    ],
    bestFor: "Growing businesses in the US and India that need more enquiries and a site that converts them.",
    option: "Web apps & digital marketing",
  },
  {
    id: "india-edtech",
    title: "EdTech Support",
    short: "EdTech Support",
    kicker: "For course providers and EdTech teams in India",
    icon: "graduation",
    summary:
      "Student and parent enquiries called back fast, counselled properly and followed up to admission. Your admissions team gets a clean, up-to-date pipeline.",
    includes: ["Enquiry call-backs", "Counselling calls", "Admission follow-ups", "Lead tracking", "Daily reports"],
    bestFor: "Online and offline course providers, coaching institutes and EdTech platforms.",
    option: "India EdTech support",
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    short: "Custom Solutions",
    kicker: "When your process doesn’t fit a box",
    icon: "puzzle",
    summary:
      "Tell us how your process runs today. We’ll propose a team, a setup and a price, and tell you honestly if it isn’t something we can run well.",
    includes: ["Your workflow", "Your tools", "Your targets", "Our team"],
    bestFor: "Any process that needs trained people, clear reporting and a steady daily rhythm.",
    option: "Custom solution",
  },
];

export const enquireHref = (s: Service) => `/contact?service=${encodeURIComponent(s.option)}`;

/** The twelve things we do, shown as numbered cards. */
export const capabilities: { title: string; text: string; icon: IconName }[] = [
  { title: "Outbound prospecting", text: "Trained agents call your lists on US hours, on your script.", icon: "phone" },
  { title: "Inbound call handling", text: "Every inbound call answered, logged and routed.", icon: "headset" },
  { title: "Lead qualification", text: "Each lead checked against your criteria before it reaches you.", icon: "filter" },
  { title: "Live call transfers", text: "Qualified prospects passed to your closers while they’re still on the line.", icon: "transfer" },
  { title: "Appointment setting", text: "Meetings booked straight into your team’s calendar.", icon: "calendar" },
  { title: "Document collection", text: "We chase the paperwork, so every file is complete.", icon: "document" },
  { title: "CRM & data entry", text: "Clean, up-to-date records in your CRM or ours.", icon: "database" },
  { title: "Websites & landing pages", text: "Fast pages built to turn visitors into enquiries.", icon: "browser" },
  { title: "Web apps & portals", text: "Custom tools for your customers and your team.", icon: "code" },
  { title: "SEO & content", text: "Get found by people already searching for you.", icon: "search" },
  { title: "Google & Meta ads", text: "Paid campaigns aimed at enquiries, not likes.", icon: "megaphone" },
  { title: "Admissions calling", text: "Student enquiries called back fast, for EdTech teams in India.", icon: "graduation" },
];

export const steps: { title: string; text: string; icon: IconName }[] = [
  { title: "Understand", text: "We learn your business, your customers and what a good lead looks like to you.", icon: "compass" },
  {
    title: "Plan",
    text: "Scripts, qualification rules, delivery format, hours, team size and reporting, agreed in writing before day one.",
    icon: "sliders",
  },
  { title: "Execute", text: "Trained agents call. Developers build. Marketers launch. Each to the plan.", icon: "flow" },
  {
    title: "Qualify",
    text: "Every lead checked against your criteria before it reaches you. Every build tested before it goes live.",
    icon: "check-shield",
  },
  {
    title: "Report & improve",
    text: "You see the numbers. We explain them, then tune scripts, targeting and campaigns for the next round.",
    icon: "chart",
  },
];

export const industries: { title: string; market: string; text: string; icon: IconName }[] = [
  {
    title: "Student-loan document services",
    market: "US",
    text: "Outreach, qualification and document collection for firms that help borrowers with paperwork.",
    icon: "document",
  },
  {
    title: "Consumer finance",
    market: "US",
    text: "Qualification and live transfers for lenders, debt-relief and insurance teams that sell by phone.",
    icon: "briefcase",
  },
  {
    title: "Education & EdTech",
    market: "India",
    text: "Admissions calling and counselling support for course providers and EdTech platforms.",
    icon: "graduation",
  },
  {
    title: "Growing businesses",
    market: "US & India",
    text: "Websites, web apps and campaigns for companies that want more customers online.",
    icon: "browser",
  },
];

export const values: { title: string; text: string }[] = [
  { title: "Trust", text: "Show clients exactly what we do and what it produces." },
  { title: "Integrity", text: "Never promise what we can’t deliver." },
  { title: "Accountability", text: "Own the numbers. Explain them." },
  { title: "Quality", text: "Every lead checked. Every call reviewable." },
  { title: "Growth", text: "For our clients and for our people." },
];

export const mission = "Bring businesses better enquiries, and follow up every one with care and honesty.";
export const vision = "Be the outsourcing partner clients keep for years.";

export const training: { title: string; text: string }[] = [
  { title: "Process training", text: "Your workflow, scripts and qualification rules, before the first call." },
  { title: "Voice & accent", text: "Clarity, tone and pace for international calls, with dedicated trainers." },
  { title: "Compliance", text: "Consent, Do-Not-Call rules and exactly what agents may and may not say." },
  { title: "Weekly coaching", text: "Quality analysts review recorded calls and coach every agent." },
];

export const compliance: ReactNode[] = [
  "Consented contacts only: lists you provide or approve.",
  "Do-Not-Call scrubbing before every campaign.",
  "Scripts approved by you before use.",
  "No promises of approvals, forgiveness or admissions, and no claims to represent any government agency.",
  <>
    Calls recorded and kept for <Fill k="retention" />.
  </>,
  "Restricted system access and confidentiality agreements for every staff member.",
];

export const disclaimer =
  "We work on your behalf. We don’t give legal or financial advice, approve loans or speak for any government agency.";

export type Role = { title: string; tag: ReactNode; text: string; icon: IconName };

export const roles: Role[] = [
  {
    title: "International voice process",
    tag: "Night shift",
    text: "Outbound and inbound calls for US clients. Full training before your first call.",
    icon: "headset",
  },
  { title: "Voice & accent trainer", tag: "Day shift", text: "Coach agents on clarity, tone and confidence.", icon: "chat" },
  { title: "Quality analyst", tag: "Day / night", text: "Review calls, score them and help agents improve.", icon: "check-shield" },
  { title: "EdTech counsellor", tag: "Day shift", text: "Call students and parents about courses and admissions.", icon: "graduation" },
  { title: "Web developer", tag: <Fill k="hiringWeb" />, text: "Build websites and web apps for our clients.", icon: "code" },
  { title: "Digital marketer", tag: <Fill k="hiringWeb" />, text: "Plan and run SEO, Google and Meta campaigns.", icon: "megaphone" },
];

/** Stages shown on the lead token as it travels down the tube on the home page. */
export const tubeStages = [
  { label: "New enquiry", note: "Source: website form" },
  { label: "Contacted", note: "First call made" },
  { label: "Qualified", note: "Checked against your criteria" },
  { label: "Handed off", note: "Live transfer to your team" },
] as const;

export const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What counts as a qualified lead?",
    a: "Whatever you say it is. Before we start, we agree your criteria (need, budget, location, timing) and every lead is checked against them before it reaches you.",
  },
  {
    q: "Do you work US hours?",
    a: (
      <>
        Yes. US campaigns are staffed during <Fill k="coverage" />. Our team works the night shift in Kanpur, so your
        prospects are called in their daytime.
      </>
    ),
  },
  {
    q: "Can you work inside our CRM and dialer?",
    a: "Yes. We can work in your systems, or use ours and send you the data. Either way you see every lead and every outcome.",
  },
  {
    q: "How fast can a campaign start?",
    a: (
      <>
        Usually within <Fill k="launchTime" /> of sign-off. That covers agreeing the script, training the team and
        testing the setup.
      </>
    ),
  },
  {
    q: "Can we hire you just for a website or ads?",
    a: "Yes. Web apps and marketing work on their own. Most clients find the combination works best, but it’s your call.",
  },
  {
    q: "How do you handle compliance?",
    a: "We only call consented contacts you provide or approve, scrub against Do-Not-Call lists, use scripts you’ve approved, and never promise outcomes like approvals or loan forgiveness.",
  },
  {
    q: "What reporting do we get?",
    a: (
      <>
        <Fill k="reportingFrequency" /> reports on leads contacted, qualified and handed over, with a reason for every
        rejection. Call recordings on request.
      </>
    ),
  },
  {
    q: "What does it cost?",
    a: (
      <>
        It depends on volume, hours and scope: per agent seat, per qualified lead, or per project for web work. Tell us
        what you need and we’ll send a quote within <Fill k="replyTime" />.
      </>
    ),
  },
];
