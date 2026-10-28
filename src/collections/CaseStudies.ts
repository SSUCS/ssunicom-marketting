import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { previewUrl } from '@/lib/preview'

export const CaseStudies: CollectionConfig<'case-studies'> = {
  slug: 'case-studies',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', '_status', 'updatedAt'],
    livePreview: { url: ({ data }) => previewUrl('case-studies', data?.slug) },
    preview: (data) => previewUrl('case-studies', data?.slug as string),
  },
  defaultPopulate: { title: true, slug: true, client: true, headlineMetric: true, summary: true, image: true },
  access: { create: authenticated, delete: authenticated, read: authenticatedOrPublished, update: authenticated },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'client',
      type: 'text',
      required: true,
      admin: { description: 'How the client is described publicly, e.g. "Multi-location dental group, UAE". Name them only with written permission.' },
    },
    {
      name: 'headlineMetric',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '35%' } },
            { name: 'label', type: 'text', required: true, admin: { width: '65%' } },
          ],
        },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Story',
          fields: [
            { name: 'challenge', type: 'textarea' },
            { name: 'solution', type: 'richText' },
            {
              name: 'results',
              type: 'array',
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
            {
              name: 'quote',
              type: 'group',
              fields: [
                { name: 'text', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'author', type: 'text' },
                    { name: 'role', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            { name: 'industry', type: 'relationship', relationTo: 'industries' },
            { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
          ],
        },
      ],
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    slugField({ position: 'sidebar' }),
  ],
  hooks: { beforeChange: [populatePublishedAt], afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  versions: { drafts: true, maxPerDoc: 20 },
}
