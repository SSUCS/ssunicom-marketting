import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { group: 'Content', useAsTitle: 'name', defaultColumns: ['name', 'company', 'featured'] },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'company', type: 'text' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: true },
  ],
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
}
