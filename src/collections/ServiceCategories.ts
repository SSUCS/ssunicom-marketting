import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone, authenticated } from '@/access'
import { faqsField } from '@/fields/faqs'
import { iconField } from '@/fields/icon'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'
import { previewUrl } from '@/lib/preview'

export const ServiceCategories: CollectionConfig<'service-categories'> = {
  slug: 'service-categories',
  labels: { singular: 'Service group', plural: 'Service groups' },
  admin: {
    group: 'Services',
    useAsTitle: 'title',
    defaultColumns: ['order', 'title', 'code', 'updatedAt'],
    preview: (data) => previewUrl('service-categories', data?.slug as string),
    description: 'Groups such as Customer Experience. Each group has a hub page at /services/<slug>.',
  },
  defaultPopulate: { title: true, slug: true, code: true, tagline: true, icon: true, order: true },
  defaultSort: 'order',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'code', type: 'text', admin: { width: '25%', description: 'e.g. Group A' } },
        { name: 'order', type: 'number', required: true, admin: { width: '25%' } },
      ],
    },
    iconField(),
    { name: 'tagline', type: 'textarea', required: true },
    { name: 'heroHeading', type: 'text', admin: { description: 'H1 on the group page. Defaults to the title.' } },
    { name: 'description', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    faqsField(),
    slugField({ position: 'sidebar' }),
  ],
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
}
