import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { previewUrl } from '@/lib/preview'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  labels: { singular: 'Insight', plural: 'Insights' },
  admin: {
    group: 'Insights',
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', 'publishedAt', '_status'],
    livePreview: { url: ({ data }) => previewUrl('posts', data?.slug) },
    preview: (data) => previewUrl('posts', data?.slug as string),
    description: 'Articles and guides at /insights. Publishing regularly is the biggest long-term SEO lever.',
  },
  defaultPopulate: { title: true, slug: true, excerpt: true, heroImage: true, publishedAt: true, categories: true },
  defaultSort: '-publishedAt',
  access: { create: authenticated, delete: authenticated, read: authenticatedOrPublished, update: authenticated },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true, admin: { description: 'Shown on cards and used as the fallback meta description.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
    {
      type: 'row',
      fields: [
        { name: 'authorName', type: 'text', defaultValue: 'SS Unicom Team' },
        { name: 'authorRole', type: 'text' },
      ],
    },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true, admin: { position: 'sidebar' } },
    { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true, admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    slugField({ position: 'sidebar' }),
  ],
  hooks: { beforeChange: [populatePublishedAt], afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  versions: { drafts: { autosave: { interval: 400 }, schedulePublish: true }, maxPerDoc: 30 },
}
