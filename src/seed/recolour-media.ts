/**
 * Replaces the seeded 3D artwork in the CMS with the current files in src/seed/art
 * (used after the artwork is re-rendered in new brand colours).
 * Only media records whose filename matches an artwork file are touched; uploads made by editors are left alone.
 * Pages keep pointing at the same media ids. The old files stay in storage and can be deleted from UploadThing later.
 */
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

const artDir = path.resolve(process.cwd(), 'src/seed/art')
const artFiles = fs.readdirSync(artDir).filter((f) => f.endsWith('.webp'))
const usesCloudStorage = Boolean(process.env.UPLOADTHING_TOKEN)

/** hero-1.webp → hero.webp (Payload adds -N when a filename is already taken). */
const artFor = (filename: string) => {
  const base = filename.replace(/\.webp$/, '')
  return artFiles.find((f) => f === `${base}.webp`) ?? artFiles.find((f) => f === `${base.replace(/-\d+$/, '')}.webp`)
}

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({ collection: 'media', limit: 1000, pagination: false, depth: 0 })
  const targets = docs.filter((d) => d.filename && artFor(d.filename))
  payload.logger.info(`Recolour: ${targets.length} of ${docs.length} media records are seeded artwork`)
  for (const doc of targets) {
    const art = artFor(doc.filename!)!
    // Same approach as repair-media.ts: upload a fresh copy, move its file details onto the original
    // record so every page keeps its image, then drop the copy's row without hooks.
    const fresh = await payload.create({ collection: 'media', data: { alt: doc.alt }, filePath: path.join(artDir, art), context: { disableRevalidate: true } })
    const stored = await payload.db.findOne({ collection: 'media', where: { id: { equals: fresh.id } } })
    const { id: _id, alt: _alt, caption: _caption, createdAt: _createdAt, updatedAt: _updatedAt, ...fileFields } = stored as unknown as Record<string, unknown>
    if (usesCloudStorage && !fileFields._key) throw new Error(`Recolour: ${art} uploaded but no storage key was saved`)
    await payload.db.deleteOne({ collection: 'media', where: { id: { equals: fresh.id } } })
    await payload.db.updateOne({ collection: 'media', id: doc.id, data: fileFields })
    payload.logger.info(`Recolour: replaced ${doc.filename} with ${art}`)
  }
  payload.logger.info('Recolour: done')
  process.exit(0)
} catch (err) {
  payload.logger.error(err)
  process.exit(1)
}
