import { APIError, type CollectionConfig } from 'payload'

import { canUseCMS, hiddenFromLimitedRoles, websiteStaff, websiteStaffField, websiteStaffOrSelf } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { hidden: hiddenFromLimitedRoles, useAsTitle: 'name', defaultColumns: ['name', 'email', 'role'], group: 'Settings' },
  auth: { useAPIKey: false, maxLoginAttempts: 8, lockTime: 10 * 60 * 1000 },
  access: {
    // Designers sign in here only to reach the brand guide at /brand; the CMS itself is closed to them.
    admin: canUseCMS,
    create: websiteStaff,
    delete: websiteStaff,
    // HR can open and update only their own account (name, password), never other users.
    read: websiteStaffOrSelf,
    update: websiteStaffOrSelf,
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
        { label: 'HR (Careers only)', value: 'hr' },
        { label: 'Designer (brand guide only)', value: 'designer' },
      ],
      // Stops an HR or designer user from promoting themselves.
      access: { update: websiteStaffField },
      admin: { description: 'Admin and Editor manage the whole website. HR sees only the Careers section. Designer can only open the brand guide at /brand.' },
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
