import { APIError, type CollectionConfig } from 'payload'

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
  hooks: {
    beforeChange: [
      // The first visit to /admin on a fresh site creates the first user, who becomes an admin.
      // Once any user exists, new users can only be added by someone who is signed in.
      async ({ operation, req, data }) => {
        if (operation !== 'create' || req.user) return data
        const { totalDocs } = await req.payload.count({ collection: 'users', req })
        if (totalDocs > 0) throw new APIError('Sign in to add users.', 403)
        return { ...data, role: 'admin' }
      },
    ],
  },
  timestamps: true,
}
