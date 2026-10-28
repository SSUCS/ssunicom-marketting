import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: 'Settings' },
  access: { read: () => true },
  fields: [
    {
      name: 'utilityLinks',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Small links in the top bar.', initCollapsed: true },
      fields: [link({ appearances: false })],
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 7,
      admin: { initCollapsed: true },
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'menu',
          type: 'select',
          defaultValue: 'link',
          options: [
            { label: 'Plain link', value: 'link' },
            { label: 'Mega menu: all services (automatic)', value: 'services' },
            { label: 'Mega menu: all industries (automatic)', value: 'industries' },
            { label: 'Dropdown: custom links', value: 'custom' },
          ],
        },
        { ...link({ appearances: false, required: false }), admin: { hideGutter: true, description: 'Where the top-level label goes.' } },
        {
          name: 'children',
          type: 'array',
          admin: { condition: (_, s) => s?.menu === 'custom' },
          fields: [link({ appearances: false }), { name: 'description', type: 'text' }],
        },
        {
          name: 'feature',
          type: 'group',
          admin: { condition: (_, s) => s?.menu !== 'link', description: 'Optional promo panel inside the menu.' },
          fields: [{ name: 'heading', type: 'text' }, { name: 'text', type: 'textarea' }, link({ appearances: false, required: false })],
        },
      ],
    },
    link({ name: 'cta', label: 'Header button', appearances: false }),
  ],
  hooks: { afterChange: [revalidateGlobal] },
}
