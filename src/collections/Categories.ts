import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone, authenticated } from '@/access'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Insight topic', plural: 'Insight topics' },
  admin: { useAsTitle: 'title', group: 'Insights' },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  fields: [{ name: 'title', type: 'text', required: true }, slugField()],
}
