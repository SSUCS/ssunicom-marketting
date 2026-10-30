/**
 * Re-uploads seeded artwork for media records that never reached cloud storage (no `_key`).
 * Safe to run again: records that already have a key are left alone.
 */
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

const artDir = path.resolve(process.cwd(), 'src/seed/art')
const artFiles = fs.readdirSync(artDir).filter((f) => f.endsWith('.webp'))

/** hero-1.webp → hero.webp (Payload adds -N when a filename is already taken). */
const artFor = (filename: string) => {
  const base = filename.replace(/\.webp$/, '')
  return artFiles.find((f) => f === `${base}.webp`) ?? artFiles.find((f) => f === `${base.replace(/-\d+$/, '')}.webp`)
}

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({ collection: 'media', limit: 1000, pagination: false, depth: 0 })
  const missing = docs.filter((d) => !(d as { _key?: string | null })._key)
  payload.logger.info(`Repair: ${missing.length} of ${docs.length} media records have no stored file`)
  for (const doc of missing) {
    const art = doc.filename ? artFor(doc.filename) : undefined
    if (!art) {
      payload.logger.warn(`Repair: no artwork found for ${doc.filename}, skipped`)
      continue
    }
    // Updating the file in place makes the storage plugin delete the old files first, which fails
    // because they were never stored. Instead, upload a fresh copy, move its file details onto the
    // original record (so pages keep pointing at the same id), and drop the copy's row without hooks.
    const fresh = await payload.create({ collection: 'media', data: { alt: doc.alt }, filePath: path.join(artDir, art), context: { disableRevalidate: true } })
    // Read the copy back from the database so it includes the storage keys written after upload.
    const stored = await payload.db.findOne({ collection: 'media', where: { id: { equals: fresh.id } } })
    const { id: _id, alt: _alt, caption: _caption, createdAt: _createdAt, updatedAt: _updatedAt, ...fileFields } = stored as unknown as Record<string, unknown>
    if (!fileFields._key) throw new Error(`Repair: ${art} uploaded but no storage key was saved`)
    // Delete the copy's row first: filenames are unique.
    await payload.db.deleteOne({ collection: 'media', where: { id: { equals: fresh.id } } })
    await payload.db.updateOne({ collection: 'media', id: doc.id, data: fileFields })
    payload.logger.info(`Repair: re-uploaded ${art}`)
  }
  payload.logger.info('Repair: done')
  process.exit(0)
} catch (err) {
  payload.logger.error(err)
  process.exit(1)
}
