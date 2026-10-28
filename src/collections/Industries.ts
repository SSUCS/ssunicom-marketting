import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { faqsField } from '@/fields/faqs'
import { iconField } from '@/fields/icon'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { previewUrl } from '@/lib/preview'

export const Industries: CollectionConfig<'industries'> = {
  slug: 'industries',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['order', 'title', '_status', 'updatedAt'],
    livePreview: { url: ({ data }) => previewUrl('industries', data?.slug) },
    preview: (data) => previewUrl('industries', data?.slug as string),
  },
  defaultPopulate: { title: true, slug: true, summary: true, image: true, icon: true, order: true },
  defaultSort: 'order',
  access: { create: authenticated, delete: authenticated, read: authenticatedOrPublished, update: authenticated },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, admin: { width: '60%' } },
        { name: 'order', type: 'number', required: true, admin: { width: '20%' } },
        { ...iconField(), admin: { width: '20%' } },
      ],
    },
    { name: 'summary', type: 'textarea', required: true, admin: { description: 'One or two sentences for cards.' } },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Card and hero artwork.' } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Landing page',
          fields: [
            { name: 'heroHeading', type: 'text' },
            { name: 'heroText', type: 'textarea' },
            { name: 'overview', type: 'richText' },
            {
              name: 'challenges',
              type: 'array',
              fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
            },
            { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
            faqsField(),
          ],
        },
      ],
    },
    slugField({ position: 'sidebar' }),
  ],
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  versions: { drafts: true, maxPerDoc: 20 },
}
