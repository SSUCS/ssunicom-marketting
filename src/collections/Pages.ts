import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { pageBlocks } from '@/blocks/config'
import { hero } from '@/fields/hero'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { previewUrl } from '@/lib/preview'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: { url: ({ data }) => previewUrl('pages', data?.slug) },
    preview: (data) => previewUrl('pages', data?.slug as string),
    description: 'Every marketing page. The page with slug "home" is the homepage.',
  },
  defaultPopulate: { title: true, slug: true },
  access: { create: authenticated, delete: authenticated, read: authenticatedOrPublished, update: authenticated },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'Internal name, also used in breadcrumbs and the default SEO title.' } },
    {
      type: 'tabs',
      tabs: [
        { label: 'Hero', fields: [hero] },
        {
          label: 'Content',
          fields: [{ name: 'layout', type: 'blocks', blocks: pageBlocks, admin: { initCollapsed: true } }],
        },
      ],
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    slugField({ position: 'sidebar' }),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  versions: { drafts: { autosave: { interval: 400 }, schedulePublish: true }, maxPerDoc: 30 },
}
