import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { faqsField } from '@/fields/faqs'
import { iconField } from '@/fields/icon'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { previewUrl } from '@/lib/preview'

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  admin: {
    group: 'Services',
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'category', '_status', 'updatedAt'],
    livePreview: { url: ({ data }) => previewUrl('services', data?.slug) },
    preview: (data) => previewUrl('services', data?.slug as string),
    description: 'Each service gets its own landing page at /services/<slug>.',
  },
  defaultPopulate: { title: true, slug: true, number: true, icon: true, shortDescription: true, category: true },
  defaultSort: 'number',
  access: { create: authenticated, delete: authenticated, read: authenticatedOrPublished, update: authenticated },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Summary',
          description: 'What appears on cards, in the services directory and in navigation.',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'number', type: 'number', required: true, admin: { width: '25%', description: 'Display order, 1–99.' } },
                { name: 'category', type: 'relationship', relationTo: 'service-categories', required: true, admin: { width: '45%' } },
                { ...iconField(), admin: { width: '30%' } },
              ],
            },
            { name: 'shortDescription', type: 'textarea', required: true, admin: { description: 'One sentence.' } },
            {
              name: 'deliverables',
              type: 'array',
              admin: { description: 'The four bullet points listed under the service.' },
              fields: [{ name: 'item', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Landing page',
          fields: [
            { name: 'heroHeading', type: 'text', admin: { description: 'H1 on the service page. Defaults to the title. Include the focus keyword.' } },
            { name: 'heroText', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'overview', type: 'richText', admin: { description: 'The main explanatory copy (aim for 300+ words for SEO).' } },
            {
              name: 'benefits',
              type: 'array',
              maxRows: 4,
              fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
            },
            {
              name: 'process',
              type: 'array',
              admin: { description: 'How the engagement works, step by step.' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea' },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              maxRows: 3,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
              ],
            },
            faqsField(),
          ],
        },
        {
          label: 'Relationships',
          fields: [
            { name: 'industries', type: 'relationship', relationTo: 'industries', hasMany: true },
            { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true, maxRows: 3 },
            { name: 'caseStudies', type: 'relationship', relationTo: 'case-studies', hasMany: true },
          ],
        },
      ],
    },
    slugField({ position: 'sidebar' }),
  ],
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  versions: { drafts: { autosave: { interval: 400 } }, maxPerDoc: 20 },
}
