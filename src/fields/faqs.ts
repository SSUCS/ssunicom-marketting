import type { ArrayField } from 'payload'

export const faqsField = (name = 'faqs'): ArrayField => ({
  name,
  label: 'FAQs',
  type: 'array',
  interfaceName: 'FaqList',
  admin: { initCollapsed: true, description: 'Shown as an accordion and published as FAQPage structured data.' },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
  ],
})
