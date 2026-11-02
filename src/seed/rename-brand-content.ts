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
const log = (msg: string) => console.log(msg)
try {
  const context = { disableRevalidate: true }
  const started = Date.now()

  // 1. Scan everything first, so the total is known before anything is written.
  log('Rename: scanning the CMS for "SS Unicom" and Kanpur...')
  type Job = { kind: 'doc'; collection: string; id: number; name: string; data: Record<string, Json>; keyword?: Json } | { kind: 'global'; slug: string; name: string; data: Record<string, Json> }
  const jobs: Job[] = []
  for (const collection of payload.config.collections.map((c) => c.slug)) {
    if (SKIP.has(collection)) continue
    const { docs } = await payload.find({ collection, depth: 0, limit: 0, pagination: false, draft: false, overrideAccess: true } as never)
    let found = 0
    for (const doc of docs as unknown as Record<string, Json>[]) {
      const data = changes(doc)
      if (!Object.keys(data).length) continue
      found++
      jobs.push({ kind: 'doc', collection, id: doc.id as number, name: label(doc), data, keyword: doc.keyword })
    }
    log(`  ${collection.padEnd(20)} ${String(docs.length).padStart(4)} checked, ${String(found).padStart(3)} to fix`)
  }
  for (const slug of payload.config.globals.map((g) => g.slug)) {
    const doc = (await payload.findGlobal({ slug, depth: 0, draft: false, overrideAccess: true } as never)) as unknown as Record<string, Json>
    const data = changes(doc)
    const found = Object.keys(data).length ? 1 : 0
    if (found) jobs.push({ kind: 'global', slug, name: slug, data })
    log(`  ${slug.padEnd(20)}    1 checked, ${String(found).padStart(3)} to fix`)
  }

  const total = jobs.length
  if (!total) {
    log('Rename: nothing left to change. Everything already says SS Universal. Done.')
    process.exit(0)
  }
  log(`Rename: ${total} documents to update${dryRun ? ' (dry run, nothing will be written)' : ''}.`)

  // 2. Update them one by one, showing how many are left.
  let done = 0
  let removed = 0
  for (const job of jobs) {
    const where = job.kind === 'doc' ? `${job.collection} "${job.name}"` : `${job.name} (settings)`
    const fields = Object.keys(job.data).join(', ')
    if (!dryRun) {
      if (job.kind === 'global') {
        await payload.updateGlobal({ slug: job.slug, data: job.data, depth: 0, draft: false, overrideAccess: true, context } as never)
      } else {
        try {
          await payload.update({ collection: job.collection, id: job.id, data: job.data, depth: 0, draft: false, overrideAccess: true, context } as never)
        } catch (err) {
          // Two old keywords can become the same new keyword (keywords are unique): keep one.
          const dup = job.collection === 'keywords' && typeof job.data.keyword === 'string'
            ? await payload.find({ collection: 'keywords', where: { keyword: { equals: job.data.keyword } }, limit: 1, depth: 0 })
            : null
          if (!dup?.docs.length) throw err
          await payload.delete({ collection: 'keywords', id: job.id, context })
          removed++
        }
      }
    }
    done++
    const pct = Math.round((done / total) * 100)
    log(`[${String(done).padStart(String(total).length)}/${total}] ${String(pct).padStart(3)}%  ${total - done} left  ·  ${where} → ${fields}`)
  }
  const secs = Math.round((Date.now() - started) / 1000)
  log(`Rename: ${dryRun ? 'would update' : 'updated'} ${done} of ${total} documents in ${secs}s${removed ? ` (${removed} duplicate keywords removed)` : ''}. 0 left. Done.`)
  if (!dryRun) log('Next: git push origin main, so Vercel rebuilds the site with the new text.')
  process.exit(0)
} catch (err) {
  console.error('Rename: stopped with an error. Nothing is lost: run the same command again and it carries on with what is left.')
  payload.logger.error(err)
  process.exit(1)
}
