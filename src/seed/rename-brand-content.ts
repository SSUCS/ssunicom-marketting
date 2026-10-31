/**
 * Fixes content already in the CMS after the short name changed to "SS Universal":
 * every text value in every collection and global gets "SS Unicom" → "SS Universal", and Kanpur
 * is replaced with India everywhere except the company address (see rename-brand.ts).
 * The "Why SS Unicom" page moves to /why-ss-universal; the old URL redirects (redirects.ts).
 *
 * Safe to run more than once: a second run finds nothing to change.
 * Run before deploying, so the build renders the new content: npm run content:rename:production
 * Add DRY_RUN=1 to only list what would change.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { renameText } from './rename-brand'

const dryRun = process.env.DRY_RUN === '1'
// Visitor data and system tables are never rewritten.
const SKIP = new Set(['users', 'form-submissions', 'payload-locked-documents', 'payload-preferences', 'payload-migrations', 'payload-jobs', 'payload-folders', 'payload-kv'])
// Bookkeeping fields Payload manages itself.
const SYSTEM_KEYS = new Set(['id', 'createdAt', 'updatedAt', '_status', 'filename', 'url', 'thumbnailURL', 'mimeType', '_key', 'sizes'])

type Json = unknown
/** Returns a renamed copy of value, or the same reference when nothing changed. */
function walk(value: Json, key?: string): Json {
  if (key && SYSTEM_KEYS.has(key)) return value
  if (typeof value === 'string') return renameText(value)
  if (Array.isArray(value)) {
    let changed = false
    const out = value.map((v) => {
      const r = walk(v)
      if (r !== v) changed = true
      return r
    })
    return changed ? out : value
  }
  if (value && typeof value === 'object') {
    let changed = false
    const out: Record<string, Json> = {}
    for (const [k, v] of Object.entries(value)) {
      const r = walk(v, k)
      if (r !== v) changed = true
      out[k] = r
    }
    return changed ? out : value
  }
  return value
}

/** Only the top-level fields that changed, so nothing else on the document is rewritten. */
function changes(doc: Record<string, Json>) {
  const data: Record<string, Json> = {}
  for (const [k, v] of Object.entries(doc)) {
    const r = walk(v, k)
    if (r !== v) data[k] = r
  }
  return data
}

const label = (doc: Record<string, Json>) => String(doc.title ?? doc.name ?? doc.keyword ?? doc.slug ?? doc.alt ?? doc.from ?? doc.id)

const payload = await getPayload({ config })
try {
  let total = 0
  const context = { disableRevalidate: true }
  for (const collection of payload.config.collections.map((c) => c.slug)) {
    if (SKIP.has(collection)) continue
    const { docs } = await payload.find({ collection, depth: 0, limit: 0, pagination: false, draft: false, overrideAccess: true } as never)
    for (const doc of docs as unknown as Record<string, Json>[]) {
      const data = changes(doc)
      const fields = Object.keys(data)
      if (!fields.length) continue
      total++
      payload.logger.info(`Rename: ${collection} "${label(doc)}" → ${fields.join(', ')}${dryRun ? ' (dry run)' : ''}`)
      if (dryRun) continue
      try {
        await payload.update({ collection, id: doc.id as number, data, depth: 0, draft: false, overrideAccess: true, context } as never)
      } catch (err) {
        // Two old keywords can become the same new keyword (keywords are unique): keep one.
        if (collection === 'keywords' && typeof data.keyword === 'string') {
          const dup = await payload.find({ collection: 'keywords', where: { keyword: { equals: data.keyword } }, limit: 1, depth: 0 })
          if (dup.docs.length) {
            await payload.delete({ collection: 'keywords', id: doc.id as number, context })
            payload.logger.info(`Rename: removed duplicate keyword "${doc.keyword}" (now "${data.keyword}")`)
            continue
          }
        }
        throw err
      }
    }
  }
  for (const slug of payload.config.globals.map((g) => g.slug)) {
    const doc = (await payload.findGlobal({ slug, depth: 0, draft: false, overrideAccess: true } as never)) as unknown as Record<string, Json>
    const data = changes(doc)
    const fields = Object.keys(data)
    if (!fields.length) continue
    total++
    payload.logger.info(`Rename: ${slug} → ${fields.join(', ')}${dryRun ? ' (dry run)' : ''}`)
    if (!dryRun) await payload.updateGlobal({ slug, data, depth: 0, draft: false, overrideAccess: true, context } as never)
  }
  payload.logger.info(`Rename: ${dryRun ? 'would update' : 'updated'} ${total} documents. Done.`)
  process.exit(0)
} catch (err) {
  payload.logger.error(err)
  process.exit(1)
}
