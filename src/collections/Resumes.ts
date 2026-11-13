import path from 'path'
import type { CollectionConfig } from 'payload'

import { careersStaff } from '@/access'

/** CVs sent with job applications. Only logged-in staff can list or open them. */
export const Resumes: CollectionConfig = {
  slug: 'resumes',
  labels: { singular: 'CV', plural: 'CVs' },
  admin: {
    group: 'Careers',
    defaultColumns: ['filename', 'createdAt'],
    description: 'Files uploaded by candidates. Open a job application to see whose CV it is.',
  },
  access: { create: careersStaff, delete: careersStaff, read: careersStaff, update: careersStaff },
  fields: [],
  upload: {
    staticDir: path.join(process.cwd(), 'resumes'),
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
}
