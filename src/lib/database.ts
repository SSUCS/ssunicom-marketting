import fs from 'fs'
import path from 'path'

/**
 * Works out where the CMS database and uploaded media live.
 *
 * - DATABASE_URI set (production): a hosted libSQL / Turso database.
 * - Local development and builds: a SQLite file in ./.data.
 * - A Vercel deployment with no DATABASE_URI (preview mode): the database and media
 *   seeded during the build are copied to /tmp on cold start, so the site, the admin
 *   panel and forms all work. Edits made there are temporary and reset on redeploy.
 */
const root = process.cwd()
const bundledDb = path.join(root, '.data', 'payload.db')
const bundledMedia = path.join(root, 'media')

const isBuildStep = process.env.PAYLOAD_BUILD === '1' || process.env.NEXT_PHASE === 'phase-production-build'

export const isPreviewMode = Boolean(process.env.VERCEL) && !process.env.DATABASE_URI && !isBuildStep

function copyDir(from: string, to: string) {
  if (!fs.existsSync(from)) return
  fs.mkdirSync(to, { recursive: true })
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name)
    const dest = path.join(to, entry.name)
    if (entry.isDirectory()) copyDir(src, dest)
    else if (!fs.existsSync(dest)) fs.copyFileSync(src, dest)
  }
}

export function resolveDatabase(): { url: string; authToken?: string } {
  if (process.env.DATABASE_URI) {
    return { url: process.env.DATABASE_URI, authToken: process.env.DATABASE_AUTH_TOKEN || undefined }
  }
  if (isPreviewMode) {
    const tmpDb = '/tmp/payload.db'
    if (!fs.existsSync(tmpDb) && fs.existsSync(bundledDb)) fs.copyFileSync(bundledDb, tmpDb)
    return { url: `file:${tmpDb}` }
  }
  fs.mkdirSync(path.dirname(bundledDb), { recursive: true })
  return { url: `file:${bundledDb}` }
}

export function resolveMediaDir(): string {
  if (isPreviewMode) {
    const tmpMedia = '/tmp/media'
    copyDir(bundledMedia, tmpMedia)
    return tmpMedia
  }
  return bundledMedia
}
