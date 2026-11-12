import path from 'path'
import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

/** CVs sent with job applications. Only logged-in staff can list or open them. */
export const Resumes: CollectionConfig = {
  slug: 'resumes',
  labels: { singular: 'CV', plural: 'CVs' },
  admin: {
    group: 'Careers',
    defaultColumns: ['filename', 'createdAt'],
    description: 'Files uploaded by candidates. Open a job application to see whose CV it is.',
  },
  access: { create: authenticated, delete: authenticated, read: authenticated, update: authenticated },
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
