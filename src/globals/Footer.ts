import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Settings' },
  access: { read: () => true },
  fields: [
    { name: 'blurb', type: 'textarea' },
    {
      name: 'columns',
      type: 'array',
      maxRows: 4,
      admin: { initCollapsed: true },
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'links', type: 'array', fields: [link({ appearances: false })] },
      ],
    },
    {
      name: 'actions',
      type: 'array',
      maxRows: 3,
      admin: { description: 'Small headed buttons on the right, e.g. "Start a pilot".' },
      fields: [{ name: 'heading', type: 'text', required: true }, link({ appearances: false })],
    },
    { name: 'legalLinks', type: 'array', fields: [link({ appearances: false })] },
    {
      name: 'band',
      type: 'group',
      admin: { description: 'The closing strapline under the footer.' },
      fields: [
        { name: 'text', type: 'text' },
        { name: 'highlight', type: 'text' },
      ],
    },
  ],
  hooks: { afterChange: [revalidateGlobal] },
}
