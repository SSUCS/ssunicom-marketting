import type { GroupField } from 'payload'

import { linkGroup } from './link'

export const hero: GroupField = {
  name: 'hero',
  type: 'group',
  admin: { hideGutter: true },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'standard',
      required: true,
      options: [
        { label: 'Home (full-width artwork)', value: 'home' },
        { label: 'Standard (heading + artwork)', value: 'standard' },
        { label: 'Simple (heading only)', value: 'simple' },
        { label: 'None', value: 'none' },
      ],
    },
    { name: 'eyebrow', type: 'text', admin: { condition: (_, s) => s?.type !== 'none' } },
    {
      name: 'heading',
      type: 'text',
      admin: { condition: (_, s) => s?.type !== 'none', description: 'The page H1. Include the focus keyword naturally.' },
    },
    { name: 'text', type: 'textarea', admin: { condition: (_, s) => s?.type !== 'none' } },
    {
      ...linkGroup(),
      admin: { condition: (_, s) => s?.type !== 'none' && s?.type !== 'simple' },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.type === 'home' || s?.type === 'standard', description: 'Image or short looping video (MP4/WebM).' },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: (_, s) => s?.type === 'home', description: 'Still image shown while a hero video loads.' },
    },
  ],
}
