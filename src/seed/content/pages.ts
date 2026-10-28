// Page layouts for the seed. `ref(...)` placeholders are resolved to document IDs by run.ts.
import { lexical } from '../lexical'

export type Refs = {
  media: (key: string) => number
  caseStudy: (slug: string) => number
  form: (key: string) => number
  page: (slug: string) => number
  service: (slug: string) => number
  group: (slug: string) => number
}

const settings = (background = 'stone', extra: Record<string, unknown> = {}) => ({ background, spacing: 'normal', ...extra })
const pageLink = (refs: Refs, slug: string, label: string, appearance = 'primary') => ({
  link: { type: 'reference', reference: { relationTo: 'pages', value: refs.page(slug) }, label, appearance },
})
const urlLink = (url: string, label: string, appearance = 'primary') => ({ link: { type: 'custom', url, label, appearance } })

const platforms = ['Salesforce', 'HubSpot', 'Zendesk', 'Freshdesk', 'Zoho', 'QuickBooks', 'Xero', 'NetSuite', 'Shopify', 'Microsoft 365', 'Google Workspace', 'ServiceNow', 'Jira', 'AdvancedMD', 'Applied Epic', 'Encompass']

export const homeFaqs = [
  { question: 'What should we outsource first?', answer: 'Start with work that is well defined, repeatable and measurable, such as after-hours calls, data entry or AR follow-up. Prove quality with a 30-day pilot, then add more complex processes once the team knows your business.', expert: 'Head of Client Solutions, SS Unicom' },
  { question: 'How do you protect our customer and business data?', answer: 'Agents work only inside your systems with individual logins and multi-factor authentication. Our floor has biometric access and CCTV, personal phones and USB storage are not allowed, and every employee signs an NDA and completes data-protection training. We sign DPAs and, for healthcare, BAAs.', expert: 'Information Security Lead, SS Unicom' },
  { question: 'How quickly can a team go live?', answer: 'Most programmes go live in two to three weeks. The first week covers scope, access and security set-up; the next one or two cover training on your products, policies and tools.', expert: 'Operations Director, SS Unicom' },
  { question: 'Dedicated or shared agents: which is right for us?', answer: 'Dedicated agents suit steady volumes and complex products. Shared agents suit low or unpredictable volumes, such as after-hours cover. Many clients start shared and move to dedicated as volumes grow.', expert: 'Head of Client Solutions, SS Unicom' },
  { question: 'How is pricing structured?', answer: 'We price per dedicated full-time employee, per productive hour or per transaction, depending on the work. You get a written quote with everything included, and there are no set-up fees for standard programmes.', expert: 'Commercial Lead, SS Unicom' },
]

export const pages = (refs: Refs) => [
  {
    slug: 'home',
    title: 'Home',
    hero: {
      type: 'home',
      eyebrow: 'Business process outsourcing · Kanpur, India',
      heading: 'Business process outsourcing your customers can count on.',
      text: 'Customer experience, back-office, industry and technology teams that work as an extension of yours, with the security, quality checks and reporting enterprise buyers expect.',
      links: [pageLink(refs, 'contact', 'Book a consultation', 'primary'), pageLink(refs, 'case-studies', 'See the results', 'mint')],
      media: refs.media('hero'),
    },
    layout: [
      { blockType: 'logoMarquee', eyebrow: 'Our teams work inside the platforms you already use', items: platforms.map((name) => ({ name })), settings: settings('stone', { spacing: 'compact' }) },
      {
        blockType: 'splitFeature',
        eyebrow: 'Who we are',
        heading: 'Dependable people. Disciplined process.',
        body: lexical(
          'SS Unicom brings together trained specialists, documented processes and secure infrastructure to run the work that keeps your business moving. From customer calls to medical claims to code, we deliver from our Kanpur centre for clients across the Middle East, India, the USA, the UK, Canada and Australia.',
        ),
        image: refs.media('who-we-are'),
        accent: 'amber',
        imagePosition: 'right',
        links: [pageLink(refs, 'about', 'About SS Unicom', 'arrow')],
        settings: settings(),
      },
      {
        blockType: 'metrics',
        eyebrow: 'What we deliver',
        heading: 'Measured by the outcomes that matter',
        intro: 'We care about your numbers as much as you do. Every engagement is built to produce results like these:',
        items: [
          { value: '38%', label: 'Lower cost per contact', caseStudy: refs.caseStudy('home-services-marketplace-cost-per-contact') },
          { value: '2.3×', label: 'More qualified meetings', caseStudy: refs.caseStudy('saas-qualified-meetings') },
          { value: '99.6%', label: 'Data accuracy at scale', caseStudy: refs.caseStudy('uk-retailer-catalogue-accuracy') },
        ],
        settings: settings(),
      },
      {
        blockType: 'mediaContent',
        heading: 'We bring',
        headingHighlight: 'rigour to outsourcing',
        body: lexical('Technology keeps changing. Our promise does not: work done right, on time and in the open. We deliver it through a simple combination of trained people and tight process:'),
        bullets: [
          { lead: 'Our operations leads', text: 'design every programme around written procedures, clear targets and weekly quality reviews with your team.' },
          { lead: 'Our specialists', text: 'train on your products and systems before go-live, and are coached against your scorecard every week.' },
        ],
        image: refs.media('silk'),
        imagePosition: 'right',
        links: [
          { link: { type: 'reference', reference: { relationTo: 'service-categories', value: refs.group('customer-experience') }, label: 'Customer experience', appearance: 'dark' } },
          { link: { type: 'reference', reference: { relationTo: 'service-categories', value: refs.group('back-office-finance') }, label: 'Back office & finance', appearance: 'primary' } },
        ],
        settings: settings(),
      },
      {
        blockType: 'featureCards',
        heading: 'Built for the problems that stall growing teams',
        intro: 'Remove the barriers that keep good service and accurate operations out of reach:',
        columns: '3',
        cards: [
          { icon: 'Users', title: 'Scaling without overhiring', text: 'Volumes rise faster than you can recruit. We add trained capacity in weeks, scale it down when peaks pass and keep quality steady throughout.' },
          { icon: 'Lock', title: 'Keeping data safe offshore', text: 'Security reviews stall many outsourcing plans. Our controls, agreements and in-your-systems working model are built to pass them.' },
          { icon: 'ClipboardCheck', title: 'Getting consistent quality', text: 'Vendors often start strong and drift. Weekly scorecards, calibration sessions and a named account manager keep standards where you set them.' },
        ],
        settings: settings('sky'),
      },
      {
        blockType: 'ctaBanner',
        heading: 'SS Unicom brings your operations into focus.',
        text: 'Tools set the stage. Trained people and disciplined process are what move the numbers.',
        links: [pageLink(refs, 'why-ss-unicom', 'See what sets us apart', 'mint')],
        style: 'cobalt',
        width: 'contained',
        settings: settings('stone', { spacing: 'compact' }),
      },
      {
        blockType: 'statsGrid',
        heading: 'Proven delivery, growing scale',
        stats: [
          { value: '10+', label: 'Years in operation' },
          { value: '300+', label: 'Trained professionals' },
          { value: '20', label: 'Specialist services' },
          { value: '24/7', label: 'Coverage available' },
          { value: '120+', label: 'Clients served' },
          { value: '6', label: 'Markets served' },
          { value: '1.5M+', label: 'Interactions a year' },
          { value: '99.5%', label: 'SLA adherence' },
        ],
        image: refs.media('waves'),
        settings: settings(),
      },
      {
        blockType: 'markets',
        eyebrow: 'Markets we serve',
        heading: 'One delivery centre, six markets',
        intro: 'Our Kanpur teams work in your time zone and to your local rules, wherever your customers are.',
        settings: settings('white'),
      },
      {
        blockType: 'serviceDirectory',
        eyebrow: 'Services',
        heading: 'Twenty services, five specialist practices',
        intro: 'Start with one process or bring several together under a single partner, a single contract and a single point of contact.',
        layout: 'tabs',
        settings: settings('white'),
      },
      { blockType: 'industryGrid', heading: 'Industries we serve', settings: settings() },
      { blockType: 'testimonial', settings: settings('navy') },
      {
        blockType: 'faqAccordion',
        heading: 'Ask our experts',
        intro: 'Buyers bring us hard questions every day. Here is how our team answers the most common ones:',
        image: refs.media('experts'),
        items: homeFaqs,
        addSchema: true,
        settings: settings('sky'),
      },
      { blockType: 'postsFeed', eyebrow: 'Insights', heading: 'Practical guidance on outsourcing', limit: 3, settings: settings() },
      {
        blockType: 'ctaBanner',
        heading: 'Have your own question?',
        text: 'Reach out and a specialist will answer within one business day.',
        links: [pageLink(refs, 'contact', 'Talk with our experts', 'mint')],
        style: 'cobalt',
        width: 'full',
        settings: settings(),
      },
    ],
    meta: {
      title: 'SS Unicom | BPO & Outsourcing Services Company in India',
      description: 'SS Unicom is a business process outsourcing company in Kanpur, India: customer support, back office, medical billing, IT and marketing teams for businesses in the Middle East, India, USA, UK, Canada and Australia.',
      focusKeyword: 'business process outsourcing',
      secondaryKeywords: ['BPO company in India', 'outsourcing services India', 'BPO company in Kanpur'],
      image: refs.media('hero'),
    },
  },
  {
    slug: 'services',
    title: 'Services',
    hero: {
      type: 'standard',
      eyebrow: 'Services',
      heading: 'Outsourcing services built around your process',
      text: 'Twenty specialist services in five practices. Choose one, or combine several under a single partner and contract.',
      links: [pageLink(refs, 'contact', 'Discuss your requirements')],
      media: refs.media('group-cx'),
    },
    layout: [
      { blockType: 'serviceDirectory', layout: 'full', settings: settings('white') },
      {
        blockType: 'processSteps',
        eyebrow: 'How every engagement starts',
        heading: 'From first call to a running team in weeks',
        steps: [
          { title: 'Discovery call', text: 'We map your volumes, hours, systems and quality bar.', duration: 'Day 1' },
          { title: 'Proposal and pilot plan', text: 'Written scope, transparent pricing and success measures.', duration: 'Days 2–5' },
          { title: 'Train and go live', text: 'Your team trains on your playbooks and tools.', duration: 'Weeks 2–3' },
          { title: 'Report and improve', text: 'Weekly scorecards and monthly business reviews.', duration: 'Ongoing' },
        ],
        settings: settings(),
      },
      { blockType: 'faqAccordion', heading: 'Questions about our services', items: homeFaqs.slice(0, 4), addSchema: true, settings: settings('sky') },
      { blockType: 'ctaBanner', heading: 'Not sure which service fits?', text: 'Tell us what is slowing your team down and we will recommend a starting point.', links: [pageLink(refs, 'contact', 'Talk to a specialist', 'mint')], style: 'cobalt', width: 'full', settings: settings() },
    ],
    meta: {
      title: 'Outsourcing Services: CX, Back Office, Industry & Tech | SS Unicom',
      description: 'Explore 20 outsourcing services: customer support, lead generation, data entry, bookkeeping, medical billing, insurance, legal, development, QA, marketing and assistants.',
      focusKeyword: 'outsourcing services',
    },
  },
  {
    slug: 'industries',
    title: 'Industries',
    hero: {
      type: 'standard',
      eyebrow: 'Industries',
      heading: 'Outsourcing teams that know your industry',
      text: 'Specialist teams trained on the rules, systems and vocabulary of the industries we serve.',
      links: [pageLink(refs, 'contact', 'Talk to an industry lead')],
      media: refs.media('industry-financial'),
    },
    layout: [
      { blockType: 'industryGrid', heading: 'Choose your industry', settings: settings('white') },
      {
        blockType: 'featureCards',
        heading: 'Why industry knowledge matters',
        columns: '3',
        cards: [
          { icon: 'GraduationCap', title: 'Faster ramp-up', text: 'Teams that already know the vocabulary and systems reach full productivity sooner.' },
          { icon: 'ShieldCheck', title: 'Fewer compliance surprises', text: 'Industry rules are part of training, checklists and quality audits.' },
          { icon: 'Target', title: 'Better outcomes', text: 'We measure what your industry measures: AR days, turnaround, conversion or CSAT.' },
        ],
        settings: settings('sky'),
      },
      { blockType: 'ctaBanner', heading: 'Don’t see your industry?', text: 'We regularly build teams for new sectors. Tell us about your process.', links: [pageLink(refs, 'contact', 'Start a conversation', 'mint')], style: 'cobalt', width: 'full', settings: settings() },
    ],
    meta: {
      title: 'Industries We Serve: Healthcare, Insurance, Finance & More | SS Unicom',
      description: 'Industry-specialist outsourcing for healthcare, insurance, mortgage and real estate, legal, financial services, e-commerce, SaaS and logistics.',
      focusKeyword: 'industry outsourcing services',
    },
  },
  {
    slug: 'case-studies',
    title: 'Case studies',
    hero: { type: 'simple', eyebrow: 'Results', heading: 'Case studies', text: 'How clients use SS Unicom teams to lower costs, grow pipeline and raise quality. Client names are withheld at their request.' },
    layout: [
      { blockType: 'caseStudyCards', settings: settings('white') },
      { blockType: 'testimonial', settings: settings('navy') },
      { blockType: 'ctaBanner', heading: 'Want results like these?', links: [pageLink(refs, 'contact', 'Book a consultation', 'mint')], style: 'cobalt', width: 'full', settings: settings() },
    ],
    meta: { title: 'Outsourcing Case Studies & Client Results | SS Unicom', description: 'Read how SS Unicom teams cut cost per contact, doubled qualified meetings, reduced AR days and cleaned millions of records for clients.', focusKeyword: 'outsourcing case studies' },
  },
  {
    slug: 'insights',
    title: 'Insights',
    hero: { type: 'simple', eyebrow: 'Insights', heading: 'Insights on outsourcing and operations', text: 'Practical guides for leaders planning, buying and running outsourced teams.' },
    layout: [{ blockType: 'postsFeed', showAll: true, limit: 24, settings: settings('white') }],
    meta: { title: 'Outsourcing Insights, Guides & Checklists | SS Unicom', description: 'Guides and checklists on choosing a BPO partner, medical billing outsourcing, customer support models and running offshore teams.', focusKeyword: 'outsourcing guide' },
  },
  {
    slug: 'careers',
    title: 'Careers',
    hero: {
      type: 'standard',
      eyebrow: 'Careers',
      heading: 'Build your career at SS Unicom',
      text: 'Join a Kanpur team that trains you properly, promotes from within and works with clients across the world.',
      links: [urlLink('#open-roles', 'See open roles')],
      media: refs.media('tile-people'),
    },
    layout: [
      {
        blockType: 'featureCards',
        heading: 'Why people stay with us',
        columns: '4',
        cards: [
          { icon: 'GraduationCap', title: 'Paid training', text: 'Structured training before you go live, and coaching every week after.' },
          { icon: 'Award', title: 'Promotion from within', text: 'Most of our team leads and trainers started as associates.' },
          { icon: 'Truck', title: 'Night-shift transport', text: 'Safe pick-up and drop for night shifts within city limits.' },
          { icon: 'HeartPulse', title: 'Health cover', text: 'Group medical insurance for you and your family.' },
        ],
        settings: settings('sky'),
      },
      { blockType: 'jobsList', eyebrow: 'Open roles', heading: 'Current openings', intro: 'Do not see the right role? Email your CV and we will keep it on file.', settings: settings('white', { anchor: 'open-roles' }) },
    ],
    meta: { title: 'Careers at SS Unicom: BPO & Call Center Jobs in Kanpur', description: 'Join SS Unicom in Kanpur. Openings in customer support, medical billing, inside sales and quality, with paid training, night-shift transport and health cover.', focusKeyword: 'BPO jobs in Kanpur', secondaryKeywords: ['call center jobs Kanpur', 'medical billing jobs Kanpur'] },
  },
  {
    slug: 'about',
    title: 'About us',
    hero: {
      type: 'standard',
      eyebrow: 'About SS Unicom',
      heading: 'A Kanpur outsourcing company built on doing the work properly',
      text: 'Since 2016 we have grown from one calling team into a multi-practice operation serving businesses across the Middle East, India, the USA, the UK, Canada and Australia.',
      links: [pageLink(refs, 'contact', 'Work with us')],
      media: refs.media('who-we-are'),
    },
    layout: [
      {
        blockType: 'splitFeature',
        eyebrow: 'Our story',
        heading: 'From one client to twenty services',
        body: lexical(`SS Universal Communication Services Pvt Ltd started in Kanpur with a small team answering calls for a single overseas client. That client stayed with us and grew, and so did we: adding quality, training and back-office teams, then specialist healthcare, insurance, technology and marketing practices.

Today more than 300 people work across three shifts from our Kanpur delivery centre. What has not changed is how we work: written processes, honest reporting and a team that treats your customers as its own.`),
        image: refs.media('tile-people'),
        accent: 'cobalt',
        imagePosition: 'left',
        settings: settings(),
      },
      {
        blockType: 'statsGrid',
        heading: 'SS Unicom at a glance',
        stats: [
          { value: '2016', label: 'Founded in Kanpur' },
          { value: '300+', label: 'Trained professionals' },
          { value: '6', label: 'Markets served' },
          { value: '120+', label: 'Clients served' },
        ],
        image: refs.media('silk'),
        settings: settings('white'),
      },
      {
        blockType: 'markets',
        eyebrow: 'Where our clients are',
        heading: 'Serving the Middle East, India, USA, UK, Canada and Australia',
        intro: 'Each market has a team lead who knows its hours, holidays, language and compliance rules.',
        settings: settings('stone'),
      },
      {
        blockType: 'processSteps',
        eyebrow: 'How we work',
        heading: 'A simple, repeatable way of running your work',
        steps: [
          { title: 'Understand', text: 'We document your process, systems, volumes and quality bar before quoting.' },
          { title: 'Pilot', text: 'A 30-day pilot with agreed success measures proves the fit.' },
          { title: 'Run', text: 'Dedicated teams, team leads and QA analysts deliver every day.' },
          { title: 'Improve', text: 'Weekly scorecards and monthly reviews drive continuous improvement.' },
        ],
        settings: settings('stone', { anchor: 'how-we-work' }),
      },
      {
        blockType: 'trustBadges',
        eyebrow: 'Infrastructure',
        heading: 'A delivery centre built for continuity and security',
        items: [
          { icon: 'Fingerprint', title: 'Biometric access and CCTV', text: 'Controlled entry to the production floor, monitored around the clock.' },
          { icon: 'Zap', title: 'Power backup', text: 'Online UPS and diesel generator keep every seat running through outages.' },
          { icon: 'Network', title: 'Redundant connectivity', text: 'Two leased lines from separate providers with automatic failover.' },
          { icon: 'Lock', title: 'Locked-down workstations', text: 'No USB storage, no personal phones on the floor, managed endpoints.' },
          { icon: 'Headset', title: 'Enterprise telephony', text: 'Cloud dialler and call recording, with your own telephony supported.' },
          { icon: 'Users', title: 'Shifts that follow the sun', text: 'Teams aligned to Gulf, Indian, UK, North American and Australian business hours.' },
        ],
        settings: settings('navy'),
      },
      { blockType: 'ctaBanner', heading: 'Visit us or meet online', text: 'We welcome client visits to our Kanpur centre, and we are always happy to walk you through it on video.', links: [pageLink(refs, 'contact', 'Arrange a visit', 'mint')], style: 'cobalt', width: 'full', settings: settings() },
    ],
    meta: { title: 'About SS Unicom: Outsourcing Company in Kanpur, India', description: 'SS Universal Communication Services Pvt Ltd is a Kanpur-based outsourcing company with 300+ people serving businesses in the Middle East, India, USA, UK, Canada and Australia since 2016.', focusKeyword: 'outsourcing company in Kanpur' },
  },
  {
    slug: 'why-ss-unicom',
    title: 'Why SS Unicom',
    hero: {
      type: 'standard',
      eyebrow: 'Why SS Unicom',
      heading: 'Why enterprises choose SS Unicom as their outsourcing partner',
      text: 'Most providers promise lower costs. We promise lower costs you never have to worry about.',
      links: [pageLink(refs, 'contact', 'Start a pilot')],
      media: refs.media('tile-shield'),
    },
    layout: [
      {
        blockType: 'featureCards',
        heading: 'Six reasons clients stay with us',
        columns: '3',
        cards: [
          { icon: 'ClipboardCheck', title: 'Quality you can see', text: 'Weekly scorecards, call and work sampling, and calibration sessions with your team.' },
          { icon: 'Lock', title: 'Security by default', text: 'Work stays in your systems, behind MFA, on locked-down workstations.' },
          { icon: 'UserCheck', title: 'A named team', text: 'The same agents, team lead and account manager, not an anonymous pool.' },
          { icon: 'Gauge', title: 'Fast to start', text: 'Most pilots go live within three weeks of sign-off.' },
          { icon: 'Wallet', title: 'Transparent pricing', text: 'Everything included in a written quote, with no set-up fees for standard programmes.' },
          { icon: 'Layers', title: 'One partner, many services', text: 'Add services as you grow without onboarding a new vendor.' },
        ],
        settings: settings('sky'),
      },
      {
        blockType: 'metrics',
        eyebrow: 'Results',
        heading: 'What clients typically see',
        items: [
          { value: '40%', label: 'Lower operating cost' },
          { value: '3 weeks', label: 'Average time to go live' },
          { value: '96%', label: 'Client retention rate' },
        ],
        settings: settings(),
      },
      { blockType: 'testimonial', settings: settings('navy') },
      { blockType: 'faqAccordion', heading: 'Questions buyers ask before choosing us', items: homeFaqs, addSchema: true, settings: settings('sky') },
      { blockType: 'ctaBanner', heading: 'Try us with a 30-day pilot', text: 'Low commitment, clear success measures, and a team that has to earn your trust.', links: [pageLink(refs, 'contact', 'Start a pilot', 'mint')], style: 'cobalt', width: 'full', settings: settings() },
    ],
    meta: { title: 'Why Choose SS Unicom as Your Outsourcing Partner', description: 'Quality you can see, security by default, named teams, fast start-up and transparent pricing. See why clients choose SS Unicom for outsourcing.', focusKeyword: 'outsourcing partner' },
  },
  {
    slug: 'trust-and-security',
    title: 'Trust & security',
    hero: {
      type: 'standard',
      eyebrow: 'Trust centre',
      heading: 'Security and compliance at SS Unicom',
      text: 'How we protect your data, your customers and your reputation, explained plainly for your security and procurement teams.',
      links: [urlLink('mailto:info@ssunicomservice.com?subject=Security%20questionnaire', 'Request our security pack')],
      media: refs.media('tile-shield'),
    },
    layout: [
      {
        blockType: 'trustBadges',
        eyebrow: 'Controls',
        heading: 'The controls behind every programme',
        items: [
          { icon: 'Fingerprint', title: 'Physical security', text: 'Biometric access, CCTV, visitor logs and a clean-desk policy on the production floor.' },
          { icon: 'Lock', title: 'Access control', text: 'Individual accounts, MFA, least-privilege roles and same-day removal of leavers.' },
          { icon: 'ServerCog', title: 'Endpoint security', text: 'Managed workstations with USB storage disabled, endpoint protection and patching.' },
          { icon: 'FileCheck2', title: 'Agreements', text: 'NDAs for every employee; DPAs, BAAs and client-specific terms on request.' },
          { icon: 'GraduationCap', title: 'Training', text: 'Security, privacy and HIPAA awareness training at induction and every year.' },
          { icon: 'Eye', title: 'Monitoring and audit', text: 'Activity logging, quality sampling and support for client audits and site visits.' },
        ],
        settings: settings('navy'),
      },
      {
        blockType: 'richContent',
        heading: 'Our approach',
        content: lexical(`## Your systems, your data

Wherever possible our teams work directly in your systems through secure, individually assigned accounts. Your data stays where you control it, and you can see and revoke access at any time.

## Frameworks we align with

Our information-security policies are aligned with ISO/IEC 27001 controls. We follow HIPAA-aligned safeguards for healthcare work, GDPR and UK GDPR principles for European personal data, and India's Digital Personal Data Protection Act. We are happy to complete your security questionnaire.

## Business continuity

Our delivery centre has online UPS and generator backup and two internet links from separate providers. For critical programmes we agree documented continuity plans, including remote-work fallbacks with the same security controls.

## Reporting a concern

If you believe you have found a security issue affecting SS Unicom, email [info@ssunicomservice.com](mailto:info@ssunicomservice.com) with the subject "Security". We acknowledge reports within two business days.`),
        width: 'narrow',
        settings: settings('white'),
      },
      {
        blockType: 'faqAccordion',
        heading: 'Security questions',
        items: [
          { question: 'Will you complete our vendor security questionnaire?', answer: 'Yes. We regularly complete questionnaires such as SIG Lite, CAIQ and custom forms, and we can join a call with your security team.' },
          { question: 'Do you sign Business Associate Agreements?', answer: 'Yes, for any healthcare engagement that involves protected health information.' },
          { question: 'Can we audit your facility?', answer: 'Yes. Clients can visit and audit our Kanpur centre with reasonable notice, or take a live video walkthrough.' },
        ],
        addSchema: true,
        settings: settings('sky'),
      },
    ],
    meta: { title: 'Trust & Security: How SS Unicom Protects Your Data', description: 'Physical security, access control, NDAs, DPAs and BAAs, HIPAA-aligned safeguards and business continuity at SS Unicom’s Kanpur delivery centre.', focusKeyword: 'secure outsourcing' },
  },
  {
    slug: 'contact',
    title: 'Contact',
    hero: { type: 'simple', eyebrow: 'Contact', heading: 'Let’s talk about your process', text: 'Tell us what you need. A specialist will reply within one business day with next steps.' },
    layout: [
      {
        blockType: 'formBlock',
        heading: 'Send us a message',
        intro: 'Prefer to talk now? Call or WhatsApp us during office hours, or email and we will get back to you within one business day.',
        form: refs.form('contact'),
        showContactDetails: true,
        settings: settings('white'),
      },
      { blockType: 'faqAccordion', heading: 'Before you get in touch', items: homeFaqs.slice(2, 5), addSchema: false, settings: settings('sky') },
    ],
    meta: { title: 'Contact SS Unicom: Get an Outsourcing Proposal', description: 'Contact SS Unicom in Kanpur, India. Call +91 97947 74773 or email info@ssunicomservice.com for a scoped outsourcing proposal within two business days.', focusKeyword: 'contact SS Unicom' },
  },
  {
    slug: 'thank-you',
    title: 'Thank you',
    hero: { type: 'simple', eyebrow: 'Message received', heading: 'Thank you. We will be in touch shortly.', text: 'A specialist will reply within one business day. In the meantime, you may find these useful.' },
    layout: [{ blockType: 'caseStudyCards', heading: 'See what we have done for others', settings: settings('white') }],
    meta: { title: 'Thank you', description: 'Thanks for contacting SS Unicom.', noIndex: true },
  },
  {
    slug: 'privacy-policy',
    title: 'Privacy policy',
    hero: { type: 'simple', heading: 'Privacy policy', text: 'Last updated 28 October 2026' },
    layout: [
      {
        blockType: 'richContent',
        content: lexical(`This policy explains how SS Universal Communication Services Pvt Ltd ("SS Unicom", "we") collects and uses personal data through this website. It does not cover data we process on behalf of clients, which is governed by our agreements with them.

## What we collect

- **Information you give us**, such as your name, company, email, phone number and message when you fill in a form or email us.
- **Usage information**, such as pages visited and device type, collected through cookies and analytics tools only if you accept them.

## How we use it

- To reply to your enquiry and provide information you request
- To improve our website and services
- To meet legal obligations

We do not sell personal data.

## Legal bases

Where GDPR or UK GDPR applies, we rely on your consent (analytics cookies), our legitimate interests (responding to business enquiries) and legal obligations. Under India's Digital Personal Data Protection Act, 2023, we process data for the purposes you consent to when you contact us.

## Sharing

We share data only with service providers who help us run the website and our business, such as hosting, email and analytics providers, under appropriate contracts.

## Retention

We keep enquiry data for up to 24 months unless a business relationship follows, and analytics data according to the settings of each tool.

## Your rights

You can ask to access, correct or delete your personal data, or withdraw consent, by emailing [info@ssunicomservice.com](mailto:info@ssunicomservice.com).

## Contact

SS Universal Communication Services Pvt Ltd, 2nd Floor, Universal House, Civil Lines, Kanpur, Uttar Pradesh 208001, India. Email: [info@ssunicomservice.com](mailto:info@ssunicomservice.com).`),
        settings: settings('white'),
      },
    ],
    meta: { title: 'Privacy Policy', description: 'How SS Unicom collects, uses and protects personal data submitted through this website.' },
  },
  {
    slug: 'terms',
    title: 'Terms of use',
    hero: { type: 'simple', heading: 'Terms of use', text: 'Last updated 28 October 2026' },
    layout: [
      {
        blockType: 'richContent',
        content: lexical(`These terms govern your use of ssunicomservice.com, operated by SS Universal Communication Services Pvt Ltd.

## Use of the website

You may use this website for lawful purposes only. You must not attempt to gain unauthorised access to the site or interfere with its operation.

## Content

The content on this website is provided for general information. It does not form an offer or contract; services are provided only under a signed agreement.

## Intellectual property

All content, design and graphics on this website belong to SS Unicom unless stated otherwise. Third-party product names are trademarks of their owners and are used only to describe compatibility.

## Liability

To the extent permitted by law, we are not liable for any loss arising from use of this website or reliance on its content.

## Governing law

These terms are governed by the laws of India, and the courts of Kanpur, Uttar Pradesh have jurisdiction.

## Contact

Questions about these terms can be sent to [info@ssunicomservice.com](mailto:info@ssunicomservice.com).`),
        settings: settings('white'),
      },
    ],
    meta: { title: 'Terms of Use', description: 'Terms governing use of the SS Unicom website.' },
  },
  {
    slug: 'cookie-policy',
    title: 'Cookie policy',
    hero: { type: 'simple', heading: 'Cookie policy', text: 'Last updated 28 October 2026' },
    layout: [
      {
        blockType: 'richContent',
        content: lexical(`This website uses a small number of cookies and similar technologies.

## Essential

Needed for the site to work, such as remembering your cookie choice. These are always on.

## Analytics and marketing

If you accept cookies, we may use Google Analytics or Google Tag Manager, LinkedIn Insight, Meta Pixel and Microsoft Clarity to understand how the site is used and to measure campaigns. These tools load only after you click **Accept**.

## Changing your choice

Clear this site's data in your browser to see the cookie banner again, or contact [info@ssunicomservice.com](mailto:info@ssunicomservice.com).`),
        settings: settings('white'),
      },
    ],
    meta: { title: 'Cookie Policy', description: 'Which cookies the SS Unicom website uses and how to control them.' },
  },
]
