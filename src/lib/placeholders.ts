/**
 * EVERY UNCONFIRMED FACT ON THE SITE LIVES IN THIS FILE.
 *
 * Each entry is SAMPLE content standing in for a detail the company must
 * supply. On the site, sample values get a dotted orange underline and
 * sample cards get a small "Sample" tag, so they can't be mistaken for
 * real details.
 *
 * To replace one:
 *   1. Change `value` (or the list items) to the real detail.
 *   2. Set `confirmed: true`. The sample marker disappears.
 *   3. To drop an item the company can't confirm, set `hidden: true`
 *      (supported where noted).
 *
 * The /placeholders page lists every entry and its status. Set
 * SHOW_SAMPLE_MARKERS to false only for a private screenshot; never
 * publish with sample values.
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
  combinedExperience: sample("10+", "Years of combined BPO experience in the team"),
  teamSize: sample("60+", "Team size"),
  seatCount: sample("80", "Number of seats"),
  coverage: sample("US business hours", "Coverage hours for US campaigns"),
  launchTime: sample("two weeks", "Typical time from sign-off to a live campaign"),

  // Contact
  address: sample("2nd Floor, Sample Tower, Civil Lines, Kanpur, Uttar Pradesh 208001", "Office address, Kanpur"),
  hours: sample("Mon–Sat, 10:00–19:00 IST. US campaigns run on US hours.", "Office hours, including time zone"),
  replyTime: sample("one business day", "Reply-time promise for enquiries"),
  hrEmail: sample("careers@ssunicomservice.com", "HR email for job applications"),
  hrPhone: sample("+91 00000 00000", "HR phone number"),
  linkedin: sample("https://www.linkedin.com/company/ssunicomservice", "LinkedIn company page URL"),
  mapEmbed: sample("Civil Lines, Kanpur, Uttar Pradesh, India", "Google Maps search for the office address"),

  // Operations
  reportingFrequency: sample("Daily and weekly", "Reporting frequency"),
  qaShare: sample("10% of calls", "Share of calls reviewed by quality analysts"),
  deliveryType: sample(
    "Live transfers, booked appointments or complete lead records",
    "How qualified leads are delivered on US campaigns",
  ),
  tools: sample(
    "Predictive dialer with call recording, HubSpot or your own CRM, Looker Studio dashboards",
    "Dialer, CRM and reporting tools in use",
  ),
  retention: sample("90 days", "Call-recording retention period"),
  techStack: sample("Next.js, React, Node.js and WordPress", "Web technology used for client projects"),
  engagement: sample("Fixed-price projects or monthly retainers", "How web and marketing work is priced"),
  edtechPartner: sample("Example Learning Co.", "EdTech partner name, only if permitted"),
  hiringWeb: sample("Hiring now", "Whether web developers and digital marketers are being hired"),
  otherIndustries: sample(
    "Healthcare administration, insurance and real estate",
    "Other industries the company wants to target",
  ),

  // Infrastructure
  floorArea: sample("4,500 sq ft", "Floor area"),
  shifts: sample("Day shift for India, night shift for US hours", "Shifts"),
  dialer: sample("Predictive dialer with call recording", "Calling system"),
  power: sample("Online UPS and diesel generator", "Power backup"),
  connectivity: sample("Two leased lines from separate providers", "Primary and backup internet"),
  security: sample("Biometric entry, CCTV, locked-down workstations", "Access control and security"),

  // Story
  story: sample(
    "We started in Kanpur as a small calling team supporting one US client. As that client grew, so did we, adding quality, training and later web and marketing teams. Today one operations centre serves businesses in the US and India.",
    "2–3 sentences: how the company started, a key milestone, where it is today",
  ),
  founderMessage: sample(
    "Every enquiry deserves a real follow-up. Our clients trust us with their customers, and we treat every call that way.",
    "A short message in the founder’s own words",
  ),
} satisfies Record<string, Fact>;

export type FactKey = keyof typeof facts;

export type Glyph = "hex" | "tri" | "cube" | "ring" | "diamond" | "bars" | "chevrons" | "grid";

/**
 * Lists of sample items. Each list has its own `confirmed` flag. Client
 * names are invented examples (several are well-known fictional company
 * names) and must be replaced before launch.
 */
export const sampleLists = {
  clients: {
    ask: "Client names or logos the company has permission to show",
    confirmed: false,
    items: [
      { name: "Woodgrove Lending", glyph: "hex", font: "sans" },
      { name: "Contoso Capital", glyph: "ring", font: "display" },
      { name: "Fabrikam Learning", glyph: "tri", font: "sans" },
      { name: "Northwind Academy", glyph: "cube", font: "mono" },
      { name: "Tailspin Commerce", glyph: "chevrons", font: "display" },
      { name: "Litware Docs", glyph: "grid", font: "sans" },
      { name: "Relecloud Health", glyph: "diamond", font: "mono" },
      { name: "Proseware Realty", glyph: "bars", font: "sans" },
    ] satisfies readonly { name: string; glyph: Glyph; font: "sans" | "display" | "mono" }[],
  },
  caseStudies: {
    ask: "2–4 real results you can share (named or anonymised), with the numbers",
    confirmed: false,
    items: [
      {
        tag: "Lead generation",
        client: "Woodgrove Lending",
        glyph: "hex" as Glyph,
        text: "Outbound calling and live transfers for a US lender.",
        stats: [
          { value: "2,400+", label: "Leads qualified" },
          { value: "38%", label: "Contact rate" },
          { value: "11 days", label: "To go live" },
          { value: "−27%", label: "Cost per lead" },
        ],
      },
      {
        tag: "Web + calling",
        client: "Contoso Capital",
        glyph: "ring" as Glyph,
        text: "A new lead-capture site, with every enquiry called the same day.",
        stats: [
          { value: "3.1×", label: "Enquiries" },
          { value: "<10 min", label: "First call" },
          { value: "21 days", label: "Site live" },
          { value: "42%", label: "Qualified" },
        ],
      },
      {
        tag: "EdTech",
        client: "Fabrikam Learning",
        glyph: "tri" as Glyph,
        text: "Admissions calling for an online course provider in India.",
        stats: [
          { value: "9,800", label: "Enquiries called" },
          { value: "Same day", label: "Call-back" },
          { value: "1,150", label: "Counselling calls" },
          { value: "+31%", label: "Admissions" },
        ],
      },
      {
        tag: "Digital marketing",
        client: "Northwind Academy",
        glyph: "cube" as Glyph,
        text: "SEO and paid campaigns feeding enquiries to the calling team.",
        stats: [
          { value: "2.6×", label: "Organic traffic" },
          { value: "−38%", label: "Cost per lead" },
          { value: "4.1×", label: "Return on ad spend" },
          { value: "120", label: "Top-10 keywords" },
        ],
      },
    ],
  },
  testimonials: {
    ask: "2–4 real client quotes with permission to publish (name and role, or anonymised)",
    confirmed: false,
    items: [
      {
        quote: "They reach our leads faster than our own team ever did. Transfers come through warm and ready to close.",
        role: "Operations Director",
        org: "US student-loan document firm",
      },
      {
        quote: "One team built our website and calls every enquiry it brings in. Nothing sits in an inbox any more.",
        role: "Founder",
        org: "US consumer-finance company",
      },
      {
        quote: "Parents get a call back the same day, and our admissions team finally works from a clean list.",
        role: "Head of Admissions",
        org: "EdTech company, India",
      },
      {
        quote: "Daily reports, recorded calls and straight answers when something isn’t working. That’s rare.",
        role: "VP of Sales",
        org: "US lending company",
      },
    ],
  },
  team: {
    ask: "Leadership names, roles, short bios and photos",
    confirmed: false,
    items: [
      {
        name: "Rohit Verma",
        role: "Founder & Director",
        bio: "Started SS Unicom with a small calling team and one US client. Still signs off every new campaign plan.",
      },
      {
        name: "Neha Gupta",
        role: "Head of Operations",
        bio: "Runs the floor: shifts, staffing, quality and the daily numbers every client sees.",
      },
      {
        name: "Arjun Mishra",
        role: "Head of Web & Digital",
        bio: "Leads the developers and marketers who build client websites and run their campaigns.",
      },
      {
        name: "Priya Srivastava",
        role: "Training & Quality Lead",
        bio: "Trains every agent before their first call, then coaches them weekly from recorded calls.",
      },
    ],
  },
  benefits: {
    ask: "Employee benefits (for example night-shift transport, meals)",
    confirmed: false,
    items: ["Cab drop for night shifts", "Meals on shift", "Health insurance"],
  },
  photos: {
    ask: "3–6 real office and team photos (no stock photos)",
    confirmed: false,
    items: ["Operations floor", "Training room", "Quality desk", "Team photo"],
  },
} as const;

/** Text value of a fact, for metadata and plain strings. */
export const fact = (key: FactKey) => facts[key].value;
