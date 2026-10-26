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
    id: "us-lead-generation",
    title: "US Lead Generation & Process Support",
    market: "United States",
    icon: "target",
    summary:
      "Lead intake, qualification and follow-up for US businesses, including student-loan, finance-related and document-preparation workflows.",
    detail:
      "We support the operational side of lead generation: capturing and organising inquiries, collecting preliminary information, checking records against the criteria you define, and keeping your pipeline documented and up to date.",
    activities: [
      "Lead intake and organisation",
      "Preliminary information collection",
      "Document-preparation workflow support",
      "Lead qualification against client-defined criteria",
      "Customer communication and follow-up",
      "Data entry and process documentation",
      "Quality checks and reporting",
    ],
    note:
      "We provide process support only. SS Unicom Service does not provide legal or financial advice, approve loans, arrange loan forgiveness or guarantee financial outcomes, and has no special access to government programmes or systems.",
  },
  {
    id: "canadian-business-services",
    title: "Canadian Business Services",
    market: "Canada",
    icon: "briefcase",
    summary:
      "Administrative and client-coordination support for businesses serving the Canadian market.",
    detail:
      "We help Canadian-market businesses keep client workflows moving: organising inquiries, gathering preliminary details, scheduling appointments and keeping CRM records current, so your authorised professionals can focus on their own work.",
    activities: [
      "Lead intake and organisation",
      "Preliminary information collection",
      "Administrative documentation support",
      "Appointment scheduling",
      "CRM updates and follow-up",
      "Coordination with appropriately authorised professionals where required",
    ],
    note:
      "SS Unicom Service is not an immigration law firm or a licensed immigration consultancy and does not provide immigration advice or guarantee visas, permanent residence or any immigration outcome.",
  },
  {
    id: "india-edtech",
    title: "India EdTech Solutions",
    market: "India",
    icon: "graduation",
    summary:
      "Inquiry management, student follow-up and support operations for education-technology businesses.",
    detail:
      "For EdTech teams, we handle the day-to-day work around student and parent inquiries: responding, following up, keeping records organised and reporting on where each inquiry stands.",
    activities: [
      "Lead generation and inquiry management",
      "Student inquiry follow-up",
      "Customer support",
      "Administrative process assistance",
      "Data organisation and reporting",
    ],
  },
  {
    id: "custom-solutions",
    title: "Custom Business Process Solutions",
    market: "Any market",
    icon: "puzzle",
    summary:
      "Workflows that do not fit a standard category, from customer support to data management and back-office operations.",
    detail:
      "Not every process fits neatly into a category. If you have a customer-interaction, data-management or back-office workflow that needs dependable support, tell us how it works today and we will propose how we could help.",
    activities: [
      "Customer support and interaction handling",
      "Data management and data entry",
      "Back-office and administrative operations",
      "Process documentation",
      "Technical and non-technical process support",
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
    title: "Process-focused execution",
    text: "Work follows documented steps agreed with you, not improvisation.",
    icon: "flow",
  },
  {
    title: "Clear communication",
    text: "Named points of contact and agreed channels, so you always know who to ask.",
    icon: "chat",
  },
  {
    title: "Flexible operational support",
    text: "Support that can be shaped around your volumes, hours and processes.",
    icon: "sliders",
  },
  {
    title: "Quality checks and reporting",
    text: "Outputs are reviewed against your requirements and progress is reported back.",
    icon: "check-shield",
  },
  {
    title: "Tailored to your requirements",
    text: "We start from how your business works and design the support around it.",
    icon: "target",
  },
];
