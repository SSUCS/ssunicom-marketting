import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone, hiddenFromLimitedRoles, websiteStaff } from '@/access'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Insight topic', plural: 'Insight topics' },
  admin: { hidden: hiddenFromLimitedRoles, useAsTitle: 'title', group: 'Insights' },
  access: { create: websiteStaff, delete: websiteStaff, read: anyone, update: websiteStaff },
  fields: [{ name: 'title', type: 'text', required: true }, slugField()],
}
