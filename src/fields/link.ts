import type { ArrayField, Field, GroupField } from 'payload'

export const linkableCollections = ['pages', 'services', 'service-categories', 'industries', 'posts', 'case-studies', 'jobs'] as const

type LinkOptions = {
  name?: string
  label?: string
  appearances?: boolean
  required?: boolean
}

/** A link that points either at a CMS document (stays correct if its slug changes) or a custom URL. */
export const link = ({ name = 'link', label, appearances = true, required = true }: LinkOptions = {}): GroupField => {
  const fields: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'reference',
          options: [
            { label: 'Page on this site', value: 'reference' },
            { label: 'Custom URL', value: 'custom' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          admin: { width: '50%', style: { alignSelf: 'flex-end' } },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'reference',
          type: 'relationship',
          relationTo: [...linkableCollections],
          label: 'Document to link to',
          required,
          admin: { condition: (_, s) => s?.type === 'reference', width: '50%' },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Custom URL',
          required,
          admin: {
            condition: (_, s) => s?.type === 'custom',
            width: '50%',
            description: 'e.g. /contact#form, tel:+919794774773 or https://…',
          },
        },
        { name: 'label', type: 'text', required, admin: { width: '50%' } },
      ],
    },
  ]
  if (appearances) {
    fields.push({
      name: 'appearance',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary (blue)', value: 'primary' },
        { label: 'Dark', value: 'dark' },
        { label: 'Mint', value: 'mint' },
        { label: 'Outline', value: 'outline' },
        { label: 'Text link with arrow', value: 'arrow' },
      ],
    })
  }
  return { name, label, type: 'group', interfaceName: 'LinkField', admin: { hideGutter: true }, fields }
}

export const linkGroup = ({ name = 'links', maxRows = 2 }: { name?: string; maxRows?: number } = {}): ArrayField => ({
  name,
  type: 'array',
  maxRows,
  admin: { initCollapsed: true },
  fields: [link()],
})
