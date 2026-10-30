/**
 * Loads the starter content into Payload. Run it by hand (`npm run seed`, or `npm run seed:production`
 * for the live database); it only seeds an empty database, so editors' changes are never overwritten. `npm run seed:fresh` wipes and reseeds.
 */
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload, type CollectionSlug, type Payload } from 'payload'

import { lexical } from './lexical'
import { caseStudies, industries, jobs, posts, testimonials } from './content/other'
import { pages, type Refs } from './content/pages'
import { groups, processSteps, services } from './content/services'

const ctx = { disableRevalidate: true }
const artDir = path.resolve(process.cwd(), 'src/seed/art')

const alts: Record<string, string> = {
  hero: 'Abstract cobalt light ribbons flowing across a deep blue background',
  'hero-mobile': 'Abstract cobalt light ribbons on a deep blue background',
  'who-we-are': 'Soft glass shapes in warm light, representing a connected team',
  silk: 'Flowing cobalt silk texture',
  waves: 'Layered blue waves of light',
  'banner-cobalt': 'Bright cobalt gradient with soft light',
  'navy-glass': 'Navy glass panels with blue highlights',
  experts: 'Calm blue glass forms suggesting expert guidance',
  'tile-headset': 'Abstract illustration of a support headset',
  'tile-people': 'Abstract illustration of a connected group of people',
  'tile-chart': 'Abstract rising bar chart in blue glass',
  'tile-shield': 'Abstract blue shield representing data security',
}
const altFor = (key: string) => {
  if (alts[key]) return alts[key]
  const [kind, ...rest] = key.split('-')
  const name = rest.join(' ')
  return kind === 'industry' ? `Abstract artwork for the ${name} industry` : `Abstract artwork for ${name} services`
}

const markets = [
  { name: 'Middle East', countries: 'UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait', coverage: 'Gulf business hours, Sunday to Thursday, in English and Arabic' },
  { name: 'India', countries: 'India', coverage: 'IST business hours, in English and Hindi' },
  { name: 'USA', countries: 'United States', coverage: 'Eastern to Pacific hours, including nights and weekends' },
  { name: 'UK', countries: 'United Kingdom', coverage: 'UK business hours, with evening and weekend cover' },
  { name: 'Canada', countries: 'Canada', coverage: 'Eastern to Pacific hours, in English' },
  { name: 'Australia', countries: 'Australia', coverage: 'AEST and AWST business hours, from early morning in India' },
]

const wipe: CollectionSlug[] = [
  'keywords',
  'redirects',
  'form-submissions',
  'forms',
  'pages',
  'jobs',
  'posts',
  'categories',
  'testimonials',
  'case-studies',
  'services',
  'industries',
  'service-categories',
  'media',
]

const faqList = (faqs: { question: string; answer: string }[]) => faqs.map(({ question, answer }) => ({ question, answer }))

async function seed(payload: Payload) {
  const existing = await payload.count({ collection: 'pages' })
  if (existing.totalDocs > 0 && !process.env.SEED_FRESH) {
    payload.logger.info('Seed: content already exists, skipping.')
    return
  }
  if (process.env.SEED_FRESH) {
    for (const collection of wipe) {
      await payload.delete({ collection, where: { id: { exists: true } }, context: ctx, overrideAccess: true })
    }
  }

  // Media
  const media: Record<string, number> = {}
  for (const file of fs.readdirSync(artDir).filter((f) => f.endsWith('.webp')).sort()) {
    const key = file.replace(/\.webp$/, '')
    const doc = await payload.create({ collection: 'media', data: { alt: altFor(key) }, filePath: path.join(artDir, file), context: ctx })
    media[key] = doc.id
  }
  payload.logger.info(`Seed: ${Object.keys(media).length} images`)

  // Service groups
  const groupIds: Record<string, number> = {}
  const groupByKey: Record<string, (typeof groups)[number]> = {}
  for (const [i, g] of groups.entries()) {
    groupByKey[g.key] = g
    const doc = await payload.create({
      collection: 'service-categories',
      context: ctx,
      data: {
        title: g.title,
        slug: g.slug,
        code: g.code,
        order: i + 1,
        icon: g.icon as never,
        tagline: g.tagline,
        heroHeading: g.heroHeading,
        description: lexical(g.description) as never,
        image: media[g.art],
        faqs: faqList(g.faqs),
        meta: { title: g.metaTitle, description: g.metaDescription, image: media[g.art], focusKeyword: g.focusKeyword },
      },
    })
    groupIds[g.slug] = doc.id
  }

  // Services (relations to each other, industries and case studies are filled in a second pass)
  const serviceIds: Record<string, number> = {}
  for (const s of services) {
    const g = groupByKey[s.group]
    const doc = await payload.create({
      collection: 'services',
      context: ctx,
      draft: false,
      data: {
        _status: 'published',
        title: s.title,
        slug: s.slug,
        number: s.number,
        category: groupIds[g.slug],
        icon: s.icon as never,
        shortDescription: s.short,
        deliverables: s.deliverables.map((item) => ({ item })),
        heroHeading: s.heroHeading,
        heroText: s.heroText,
        image: media[g.art],
        overview: lexical(s.overview) as never,
        benefits: g.benefits.map((b) => ({ ...b, icon: b.icon as never })),
        process: processSteps,
        stats: g.stats,
        faqs: faqList(s.faqs),
        meta: {
          title: s.metaTitle,
          description: s.metaDescription,
          image: media[g.art],
          focusKeyword: s.focusKeyword,
          secondaryKeywords: s.secondary ?? [],
        },
      },
    })
    serviceIds[s.slug] = doc.id
  }
  payload.logger.info(`Seed: ${services.length} services in ${groups.length} groups`)

  // Industries
  const industryIds: Record<string, number> = {}
  for (const ind of industries) {
    const doc = await payload.create({
      collection: 'industries',
      context: ctx,
      draft: false,
      data: {
        _status: 'published',
        title: ind.title,
        slug: ind.slug,
        order: ind.order,
        icon: ind.icon as never,
        summary: ind.summary,
        image: media[ind.art],
        heroHeading: ind.heroHeading,
        heroText: ind.heroText,
        overview: lexical(ind.overview) as never,
        challenges: ind.challenges.map((c) => ({ ...c, icon: c.icon as never })),
        services: ind.services.map((slug) => serviceIds[slug]).filter(Boolean),
        faqs: faqList(ind.faqs),
        meta: { title: ind.metaTitle, description: ind.metaDescription, image: media[ind.art], focusKeyword: ind.focusKeyword },
      },
    })
    industryIds[ind.slug] = doc.id
  }

  // Case studies
  const caseIds: Record<string, number> = {}
  for (const [i, c] of caseStudies.entries()) {
    const doc = await payload.create({
      collection: 'case-studies',
      context: ctx,
      draft: false,
      data: {
        _status: 'published',
        title: c.title,
        slug: c.slug,
        client: c.client,
        headlineMetric: c.metric,
        summary: c.summary,
        image: media[c.image],
        challenge: c.challenge,
        solution: lexical(c.solution) as never,
        results: c.results,
        quote: c.quote,
        industry: industryIds[c.industry],
        services: c.services.map((slug) => serviceIds[slug]).filter(Boolean),
        publishedAt: new Date(Date.UTC(2026, 8 - i, 10)).toISOString(),
        meta: { title: `${c.title} | SS Unicom`, description: c.summary.slice(0, 158), image: media[c.image] },
      },
    })
    caseIds[c.slug] = doc.id
  }

  // Second pass: service relations
  for (const s of services) {
    const linkedCases = caseStudies.filter((c) => c.services.includes(s.slug)).map((c) => caseIds[c.slug])
    await payload.update({
      collection: 'services',
      id: serviceIds[s.slug],
      context: ctx,
      data: {
        relatedServices: s.related.map((slug) => serviceIds[slug]).filter(Boolean),
        industries: s.industries.map((slug) => industryIds[slug]).filter(Boolean),
        caseStudies: [...new Set([...(s.caseStudies ?? []).map((slug) => caseIds[slug]), ...linkedCases])].filter(Boolean),
      },
    })
  }

  for (const t of testimonials) await payload.create({ collection: 'testimonials', context: ctx, data: { ...t, featured: true } })

  // Insights
  const categoryIds: Record<string, number> = {}
  for (const p of posts) {
    if (!categoryIds[p.category]) {
      const cat = await payload.create({
        collection: 'categories',
        context: ctx,
        data: { title: p.category, slug: p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
      })
      categoryIds[p.category] = cat.id
    }
    await payload.create({
      collection: 'posts',
      context: ctx,
      draft: false,
      data: {
        _status: 'published',
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        heroImage: media[p.art],
        content: lexical(p.content) as never,
        authorName: p.author,
        authorRole: p.role,
        categories: [categoryIds[p.category]],
        relatedServices: p.related.map((slug) => serviceIds[slug]).filter(Boolean),
        publishedAt: new Date(`${p.date}T09:00:00Z`).toISOString(),
        meta: { title: p.title, description: p.excerpt.slice(0, 158), image: media[p.art] },
      },
    })
  }

  // Careers
  const posted = new Date(Date.UTC(2026, 9, 20))
  const validThrough = new Date(Date.UTC(2027, 0, 31))
  for (const j of jobs) {
    await payload.create({
      collection: 'jobs',
      context: ctx,
      draft: false,
      data: {
        _status: 'published',
        ...j,
        location: 'Kanpur, Uttar Pradesh',
        employmentType: 'FULL_TIME',
        responsibilities: j.responsibilities.map((item) => ({ item })),
        requirements: j.requirements.map((item) => ({ item })),
        open: true,
        datePosted: posted.toISOString(),
        validThrough: validThrough.toISOString(),
        meta: { title: `${j.title} job in Kanpur | SS Unicom Careers`, description: j.summary.slice(0, 158) },
      },
    } as never)
  }

  // Pages: create shells first so pages can link to each other, then fill them in.
  const stub = () => 0
  const pageSeeds = pages({ media: stub, caseStudy: stub, form: stub, page: stub, service: stub, group: stub })
  const pageIds: Record<string, number> = {}
  for (const p of pageSeeds) {
    const doc = await payload.create({
      collection: 'pages',
      context: ctx,
      draft: false,
      data: { _status: 'published', title: p.title, slug: p.slug, hero: { type: 'none' }, layout: [] } as never,
    })
    pageIds[p.slug] = doc.id
  }

  const contactForm = await payload.create({
    collection: 'forms',
    context: ctx,
    data: {
      title: 'Contact: request a proposal',
      submitButtonLabel: 'Send my enquiry',
      confirmationType: 'redirect',
      redirect: { type: 'reference', reference: { relationTo: 'pages', value: pageIds['thank-you'] } },
      confirmationMessage: lexical('Thank you. A solutions specialist will reply within one business day.') as never,
      fields: [
        { blockType: 'text', name: 'fullName', label: 'Full name', required: true, width: 50 },
        { blockType: 'text', name: 'company', label: 'Company', required: true, width: 50 },
        { blockType: 'email', name: 'email', label: 'Work email', required: true, width: 50 },
        { blockType: 'text', name: 'phone', label: 'Phone (with country code)', width: 50 },
        {
          blockType: 'select',
          name: 'service',
          label: 'Service you are interested in',
          width: 100,
          options: [
            ...services.map((s) => ({ label: s.title, value: s.slug })),
            { label: 'Not sure yet', value: 'not-sure' },
          ],
        },
        { blockType: 'textarea', name: 'message', label: 'What would you like help with?', required: true, width: 100 },
        {
          blockType: 'checkbox',
          name: 'consent',
          label: 'I agree to SS Unicom contacting me about this enquiry, as described in the privacy policy.',
          required: true,
          width: 100,
        },
      ],
      emails: [
        {
          emailTo: 'info@ssunicomservice.com',
          subject: 'New website enquiry from {{fullName}} ({{company}})',
          message: lexical('A new enquiry arrived through the website contact form. All fields are in the admin under Forms > Submissions.') as never,
        },
      ],
    } as never,
  })

  const refs: Refs = {
    media: (key) => must(media, key, 'image'),
    caseStudy: (slug) => must(caseIds, slug, 'case study'),
    form: () => contactForm.id,
    page: (slug) => must(pageIds, slug, 'page'),
    service: (slug) => must(serviceIds, slug, 'service'),
    group: (slug) => must(groupIds, slug, 'service group'),
  }
  for (const p of pages(refs)) {
    await payload.update({ collection: 'pages', id: pageIds[p.slug], context: ctx, draft: false, data: { ...p, _status: 'published' } as never })
  }
  payload.logger.info(`Seed: ${pageSeeds.length} pages`)

  // Globals
  const pageLink = (slug: string, label: string) => ({ type: 'reference', reference: { relationTo: 'pages', value: pageIds[slug] }, label })
  const urlLink = (url: string, label: string, newTab = false) => ({ type: 'custom', url, label, newTab })

  await payload.updateGlobal({
    slug: 'site-settings',
    context: ctx,
    data: {
      siteName: 'SS Unicom',
      legalName: 'SS Universal Communication Services Pvt Ltd',
      tagline: 'Business process outsourcing from Kanpur, India',
      phone: '+91 97947 74773',
      whatsapp: '919794774773',
      email: 'info@ssunicomservice.com',
      careersEmail: 'careers@ssunicomservice.com',
      address: {
        street: '2nd Floor, Universal House, Civil Lines',
        locality: 'Kanpur',
        region: 'Uttar Pradesh',
        postalCode: '208001',
        country: 'IN',
      },
      hours: 'Mon–Sat, 10:00–19:00 IST. Delivery teams work around the clock.',
      foundingYear: 2016,
      socials: [{ platform: 'linkedin', url: 'https://www.linkedin.com/company/ssunicomservice' }],
      titleTemplate: '%s | SS Unicom',
      defaultTitle: 'SS Unicom: Business Process Outsourcing Company in India',
      defaultDescription:
        'SS Unicom provides customer experience, back-office, industry, technology and marketing outsourcing from Kanpur, India, for businesses in the Middle East, India, USA, UK, Canada and Australia.',
      markets,
      cookieBanner: true,
      cookieText: 'We use cookies to measure how the site is used and to improve it. You can accept or decline analytics cookies.',
      announcementEnabled: false,
    } as never,
  })

  await payload.updateGlobal({
    slug: 'header',
    context: ctx,
    data: {
      utilityLinks: [
        { link: pageLink('careers', 'Careers') },
        { link: pageLink('trust-and-security', 'Trust & security') },
      ],
      navItems: [
        { label: 'Why SS Unicom', menu: 'link', link: pageLink('why-ss-unicom', 'Why SS Unicom') },
        {
          label: 'Services',
          menu: 'services',
          link: pageLink('services', 'All services'),
          feature: {
            heading: 'Not sure where to start?',
            text: 'Tell us what is slowing your team down. We will suggest the right mix of services and a 30-day pilot.',
            link: pageLink('contact', 'Talk to a specialist'),
          },
        },
        {
          label: 'Industries',
          menu: 'industries',
          link: pageLink('industries', 'All industries'),
          feature: {
            heading: 'Specialists for regulated work',
            text: 'HIPAA-aligned healthcare teams, insurance servicing pods and mortgage processors trained on your systems.',
            link: pageLink('trust-and-security', 'How we protect data'),
          },
        },
        { label: 'Case studies', menu: 'link', link: pageLink('case-studies', 'Case studies') },
        { label: 'About', menu: 'link', link: pageLink('about', 'About') },
        { label: 'Insights', menu: 'link', link: pageLink('insights', 'Insights') },
      ],
      cta: pageLink('contact', 'Contact us'),
    } as never,
  })

  const serviceLink = (slug: string) => {
    const s = services.find((x) => x.slug === slug)!
    return { link: { type: 'reference', reference: { relationTo: 'services', value: serviceIds[slug] }, label: s.title } }
  }
  await payload.updateGlobal({
    slug: 'footer',
    context: ctx,
    data: {
      blurb:
        'SS Universal Communication Services Pvt Ltd runs customer experience, back-office and technology teams from Kanpur, India, for businesses around the world.',
      columns: [
        {
          heading: 'Services',
          links: groups.map((g) => ({ link: { type: 'reference', reference: { relationTo: 'service-categories', value: groupIds[g.slug] }, label: g.title } })),
        },
        {
          heading: 'Popular',
          links: ['inbound-voice-support', 'medical-billing-coding', 'bookkeeping-accounting', 'outbound-sales-lead-generation', 'software-web-development'].map(serviceLink),
        },
        {
          heading: 'Company',
          links: [
            { link: pageLink('about', 'About us') },
            { link: pageLink('why-ss-unicom', 'Why SS Unicom') },
            { link: pageLink('trust-and-security', 'Trust & security') },
            { link: pageLink('case-studies', 'Case studies') },
            { link: pageLink('careers', 'Careers') },
            { link: pageLink('insights', 'Insights') },
          ],
        },
      ],
      actions: [
        { heading: 'Ready to see it work?', link: pageLink('contact', 'Start a 30-day pilot') },
        { heading: 'Want to join the team?', link: pageLink('careers', 'See open roles') },
      ],
      legalLinks: [
        { link: pageLink('privacy-policy', 'Privacy policy') },
        { link: pageLink('terms', 'Terms of use') },
        { link: pageLink('cookie-policy', 'Cookie policy') },
        { link: urlLink('/sitemap.xml', 'Sitemap') },
      ],
      band: { text: 'Outsourcing built on', highlight: 'trust.' },
    } as never,
  })

  // Keyword map: one primary keyword per page, plus secondary and local terms.
  type KW = { keyword: string; cluster: string; intent: string; market?: string; priority?: string; target?: { relationTo: string; value: number } }
  const kws: KW[] = []
  for (const g of groups) kws.push({ keyword: g.focusKeyword, cluster: g.title, intent: 'commercial', priority: 'p1', target: { relationTo: 'service-categories', value: groupIds[g.slug] } })
  for (const s of services) {
    const cluster = groupByKey[s.group].title
    const target = { relationTo: 'services', value: serviceIds[s.slug] }
    kws.push({ keyword: s.focusKeyword, cluster, intent: 'commercial', priority: 'p1', target })
    for (const k of s.secondary ?? []) kws.push({ keyword: k, cluster, intent: /india|kanpur/i.test(k) ? 'transactional' : 'commercial', priority: 'p2', target })
  }
  for (const ind of industries) kws.push({ keyword: ind.focusKeyword, cluster: 'Industries', intent: 'commercial', priority: 'p2', target: { relationTo: 'industries', value: industryIds[ind.slug] } })
  for (const p of pageSeeds) {
    const meta = p.meta as { focusKeyword?: string; secondaryKeywords?: string[] } | undefined
    if (!meta?.focusKeyword) continue
    const target = { relationTo: 'pages', value: pageIds[p.slug] }
    kws.push({ keyword: meta.focusKeyword, cluster: 'Core pages', intent: p.slug === 'contact' ? 'navigational' : 'commercial', priority: 'p1', target })
    for (const k of meta.secondaryKeywords ?? []) kws.push({ keyword: k, cluster: 'Core pages', intent: 'commercial', priority: 'p2', market: /kanpur|india/i.test(k) ? 'in' : 'global', target })
  }
  for (const k of ['SS Unicom', 'SS Unicom Service', 'SS Universal Communication Services']) {
    kws.push({ keyword: k, cluster: 'Brand', intent: 'navigational', market: 'global', priority: 'p1', target: { relationTo: 'pages', value: pageIds.home } })
  }
  for (const k of ['BPO company in Kanpur', 'call center in Kanpur', 'outsourcing company Uttar Pradesh']) {
    kws.push({ keyword: k, cluster: 'Local', intent: 'transactional', market: 'in', priority: 'p2', target: { relationTo: 'pages', value: pageIds.about } })
  }
  const marketKeywords: [string, string][] = [
    ['BPO services for UAE businesses', 'me'],
    ['outsourcing company for Saudi Arabia', 'me'],
    ['Arabic and English call center outsourcing', 'me'],
    ['outsourcing services India', 'in'],
    ['offshore outsourcing for US companies', 'us'],
    ['outsourcing to India from the UK', 'uk'],
    ['call center outsourcing Canada', 'ca'],
    ['offshore staffing Australia', 'au'],
  ]
  for (const [keyword, market] of marketKeywords) {
    kws.push({ keyword, cluster: 'Markets', intent: 'commercial', market, priority: 'p1', target: { relationTo: 'pages', value: pageIds.home } })
  }
  const seen = new Set<string>()
  for (const k of kws) {
    const key = k.keyword.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    await payload.create({
      collection: 'keywords',
      context: ctx,
      data: { market: 'global', priority: 'p2', status: 'live', source: 'manual', ...k, notes: 'Add volume, KD and CPC from SEMrush.' } as never,
    })
  }
  payload.logger.info(`Seed: ${seen.size} keywords`)

  // Redirects from common old URLs
  for (const [from, slug] of [
    ['/contact-us', 'contact'],
    ['/about-us', 'about'],
    ['/privacy', 'privacy-policy'],
  ] as const) {
    await payload.create({
      collection: 'redirects',
      context: ctx,
      data: { from, type: '301', to: { type: 'reference', reference: { relationTo: 'pages', value: pageIds[slug] } } },
    })
  }

  payload.logger.info('Seed: done')
}

function must(map: Record<string, number>, key: string, what: string) {
  const id = map[key]
  if (!id) throw new Error(`Seed: unknown ${what} "${key}"`)
  return id
}

const payload = await getPayload({ config })
try {
  await seed(payload)
  process.exit(0)
} catch (err) {
  payload.logger.error(err)
  process.exit(1)
}
