import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Job opening', plural: 'Job openings' },
  admin: {
    group: 'Careers',
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'location', 'open'],
    description: 'Open roles are listed at /careers and published as Google for Jobs (JobPosting) structured data.',
  },
  defaultPopulate: { title: true, slug: true, department: true, location: true },
  defaultSort: '-datePosted',
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'department', type: 'text', required: true },
        { name: 'location', type: 'text', required: true, defaultValue: 'Kanpur, Uttar Pradesh' },
        {
          name: 'employmentType',
          type: 'select',
          defaultValue: 'FULL_TIME',
          options: [
            { label: 'Full time', value: 'FULL_TIME' },
            { label: 'Part time', value: 'PART_TIME' },
            { label: 'Contract', value: 'CONTRACTOR' },
            { label: 'Internship', value: 'INTERN' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'shift', type: 'text', admin: { description: 'e.g. US night shift' } },
        { name: 'experience', type: 'text', admin: { description: 'e.g. 0–2 years' } },
        { name: 'openings', type: 'number', defaultValue: 1 },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'salaryMin', type: 'number', admin: { description: 'Monthly INR, optional' } },
        { name: 'salaryMax', type: 'number' },
      ],
    },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'responsibilities', type: 'array', fields: [{ name: 'item', type: 'text', required: true }] },
    { name: 'requirements', type: 'array', fields: [{ name: 'item', type: 'text', required: true }] },
    { name: 'open', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar', description: 'Untick to hide the role.' } },
    { name: 'datePosted', type: 'date', admin: { position: 'sidebar' } },
    { name: 'validThrough', type: 'date', admin: { position: 'sidebar' } },
    slugField({ position: 'sidebar' }),
  ],
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
}
