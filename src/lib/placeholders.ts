/**
 * EVERY UNCONFIRMED FACT ON THE SITE LIVES IN THIS FILE.
 *
 * Each entry is SAMPLE content standing in for a fact the company must
 * supply (the "[bold brackets]" in the content doc). On the site, sample
 * values are drawn with a dashed outline and a small "Sample" tag so they
 * cannot be mistaken for real details.
 *
 * To replace one:
 *   1. Change `value` (or the list items) to the real detail.
 *   2. Set `confirmed: true`. The "Sample" marker disappears.
 *   3. To drop an item the company cannot confirm, set `hidden: true`.
 *
 * The /placeholders page lists every entry and its status, so you can see
 * at a glance what is still sample content. Set SHOW_SAMPLE_MARKERS to
 * false only for a private screenshot; never publish with sample values.
 */

export const SHOW_SAMPLE_MARKERS = true;

export type Fact = {
  /** The text shown on the site. */
  value: string;
  /** What the company needs to supply. Shown on /placeholders. */
  ask: string;
  confirmed: boolean;
  hidden?: boolean;
};

const sample = (value: string, ask: string): Fact => ({ value, ask, confirmed: false });

export const facts = {
  // Company
  legalEntity: sample("SS Unicom Service Pvt. Ltd.", "Legal entity name (footer, legal pages)"),
  yearStarted: sample("2016", "Year operations started"),
  yearsOperating: sample("10", "Years operating, for the proof strip"),
  combinedExperience: sample("10", "Confirm the “over 10 years of combined experience” wording"),
  teamSize: sample("60+", "Team size"),
  seatCount: sample("80", "Number of seats"),
  coverage: sample("US business hours", "Coverage hours, e.g. US business hours"),

  // Contact
  address: sample("2nd Floor, Sample Tower, Civil Lines, Kanpur, Uttar Pradesh 208001", "Office address, Kanpur"),
  hours: sample(
    "Mon–Sat, 10:00–19:00 IST · US-shift support during US business hours",
    "Working hours, including time zone",
  ),
  replyTime: sample("one business day", "Reply-time promise for enquiries"),
  hrEmail: sample("careers@ssunicomservice.com", "HR email for job applications"),
  hrPhone: sample("+91 00000 00000", "HR phone number"),
  linkedin: sample("https://www.linkedin.com/company/ssunicomservice", "LinkedIn company page URL"),
  mapEmbed: sample("Kanpur, Uttar Pradesh, India", "Google Maps embed query (office address)"),

  // Operations
  reportingFrequency: sample("Daily and weekly", "Reporting frequency"),
  qaShare: sample("10% of calls", "Share of calls reviewed by QA"),
  deliveryType: sample(
    "Live transfers, booked appointments or complete lead records",
    "Delivery type per US campaign",
  ),
  tools: sample(
    "Predictive dialer with call recording · HubSpot or your own CRM · Google Looker Studio dashboards",
    "Dialer, CRM and reporting tools in use",
  ),
  retention: sample("90 days, or as set in the client agreement", "Call-recording retention period"),
  techStack: sample("React, Next.js, Node.js and WordPress", "Web tech stack"),
  engagement: sample("Fixed-price projects or monthly retainers", "Web engagement model"),
  edtechPartner: sample("Example Learning Co.", "EdTech partner name, only if permitted"),
  hiringWeb: sample("Hiring now", "Whether web developers and digital marketers are being hired"),
  otherIndustries: sample(
    "Healthcare administration, insurance and real estate",
    "Additional industries the company wants to target",
  ),

  // Infrastructure
  floorArea: sample("4,500 sq ft", "Floor area"),
  shifts: sample("Day shift for India · Night shift for US hours", "Shifts"),
  dialer: sample("Predictive / auto dialer", "Dialer type"),
  power: sample("Online UPS and diesel generator", "Power backup"),
  connectivity: sample("Two leased lines from separate providers", "Primary and backup internet lines"),
  security: sample("Biometric access, CCTV, restricted workstations", "Access control and security"),

  // Story
  story: sample(
    "SS Unicom Service started as a small calling team in Kanpur supporting one US client. As that client grew, so did we, adding quality, training and later web and marketing teams. Today we support businesses in the United States and India from one operations centre.",
    "2–3 sentences: how the company started, a key milestone, where it is today",
  ),
  founderMessage: sample(
    "We built this company on a simple idea: every enquiry deserves a real follow-up. Our clients trust us with their customers, and we take that seriously on every call.",
    "Short message in the founder’s own words",
  ),
} satisfies Record<string, Fact>;

export type FactKey = keyof typeof facts;

/** Lists of sample items. Each list has its own `confirmed` flag. */
export const sampleLists = {
  clients: {
    ask: "Client names or logos the company has permission to show",
    confirmed: false,
    items: ["Northbridge Financial", "Brightpath Learning", "Keystone Docs", "Meridian Lending", "Orbit Commerce", "Lumen Academy"],
  },
  leaders: {
    ask: "Leadership names, roles and photos",
    confirmed: false,
    items: [
      { name: "Leader Name", role: "Founder & Director" },
      { name: "Leader Name", role: "Head of Operations" },
      { name: "Leader Name", role: "Head of Web & Digital" },
    ],
  },
  projects: {
    ask: "2–3 real web projects with screenshot and one-line outcome",
    confirmed: false,
    items: [
      { client: "Northbridge Financial", type: "Lead-capture website", outcome: "Example outcome: enquiries routed straight to the calling team." },
      { client: "Brightpath Learning", type: "Admissions portal", outcome: "Example outcome: every student enquiry tracked in one place." },
      { client: "Orbit Commerce", type: "Landing pages + Google Ads", outcome: "Example outcome: campaign reports by source and keyword." },
    ],
  },
  benefits: {
    ask: "Employee benefits (e.g. night-shift transport, meals)",
    confirmed: false,
    items: ["Cab drop for night shifts", "Meals on shift", "Health insurance"],
  },
  photos: {
    ask: "3–6 real office and team photos (no stock photos)",
    confirmed: false,
    items: ["Operations floor", "Training room", "Quality team", "Team photo"],
  },
} as const;

/** Text value of a fact, for use in metadata and plain strings. */
export const fact = (key: FactKey) => facts[key].value;
