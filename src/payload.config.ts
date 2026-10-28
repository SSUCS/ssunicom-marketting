import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { resendAdapter } from '@payloadcms/email-resend'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import type { Field } from 'payload'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { CaseStudies } from './collections/CaseStudies'
import { Categories } from './collections/Categories'
import { Industries } from './collections/Industries'
import { Jobs } from './collections/Jobs'
import { Keywords } from './collections/Keywords'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { ServiceCategories } from './collections/ServiceCategories'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { SiteSettings } from './globals/SiteSettings'
import { revalidateAfterChange } from './hooks/revalidate'
import { rejectSpam } from './hooks/rejectSpam'
import { resolveDatabase } from './lib/database'
import { pathFor } from './lib/paths'
import { getServerSideURL } from './lib/url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const seoCollections = ['pages', 'services', 'service-categories', 'industries', 'posts', 'case-studies', 'jobs'] as const

/** Extra SEO controls beyond title / description / image. */
const extraSeoFields: Field[] = [
  {
    name: 'focusKeyword',
    type: 'text',
    admin: {
      description: 'The main search phrase this page should rank for. Record it in SEO → Keyword map too.',
      components: { afterInput: ['@/components/admin/KeywordCheck#KeywordCheck'] },
    },
  },
  { name: 'secondaryKeywords', type: 'text', hasMany: true, admin: { description: 'Close variants worth mentioning naturally.' } },
  { name: 'canonicalUrl', type: 'text', admin: { description: 'Leave empty unless this content also lives at another URL.' } },
  { name: 'noIndex', type: 'checkbox', label: 'Hide from search engines (noindex)' },
]

export default buildConfig({
  admin: {
    user: Users.slug,
    avatar: 'default',
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · SS Unicom CMS' },
    components: {
      beforeDashboard: ['@/components/admin/Welcome#Welcome'],
      graphics: { Logo: '@/components/admin/Brand#Logo', Icon: '@/components/admin/Brand#Icon' },
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: lexicalEditor(),
  db: sqliteAdapter({
    client: resolveDatabase(),
    migrationDir: path.resolve(dirname, 'migrations'),
    push: false,
  }),
  collections: [Pages, Services, ServiceCategories, Industries, CaseStudies, Testimonials, Posts, Categories, Jobs, Keywords, Media, Users],
  globals: [Header, Footer, SiteSettings],
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'website@ssunicomservice.com',
        defaultFromName: process.env.EMAIL_FROM_NAME || 'SS Unicom Website',
      })
    : undefined,
  plugins: [
    seoPlugin({
      collections: [...seoCollections],
      uploadsCollection: 'media',
      tabbedUI: true,
      fields: ({ defaultFields }) => [...defaultFields, ...extraSeoFields],
      generateTitle: ({ doc }) => doc?.heroHeading || doc?.title || '',
      generateDescription: ({ doc }) => doc?.shortDescription || doc?.summary || doc?.excerpt || doc?.tagline || '',
      generateURL: ({ doc, collectionConfig }) => `${getServerSideURL()}${pathFor(collectionConfig?.slug || 'pages', doc?.slug)}`,
    }),
    redirectsPlugin({
      collections: ['pages', 'services', 'service-categories', 'industries', 'posts', 'case-studies'],
      redirectTypes: ['301', '302'],
      overrides: {
        admin: { group: 'SEO' },
        hooks: { afterChange: [revalidateAfterChange] },
      },
    }),
    formBuilderPlugin({
      fields: { payment: false, state: false, country: false },
      redirectRelationships: ['pages'],
      defaultToEmail: 'info@ssunicomservice.com',
      formOverrides: { admin: { group: 'Forms' } },
      formSubmissionOverrides: {
        admin: { group: 'Forms', defaultColumns: ['form', 'createdAt', 'pageUrl', 'utmSource'] },
        fields: ({ defaultFields }) => [
          ...defaultFields,
          { name: 'pageUrl', type: 'text', admin: { readOnly: true } },
          { name: 'referrer', type: 'text', admin: { readOnly: true } },
          {
            type: 'row',
            fields: ['utmSource', 'utmMedium', 'utmCampaign', 'utmTerm', 'utmContent'].map((name) => ({
              name,
              type: 'text' as const,
              admin: { readOnly: true },
            })),
          },
          { name: 'website', type: 'text', admin: { hidden: true } },
        ],
        hooks: { beforeChange: [rejectSpam] },
      },
    }),
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || 'local-development-secret-change-me',
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  graphQL: { disable: true },
  telemetry: false,
})
