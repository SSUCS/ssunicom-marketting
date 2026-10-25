/**
 * Shared copy used on more than one page: services, journey stages,
 * workflow steps and commitments. Page-specific copy lives in each page
 * file under src/app. Unconfirmed facts come from ./placeholders.ts.
 */

import type { IconName } from "@/components/Icon";

export type Service = {
  id: string;
  title: string;
  short: string;
  icon: IconName;
  summary: string;
  description: string;
  /** Matches an entry in serviceOptions, for the "Enquire Now" link. */
  option: string;
};

export const services: Service[] = [
  {
    id: "us-lead-generation",
    title: "US Lead Generation & Process Support",
    short: "US Lead Generation",
    icon: "target",
    summary:
      "Outbound and inbound calling, lead qualification, live transfers and document-preparation support for US businesses.",
    description:
      "We help US businesses reach, qualify and convert prospects, including businesses that provide document-preparation services for financial matters such as student loans. Our agents work to your scripts, your qualification criteria and your compliance rules.",
    option: "US lead generation & process support",
  },
  {
    id: "web-apps-digital-marketing",
    title: "Web Apps & Digital Marketing",
    short: "Web Apps & Marketing",
    icon: "layers",
    summary:
      "Websites, web applications and campaigns that bring in enquiries — built, launched and grown by one team.",
    description:
      "We design, build and market websites and web applications. Because we also run a calling team, the enquiries your new site brings in are followed up — not left in an inbox.",
    option: "Web apps & digital marketing",
  },
  {
    id: "india-edtech",
    title: "India EdTech Support",
    short: "India EdTech",
    icon: "graduation",
    summary: "Enquiry handling, counselling calls and admission follow-ups for education businesses.",
    description:
      "Enquiry and admissions support for education businesses. Students and parents get a timely, helpful call; your team gets organised, up-to-date enquiries.",
    option: "India EdTech support",
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    short: "Custom Solutions",
    icon: "puzzle",
    summary: "Not every process fits a category. Tell us your workflow and we will propose a team and process for it.",
    description:
      "Not every process fits a category. Tell us your workflow and we will propose a team and process for it.",
    option: "Custom solution",
  },
];

export const enquireHref = (s: Service) => `/contact?service=${encodeURIComponent(s.option)}`;

export type JourneyStage = { title: string; text: string; icon: IconName };

/** Copy for the homepage "From first click to qualified call" scroll scene. */
export const journeyStages: JourneyStage[] = [
  { title: "Build", icon: "layers", text: "We design and develop the website or web app your customers find you through." },
  { title: "Attract", icon: "search", text: "Search, paid ads and social campaigns bring in enquiries." },
  { title: "Contact", icon: "headset", text: "Our team reaches every new lead quickly, by phone, email or chat." },
  { title: "Qualify", icon: "check-shield", text: "Each lead is checked against your criteria before it goes any further." },
  {
    title: "Hand off",
    icon: "phone",
    text: "Qualified prospects reach you as live call transfers, booked appointments or complete lead records.",
  },
  { title: "Report", icon: "chart", text: "You see what happened to every lead, and we use it to improve the next round." },
];

export type Step = { title: string; text: string };

export const workflowSteps: Step[] = [
  {
    title: "Understand",
    text: "We learn your business, your customers, your current process and what a good result looks like for you.",
  },
  {
    title: "Plan",
    text: "We agree on scripts, qualification criteria, delivery format, team size, working hours and reporting before any work starts.",
  },
  {
    title: "Execute",
    text: "Trained agents, developers or marketers carry out the agreed work. Lead campaigns: contact, qualify, hand off. Web projects: design, build, launch, promote.",
  },
  {
    title: "Qualify",
    text: "Every lead is checked against your criteria before it reaches you; every build is tested before it goes live.",
  },
  {
    title: "Report & Improve",
    text: "You receive regular reports. We review them with you and adjust scripts, targeting or campaigns to improve the next cycle.",
  },
];

export const whyChooseUs: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Trained, dedicated teams",
    text: "Agents learn your process, scripts and compliance rules before their first call, and every role has a trained backup who knows your workflow.",
    icon: "users",
  },
  {
    title: "Quality you can check",
    text: "Calls are monitored and scored, and every lead is verified against your criteria before handover.",
    icon: "check-shield",
  },
  {
    title: "Clear reporting",
    // The reporting frequency is filled in from placeholders where this is rendered.
    text: "reports on leads contacted, qualified and handed over, with reasons for every rejection.",
    icon: "chart",
  },
  {
    title: "One team, two capabilities",
    text: "The people who build your channel also follow up on what it brings in, so enquiries do not go cold.",
    icon: "flow",
  },
  {
    title: "Compliance-first outreach",
    text: "Consent-based contact lists, Do-Not-Call scrubbing, client-approved scripts, and no promises of outcomes.",
    icon: "document",
  },
];

export const values: { title: string; text: string }[] = [
  { title: "Trust", text: "We earn it by showing clients exactly what we do and what it produces." },
  { title: "Integrity", text: "We never promise outcomes we cannot deliver, to clients or their customers." },
  { title: "Accountability", text: "We own our numbers and explain them." },
  { title: "Quality", text: "Every lead is checked; every call can be reviewed." },
  { title: "Growth", text: "For our clients, and for the people who work here." },
];

export const compliancePoints = [
  "Outreach only to contacts with appropriate consent, provided or approved by the client",
  "Do-Not-Call list scrubbing before campaigns",
  "Scripts approved by the client before use",
  "Agents never promise approvals, forgiveness, admissions or other outcomes, and never claim to represent a government agency",
  // Call-recording retention is appended from placeholders where this is rendered.
  "Calls recorded and stored",
  "Restricted system access, confidentiality agreements for all staff, and client data used only for the agreed work",
];
