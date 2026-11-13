import type { CollectionConfig } from 'payload'

import { careersStaff } from '@/access'

export const experienceOptions = [
  { label: 'Fresher', value: 'fresher' },
  { label: 'Less than 1 year', value: 'under-1' },
  { label: '1 to 3 years', value: '1-3' },
  { label: '3 to 5 years', value: '3-5' },
  { label: 'More than 5 years', value: '5-plus' },
]

/**
 * Applications sent from the form on each job page (POST /next/apply).
 * The public never writes here directly: the route validates the form and saves it server-side.
 */
export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  labels: { singular: 'Job application', plural: 'Job applications' },
  admin: {
    group: 'Careers',
    useAsTitle: 'name',
    defaultColumns: ['name', 'jobTitle', 'phone', 'experience', 'status', 'createdAt'],
    description: 'Candidates who applied through the website. Newest first.',
  },
  defaultSort: '-createdAt',
  access: { create: careersStaff, delete: careersStaff, read: careersStaff, update: careersStaff },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'phone', type: 'text', required: true },
        { name: 'email', type: 'email' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'city', type: 'text' },
        { name: 'experience', type: 'select', options: experienceOptions },
      ],
    },
    { name: 'message', type: 'textarea' },
    { name: 'resume', label: 'CV', type: 'upload', relationTo: 'resumes' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Interview', value: 'interview' },
        { label: 'Hired', value: 'hired' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'job', type: 'relationship', relationTo: 'jobs', admin: { position: 'sidebar' } },
    {
      name: 'jobTitle',
      label: 'Applied for',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true, description: 'Kept even if the job opening is later deleted.' },
    },
    { name: 'notes', type: 'textarea', admin: { position: 'sidebar', description: 'Internal notes. Never shown to the candidate.' } },
    { name: 'pageUrl', type: 'text', admin: { position: 'sidebar', readOnly: true } },
  ],
  hooks: {
    // Deleting an application removes its CV too, so candidate files are not left behind.
    afterDelete: [
      async ({ doc, req }) => {
        const resume = typeof doc.resume === 'object' ? doc.resume?.id : doc.resume
        if (!resume) return
        try {
          await req.payload.delete({ collection: 'resumes', id: resume, req })
        } catch (err) {
          req.payload.logger.error({ err }, `Could not delete CV ${resume}`)
        }
      },
    ],
  },
}
