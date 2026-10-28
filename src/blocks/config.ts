import type { Block, Field } from 'payload'

import { iconField } from '@/fields/icon'
import { link, linkGroup } from '@/fields/link'

/** Shared look-and-feel controls every section block carries. */
const sectionSettings: Field = {
  name: 'settings',
  type: 'group',
  label: 'Section settings',
  interfaceName: 'SectionSettings',
  admin: { hideGutter: true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'background',
          type: 'select',
          defaultValue: 'stone',
          options: [
            { label: 'Warm white', value: 'stone' },
            { label: 'White', value: 'white' },
            { label: 'Light blue', value: 'sky' },
            { label: 'Navy', value: 'navy' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'anchor',
          type: 'text',
          admin: { width: '33%', description: 'Optional id for in-page links, e.g. "how-we-work".' },
        },
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'normal',
          options: [
            { label: 'Normal', value: 'normal' },
            { label: 'Compact', value: 'compact' },
            { label: 'Spacious', value: 'spacious' },
          ],
          admin: { width: '33%' },
        },
      ],
    },
  ],
}

const eyebrow: Field = { name: 'eyebrow', type: 'text', admin: { description: 'Small label above the heading.' } }
const heading: Field = { name: 'heading', type: 'text' }
const intro: Field = { name: 'intro', type: 'textarea' }

export const LogoMarquee: Block = {
  slug: 'logoMarquee',
  interfaceName: 'LogoMarqueeBlock',
  labels: { singular: 'Logo / platform strip', plural: 'Logo / platform strips' },
  fields: [
    eyebrow,
    {
      name: 'items',
      type: 'array',
      minRows: 3,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Optional. Without a logo the name is shown as a wordmark.' } },
      ],
    },
    sectionSettings,
  ],
}

export const SplitFeature: Block = {
  slug: 'splitFeature',
  interfaceName: 'SplitFeatureBlock',
  labels: { singular: 'Split feature card', plural: 'Split feature cards' },
  fields: [
    eyebrow,
    heading,
    { name: 'body', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        {
          name: 'accent',
          type: 'select',
          defaultValue: 'amber',
          options: [
            { label: 'Amber', value: 'amber' },
            { label: 'Cobalt', value: 'cobalt' },
            { label: 'Teal', value: 'teal' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    linkGroup(),
    sectionSettings,
  ],
}

export const Metrics: Block = {
  slug: 'metrics',
  interfaceName: 'MetricsBlock',
  labels: { singular: 'Headline metrics', plural: 'Headline metrics' },
  fields: [
    eyebrow,
    heading,
    intro,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '33%', description: 'e.g. 38%, 2.4M, 99.6%' } },
            { name: 'label', type: 'text', required: true, admin: { width: '67%' } },
          ],
        },
        { name: 'caseStudy', type: 'relationship', relationTo: 'case-studies' },
      ],
    },
    sectionSettings,
  ],
}

export const MediaContent: Block = {
  slug: 'mediaContent',
  interfaceName: 'MediaContentBlock',
  labels: { singular: 'Text with image', plural: 'Text with image' },
  fields: [
    eyebrow,
    heading,
    { name: 'headingHighlight', type: 'text', admin: { description: 'Second line of the heading, shown larger.' } },
    { name: 'body', type: 'richText' },
    {
      name: 'bullets',
      type: 'array',
      fields: [
        { name: 'lead', type: 'text', admin: { description: 'Bold opening words.' } },
        { name: 'text', type: 'text', required: true },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
    },
    linkGroup(),
    sectionSettings,
  ],
}

export const FeatureCards: Block = {
  slug: 'featureCards',
  interfaceName: 'FeatureCardsBlock',
  labels: { singular: 'Feature cards', plural: 'Feature cards' },
  fields: [
    eyebrow,
    heading,
    intro,
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: ['2', '3', '4'].map((v) => ({ label: `${v} columns`, value: v })),
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }, link({ name: 'link', required: false, appearances: false })],
    },
    sectionSettings,
  ],
}

export const CtaBanner: Block = {
  slug: 'ctaBanner',
  interfaceName: 'CtaBannerBlock',
  labels: { singular: 'Call-to-action banner', plural: 'Call-to-action banners' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    linkGroup(),
    {
      name: 'style',
      type: 'select',
      defaultValue: 'cobalt',
      options: [
        { label: 'Cobalt gradient', value: 'cobalt' },
        { label: 'Navy', value: 'navy' },
      ],
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'contained',
      options: [
        { label: 'Contained card', value: 'contained' },
        { label: 'Full width band', value: 'full' },
      ],
    },
    sectionSettings,
  ],
}

export const StatsGrid: Block = {
  slug: 'statsGrid',
  interfaceName: 'StatsGridBlock',
  labels: { singular: 'Stats grid', plural: 'Stats grids' },
  fields: [
    heading,
    intro,
    {
      name: 'stats',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '40%', description: 'Numbers count up on scroll, e.g. 450+' } },
            { name: 'label', type: 'text', required: true, admin: { width: '60%' } },
          ],
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    sectionSettings,
  ],
}

export const IndustryGrid: Block = {
  slug: 'industryGrid',
  interfaceName: 'IndustryGridBlock',
  labels: { singular: 'Industries grid', plural: 'Industries grids' },
  fields: [
    heading,
    intro,
    {
      name: 'industries',
      type: 'relationship',
      relationTo: 'industries',
      hasMany: true,
      admin: { description: 'Leave empty to show every industry in order.' },
    },
    sectionSettings,
  ],
}

export const ServiceDirectory: Block = {
  slug: 'serviceDirectory',
  interfaceName: 'ServiceDirectoryBlock',
  labels: { singular: 'Services directory', plural: 'Services directories' },
  fields: [
    eyebrow,
    heading,
    intro,
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'tabs',
      options: [
        { label: 'Tabs by group (compact)', value: 'tabs' },
        { label: 'Full list with deliverables', value: 'full' },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'service-categories',
      hasMany: true,
      admin: { description: 'Leave empty to show every service group.' },
    },
    sectionSettings,
  ],
}

export const FaqAccordion: Block = {
  slug: 'faqAccordion',
  interfaceName: 'FaqAccordionBlock',
  labels: { singular: 'FAQ / Ask our experts', plural: 'FAQs' },
  fields: [
    heading,
    intro,
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
        { name: 'expert', type: 'text', admin: { description: 'Optional attribution, e.g. "Operations Head, SS Unicom".' } },
      ],
    },
    {
      name: 'addSchema',
      type: 'checkbox',
      defaultValue: true,
      label: 'Add FAQPage structured data',
      admin: { description: 'Only one FAQ block per page should carry schema.' },
    },
    sectionSettings,
  ],
}

export const RichContent: Block = {
  slug: 'richContent',
  interfaceName: 'RichContentBlock',
  labels: { singular: 'Rich text', plural: 'Rich text' },
  fields: [
    eyebrow,
    heading,
    { name: 'content', type: 'richText', required: true },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'narrow',
      options: [
        { label: 'Reading width', value: 'narrow' },
        { label: 'Wide', value: 'wide' },
      ],
    },
    sectionSettings,
  ],
}

export const ProcessSteps: Block = {
  slug: 'processSteps',
  interfaceName: 'ProcessStepsBlock',
  labels: { singular: 'Process steps', plural: 'Process steps' },
  fields: [
    eyebrow,
    heading,
    intro,
    {
      name: 'steps',
      type: 'array',
      minRows: 2,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
        { name: 'duration', type: 'text', admin: { description: 'Optional, e.g. "Week 1".' } },
      ],
    },
    sectionSettings,
  ],
}

export const CaseStudyCards: Block = {
  slug: 'caseStudyCards',
  interfaceName: 'CaseStudyCardsBlock',
  labels: { singular: 'Case study cards', plural: 'Case study cards' },
  fields: [
    eyebrow,
    heading,
    intro,
    { name: 'caseStudies', type: 'relationship', relationTo: 'case-studies', hasMany: true, admin: { description: 'Leave empty to show the latest three.' } },
    sectionSettings,
  ],
}

export const PostsFeed: Block = {
  slug: 'postsFeed',
  interfaceName: 'PostsFeedBlock',
  labels: { singular: 'Insights feed', plural: 'Insights feeds' },
  fields: [
    eyebrow,
    heading,
    intro,
    { name: 'limit', type: 'number', defaultValue: 3, min: 1, max: 24 },
    { name: 'showAll', type: 'checkbox', label: 'Show all posts (listing page)' },
    sectionSettings,
  ],
}

export const Testimonial: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  fields: [
    { name: 'testimonials', type: 'relationship', relationTo: 'testimonials', hasMany: true, admin: { description: 'Leave empty to show featured testimonials.' } },
    sectionSettings,
  ],
}

export const JobsList: Block = {
  slug: 'jobsList',
  interfaceName: 'JobsListBlock',
  labels: { singular: 'Open roles list', plural: 'Open roles lists' },
  fields: [eyebrow, heading, intro, sectionSettings],
}

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlockBlock',
  labels: { singular: 'Form', plural: 'Forms' },
  fields: [
    eyebrow,
    heading,
    intro,
    { name: 'form', type: 'relationship', relationTo: 'forms', required: true },
    { name: 'showContactDetails', type: 'checkbox', defaultValue: true, label: 'Show phone, email and address beside the form' },
    sectionSettings,
  ],
}

export const TrustBadges: Block = {
  slug: 'trustBadges',
  interfaceName: 'TrustBadgesBlock',
  labels: { singular: 'Trust & compliance badges', plural: 'Trust & compliance badges' },
  fields: [
    eyebrow,
    heading,
    intro,
    {
      name: 'items',
      type: 'array',
      fields: [iconField(), { name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }],
    },
    sectionSettings,
  ],
}

export const pageBlocks: Block[] = [
  LogoMarquee,
  SplitFeature,
  Metrics,
  MediaContent,
  FeatureCards,
  CtaBanner,
  StatsGrid,
  IndustryGrid,
  ServiceDirectory,
  FaqAccordion,
  RichContent,
  ProcessSteps,
  CaseStudyCards,
  PostsFeed,
  Testimonial,
  JobsList,
  FormBlock,
  TrustBadges,
]
