// Seed content for the five service groups and twenty services.
// Copy is original; facts marked in docs/content-to-confirm.md must be checked before launch.

export type GroupSeed = {
  key: string
  slug: string
  code: string
  title: string
  icon: string
  tagline: string
  heroHeading: string
  art: string
  description: string
  benefits: { icon: string; title: string; text: string }[]
  stats: { value: string; label: string }[]
  faqs: { question: string; answer: string }[]
  metaTitle: string
  metaDescription: string
  focusKeyword: string
}

export type ServiceSeed = {
  number: number
  group: string
  slug: string
  title: string
  icon: string
  short: string
  deliverables: string[]
  heroHeading: string
  heroText: string
  overview: string
  faqs: { question: string; answer: string }[]
  related: string[]
  industries: string[]
  caseStudies?: string[]
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  secondary?: string[]
}

export const groups: GroupSeed[] = [
  {
    key: 'A',
    slug: 'customer-experience',
    code: 'Group A',
    title: 'Customer Experience',
    icon: 'Headset',
    tagline: 'Voice, chat and email teams that answer as your brand, in your hours.',
    heroHeading: 'Customer experience outsourcing that sounds like you',
    art: 'group-cx',
    description: `Your customers judge you on every call, chat and email. Our customer experience teams learn your products, your tone and your policies before they speak to a single customer, then keep improving against the measures you care about: speed, resolution and satisfaction.

We run support and sales programmes for businesses in the Middle East, India, the USA, the UK, Canada and Australia from our Kanpur delivery centre, with coverage that matches your business hours, nights, weekends or seasonal peaks.`,
    benefits: [
      { icon: 'Languages', title: 'Neutral, trained English', text: 'Agents pass accent, grammar and empathy assessments before they join your programme.' },
      { icon: 'Clock', title: 'Coverage on your clock', text: 'Day, night, weekend and overflow shifts aligned to Gulf, Indian, UK, North American or Australian time zones.' },
      { icon: 'ClipboardCheck', title: 'Measured on outcomes', text: 'Weekly QA scorecards on resolution, handle time and CSAT, not just call counts.' },
      { icon: 'Gauge', title: 'Scale up in weeks', text: 'Add seats for launches and peak seasons without a recruitment drive of your own.' },
    ],
    stats: [
      { value: '92%', label: 'Calls answered within 30 seconds' },
      { value: '4.6/5', label: 'Average post-contact CSAT' },
      { value: '3 weeks', label: 'Typical time to go live' },
    ],
    faqs: [
      { question: 'Which channels can your customer experience team cover?', answer: 'Inbound and outbound voice, live chat, email and ticket queues, social media messages and review replies. Most clients start with one channel and add others once quality is proven.' },
      { question: 'Will agents use our systems or yours?', answer: 'Yours. Agents work inside your help desk, CRM and telephony (for example Zendesk, Freshdesk, Salesforce or HubSpot) through secure, access-controlled logins.' },
      { question: 'Can you cover nights and weekends only?', answer: 'Yes. After-hours and overflow coverage is one of the most common ways clients start, because it adds coverage without changing the in-house team.' },
    ],
    metaTitle: 'Customer Experience Outsourcing Services | SS Unicom',
    metaDescription: 'Outsourced inbound support, chat, email, help desk and outbound sales teams from India. Trained agents, your hours, measured on CSAT and resolution.',
    focusKeyword: 'customer experience outsourcing',
  },
  {
    key: 'B',
    slug: 'back-office-finance',
    code: 'Group B',
    title: 'Back Office & Finance',
    icon: 'Calculator',
    tagline: 'Accurate, checked transaction work that keeps the business moving.',
    heroHeading: 'Back-office outsourcing with accuracy you can audit',
    art: 'group-back-office',
    description: `The work that never reaches a customer still decides how smoothly a business runs. Our back-office teams process data, books, payroll inputs and orders with a maker-checker step on every batch, so errors are caught before they reach your systems.

Every process is documented in a standard operating procedure you sign off, measured against agreed turnaround and accuracy targets, and reported to you weekly.`,
    benefits: [
      { icon: 'FileCheck2', title: 'Maker-checker on every batch', text: 'A second person verifies work before it is delivered, and errors are logged and trended.' },
      { icon: 'Clock', title: 'Overnight turnaround', text: 'Work sent at the end of your day, wherever you are, is done by the start of the next one.' },
      { icon: 'Lock', title: 'Controlled access', text: 'Role-based logins, clean-desk rules and no personal devices on the production floor.' },
      { icon: 'Wallet', title: 'Predictable cost', text: 'Per-FTE or per-transaction pricing agreed upfront, with no surprise charges.' },
    ],
    stats: [
      { value: '99.6%', label: 'Average accuracy on audited batches' },
      { value: '24 hrs', label: 'Standard turnaround on daily volumes' },
      { value: '40%', label: 'Typical saving against onshore cost' },
    ],
    faqs: [
      { question: 'How do you make sure back-office work is accurate?', answer: 'Every process has a written SOP, a maker-checker review and a sampling audit. We agree accuracy targets with you and report them every week, with root-cause notes on any errors.' },
      { question: 'Which accounting and ERP systems do you work in?', answer: 'Commonly QuickBooks, Xero, Zoho Books, NetSuite, SAP Business One and Tally, along with CRM and e-commerce back ends. If you use something else, we train on it during the pilot.' },
      { question: 'Can we start with a small volume?', answer: 'Yes. Many clients start with one process and one or two people, then expand once turnaround and accuracy are proven.' },
    ],
    metaTitle: 'Back Office & Finance Outsourcing Services | SS Unicom',
    metaDescription: 'Outsourced data entry, bookkeeping, payroll administration and order processing with maker-checker accuracy and overnight turnaround.',
    focusKeyword: 'back office outsourcing',
  },
  {
    key: 'C',
    slug: 'industry-operations',
    code: 'Group C',
    title: 'Industry Operations',
    icon: 'Building2',
    tagline: 'Specialist teams for regulated, process-heavy industries.',
    heroHeading: 'Specialist operations teams for regulated industries',
    art: 'group-industry',
    description: `Healthcare, insurance, mortgage and legal work comes with its own vocabulary, systems and compliance rules. Our industry operations teams are trained for each domain, work to your checklists and keep a clear audit trail of every file they touch.

We support practices, billing companies, agencies, carriers, lenders, brokers and law firms that need extra capacity without lowering their standards.`,
    benefits: [
      { icon: 'GraduationCap', title: 'Domain-trained teams', text: 'Staff are trained on industry terminology, systems and the rules that govern each process.' },
      { icon: 'ShieldCheck', title: 'Compliance built in', text: 'HIPAA-aligned handling for health data, NDAs for every employee and documented access controls.' },
      { icon: 'FileText', title: 'Full audit trail', text: 'Every file action is logged so you can see who did what, and when.' },
      { icon: 'Users', title: 'Dedicated pods', text: 'A stable team with a team lead and QA analyst assigned only to your account.' },
    ],
    stats: [
      { value: '35%', label: 'Faster collections for medical billing clients' },
      { value: '48 hrs', label: 'Insurance certificate and endorsement turnaround' },
      { value: '99%', label: 'Mortgage file checklist compliance' },
    ],
    faqs: [
      { question: 'Do you sign a Business Associate Agreement (BAA)?', answer: 'Yes. For healthcare clients that share protected health information we sign a BAA and follow HIPAA-aligned safeguards, including access logging and minimum-necessary access.' },
      { question: 'Do your teams work in our time zone?', answer: 'Yes. Industry operations teams work your business hours, whether that is Gulf, Indian, UK, North American or Australian time, so they can reach payers, carriers and title companies while those offices are open.' },
      { question: 'What software do your teams know?', answer: 'Examples include AdvancedMD, Kareo, eClinicalWorks, Applied Epic, AMS360, Encompass and common document-management systems. We train on your stack during the pilot.' },
    ],
    metaTitle: 'Healthcare, Insurance, Mortgage & Legal Process Outsourcing | SS Unicom',
    metaDescription: 'Domain-trained offshore teams for medical billing, insurance back office, mortgage processing and legal process support. HIPAA-aligned, audit-ready.',
    focusKeyword: 'industry process outsourcing',
  },
  {
    key: 'D',
    slug: 'technology',
    code: 'Group D',
    title: 'Technology',
    icon: 'Cpu',
    tagline: 'Developers, testers and IT engineers who plug into your team.',
    heroHeading: 'Offshore technology teams that ship with yours',
    art: 'group-technology',
    description: `Hiring engineers is slow and expensive. Our technology teams give you developers, QA testers, IT support engineers and data analysts who join your stand-ups, work in your repositories and tools, and follow your definition of done.

You choose the model: a dedicated engineer, a small cross-functional pod, or a fixed-scope project with clear milestones.`,
    benefits: [
      { icon: 'CodeXml', title: 'Modern stacks', text: 'React, Next.js, Node.js, Python, PHP, Laravel, WordPress, Shopify, AWS and Azure.' },
      { icon: 'Workflow', title: 'Your process, your tools', text: 'We work in your Jira, GitHub and Slack, in your sprint rhythm.' },
      { icon: 'Lock', title: 'Your code stays yours', text: 'IP assignment in every contract, least-privilege access and no code on personal machines.' },
      { icon: 'Clock', title: 'Overlap hours', text: 'Daily overlap with your working hours, from the Gulf to North America to Australia, for stand-ups and reviews.' },
    ],
    stats: [
      { value: '2 weeks', label: 'To place a vetted engineer' },
      { value: '50%', label: 'Typical saving against local hiring' },
      { value: '4 hrs', label: 'Daily overlap with your team, in any time zone' },
    ],
    faqs: [
      { question: 'Who owns the code your developers write?', answer: 'You do. Every contract assigns intellectual property to you, and work lives in your repositories from day one.' },
      { question: 'Can we interview the engineers?', answer: 'Yes. We shortlist candidates against your requirements and you interview and approve every person who joins your team.' },
      { question: 'Do you take fixed-price projects?', answer: 'Yes, for well-defined scopes such as a website build or an integration. Ongoing product work is usually better suited to a dedicated team.' },
    ],
    metaTitle: 'Offshore Software, IT Support, QA & Data Teams | SS Unicom',
    metaDescription: 'Dedicated developers, QA testers, IT support engineers and data analysts from India who work in your tools and hours. You own all the code.',
    focusKeyword: 'offshore development team',
  },
  {
    key: 'E',
    slug: 'marketing-admin',
    code: 'Group E',
    title: 'Marketing & Admin',
    icon: 'Megaphone',
    tagline: 'Growth, content and assistant support for busy teams.',
    heroHeading: 'Marketing execution and admin support, done for you',
    art: 'group-marketing',
    description: `Most growing teams know what marketing they should be doing. What they lack is the hours to do it. Our marketing and admin specialists take on the execution: search and ad campaigns, content, design, social media and the inbox and calendar work that eats into leaders' days.

You keep strategy and approvals. We handle the production, publishing and reporting.`,
    benefits: [
      { icon: 'Target', title: 'Execution, not just advice', text: 'Specialists who build the campaigns, write the posts and send the reports.' },
      { icon: 'PenTool', title: 'On brand, every time', text: 'We work from your brand guidelines and keep a style sheet for every account.' },
      { icon: 'ChartColumn', title: 'Clear reporting', text: 'Monthly reports tied to traffic, leads and cost per result.' },
      { icon: 'Handshake', title: 'Flexible hours', text: 'Part-time, full-time or pooled hours that change as your needs do.' },
    ],
    stats: [
      { value: '48 hrs', label: 'Standard turnaround for content requests' },
      { value: '60%', label: 'Typical saving against agency retainers' },
      { value: '1', label: 'Named account manager per client' },
    ],
    faqs: [
      { question: 'Do you set marketing strategy or only execute?', answer: 'Mostly execution. We follow your plan and brand guidelines, and we will suggest improvements based on the data, but you stay in control of strategy and approvals.' },
      { question: 'Which ad and email platforms do you use?', answer: 'Google Ads, Meta Ads, LinkedIn Ads, Mailchimp, Klaviyo, HubSpot and Brevo are the most common. We work in your accounts, so you keep all data and history.' },
      { question: 'Can one assistant support several executives?', answer: 'Yes. Shared assistant plans cover several people, with clear priorities agreed upfront.' },
    ],
    metaTitle: 'Digital Marketing, Content & Virtual Assistant Outsourcing | SS Unicom',
    metaDescription: 'Outsourced SEO, paid ads, content, design, social media management and executive assistants. Your strategy, our execution, clear monthly reporting.',
    focusKeyword: 'outsourced digital marketing services',
  },
]

export const services: ServiceSeed[] = [
  {
    number: 1,
    group: 'A',
    slug: 'inbound-voice-support',
    title: 'Inbound Voice Support',
    icon: 'Headset',
    short: 'Trained agents on your customer lines for day, night or overflow coverage.',
    deliverables: ['Order, account and billing questions', 'Returns, refunds and exchanges', 'Complaint handling and escalation', 'After-hours and overflow calls'],
    heroHeading: 'Inbound call center outsourcing for customer support',
    heroText: 'Trained agents answer your customer lines as your brand, during the day, overnight or whenever queues spill over.',
    overview: `## Every call answered, in your voice

Missed and long-waiting calls cost sales and loyalty. Our inbound voice teams pick up your customer lines with your greeting, your scripts and your policies, and resolve the call or route it cleanly to the right person.

Agents are trained on your products and systems before go-live, and team leads listen to calls daily. You see answer rates, handle time, first-call resolution and CSAT in a weekly report, and we review trends with you every month.

### What a typical programme covers

- Order status, account changes and billing questions
- Returns, refunds and exchanges within your rules
- Complaints, with a documented escalation path
- After-hours, weekend and overflow coverage when your in-house team is busy

### Who it is for

E-commerce brands, subscription businesses, utilities, home-services companies and SaaS providers that need reliable phone coverage without building a bigger in-house team.`,
    faqs: [
      { question: 'How quickly can an inbound support team go live?', answer: 'Most programmes go live in two to three weeks: one week to agree the scope and set up access, and one to two weeks of product and system training.' },
      { question: 'Can agents take payments over the phone?', answer: 'Yes, using your PCI-compliant payment process. Agents never write down card details, and we can pause call recording during payment.' },
      { question: 'What happens when a call needs your team?', answer: 'Agents follow an escalation matrix we agree with you: warm transfer, callback ticket or supervisor handling, depending on the issue.' },
    ],
    related: ['chat-email-social-support', 'technical-help-desk', 'outbound-sales-lead-generation'],
    industries: ['retail-ecommerce', 'saas-technology', 'healthcare'],
    caseStudies: ['home-services-marketplace-cost-per-contact'],
    metaTitle: 'Inbound Call Center Outsourcing Services | SS Unicom',
    metaDescription: 'Outsourced inbound customer support from India: trained agents for order, billing, returns and complaint calls, with 24/7, after-hours and overflow coverage.',
    focusKeyword: 'inbound call center outsourcing',
    secondary: ['outsourced customer support', 'after-hours answering service', 'overflow call center'],
  },
  {
    number: 2,
    group: 'A',
    slug: 'chat-email-social-support',
    title: 'Chat, Email & Social Support',
    icon: 'MessagesSquare',
    short: 'Fast written replies across every channel your customers use.',
    deliverables: ['Live chat on your site or app', 'Email and ticket queues', 'Social DMs and review replies', 'Help-center articles and macros'],
    heroHeading: 'Outsourced live chat, email and social media support',
    heroText: 'Writers who reply quickly, accurately and on brand across chat, email, social messages and reviews.',
    overview: `## Written support that keeps up with your customers

Customers expect a chat reply in under a minute and an email answer the same day. Our written-support agents are hired for their writing, trained on your tone of voice and measured on response time, resolution and quality.

They work inside your help desk, use your macros and suggest new ones when they see the same question repeatedly. Over time that turns into better help-centre articles and fewer contacts.

### What a typical programme covers

- Live chat on your website or app, including pre-sales questions
- Email and ticket queues with agreed response-time targets
- Social media messages, comments and public review replies
- Help-centre articles, saved replies and macro upkeep

### Who it is for

Online retailers, D2C brands, marketplaces, travel companies and software businesses with growing written-contact volumes.`,
    faqs: [
      { question: 'How fast will customers get a reply?', answer: 'Typical targets are under 60 seconds for chat and under four business hours for email, agreed in your service level agreement and reported weekly.' },
      { question: 'Do agents reply to public reviews?', answer: 'Yes. We draft and post replies to reviews on Google, Trustpilot and marketplace platforms using guidelines you approve.' },
      { question: 'Can you work alongside our chatbot?', answer: 'Yes. Agents handle the conversations your bot hands over, and we report the common hand-off reasons so you can improve the bot.' },
    ],
    related: ['inbound-voice-support', 'social-media-management', 'content-creative'],
    industries: ['retail-ecommerce', 'saas-technology', 'financial-services'],
    metaTitle: 'Outsourced Live Chat & Email Support Services | SS Unicom',
    metaDescription: 'Outsourced live chat, email, ticket and social media support from India. Fast, on-brand replies with response-time SLAs and weekly QA reporting.',
    focusKeyword: 'outsourced live chat support',
    secondary: ['email support outsourcing', 'social media customer service outsourcing'],
  },
  {
    number: 3,
    group: 'A',
    slug: 'technical-help-desk',
    title: 'Technical Help Desk',
    icon: 'LifeBuoy',
    short: 'Tier 1 and Tier 2 support for software, device and SaaS users.',
    deliverables: ['Troubleshooting and how-to calls', 'Password resets and access requests', 'Customer onboarding sessions', 'Ticket triage and routing'],
    heroHeading: 'Outsourced technical support and help desk services',
    heroText: 'Tier 1 and Tier 2 support engineers who troubleshoot, onboard and triage so your product team can keep building.',
    overview: `## Technical support your users will rate highly

When users are stuck, they want someone who understands the product. Our help-desk engineers learn your software or device in depth, follow your troubleshooting trees and know when, and how, to escalate to your developers with a clean, reproducible ticket.

We keep a living knowledge base for your account and feed recurring issues back to your product team, so the same problems stop coming in.

### What a typical programme covers

- Troubleshooting and how-to support by phone, chat and email
- Password resets, access requests and account changes
- Onboarding calls and screen-share training for new customers
- Ticket triage, tagging and routing to Tier 3 or engineering

### Who it is for

SaaS companies, hardware and device makers, managed service providers and internal IT teams that need dependable Tier 1 and Tier 2 cover.`,
    faqs: [
      { question: 'What is the difference between Tier 1 and Tier 2 support?', answer: 'Tier 1 handles common questions, access issues and guided fixes. Tier 2 investigates deeper problems, reproduces bugs and prepares engineering-ready escalations. We can staff one or both.' },
      { question: 'Can your engineers use remote-access tools?', answer: 'Yes, with your approval and using your licensed tools such as TeamViewer, AnyDesk or Zoho Assist. Sessions are logged.' },
      { question: 'Will you document fixes?', answer: 'Yes. Every resolved issue type is captured in your knowledge base so future tickets are faster, whether we or your team handle them.' },
    ],
    related: ['it-support-managed-services', 'inbound-voice-support', 'qa-software-testing'],
    industries: ['saas-technology', 'healthcare', 'financial-services'],
    metaTitle: 'Outsourced Technical Support & Help Desk Services | SS Unicom',
    metaDescription: 'Tier 1 and Tier 2 technical support outsourcing for SaaS, software and device companies: troubleshooting, onboarding, access requests and ticket triage.',
    focusKeyword: 'outsourced technical support',
    secondary: ['help desk outsourcing', 'tier 1 support outsourcing', 'SaaS customer support outsourcing'],
  },
  {
    number: 4,
    group: 'A',
    slug: 'outbound-sales-lead-generation',
    title: 'Outbound Sales & Lead Generation',
    icon: 'PhoneOutgoing',
    short: 'Callers and researchers who fill your pipeline with qualified meetings.',
    deliverables: ['Cold calling and appointment setting', 'Lead research and list building', 'Lead qualification', 'Renewal and win-back campaigns'],
    heroHeading: 'Outsourced lead generation and appointment setting',
    heroText: 'Researchers and callers who build your lists, qualify prospects and book meetings straight into your reps’ calendars.',
    overview: `## A fuller pipeline without a bigger sales team

Your closers should spend their time closing. Our outbound teams do the prospecting: researching accounts, finding the right contacts, calling and emailing them, and booking qualified meetings that meet the criteria you set.

Every call is logged in your CRM with notes, and you see dials, connects, conversations and meetings booked in a weekly dashboard. We follow TCPA, DNC and GDPR rules for the markets we call.

### What a typical programme covers

- Cold calling and appointment setting for your sales team
- Account research and contact list building
- Inbound lead qualification and speed-to-lead calling
- Renewal reminders and win-back campaigns for lapsed customers

### Who it is for

B2B software, professional services, solar, insurance and home-services companies that sell in the Middle East, India, the USA, the UK, Canada or Australia.`,
    faqs: [
      { question: 'How do you define a qualified meeting?', answer: 'We agree the criteria with you before calling starts, for example company size, role, budget and timing. Only meetings that meet them count towards our targets.' },
      { question: 'Do you follow TCPA and Do Not Call rules?', answer: 'Yes. We scrub lists against the relevant DNC registries, keep consent records and follow the calling rules of every market we dial, including US TCPA, the UK TPS, Canada’s DNCL, Australia’s Do Not Call Register and UAE telemarketing regulations.' },
      { question: 'Can you work from our CRM?', answer: 'Yes. We work in Salesforce, HubSpot, Pipedrive, Zoho or your own CRM, so every activity and note stays with you.' },
    ],
    related: ['inbound-voice-support', 'digital-marketing-seo', 'data-analytics'],
    industries: ['saas-technology', 'insurance', 'real-estate-mortgage'],
    caseStudies: ['saas-qualified-meetings'],
    metaTitle: 'Outsourced Lead Generation & Appointment Setting | SS Unicom',
    metaDescription: 'B2B lead generation outsourcing: cold calling, appointment setting, list building and lead qualification, logged in your CRM and compliant with TCPA and DNC.',
    focusKeyword: 'outsourced lead generation',
    secondary: ['appointment setting services', 'outbound call center', 'B2B cold calling services'],
  },
  {
    number: 5,
    group: 'B',
    slug: 'data-entry-processing',
    title: 'Data Entry & Processing',
    icon: 'Keyboard',
    short: 'Double-checked data work at any volume, with turnaround you can plan on.',
    deliverables: ['Invoice and form digitization', 'Product catalog updates', 'CRM and ERP data entry', 'Data cleansing and deduplication'],
    heroHeading: 'Data entry outsourcing with double-checked accuracy',
    heroText: 'High-volume data work, from invoices to product catalogues, verified by a second person before it reaches your systems.',
    overview: `## Clean data, delivered on schedule

Bad data quietly costs money: wrong prices, duplicate customers, invoices paid twice. Our data teams key, extract, clean and update records using a maker-checker process, so every batch is reviewed before delivery.

We combine trained operators with sensible automation such as OCR for scanned documents, and we agree accuracy and turnaround targets with you before work begins.

### What a typical programme covers

- Invoice, form and document digitization, including handwritten forms
- Product catalogue creation and updates for e-commerce stores
- CRM and ERP data entry and record maintenance
- Data cleansing, standardisation and deduplication

### Who it is for

Retailers, distributors, finance teams, healthcare administrators and any business with large or recurring data volumes.`,
    faqs: [
      { question: 'What accuracy can you guarantee for data entry?', answer: 'Our standard target is 99.5% field-level accuracy, measured by sample audits. For critical data we use double-keying to reach higher levels.' },
      { question: 'How do you receive the documents?', answer: 'Through your systems, a secure SFTP or a shared drive you control. We do not move data to personal email or devices.' },
      { question: 'Can you handle sudden spikes in volume?', answer: 'Yes. We keep trained back-up operators so we can absorb seasonal or one-off peaks with a few days’ notice.' },
    ],
    related: ['order-claims-processing', 'bookkeeping-accounting', 'data-analytics'],
    industries: ['retail-ecommerce', 'logistics', 'healthcare'],
    caseStudies: ['uk-retailer-catalogue-accuracy'],
    metaTitle: 'Data Entry Outsourcing Services from India | SS Unicom',
    metaDescription: 'Outsourced data entry and processing: invoice digitization, product catalogue updates, CRM and ERP entry, data cleansing. 99.5% accuracy target.',
    focusKeyword: 'data entry outsourcing',
    secondary: ['data entry services India', 'data cleansing services', 'product catalog data entry'],
  },
  {
    number: 6,
    group: 'B',
    slug: 'bookkeeping-accounting',
    title: 'Bookkeeping & Accounting',
    icon: 'Calculator',
    short: 'Books kept current, reconciled and ready for your CPA.',
    deliverables: ['Accounts payable and receivable', 'Bank and card reconciliation', 'Month-end close support', 'QuickBooks and Xero bookkeeping'],
    heroHeading: 'Outsourced bookkeeping and accounting services',
    heroText: 'Trained bookkeepers keep your books current and reconciled, so month-end is calm and your accountant has what they need.',
    overview: `## Books that are always ready

Late, messy books make every decision harder and every tax season more expensive. Our bookkeepers record transactions daily, reconcile bank and card accounts, chase receivables and prepare a clean month-end package for your CPA or finance lead.

Work follows a checklist you approve, with a senior reviewer signing off each close. You keep full ownership of your accounting software and data.

### What a typical programme covers

- Accounts payable: bill entry, approvals and payment runs
- Accounts receivable: invoicing, collections follow-up and cash application
- Bank, card and payment-gateway reconciliations
- Month-end close support, accruals and management reports in QuickBooks, Xero or Zoho Books

### Who it is for

Small and mid-sized businesses, CPA and accounting firms that need white-label capacity, and finance teams handling growth.`,
    faqs: [
      { question: 'Do you work for CPA firms as well as businesses?', answer: 'Yes. Many CPA and accounting firms use our bookkeepers as white-label capacity during tax season or all year round.' },
      { question: 'Are your bookkeepers familiar with our country\'s accounting?', answer: 'Yes. Teams work to IFRS, US GAAP and local practice, including UAE and Saudi VAT, Indian GST, UK VAT, Canadian GST/HST and Australian BAS. Tax filing and sign-off remain with your licensed accountant.' },
      { question: 'How do you keep financial data secure?', answer: 'We work in your cloud accounting software with individual logins, multi-factor authentication and role-based permissions. No data is stored locally.' },
    ],
    related: ['payroll-hr-administration', 'data-entry-processing', 'order-claims-processing'],
    industries: ['financial-services', 'retail-ecommerce', 'real-estate-mortgage'],
    metaTitle: 'Outsourced Bookkeeping Services (QuickBooks & Xero) | SS Unicom',
    metaDescription: 'Outsourced bookkeeping and accounting: AP, AR, bank reconciliation and month-end close in QuickBooks, Xero and Zoho Books. White-label support for CPA firms.',
    focusKeyword: 'outsourced bookkeeping services',
    secondary: ['QuickBooks bookkeeping services', 'Xero bookkeeping', 'accounts payable outsourcing'],
  },
  {
    number: 7,
    group: 'B',
    slug: 'payroll-hr-administration',
    title: 'Payroll & HR Administration',
    icon: 'Users',
    short: 'The paperwork side of HR, handled on schedule.',
    deliverables: ['Payroll data preparation', 'New-hire onboarding paperwork', 'Benefits enrollment support', 'Employee records and HR help desk'],
    heroHeading: 'Payroll and HR administration outsourcing',
    heroText: 'Accurate payroll inputs, tidy employee records and a responsive HR help desk, without adding to your HR headcount.',
    overview: `## HR admin handled, people time protected

HR teams lose days each month to data checks, forms and repeated questions. Our HR administrators prepare payroll inputs, process onboarding paperwork, maintain employee records and answer routine employee questions, all on a schedule you can rely on.

Payroll inputs are reconciled against timesheets and approvals before they reach your payroll provider, and sensitive records are handled under strict access controls.

### What a typical programme covers

- Timesheet collection and payroll data preparation for providers such as ADP, Gusto or Paychex
- New-hire paperwork, document checks and system set-up
- Benefits enrolment support and change processing
- Employee records maintenance and a first-line HR help desk

### Who it is for

Growing employers, staffing agencies and PEOs that need dependable HR administration capacity.`,
    faqs: [
      { question: 'Do you run payroll or prepare it?', answer: 'We prepare and validate payroll inputs and reconcile outputs. The payroll run itself stays with your provider or in-house team for control and compliance.' },
      { question: 'Can your team answer employee questions?', answer: 'Yes. We run first-line HR help desks by email, chat or phone using a knowledge base you approve, escalating sensitive matters to your HR team.' },
      { question: 'How is employee data protected?', answer: 'Access is limited to named staff, every action is logged, and records stay in your HRIS. Staff sign NDAs and complete data-protection training.' },
    ],
    related: ['bookkeeping-accounting', 'virtual-executive-assistants', 'data-entry-processing'],
    industries: ['healthcare', 'logistics', 'retail-ecommerce'],
    metaTitle: 'Payroll & HR Administration Outsourcing | SS Unicom',
    metaDescription: 'Outsourced payroll data preparation, onboarding paperwork, benefits enrolment support and HR help desk services with secure handling of employee data.',
    focusKeyword: 'HR administration outsourcing',
    secondary: ['payroll processing outsourcing', 'HR help desk outsourcing'],
  },
  {
    number: 8,
    group: 'B',
    slug: 'order-claims-processing',
    title: 'Order & Claims Processing',
    icon: 'PackageCheck',
    short: 'High-volume transactions with quality checks built into every step.',
    deliverables: ['Order entry and tracking', 'Claims intake and processing', 'Shipping and dispatch coordination', 'Vendor invoice processing'],
    heroHeading: 'Order processing and claims processing outsourcing',
    heroText: 'High-volume order, claims and invoice processing with quality checks at every step and daily status reporting.',
    overview: `## Transactions processed right the first time

Every order or claim that sits in a queue, or is keyed wrongly, turns into a customer call. Our transaction-processing teams work through your queues every day, follow your rules for exceptions and flag anything unusual before it becomes a problem.

You get daily volume and backlog reports, accuracy audits and a team that scales with your seasonal peaks.

### What a typical programme covers

- Order entry from email, EDI, portals and marketplaces, plus order tracking
- Warranty, shipping and insurance claims intake and processing
- Shipping, dispatch and carrier coordination
- Vendor invoice matching and processing

### Who it is for

Distributors, manufacturers, e-commerce sellers, logistics firms and claims administrators with high, variable transaction volumes.`,
    faqs: [
      { question: 'Can you work across several order channels?', answer: 'Yes. Teams routinely process orders from email, PDFs, supplier portals, marketplaces such as Amazon and Shopify, and EDI exception queues.' },
      { question: 'How do you handle exceptions?', answer: 'We agree an exception playbook with you. Anything outside it is flagged the same day with the details your team needs to decide quickly.' },
      { question: 'What reporting will we get?', answer: 'Daily volume, backlog and turnaround reports, plus weekly accuracy audits and a monthly review of trends and improvement ideas.' },
    ],
    related: ['data-entry-processing', 'bookkeeping-accounting', 'insurance-back-office'],
    industries: ['logistics', 'retail-ecommerce', 'insurance'],
    metaTitle: 'Order Processing & Claims Processing Outsourcing | SS Unicom',
    metaDescription: 'Outsourced order entry, claims processing, dispatch coordination and vendor invoice processing with daily reporting and built-in quality checks.',
    focusKeyword: 'order processing outsourcing',
    secondary: ['claims processing outsourcing', 'invoice processing services'],
  },
  {
    number: 9,
    group: 'C',
    slug: 'medical-billing-coding',
    title: 'Medical Billing & Coding',
    icon: 'Stethoscope',
    short: 'Revenue-cycle support for practices, clinics and billing companies.',
    deliverables: ['Charge entry and claim submission', 'Eligibility and benefits verification', 'Denial management and AR follow-up', 'Medical coding support'],
    heroHeading: 'Medical billing and coding outsourcing services',
    heroText: 'Revenue-cycle teams that get claims out clean, chase every denial and bring your AR days down.',
    overview: `## Get paid faster for the care you provide

Denied and unworked claims are revenue left on the table. Our medical billing teams handle the revenue cycle from eligibility checks to AR follow-up, working in your practice-management system and to payer rules.

Certified coders support charge capture and code review, while AR callers work aged claims systematically by value and age. You see clean-claim rate, denial rate, collections and AR days every month.

### What a typical programme covers

- Insurance eligibility and benefits verification before visits
- Charge entry, claim scrubbing and electronic submission
- Payment posting, denial management and appeals
- AR follow-up with payers and medical coding support (ICD-10, CPT, HCPCS)

### Who it is for

Physician practices, specialty clinics, hospitals, labs and medical billing companies in the USA, plus insurance-claims and TPA work for hospitals in the Middle East and India.`,
    faqs: [
      { question: 'Are your medical billing staff HIPAA trained?', answer: 'Yes. Every team member completes HIPAA training, signs confidentiality agreements and works under access controls with full activity logging. We sign a BAA with every healthcare client.' },
      { question: 'Which practice-management systems do you use?', answer: 'Common systems include AdvancedMD, Kareo (Tebra), eClinicalWorks, athenahealth, NextGen and DrChrono. We train on others during onboarding.' },
      { question: 'Can you clear an old AR backlog?', answer: 'Yes. Many clients start with a backlog project, where we prioritise claims by value and timely-filing risk, before moving to ongoing billing.' },
    ],
    related: ['insurance-back-office', 'data-entry-processing', 'inbound-voice-support'],
    industries: ['healthcare'],
    caseStudies: ['clinic-group-ar-days'],
    metaTitle: 'Medical Billing & Coding Outsourcing Services | SS Unicom',
    metaDescription: 'HIPAA-aligned medical billing outsourcing: eligibility checks, charge entry, claim submission, denial management, AR follow-up and coding support.',
    focusKeyword: 'medical billing outsourcing',
    secondary: ['medical billing services India', 'revenue cycle management outsourcing', 'AR follow-up services', 'medical coding outsourcing'],
  },
  {
    number: 10,
    group: 'C',
    slug: 'insurance-back-office',
    title: 'Insurance Back Office',
    icon: 'ShieldCheck',
    short: 'Support for agencies, carriers and MGAs across the policy lifecycle.',
    deliverables: ['Policy issuance and endorsements', 'Certificates of insurance', 'First notice of loss intake', 'Renewals and quoting support'],
    heroHeading: 'Insurance back office outsourcing for agencies and carriers',
    heroText: 'Trained insurance processors handle the policy servicing that slows your account managers down.',
    overview: `## More selling time for your producers

Agency and carrier teams spend hours on servicing work that does not need a licence: endorsements, certificates, data entry and renewal preparation. Our insurance back-office teams take that work on, in your agency management system and to your carriers’ requirements.

Work is tracked through service requests with agreed turnaround times, so nothing is lost between email, portal and AMS.

### What a typical programme covers

- New business set-up, policy checking, issuance and endorsements
- Certificates of insurance (COIs) and evidence of property
- First notice of loss (FNOL) intake and claims support
- Renewal preparation, marketing submissions and quoting support

### Who it is for

Independent agencies, brokers, MGAs and carriers, in commercial and personal lines across the USA, UK, Canada, Australia and the Middle East.`,
    faqs: [
      { question: 'Which agency management systems do you work in?', answer: 'Commonly Applied Epic, AMS360, HawkSoft, EZLynx and QQCatalyst, along with carrier portals. We learn your set-up during onboarding.' },
      { question: 'Do your staff need insurance licences?', answer: 'No. Our teams handle non-licensed servicing tasks. Anything that requires a licence, such as giving coverage advice, stays with your licensed staff.' },
      { question: 'How fast are certificates of insurance issued?', answer: 'Standard COIs are typically issued the same business day, with rush requests handled within a few hours.' },
    ],
    related: ['order-claims-processing', 'mortgage-real-estate-support', 'inbound-voice-support'],
    industries: ['insurance', 'financial-services'],
    metaTitle: 'Insurance Back Office Outsourcing Services | SS Unicom',
    metaDescription: 'Insurance back-office outsourcing for agencies, carriers and MGAs: policy issuance, endorsements, certificates of insurance, FNOL intake and renewals.',
    focusKeyword: 'insurance back office outsourcing',
    secondary: ['insurance agency outsourcing', 'certificate of insurance processing', 'policy checking services'],
  },
  {
    number: 11,
    group: 'C',
    slug: 'mortgage-real-estate-support',
    title: 'Mortgage & Real Estate Support',
    icon: 'House',
    short: 'Processing help for lenders, brokers and property managers.',
    deliverables: ['Loan file setup and processing', 'Document and title review', 'Listing management', 'Lease administration'],
    heroHeading: 'Mortgage processing and real estate support outsourcing',
    heroText: 'Processors and coordinators who keep loan files moving and property portfolios organised.',
    overview: `## Faster files, fewer conditions

Mortgage volumes rise and fall quickly, and hiring processors for every peak is expensive. Our mortgage support teams set up files, gather and check documents, track conditions and keep your pipeline moving, inside your loan origination system.

For real estate businesses, we manage listings, lease records and the paperwork that keeps a portfolio in order.

### What a typical programme covers

- Loan file set-up, processing support and condition tracking
- Document, income and title review against your checklists
- Listing creation and updates across MLS and property portals
- Lease abstraction, renewals and tenant-record administration

### Who it is for

Mortgage lenders, brokers, credit unions, title agencies, property managers and real estate brokerages.`,
    faqs: [
      { question: 'Which loan origination systems do you support?', answer: 'Encompass, Calyx Point, Byte and LendingPad are common. We also work in title and property-management systems such as Yardi, AppFolio and Buildium.' },
      { question: 'Can you scale with mortgage volume changes?', answer: 'Yes. Because our teams are cross-trained, we can add or reduce capacity month to month as your pipeline changes.' },
      { question: 'How is borrower data protected?', answer: 'Staff work only in your systems with individual credentials and MFA, follow clean-desk rules and are bound by GLBA-aligned confidentiality procedures.' },
    ],
    related: ['insurance-back-office', 'legal-process-support', 'data-entry-processing'],
    industries: ['real-estate-mortgage', 'financial-services'],
    metaTitle: 'Mortgage Processing & Real Estate Support Outsourcing | SS Unicom',
    metaDescription: 'Outsourced mortgage processing, loan file set-up, document and title review, listing management and lease administration for lenders and property firms.',
    focusKeyword: 'mortgage processing outsourcing',
    secondary: ['mortgage support services', 'real estate back office outsourcing', 'lease administration services'],
  },
  {
    number: 12,
    group: 'C',
    slug: 'legal-process-support',
    title: 'Legal Process Support',
    icon: 'Scale',
    short: 'Document-heavy legal work handled by trained paralegal teams.',
    deliverables: ['Document review and coding', 'Contract abstraction', 'Legal research support', 'Transcription and summaries'],
    heroHeading: 'Legal process outsourcing for law firms and legal teams',
    heroText: 'Trained paralegal teams take on review, abstraction, research and transcription so your lawyers can focus on judgement.',
    overview: `## Leverage for your legal team

Document-heavy work consumes expensive lawyer hours. Our legal process teams review and code documents, abstract contract terms, support research and produce accurate transcripts and summaries, all under supervision and to your protocols.

Matters are separated by team and access, and every deliverable goes through a quality review before it reaches you.

### What a typical programme covers

- First-level document review and coding for litigation and investigations
- Contract abstraction and clause extraction into your templates
- Legal research support and memo preparation for attorney review
- Deposition, hearing and dictation transcription and summaries

### Who it is for

Law firms, corporate legal departments, legal-tech companies and litigation support providers.`,
    faqs: [
      { question: 'Do you give legal advice?', answer: 'No. Our teams support licensed lawyers with review, research and documentation. All legal judgement and advice stay with your attorneys.' },
      { question: 'How do you protect confidentiality and privilege?', answer: 'Matters are ring-fenced to named staff, work happens in your review platforms, and every team member signs confidentiality agreements. Conflict checks are run before work starts.' },
      { question: 'Which review platforms do you use?', answer: 'Relativity, Everlaw, DISCO and Logikcull are common, along with contract tools and your document-management system.' },
    ],
    related: ['mortgage-real-estate-support', 'data-entry-processing', 'virtual-executive-assistants'],
    industries: ['legal', 'financial-services'],
    metaTitle: 'Legal Process Outsourcing (LPO) Services | SS Unicom',
    metaDescription: 'Legal process outsourcing: document review and coding, contract abstraction, legal research support and transcription by trained paralegal teams.',
    focusKeyword: 'legal process outsourcing',
    secondary: ['contract abstraction services', 'document review outsourcing', 'legal transcription services'],
  },
  {
    number: 13,
    group: 'D',
    slug: 'software-web-development',
    title: 'Software & Web Development',
    icon: 'CodeXml',
    short: 'Dedicated developers for websites, web apps and integrations.',
    deliverables: ['Website builds and maintenance', 'Web and mobile app development', 'API and system integrations', 'Bug fixes and feature work'],
    heroHeading: 'Dedicated software and web development teams',
    heroText: 'Vetted developers who build and maintain your websites, apps and integrations, working in your repositories and sprints.',
    overview: `## Engineering capacity without the hiring cycle

Whether you need a new website, a web app or an integration between two systems, our developers join your workflow and deliver to your standards. You interview and approve every engineer, and they work in your repositories, ticketing and communication tools.

Code is reviewed, tested and documented, and ownership of everything we build is yours from the first commit.

### What a typical engagement covers

- Website builds and maintenance on WordPress, Webflow, Shopify or Next.js
- Web and mobile applications with React, React Native, Node.js, Python or Laravel
- API development and integrations between CRMs, ERPs, payment and marketing tools
- Ongoing bug fixes, feature work and performance improvements

### Who it is for

Start-ups, agencies needing white-label developers, and established businesses with a backlog their in-house team cannot clear.`,
    faqs: [
      { question: 'How much does a dedicated developer cost?', answer: 'Pricing depends on experience and stack. We quote a fixed monthly rate per developer, with no hidden fees, after understanding your requirements.' },
      { question: 'Do you work with agencies on a white-label basis?', answer: 'Yes. Agencies use our developers under their own brand, and we never contact their clients directly unless asked.' },
      { question: 'How do you manage quality?', answer: 'Every change goes through code review, automated tests where available, and your acceptance process. Senior engineers mentor and review the work of each team.' },
    ],
    related: ['qa-software-testing', 'it-support-managed-services', 'digital-marketing-seo'],
    industries: ['saas-technology', 'retail-ecommerce', 'financial-services'],
    metaTitle: 'Hire Dedicated Developers: Software & Web Development | SS Unicom',
    metaDescription: 'Dedicated offshore developers for websites, web and mobile apps, API integrations and ongoing feature work. You interview every engineer and own all code.',
    focusKeyword: 'hire dedicated developers India',
    secondary: ['offshore web development', 'white label web development', 'software development outsourcing'],
  },
  {
    number: 14,
    group: 'D',
    slug: 'it-support-managed-services',
    title: 'IT Support & Managed Services',
    icon: 'ServerCog',
    short: 'Remote IT operations that keep your people and systems running.',
    deliverables: ['Employee IT help desk', 'Server and network monitoring', 'Cloud administration', 'Device and account management'],
    heroHeading: 'Remote IT support and managed IT services',
    heroText: 'Engineers who keep your people productive and your systems monitored, patched and secure, around the clock if you need it.',
    overview: `## IT that just works

Small IT teams are stretched between tickets, projects and keeping the lights on. Our remote IT engineers run your employee help desk, watch your servers and networks, administer your cloud tenants and manage devices and accounts, following ITIL-based processes.

You get clear SLAs, monthly service reports and a documented environment, instead of knowledge locked in one person’s head.

### What a typical programme covers

- Employee IT help desk for hardware, software and access issues
- 24/7 server, network and backup monitoring with alert response
- Microsoft 365, Google Workspace, AWS and Azure administration
- Device enrolment, patching, joiners-movers-leavers and account management

### Who it is for

Mid-sized companies, multi-site businesses and managed service providers looking for white-label NOC and help-desk capacity.`,
    faqs: [
      { question: 'Can you provide 24/7 IT monitoring?', answer: 'Yes. Our NOC engineers monitor around the clock and respond to alerts using your runbooks, escalating to your on-call staff when needed.' },
      { question: 'Do you work with managed service providers?', answer: 'Yes. MSPs use our engineers as white-label help-desk and NOC capacity, working in their PSA and RMM tools.' },
      { question: 'Which tools do you support?', answer: 'Common tools include ConnectWise, NinjaOne, Datto, Intune, Jamf, ServiceNow and Freshservice, plus Microsoft 365, Google Workspace, AWS and Azure.' },
    ],
    related: ['technical-help-desk', 'software-web-development', 'qa-software-testing'],
    industries: ['saas-technology', 'healthcare', 'logistics'],
    metaTitle: 'Remote IT Support & Managed IT Services | SS Unicom',
    metaDescription: 'Outsourced IT help desk, 24/7 server and network monitoring, cloud administration and device management. White-label NOC support for MSPs.',
    focusKeyword: 'remote IT support services',
    secondary: ['managed IT services outsourcing', 'white label NOC', 'IT help desk outsourcing'],
  },
  {
    number: 15,
    group: 'D',
    slug: 'qa-software-testing',
    title: 'QA & Software Testing',
    icon: 'Bug',
    short: 'Independent testers who catch issues before your customers do.',
    deliverables: ['Manual and exploratory testing', 'Test automation', 'Regression testing', 'User acceptance testing support'],
    heroHeading: 'Software testing and QA outsourcing',
    heroText: 'Independent testers who find the bugs before your customers do, from exploratory testing to automated regression suites.',
    overview: `## Release with confidence

Shipping fast is only useful if what you ship works. Our QA engineers plan and run manual, exploratory and automated tests across web, mobile and APIs, and report clear, reproducible defects into your tracker.

We build regression suites that run in your CI pipeline, so each release is checked automatically, and we support your users through acceptance testing.

### What a typical engagement covers

- Manual and exploratory testing of new features
- Test automation with Playwright, Cypress, Selenium or Appium
- Regression testing before every release
- Test case design, UAT coordination and release sign-off support

### Who it is for

Software companies, digital agencies and enterprises releasing frequently without a large in-house QA team.`,
    faqs: [
      { question: 'Can you automate our existing manual tests?', answer: 'Yes. We review your test cases, automate the stable, high-value ones first and run them in your CI pipeline, keeping manual testing for new and exploratory work.' },
      { question: 'Do you test mobile apps on real devices?', answer: 'Yes, using a mix of physical devices and cloud device farms such as BrowserStack, so we cover the operating systems and screen sizes your users have.' },
      { question: 'How are defects reported?', answer: 'In your tracker (for example Jira or Linear) with steps to reproduce, expected and actual results, environment details and screenshots or recordings.' },
    ],
    related: ['software-web-development', 'technical-help-desk', 'it-support-managed-services'],
    industries: ['saas-technology', 'financial-services', 'retail-ecommerce'],
    metaTitle: 'Software Testing & QA Outsourcing Services | SS Unicom',
    metaDescription: 'Outsourced QA and software testing: manual, exploratory, regression and automated testing with Playwright, Cypress and Selenium, plus UAT support.',
    focusKeyword: 'software testing outsourcing',
    secondary: ['QA outsourcing', 'test automation services', 'regression testing services'],
  },
  {
    number: 16,
    group: 'D',
    slug: 'data-analytics',
    title: 'Data & Analytics',
    icon: 'ChartColumn',
    short: 'Clean data, clear reports and dashboards your managers will use.',
    deliverables: ['Dashboards and reporting', 'Spreadsheet and BI work', 'Market and competitor research', 'Survey and data analysis'],
    heroHeading: 'Data analytics and reporting outsourcing',
    heroText: 'Analysts who turn scattered data into dashboards and reports your managers will actually open.',
    overview: `## Decisions based on numbers you trust

Most businesses have plenty of data and very little time to make sense of it. Our analysts connect your sources, clean the data, build dashboards in the tools you already use and produce regular reports with plain-English commentary.

They also run research projects, from competitor pricing to survey analysis, when you need answers quickly.

### What a typical engagement covers

- Dashboards and recurring reports in Power BI, Looker Studio or Tableau
- Spreadsheet models, data preparation and BI support
- Market, competitor and pricing research
- Survey design support and statistical analysis

### Who it is for

Operations, sales, marketing and finance teams that need analysis capacity, and consultancies that need research support.`,
    faqs: [
      { question: 'Which BI tools do your analysts use?', answer: 'Power BI, Looker Studio, Tableau and advanced Excel or Google Sheets, with SQL and Python for data preparation.' },
      { question: 'Can you work with our data warehouse?', answer: 'Yes. We work with BigQuery, Snowflake, Redshift and SQL databases, using read-only access wherever possible.' },
      { question: 'Do you only build dashboards, or also explain them?', answer: 'Both. Each regular report comes with a short written summary of what changed and why it matters.' },
    ],
    related: ['digital-marketing-seo', 'data-entry-processing', 'outbound-sales-lead-generation'],
    industries: ['retail-ecommerce', 'saas-technology', 'financial-services'],
    metaTitle: 'Data Analytics, BI & Research Outsourcing | SS Unicom',
    metaDescription: 'Outsourced data analysts for Power BI and Looker Studio dashboards, reporting, spreadsheet modelling, market research and survey analysis.',
    focusKeyword: 'data analytics outsourcing',
    secondary: ['Power BI dashboard services', 'market research outsourcing'],
  },
  {
    number: 17,
    group: 'E',
    slug: 'digital-marketing-seo',
    title: 'Digital Marketing & SEO',
    icon: 'Target',
    short: 'Hands-on execution for search, paid and email campaigns.',
    deliverables: ['SEO audits and on-page work', 'Google and Meta ads management', 'Email campaign production', 'Performance reporting'],
    heroHeading: 'Outsourced digital marketing and SEO services',
    heroText: 'Specialists who run your SEO, paid campaigns and email programme day to day, and report results in plain numbers.',
    overview: `## Marketing that gets done every week

Search rankings, ad performance and email results all reward consistency. Our digital marketing specialists handle the hands-on work every week: technical and on-page SEO, keyword research, ad builds and optimisation, email production and reporting.

They work in your accounts and to your brand guidelines, so you keep every asset and every data point.

### What a typical programme covers

- SEO audits, keyword research, on-page optimisation and content briefs
- Google Ads, Meta Ads and LinkedIn Ads set-up and management
- Email campaign build, segmentation, automation and testing
- Monthly performance reporting tied to leads, sales and cost per result

### Who it is for

Small and mid-sized businesses without an in-house team, and agencies that need white-label execution capacity.`,
    faqs: [
      { question: 'Do you work on a white-label basis for agencies?', answer: 'Yes. Agencies use our specialists for SEO, PPC and email production under their brand, with reporting in their template.' },
      { question: 'Which SEO tools do you use?', answer: 'SEMrush, Ahrefs, Screaming Frog, Google Search Console and Google Analytics 4, along with your CMS.' },
      { question: 'Do you manage ad budgets?', answer: 'We manage campaigns in your ad accounts. Media spend is billed by the platform directly to you, separately from our fee.' },
    ],
    related: ['content-creative', 'social-media-management', 'data-analytics'],
    industries: ['retail-ecommerce', 'saas-technology', 'real-estate-mortgage'],
    metaTitle: 'Outsourced Digital Marketing & SEO Services | SS Unicom',
    metaDescription: 'Hands-on SEO, Google Ads, Meta Ads and email marketing execution from India. Work in your accounts, white-label options for agencies, monthly reporting.',
    focusKeyword: 'outsourced SEO services',
    secondary: ['white label SEO', 'PPC management outsourcing', 'email marketing outsourcing'],
  },
  {
    number: 18,
    group: 'E',
    slug: 'content-creative',
    title: 'Content & Creative',
    icon: 'PenTool',
    short: 'Writers, designers and editors working to your brand guidelines.',
    deliverables: ['Blog and website copy', 'Graphic design', 'Video editing', 'Presentation design'],
    heroHeading: 'Content writing and graphic design outsourcing',
    heroText: 'Writers, designers and editors who produce on-brand content on a steady, predictable schedule.',
    overview: `## A content team on demand

Content needs never stop: blog posts, landing pages, social graphics, sales decks and video. Our creative team works from your brand guidelines and briefs, keeps a style sheet for your account and delivers on agreed turnaround times.

Requests come through a simple queue, so you always know what is in progress and when it will land.

### What a typical programme covers

- SEO blog articles, website and landing-page copy
- Social, ad and print graphics in Figma, Adobe or Canva
- Short-form and long-form video editing with captions
- Sales decks, pitch presentations and report design

### Who it is for

Marketing teams, agencies, founders and consultants who need consistent content without hiring a full creative department.`,
    faqs: [
      { question: 'Do your writers produce SEO content?', answer: 'Yes. Writers work from keyword-led briefs and follow on-page SEO best practice, including headings, internal links and meta descriptions.' },
      { question: 'How many revisions are included?', answer: 'Two rounds of revisions are standard on every piece. Most clients need fewer once we have learned their style.' },
      { question: 'Who owns the content and designs?', answer: 'You do. All rights in final deliverables transfer to you on payment, including source files.' },
    ],
    related: ['digital-marketing-seo', 'social-media-management', 'virtual-executive-assistants'],
    industries: ['saas-technology', 'retail-ecommerce', 'financial-services'],
    metaTitle: 'Content Writing, Graphic Design & Video Editing Outsourcing | SS Unicom',
    metaDescription: 'Outsourced content writing, graphic design, video editing and presentation design by an on-demand creative team working to your brand guidelines.',
    focusKeyword: 'content writing outsourcing',
    secondary: ['graphic design outsourcing', 'video editing services', 'presentation design services'],
  },
  {
    number: 19,
    group: 'E',
    slug: 'social-media-management',
    title: 'Social Media Management',
    icon: 'Share2',
    short: 'Consistent posting and community care across your channels.',
    deliverables: ['Content calendars', 'Post creation and scheduling', 'Community management', 'Monthly reporting'],
    heroHeading: 'Outsourced social media management services',
    heroText: 'Consistent, on-brand posting and responsive community management across your social channels.',
    overview: `## Show up every day, without the daily effort

Audiences reward brands that post consistently and reply quickly. Our social media managers plan monthly calendars, create and schedule posts, respond to comments and messages, and report what worked.

You approve the calendar; we take care of the rest across LinkedIn, Instagram, Facebook, X and YouTube.

### What a typical programme covers

- Monthly content calendars aligned to your campaigns
- Post copy, graphics and short videos, scheduled in your tools
- Community management: comments, messages and moderation
- Monthly reporting on reach, engagement, clicks and leads

### Who it is for

B2B companies building LinkedIn presence, consumer brands, clinics, real estate firms and local businesses.`,
    faqs: [
      { question: 'Which social platforms do you manage?', answer: 'LinkedIn, Instagram, Facebook, X, YouTube and Google Business Profile. We focus on the channels where your buyers spend time.' },
      { question: 'Do we approve posts before they go live?', answer: 'Yes. You approve the monthly calendar and can review individual posts in a shared approval tool before scheduling.' },
      { question: 'How quickly do you respond to comments and messages?', answer: 'Within business hours we respond within a few hours, with an escalation path for complaints or sensitive issues.' },
    ],
    related: ['content-creative', 'digital-marketing-seo', 'chat-email-social-support'],
    industries: ['retail-ecommerce', 'healthcare', 'real-estate-mortgage'],
    metaTitle: 'Outsourced Social Media Management Services | SS Unicom',
    metaDescription: 'Outsourced social media management: monthly content calendars, post creation and scheduling, community management and reporting on LinkedIn, Instagram and more.',
    focusKeyword: 'social media management outsourcing',
    secondary: ['LinkedIn management services', 'community management services'],
  },
  {
    number: 20,
    group: 'E',
    slug: 'virtual-executive-assistants',
    title: 'Virtual & Executive Assistants',
    icon: 'CalendarCheck',
    short: 'Dedicated assistants who take admin off your plate.',
    deliverables: ['Inbox and calendar management', 'Travel and meeting coordination', 'Research and document prep', 'CRM updates and follow-ups'],
    heroHeading: 'Virtual assistant and executive assistant services',
    heroText: 'Dedicated assistants who run your inbox, calendar and follow-ups, so you can focus on the work only you can do.',
    overview: `## Hours back in your week

Leaders lose a day or more each week to scheduling, inbox triage and admin. A dedicated SS Unicom assistant learns how you work, manages your inbox and calendar, coordinates travel and meetings, prepares documents and keeps your CRM up to date.

Assistants are vetted for communication skills and discretion, and they work during your business hours.

### What a typical engagement covers

- Inbox triage, drafting replies and calendar management
- Travel bookings, itineraries and meeting coordination
- Research, document preparation and presentation clean-up
- CRM updates, follow-up emails and task tracking

### Who it is for

Founders, executives, consultants, real estate agents, brokers and small teams that need reliable administrative support.`,
    faqs: [
      { question: 'Will I have the same assistant every day?', answer: 'Yes. You get a dedicated assistant, with a trained back-up who covers leave so your work never stops.' },
      { question: 'How do assistants access my email and accounts?', answer: 'Through delegated access and password managers, never shared passwords. You can limit access and revoke it at any time.' },
      { question: 'Can I start part time?', answer: 'Yes. Part-time plans start at four hours a day, and you can move to full time whenever you need more help.' },
    ],
    related: ['payroll-hr-administration', 'content-creative', 'data-entry-processing'],
    industries: ['real-estate-mortgage', 'legal', 'financial-services'],
    metaTitle: 'Virtual Assistant & Executive Assistant Services | SS Unicom',
    metaDescription: 'Dedicated virtual and executive assistants from India for inbox and calendar management, travel, research, document prep and CRM follow-ups.',
    focusKeyword: 'virtual executive assistant services',
    secondary: ['hire a virtual assistant India', 'remote executive assistant', 'virtual assistant for real estate'],
  },
]

export const processSteps = [
  { title: 'Discovery call', text: 'A 45-minute call to map your volumes, hours, systems and quality bar.' },
  { title: 'Proposal and pilot plan', text: 'A written scope, transparent pricing and a 30-day pilot with clear success measures.' },
  { title: 'Train and go live', text: 'Your team trains on your playbooks and tools. Most pilots go live in two to three weeks.' },
  { title: 'Report and improve', text: 'Weekly scorecards, monthly business reviews and a named account manager you can call.' },
]
