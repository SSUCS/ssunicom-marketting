/**
 * Shared copy used on more than one page: services, workflow steps,
 * lead-journey stages and service commitments. Page-specific copy lives
 * in each page file under src/app.
 */

import type { IconName } from "@/components/Icon";

export type Service = {
  id: string;
  title: string;
  market: string;
  icon: IconName;
  summary: string;
  detail: string;
  activities: string[];
  note?: string;
};

export const services: Service[] = [
  {
    id: "inbound-call-centre",
    title: "Inbound Call Centre & Customer Support",
    market: "Voice · Inbound",
    icon: "headset",
    summary:
      "Trained agents answer your customer calls, resolve queries and log every interaction, during your hours or around the clock.",
    detail:
      "We become the voice of your business on the phone. Our agents learn your products, policies and tone, then handle enquiries, complaints, order and account questions, and first-level technical help, escalating to your team only when they need to.",
    activities: [
      "Customer service and enquiry handling",
      "Order taking, order status and billing queries",
      "Toll-free and helpline answering",
      "First-level technical and help-desk support",
      "Complaint handling and escalation",
      "After-hours and overflow call cover",
      "Call logging and CRM updates",
    ],
  },
  {
    id: "outbound-campaigns",
    title: "Outbound Campaigns & Telemarketing",
    market: "Voice · Outbound",
    icon: "phone",
    summary:
      "Professional outbound calling to reach new prospects, re-engage past customers and promote your products and services.",
    detail:
      "Our outbound teams run structured calling campaigns with agreed scripts, call targets and compliance checks. Every call outcome is recorded, so you can see exactly what each campaign delivered.",
    activities: [
      "Cold calling and telemarketing",
      "Product and service promotion",
      "Customer win-back and retention calls",
      "Cross-selling and up-selling",
      "Payment reminders and renewals",
      "Do-not-call list and script compliance",
      "Daily campaign reporting",
    ],
  },
  {
    id: "lead-generation",
    title: "Lead Generation & Live Transfers",
    market: "Sales",
    icon: "target",
    summary:
      "Qualified, sales-ready leads for your team, delivered as verified records, booked calls or live transfers to your closers.",
    detail:
      "We find and qualify prospects against the criteria you set, then hand them over the way your sales team prefers: as verified lead records, as warm live transfers while the prospect is still on the line, or as booked appointments.",
    activities: [
      "B2B and B2C lead generation",
      "Lead qualification against your criteria",
      "Live (hot) call transfers to your sales team",
      "Data verification before hand-over",
      "Lead nurturing and follow-up calls",
      "Lead generation for finance, insurance, education and more",
    ],
  },
  {
    id: "appointment-setting",
    title: "Appointment Setting & Surveys",
    market: "Sales & research",
    icon: "calendar",
    summary:
      "We fill your sales calendar with confirmed meetings and gather customer feedback through structured telephone surveys.",
    detail:
      "Our callers contact prospects, confirm their interest and book meetings straight into your calendar, with reminders to cut no-shows. For research, we run telephone surveys with quality-checked questionnaires and clean result reporting.",
    activities: [
      "Appointment booking and confirmation",
      "Calendar management and reminder calls",
      "Customer satisfaction surveys",
      "Market research and lifestyle surveys",
      "Third-party and information verification",
      "Survey quality control and reporting",
    ],
  },
  {
    id: "chat-email-support",
    title: "Chat & Email Support",
    market: "Digital channels",
    icon: "chat",
    summary:
      "Fast, consistent answers on live chat, email and WhatsApp, so customers get help on the channel they prefer.",
    detail:
      "We staff your website chat, support inbox and messaging channels with agents trained on your products and tone of voice, working to agreed response times and passing complex cases to the right person on your side.",
    activities: [
      "Live website chat support",
      "Email ticket handling",
      "WhatsApp and social media messaging",
      "Order and account support",
      "Agreed response-time targets",
      "Ticket tagging and reporting",
    ],
  },
  {
    id: "back-office",
    title: "Back Office & Data Management",
    market: "Operations",
    icon: "database",
    summary:
      "Accurate data entry, processing and database upkeep that keep your operations running in the background.",
    detail:
      "Our back-office team takes on the high-volume, detail-heavy work your staff should not be spending time on, working to documented procedures with accuracy checks before anything is returned to you.",
    activities: [
      "Data entry and data processing",
      "Database cleansing, de-duplication and validation",
      "CRM management and record updates",
      "Order processing, invoicing and billing support",
      "Form and claims processing",
      "Research and data analysis",
    ],
  },
  {
    id: "virtual-assistants",
    title: "Virtual Assistants & Dedicated Teams",
    market: "Managed staffing",
    icon: "users",
    summary:
      "A dedicated assistant or team working only on your business, with hiring, training and supervision handled by us.",
    detail:
      "Get the capacity of an in-house team without the overhead. We recruit, train and manage people who work exclusively on your account, and keep trained back-ups ready so your work continues when someone is away.",
    activities: [
      "Dedicated full-time or part-time staff",
      "Administrative and scheduling support",
      "Recruitment, training and supervision by us",
      "Trained back-ups for continuity",
      "Work in your tools and time zone",
      "Regular performance reviews",
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    market: "Marketing",
    icon: "chart",
    summary:
      "SEO, social media and paid campaigns that bring in enquiries for our calling teams to convert.",
    detail:
      "We plan and run digital campaigns that generate enquiries, then connect them directly to our call-centre teams, so every lead is followed up quickly instead of going cold in an inbox.",
    activities: [
      "Search engine optimisation (SEO)",
      "Social media management",
      "Pay-per-click and social advertising",
      "Email marketing",
      "Online reputation management",
      "Campaign tracking and reporting",
    ],
  },
  {
    id: "custom-solutions",
    title: "Custom Outsourcing Solutions",
    market: "Any process",
    icon: "puzzle",
    summary:
      "Have a process that doesn't fit a standard category? Tell us how it works today and we'll design the support around it.",
    detail:
      "Many of our engagements combine several services or follow a client's own workflow. Share your process, volumes and goals, and we will propose a team, a schedule and a way of measuring success.",
    activities: [
      "Blended inbound and outbound programmes",
      "Domestic and international processes",
      "Process documentation and set-up",
      "Pilot projects before scaling up",
      "Technical and non-technical processes",
    ],
  },
];

export type Step = { title: string; text: string };

export const workflowSteps: Step[] = [
  {
    title: "Understand",
    text: "We learn your goals, current workflow, requirements and constraints before proposing anything.",
  },
  {
    title: "Plan",
    text: "We define responsibilities, process steps, communication channels and the criteria that mean success for you.",
  },
  {
    title: "Execute",
    text: "Our team carries out the agreed tasks using documented procedures, so the work is consistent and traceable.",
  },
  {
    title: "Qualify",
    text: "Records and outputs are checked against your requirements before they are handed over.",
  },
  {
    title: "Report & Improve",
    text: "We share progress, flag bottlenecks and suggest practical improvements to the process.",
  },
];

export type JourneyStage = {
  title: string;
  token: string;
  text: string;
  output: string;
};

/** Copy for the homepage "Journey of a Lead" animation. */
export const journeyStages: JourneyStage[] = [
  {
    title: "Lead Generation",
    token: "New lead",
    text: "Inquiries arrive from your forms, calls and campaigns. Each one is captured, logged and organised so nothing slips through.",
    output: "Every inquiry recorded",
  },
  {
    title: "Qualification",
    token: "Qualifying",
    text: "Each lead is checked against the criteria you define. Missing details are collected and unsuitable leads are flagged early.",
    output: "Leads matched to your criteria",
  },
  {
    title: "Processing",
    token: "In process",
    text: "Qualified leads move through your workflow: follow-up, documentation, scheduling and data entry, following agreed procedures.",
    output: "Work done to documented steps",
  },
  {
    title: "Reporting & Improvement",
    token: "Reporting",
    text: "You see where every lead stands. We review what is slowing things down and suggest how the process can improve.",
    output: "Clear status and next steps",
  },
];

export const commitments: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Trained, experienced people",
    text: "Our agents are trained on your products, scripts and quality standards before they take a single call.",
    icon: "users",
  },
  {
    title: "Round-the-clock operations",
    text: "Multiple shifts let us cover your business hours in any time zone, including nights, weekends and holidays.",
    icon: "headset",
  },
  {
    title: "Quality you can measure",
    text: "Calls are monitored, records are checked and performance is reported against the targets we agree with you.",
    icon: "check-shield",
  },
  {
    title: "Scales with your business",
    text: "Start with a small pilot team and grow, or adjust capacity for seasonal peaks, without hiring on your side.",
    icon: "sliders",
  },
  {
    title: "Cost-effective delivery",
    text: "Our Kanpur centre gives you skilled people and modern infrastructure at a fraction of in-house costs.",
    icon: "chart",
  },
  {
    title: "Data security and confidentiality",
    text: "Customer data is handled under confidentiality agreements, controlled access and documented procedures.",
    icon: "layers",
  },
];
