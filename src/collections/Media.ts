import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { resolveMediaDir } from '@/lib/database'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content', defaultColumns: ['filename', 'alt', 'updatedAt'] },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image for screen readers and search engines. Required for SEO and accessibility.' },
    },
    { name: 'caption', type: 'text' },
  ],
  upload: {
    staticDir: resolveMediaDir(),
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'application/pdf'],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'large', width: 1600 },
      { name: 'og', width: 1200, height: 630, crop: 'center' },
    ],
    formatOptions: { format: 'webp', options: { quality: 82 } },
  },
}
