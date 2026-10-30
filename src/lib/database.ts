import fs from 'fs'
import path from 'path'

/**
 * Works out where the CMS database and uploaded media live.
 *
 * - DATABASE_URI set (production): a hosted libSQL / Turso database.
 * - Local development: a SQLite file in ./.data, with uploads in ./media unless UPLOADTHING_TOKEN is set.
 */
const root = process.cwd()
const localDb = path.join(root, '.data', 'payload.db')

export function resolveDatabase(): { url: string; authToken?: string } {
  if (process.env.DATABASE_URI) {
    return { url: process.env.DATABASE_URI, authToken: process.env.DATABASE_AUTH_TOKEN || undefined }
  }
  fs.mkdirSync(path.dirname(localDb), { recursive: true })
  return { url: `file:${localDb}` }
}

export const resolveMediaDir = (): string => path.join(root, 'media')
