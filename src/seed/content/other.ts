// Seed content: industries, case studies, testimonials, insights and job openings.

export const industries = [
  {
    order: 1,
    slug: 'healthcare',
    title: 'Healthcare',
    icon: 'HeartPulse',
    art: 'industry-healthcare',
    summary: 'Revenue-cycle, patient-access and admin support for practices, clinics, labs and billing companies.',
    heroHeading: 'Healthcare outsourcing for practices, clinics and billing companies',
    heroText: 'HIPAA-aligned teams for medical billing, patient scheduling, eligibility checks and back-office work, in your time zone.',
    overview: `Healthcare providers are under pressure from every side: payer rules that keep changing, staff shortages and patients who expect quick answers. Outsourcing the administrative load lets clinical teams spend their time on care.

Our healthcare teams are trained on HIPAA, payer workflows and the practice-management systems you already use. We sign a Business Associate Agreement with every client that shares protected health information.`,
    challenges: [
      { icon: 'Receipt', title: 'Rising denials and AR days', text: 'Clean claims, systematic denial work and AR follow-up bring cash in faster.' },
      { icon: 'Headset', title: 'Phones that never stop', text: 'Patient scheduling, reminders and billing questions answered without hold queues.' },
      { icon: 'ShieldCheck', title: 'Compliance risk', text: 'HIPAA-aligned handling, access logs and minimum-necessary access by default.' },
    ],
    services: ['medical-billing-coding', 'inbound-voice-support', 'data-entry-processing', 'payroll-hr-administration', 'technical-help-desk'],
    faqs: [
      { question: 'Is your healthcare outsourcing HIPAA compliant?', answer: 'We follow HIPAA-aligned administrative, physical and technical safeguards, train every team member and sign a BAA. Your compliance team can review our policies before work begins.' },
      { question: 'Can you handle patient calls as well as billing?', answer: 'Yes. Many practices combine patient scheduling and billing-enquiry calls with back-office billing work in one programme.' },
    ],
    metaTitle: 'Healthcare BPO & Medical Outsourcing Services | SS Unicom',
    metaDescription: 'HIPAA-aligned healthcare outsourcing: medical billing and coding, patient scheduling, eligibility checks and back-office support for practices in the USA, Middle East and India.',
    focusKeyword: 'healthcare BPO services',
  },
  {
    order: 2,
    slug: 'insurance',
    title: 'Insurance',
    icon: 'ShieldCheck',
    art: 'industry-insurance',
    summary: 'Policy servicing, certificates, FNOL and renewals for agencies, MGAs and carriers.',
    heroHeading: 'Insurance BPO for agencies, MGAs and carriers',
    heroText: 'Policy-servicing teams that clear endorsements, certificates and renewals so your licensed staff can sell and advise.',
    overview: `Insurance teams carry a heavy servicing load that rarely needs a licence: checking policies, issuing certificates, processing endorsements and preparing renewals. That work is perfect for a trained, process-driven offshore team.

We work in your agency management system and carrier portals, track every request against agreed turnaround times, and keep a clear audit trail.`,
    challenges: [
      { icon: 'FileText', title: 'Servicing backlogs', text: 'Endorsements and certificates processed against agreed turnaround times.' },
      { icon: 'CalendarCheck', title: 'Renewal crunch', text: 'Renewal files prepared and remarketing submissions ready well before expiry.' },
      { icon: 'Headset', title: 'Claims intake spikes', text: 'FNOL calls and forms captured accurately, even after storms or major events.' },
    ],
    services: ['insurance-back-office', 'order-claims-processing', 'inbound-voice-support', 'data-entry-processing', 'outbound-sales-lead-generation'],
    faqs: [
      { question: 'Do you work with independent agencies?', answer: 'Yes. Independent agencies are among our most common insurance clients, along with MGAs, wholesalers and carriers.' },
      { question: 'Can you support commercial lines?', answer: 'Yes. Teams handle both personal and commercial lines, including certificates of insurance for contractors and property managers.' },
    ],
    metaTitle: 'Insurance BPO & Back Office Outsourcing | SS Unicom',
    metaDescription: 'Insurance outsourcing for agencies, MGAs and carriers: policy checking, endorsements, certificates of insurance, FNOL intake and renewal support.',
    focusKeyword: 'insurance BPO',
  },
  {
    order: 3,
    slug: 'real-estate-mortgage',
    title: 'Real Estate & Mortgage',
    icon: 'House',
    art: 'industry-real-estate',
    summary: 'Loan processing, title review, listings and lease admin for lenders, brokers and property managers.',
    heroHeading: 'Mortgage and real estate outsourcing services',
    heroText: 'Processing, listing and lease teams that scale with your pipeline and keep every file in order.',
    overview: `Mortgage and property businesses live with sharp swings in volume. Outsourcing processing and administration gives you capacity when rates move and flexibility when they settle.

Our teams work in your loan origination, title and property-management systems, follow your checklists and keep borrower and tenant data under strict access controls.`,
    challenges: [
      { icon: 'Clock', title: 'Slow loan cycle times', text: 'File set-up, document chasing and condition tracking that keep loans moving.' },
      { icon: 'Building2', title: 'Portfolio paperwork', text: 'Lease abstraction, renewals and tenant records kept current.' },
      { icon: 'Gauge', title: 'Volatile volumes', text: 'Capacity that rises and falls month to month with your pipeline.' },
    ],
    services: ['mortgage-real-estate-support', 'virtual-executive-assistants', 'bookkeeping-accounting', 'digital-marketing-seo', 'social-media-management'],
    faqs: [
      { question: 'Can you support both lenders and property managers?', answer: 'Yes. We have separate teams trained for mortgage processing and for property and lease administration.' },
      { question: 'Do you offer assistants for real estate agents?', answer: 'Yes. Our virtual assistants manage listings, CRM follow-ups, scheduling and transaction paperwork for agents and brokerages.' },
    ],
    metaTitle: 'Mortgage & Real Estate Outsourcing Services | SS Unicom',
    metaDescription: 'Outsourced mortgage processing, title and document review, listing management, lease administration and virtual assistants for real estate.',
    focusKeyword: 'mortgage outsourcing services',
  },
  {
    order: 4,
    slug: 'legal',
    title: 'Legal',
    icon: 'Scale',
    art: 'industry-legal',
    summary: 'Document review, contract abstraction, research and transcription for firms and legal teams.',
    heroHeading: 'Legal process outsourcing for firms and in-house teams',
    heroText: 'Supervised paralegal teams for review, abstraction, research support and transcription, with strict confidentiality.',
    overview: `Legal work is increasingly document-heavy, and billing partner or associate time for first-pass review is hard to justify. Our legal process teams take on the volume work under your protocols, so lawyers focus on strategy and advice.

Every matter is ring-fenced, conflict-checked and quality-reviewed before delivery.`,
    challenges: [
      { icon: 'Layers', title: 'Review volumes', text: 'First-level review and coding at scale, to your protocol.' },
      { icon: 'FileText', title: 'Contract data trapped in PDFs', text: 'Key terms abstracted into structured, searchable templates.' },
      { icon: 'Lock', title: 'Confidentiality', text: 'Matter-level access controls and NDAs for every team member.' },
    ],
    services: ['legal-process-support', 'virtual-executive-assistants', 'data-entry-processing', 'content-creative'],
    faqs: [
      { question: 'Which jurisdictions do you support?', answer: 'Our teams work for firms in the USA, UK, Canada, Australia, India and the Middle East, following each jurisdiction\'s conventions for review, citation formats and transcription.' },
      { question: 'Can you support contract lifecycle management projects?', answer: 'Yes. We abstract legacy contracts into your CLM tool and keep records current as new agreements arrive.' },
    ],
    metaTitle: 'Legal Process Outsourcing for Law Firms | SS Unicom',
    metaDescription: 'Legal process outsourcing: document review, contract abstraction, legal research support and transcription for law firms and corporate legal teams.',
    focusKeyword: 'legal process outsourcing services',
  },
  {
    order: 5,
    slug: 'financial-services',
    title: 'Financial Services',
    icon: 'Landmark',
    art: 'industry-financial',
    summary: 'Bookkeeping, reconciliation, KYC data work and customer support for finance firms and CPAs.',
    heroHeading: 'Financial services outsourcing and accounting support',
    heroText: 'Accurate, controlled finance operations for CPA firms, lenders, fintechs and wealth managers.',
    overview: `Financial firms need accuracy, auditability and security before they need scale. Our finance teams work under maker-checker controls, in your systems, with full logging and role-based access.

From white-label bookkeeping for CPA firms to customer support for fintech apps, we provide trained capacity that fits your control framework.`,
    challenges: [
      { icon: 'Calculator', title: 'Close takes too long', text: 'Daily bookkeeping and reconciliations make month-end routine.' },
      { icon: 'Fingerprint', title: 'KYC and data checks', text: 'Document and data verification against your onboarding rules.' },
      { icon: 'MessagesSquare', title: 'Customer questions', text: 'Trained support for account, card and payment questions.' },
    ],
    services: ['bookkeeping-accounting', 'data-entry-processing', 'chat-email-social-support', 'data-analytics', 'insurance-back-office'],
    faqs: [
      { question: 'Do you provide white-label accounting for CPA firms?', answer: 'Yes. CPA and accounting firms use our bookkeepers during tax season and year round, under their own brand.' },
      { question: 'How do you control access to financial systems?', answer: 'Individual logins with MFA, least-privilege roles, activity logging and no local storage of client data.' },
    ],
    metaTitle: 'Financial Services & Accounting Outsourcing | SS Unicom',
    metaDescription: 'Outsourcing for CPA firms, lenders and fintechs: bookkeeping, reconciliation, KYC data checks, reporting and customer support with maker-checker controls.',
    focusKeyword: 'financial services outsourcing',
  },
  {
    order: 6,
    slug: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    icon: 'ShoppingCart',
    art: 'industry-retail',
    summary: 'Customer support, catalogue management, order processing and marketing for online sellers.',
    heroHeading: 'E-commerce outsourcing and customer support',
    heroText: 'Support, catalogue and order teams that keep your store running smoothly through every sale and season.',
    overview: `E-commerce businesses run on fast replies, accurate listings and orders that ship on time. Our retail teams handle customer questions across every channel, keep your catalogue clean and process orders and returns, scaling up for peak seasons.

We work in Shopify, Amazon Seller Central, WooCommerce, Magento and your help desk.`,
    challenges: [
      { icon: 'MessagesSquare', title: 'Peak-season contact spikes', text: 'Extra trained agents ready before your sales and holiday peaks.' },
      { icon: 'Layers', title: 'Messy product data', text: 'Catalogue creation, enrichment and updates done accurately.' },
      { icon: 'PackageCheck', title: 'Order and returns backlog', text: 'Orders, refunds and exchanges processed daily.' },
    ],
    services: ['chat-email-social-support', 'inbound-voice-support', 'data-entry-processing', 'order-claims-processing', 'digital-marketing-seo', 'social-media-management'],
    faqs: [
      { question: 'Can you support Amazon and Shopify sellers?', answer: 'Yes. Teams manage listings, orders, returns and buyer messages in Seller Central, Shopify and other marketplaces.' },
      { question: 'How early should we plan for peak season?', answer: 'Ideally eight weeks ahead, so new agents are trained and quality-checked before volumes rise.' },
    ],
    metaTitle: 'E-commerce Outsourcing & Customer Support Services | SS Unicom',
    metaDescription: 'E-commerce outsourcing: customer support, product catalogue management, order and returns processing and marketing for Shopify and Amazon sellers.',
    focusKeyword: 'ecommerce outsourcing services',
  },
  {
    order: 7,
    slug: 'saas-technology',
    title: 'SaaS & Technology',
    icon: 'Cpu',
    art: 'industry-technology',
    summary: 'Technical support, onboarding, QA, development and SDR teams for software companies.',
    heroHeading: 'Outsourcing for SaaS and technology companies',
    heroText: 'Support engineers, SDRs, developers and testers who help software companies grow without slowing down.',
    overview: `Software companies need to scale support and sales as fast as their user base, without letting quality slip. Our teams cover Tier 1 and Tier 2 support, onboarding, outbound prospecting, QA and development.

They learn your product in depth, work in your tools and report in your metrics, from first-response time to qualified pipeline.`,
    challenges: [
      { icon: 'LifeBuoy', title: 'Support that scales with users', text: 'Tier 1 and Tier 2 cover that grows with your customer base.' },
      { icon: 'PhoneOutgoing', title: 'Pipeline gaps', text: 'SDR teams that research, call and book qualified demos.' },
      { icon: 'Bug', title: 'Releases that break things', text: 'Independent QA and regression testing before every release.' },
    ],
    services: ['technical-help-desk', 'outbound-sales-lead-generation', 'qa-software-testing', 'software-web-development', 'it-support-managed-services'],
    faqs: [
      { question: 'Can you support a product with frequent releases?', answer: 'Yes. We join your release notes and training cycle, update the knowledge base with each release and flag new issue trends early.' },
      { question: 'Can your SDRs sell into our market?', answer: 'Yes. SDRs work the hours of the market they call, from the Gulf to North America to Australia, follow local do-not-call rules and log all activity in your CRM.' },
    ],
    metaTitle: 'SaaS & Technology Outsourcing: Support, SDRs, QA | SS Unicom',
    metaDescription: 'Outsourcing for SaaS companies: Tier 1–2 technical support, customer onboarding, SDR lead generation, QA testing and dedicated developers.',
    focusKeyword: 'SaaS customer support outsourcing',
  },
  {
    order: 8,
    slug: 'logistics',
    title: 'Logistics & Supply Chain',
    icon: 'Truck',
    art: 'industry-logistics',
    summary: 'Order entry, dispatch coordination, tracking and invoice processing for logistics firms.',
    heroHeading: 'Logistics and supply chain back-office outsourcing',
    heroText: 'Dispatch, tracking, documentation and billing teams that keep freight moving and invoices accurate.',
    overview: `Logistics margins depend on fast, accurate paperwork: bills of lading, proof of delivery, carrier invoices and customer updates. Our logistics teams process documents, coordinate dispatch, update tracking and handle customer queries around the clock.

We work in your TMS, WMS and accounting systems and report daily on volumes and exceptions.`,
    challenges: [
      { icon: 'Truck', title: 'Dispatch coordination', text: 'Carrier booking, load updates and driver follow-ups handled in real time.' },
      { icon: 'Receipt', title: 'Freight billing errors', text: 'Carrier invoices audited and matched before payment.' },
      { icon: 'Headset', title: '“Where is my shipment?” calls', text: 'Tracking updates and customer queries answered quickly.' },
    ],
    services: ['order-claims-processing', 'data-entry-processing', 'inbound-voice-support', 'bookkeeping-accounting', 'it-support-managed-services'],
    faqs: [
      { question: 'Can you cover our freight hours?', answer: 'Yes. Logistics teams work the shifts your lanes need, whether Gulf, UK, North American or Australian hours, including weekends for dispatch and tracking.' },
      { question: 'Which TMS platforms do you know?', answer: 'Examples include McLeod, MercuryGate, Rose Rocket and Descartes, and we train on others during onboarding.' },
    ],
    metaTitle: 'Logistics & Supply Chain Back Office Outsourcing | SS Unicom',
    metaDescription: 'Logistics outsourcing: dispatch coordination, shipment tracking, order entry, POD and freight invoice processing and customer support.',
    focusKeyword: 'logistics back office outsourcing',
  },
]

export const caseStudies = [
  {
    slug: 'home-services-marketplace-cost-per-contact',
    title: 'Cutting cost per contact by 38% for a Gulf home-services marketplace',
    client: 'Home-services marketplace, UAE and Saudi Arabia',
    metric: { value: '38%', label: 'lower cost per contact' },
    summary: 'A fast-growing marketplace needed 24/7 phone and chat coverage without doubling its in-house team. We went live in three weeks and now handle most of its customer contacts.',
    image: 'tile-headset',
    industry: 'retail-ecommerce',
    services: ['inbound-voice-support', 'chat-email-social-support'],
    challenge: 'Contact volumes had tripled in a year. Customers waited more than five minutes at peak times, overnight calls went to voicemail and the in-house team was burning out.',
    solution: `We set up a dedicated team of 28 agents across three shifts, trained on the client's booking platform and refund policies.

- Day one: overnight and weekend phone coverage
- Week four: live chat added, with saved replies rewritten for clarity
- Month three: complaint handling moved to a specialist pod with a team lead

Weekly QA calibration sessions with the client's support lead kept tone and decisions consistent.`,
    results: [
      { value: '92%', label: 'calls answered within 30 seconds' },
      { value: '4.6/5', label: 'post-contact CSAT' },
      { value: '24/7', label: 'coverage within 3 weeks' },
    ],
    quote: { text: 'Customers can’t tell where the team sits, and that is exactly the point. Our CSAT went up while our cost went down.', author: 'Director of Customer Operations', role: 'Home-services marketplace, UAE' },
  },
  {
    slug: 'saas-qualified-meetings',
    title: '2.3× more qualified meetings for a B2B SaaS sales team',
    client: 'B2B SaaS company, Canada',
    metric: { value: '2.3×', label: 'more qualified meetings' },
    summary: 'An HR-software company wanted more pipeline without hiring another SDR class. Our research and calling team doubled qualified meetings in one quarter.',
    image: 'tile-chart',
    industry: 'saas-technology',
    services: ['outbound-sales-lead-generation', 'data-analytics'],
    challenge: 'Two in-house SDRs were spending half their time building lists. Connect rates were low and account executives had empty calendars.',
    solution: `We split the work into research and outreach.

- Two researchers built verified contact lists against a tight ideal-customer profile
- Four callers ran structured call and email sequences during North American business hours
- Every activity was logged in HubSpot, with a weekly dashboard for the sales leader

We refined the qualification script every fortnight based on what account executives said in their meeting feedback.`,
    results: [
      { value: '64', label: 'qualified meetings a month (from 28)' },
      { value: '31%', label: 'meeting-to-opportunity rate' },
      { value: '12 days', label: 'from kick-off to first meeting' },
    ],
    quote: { text: 'The meetings are with the right people, and the notes in HubSpot mean our AEs walk in prepared.', author: 'VP of Sales', role: 'B2B SaaS company' },
  },
  {
    slug: 'clinic-group-ar-days',
    title: 'Bringing AR days from 52 to 34 for a multi-site clinic group',
    client: 'Multi-location physical therapy group, United States',
    metric: { value: '35%', label: 'faster collections' },
    summary: 'A 14-clinic group had a growing backlog of unworked claims. Our billing team cleared the backlog and now runs its denial management and AR follow-up.',
    image: 'tile-shield',
    industry: 'healthcare',
    services: ['medical-billing-coding', 'data-entry-processing'],
    challenge: 'Staff turnover had left more than 3,000 claims unworked over 90 days, denial rates were rising and cash flow was tight.',
    solution: `We started with a 60-day backlog project, then moved to ongoing revenue-cycle support.

- Claims prioritised by value and timely-filing risk
- Denials categorised by root cause, with fixes fed back to front-desk teams
- Eligibility checks moved before every appointment

A weekly dashboard tracked AR by age bucket, payer and clinic.`,
    results: [
      { value: '34', label: 'AR days, down from 52' },
      { value: '96%', label: 'clean-claim rate' },
      { value: '3,000+', label: 'aged claims resolved in 60 days' },
    ],
    quote: { text: 'They brought order to our billing in two months and our cash flow has never been steadier.', author: 'Chief Financial Officer', role: 'Physical therapy group' },
  },
  {
    slug: 'uk-retailer-catalogue-accuracy',
    title: '99.6% accuracy across 1.2 million product records for a UK retailer',
    client: 'UK home and garden retailer',
    metric: { value: '99.6%', label: 'catalogue accuracy' },
    summary: 'A retailer moving to a new e-commerce platform needed its entire catalogue cleaned, enriched and migrated in ten weeks.',
    image: 'group-back-office',
    industry: 'retail-ecommerce',
    services: ['data-entry-processing', 'content-creative'],
    challenge: 'Product data sat in spreadsheets from dozens of suppliers, with duplicates, missing attributes and inconsistent naming. The platform launch date was fixed.',
    solution: `We built a data team of 18 people with a maker-checker workflow.

- Supplier data standardised into a single attribute template
- Duplicates merged and missing specifications researched
- Product descriptions rewritten for the top 20,000 SKUs

Daily progress reports showed records completed, checked and ready to load.`,
    results: [
      { value: '1.2M', label: 'records cleaned and migrated' },
      { value: '10 weeks', label: 'on schedule for launch' },
      { value: '41%', label: 'fewer duplicate SKUs' },
    ],
    quote: { text: 'We launched on the date we promised the board, with cleaner data than we have ever had.', author: 'Head of E-commerce', role: 'UK home and garden retailer' },
  },
]

export const testimonials = [
  { quote: 'SS Unicom treats our customers as if they were their own. The weekly QA reviews give us complete confidence in the team.', name: 'Director of Customer Operations', role: '', company: 'Home-services marketplace, UAE' },
  { quote: 'Our month-end close went from twelve days to five. The bookkeeping team is accurate, responsive and easy to work with.', name: 'Managing Partner', role: '', company: 'CPA firm, New Jersey' },
  { quote: 'We needed developers who would work inside our process, not around it. That is exactly what we got.', name: 'CTO', role: '', company: 'Australian property-technology start-up' },
]

export const posts = [
  {
    slug: 'how-to-choose-a-bpo-partner-in-india',
    title: 'How to choose a BPO partner in India: a 12-point checklist',
    excerpt: 'Price is the easiest thing to compare and the least useful. Use these twelve questions to judge quality, security and fit before you sign.',
    category: 'Outsourcing strategy',
    art: 'tile-people',
    author: 'Operations Team',
    role: 'SS Unicom',
    related: ['inbound-voice-support', 'data-entry-processing'],
    date: '2026-09-18',
    content: `Choosing an outsourcing partner is a bigger decision than it looks. The right partner becomes part of how your customers experience you and how your numbers get made. The wrong one costs months to unwind. Here are the twelve questions we suggest every buyer asks, including of us.

## People and quality

1. **How do you hire and train?** Ask for the assessment steps, the training plan for your process and how long training takes before agents touch live work.
2. **How is quality measured?** Look for a written scorecard, regular calibration with your team and sampling rates you agree with.
3. **What is your attrition, and how do you handle it?** Every operation has turnover. What matters is having trained back-ups and documented processes.
4. **Who will manage our account?** You want a named account manager and team lead, not a ticket queue.

## Security and compliance

5. **What controls protect our data?** Ask about access control, multi-factor authentication, clean-desk rules and whether personal devices are allowed on the floor.
6. **Will you sign our agreements?** NDAs, data-processing agreements and, for healthcare, a Business Associate Agreement.
7. **Do you work in our systems?** Working in your tools keeps your data under your control.
8. **What is your continuity plan?** Power and internet backup, and what happens if a site is unavailable.

## Commercials and fit

9. **How is pricing structured?** Per hour, per FTE or per transaction, and what is included in each.
10. **Can we start with a pilot?** A 30-day pilot with agreed success measures is the best way to test a partner.
11. **How do you report?** Weekly scorecards and a monthly business review should be standard.
12. **Can we speak to a current client?** References in your industry are worth more than any brochure.

## The bottom line

A good partner will welcome these questions and answer them in writing. If you would like our answers, [get in touch](/contact) and we will send them over.`,
  },
  {
    slug: 'medical-billing-outsourcing-what-to-hand-off-first',
    title: 'Medical billing outsourcing: what to hand off first',
    excerpt: 'You do not need to outsource the whole revenue cycle on day one. These are the tasks that pay back fastest, and how to sequence the rest.',
    category: 'Healthcare',
    art: 'industry-healthcare',
    author: 'Revenue Cycle Team',
    role: 'SS Unicom',
    related: ['medical-billing-coding'],
    date: '2026-08-27',
    content: `Many practices delay outsourcing billing because it feels like an all-or-nothing decision. It is not. The best results usually come from starting with one or two well-defined tasks, proving quality, and then expanding.

## Start with AR follow-up

Aged claims are cash waiting to be collected. A focused team that works claims by value and timely-filing risk usually pays for itself within the first month. It is also easy to measure: dollars collected and AR days.

## Add eligibility and benefits verification

Many denials start at the front desk. Checking eligibility and benefits a day or two before each appointment prevents denials rather than fixing them later.

## Then move charge entry and claim submission

Once the team understands your payers and your practice-management system, charge entry and claim submission are a natural next step. Agree a clean-claim target before you begin.

## Keep coding review close

Coding affects compliance as well as revenue. Start with coding support and audits alongside your own coders before handing over more responsibility.

## What to measure

- Clean-claim rate
- Denial rate by reason
- AR days and AR over 90 days
- Net collection rate

If you would like a free review of your current AR, [talk to our team](/services/medical-billing-coding).`,
  },
  {
    slug: 'dedicated-vs-shared-outsourced-agents',
    title: 'Dedicated vs shared outsourced agents: which model fits you?',
    excerpt: 'Dedicated teams give control and depth; shared agents give flexibility at a lower cost. Here is how to decide, with the trade-offs laid out plainly.',
    category: 'Customer experience',
    art: 'group-cx',
    author: 'Client Solutions Team',
    role: 'SS Unicom',
    related: ['inbound-voice-support', 'chat-email-social-support'],
    date: '2026-07-30',
    content: `One of the first decisions in any outsourcing project is whether to have agents who work only on your account (dedicated) or agents who handle several clients (shared). Both work well in the right situation.

## When dedicated agents make sense

- Your volume keeps at least one person busy for a full shift
- Your product or process is complex and takes weeks to learn
- Customer experience is a key differentiator for your brand
- You want agents to become true experts and contribute ideas

## When shared agents make sense

- Volumes are low or unpredictable
- Calls are simple and scripted, such as after-hours message taking
- You are testing outsourcing before committing to a team

## A common middle path

Many clients start with shared after-hours coverage, then move to a dedicated daytime team once volumes and trust grow. A good partner will design a model that changes with you.

## Questions to ask yourself

1. How many contacts do we handle per hour at peak and off-peak?
2. How long does it take a new hire to become fully productive?
3. What happens to our brand if a contact is handled poorly?

[Talk to us](/contact) about which model fits your volumes.`,
  },
]

export const jobs = [
  {
    slug: 'customer-support-associate-us-process',
    title: 'Customer Support Associate (International Process)',
    department: 'Customer Experience',
    shift: 'Rotational: Gulf, UK, North American or Australian hours',
    experience: '0–2 years',
    openings: 12,
    salaryMin: 18000,
    salaryMax: 26000,
    summary: 'Help customers of international brands in the Middle East, USA, UK, Canada and Australia by phone, chat and email. Full training is provided; strong spoken English and a calm, helpful manner matter most.',
    responsibilities: ['Answer customer calls, chats and emails for international clients', 'Resolve order, billing and account questions using client systems', 'Log every interaction accurately in the CRM', 'Escalate complex issues following the agreed process'],
    requirements: ['Graduate or undergraduate with excellent spoken English', 'Comfortable working rotational shifts, including nights', 'Basic computer skills and typing speed of 30+ wpm', 'Previous BPO experience is a plus, not a requirement'],
  },
  {
    slug: 'medical-billing-executive-ar-follow-up',
    title: 'Medical Billing Executive (AR Follow-up)',
    department: 'Industry Operations',
    shift: 'US day shift (night in India)',
    experience: '1–4 years',
    openings: 6,
    salaryMin: 22000,
    salaryMax: 38000,
    summary: 'Work US insurance claims to resolution: calling payers, analysing denials and taking the right action to get claims paid.',
    responsibilities: ['Follow up on unpaid and denied claims with US payers', 'Analyse denials and take corrective action or appeal', 'Update practice-management systems with clear notes', 'Meet daily productivity and quality targets'],
    requirements: ['1+ year of AR calling or denial management experience', 'Knowledge of CPT, ICD-10 and US payer workflows', 'Good spoken and written English', 'Experience with AdvancedMD, Kareo or eClinicalWorks preferred'],
  },
  {
    slug: 'inside-sales-representative',
    title: 'Inside Sales Representative (B2B)',
    department: 'Customer Experience',
    shift: 'US day shift (night in India)',
    experience: '1–3 years',
    openings: 4,
    salaryMin: 25000,
    salaryMax: 40000,
    summary: 'Research prospects, run call and email sequences and book qualified meetings for B2B clients in the USA, UK, Canada, Australia and the Middle East.',
    responsibilities: ['Make outbound calls and send personalised emails to prospects', 'Qualify interest against client criteria', 'Book meetings into client sales calendars', 'Keep CRM records accurate and complete'],
    requirements: ['1+ year in outbound sales, lead generation or appointment setting', 'Confident, clear spoken English', 'Experience with HubSpot or Salesforce preferred', 'Target-driven and coachable'],
  },
  {
    slug: 'quality-analyst-customer-experience',
    title: 'Quality Analyst, Customer Experience',
    department: 'Quality & Training',
    shift: 'Rotational',
    experience: '2–5 years',
    openings: 2,
    salaryMin: 30000,
    salaryMax: 45000,
    summary: 'Audit calls, chats and emails, coach agents and run calibration sessions with client teams.',
    responsibilities: ['Audit customer interactions against client scorecards', 'Give structured feedback and coaching to agents', 'Run weekly calibration sessions with clients', 'Report quality trends and improvement actions'],
    requirements: ['2+ years in a BPO, including 1+ year in a quality role', 'Excellent English and attention to detail', 'Confident presenting to clients', 'Advanced Excel or Google Sheets skills'],
  },
]
