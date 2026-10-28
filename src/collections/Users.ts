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
      // On a hosted deploy, nobody may claim the first admin account through the public sign-up screen.
      // Set SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD (created at build) or ALLOW_FIRST_USER=1 for a one-off sign-up.
      ({ operation, req }) => {
        if (operation === 'create' && !req.user && process.env.VERCEL && !process.env.PAYLOAD_BUILD && process.env.ALLOW_FIRST_USER !== '1') {
          throw new APIError('Creating the first user is disabled on this deployment.', 403)
        }
      },
    ],
  },
  timestamps: true,
}
