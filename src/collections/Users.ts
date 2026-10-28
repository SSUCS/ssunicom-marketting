import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'role'], group: 'Settings' },
  auth: { useAPIKey: false, maxLoginAttempts: 8, lockTime: 10 * 60 * 1000 },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
  timestamps: true,
}
