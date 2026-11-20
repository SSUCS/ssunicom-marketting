/**
 * Replaces the seeded abstract 3D artwork with the stock photos in src/seed/photos
 * (Pexels License, credits in src/seed/photos/photos.json).
 * Each media record keeps its id, so every page, service, industry and case study that uses it
 * shows the photo; the alt text is updated to describe the photo. Only records whose filename is
 * still one of the listed artwork files are touched, so editor uploads are left alone and a second
 * run does nothing. Same approach as recolour-media.ts.
 */
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

type Photo = { replaces: string; file: string; alt: string }
const dir = path.resolve(process.cwd(), 'src/seed/photos')
const photos: Photo[] = JSON.parse(fs.readFileSync(path.join(dir, 'photos.json'), 'utf8'))
const usesCloudStorage = Boolean(process.env.UPLOADTHING_TOKEN)

/** tile-shield-2.webp → tile-shield (Payload adds -N when a filename is already taken). */
const baseOf = (filename: string) => filename.replace(/\.webp$/, '').replace(/-\d+$/, '')

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({ collection: 'media', limit: 1000, pagination: false, depth: 0 })
  let done = 0
  for (const photo of photos) {
    const targets = docs.filter((d) => d.filename?.endsWith('.webp') && baseOf(d.filename) === photo.replaces)
    if (!targets.length) {
      payload.logger.info(`Photos: no artwork named ${photo.replaces}, skipped`)
      continue
    }
    for (const doc of targets) {
      const fresh = await payload.create({ collection: 'media', data: { alt: photo.alt }, filePath: path.join(dir, photo.file), context: { disableRevalidate: true } })
      const stored = await payload.db.findOne({ collection: 'media', where: { id: { equals: fresh.id } } })
      const { id: _id, caption: _caption, createdAt: _createdAt, updatedAt: _updatedAt, ...fileFields } = stored as unknown as Record<string, unknown>
      if (usesCloudStorage && !fileFields._key) throw new Error(`Photos: ${photo.file} uploaded but no storage key was saved`)
      await payload.db.deleteOne({ collection: 'media', where: { id: { equals: fresh.id } } })
      await payload.db.updateOne({ collection: 'media', id: doc.id, data: fileFields })
      payload.logger.info(`Photos: media #${doc.id} ${doc.filename} → ${photo.file}`)
      done++
    }
  }
  payload.logger.info(`Photos: done, ${done} replaced. Redeploy (or wait for the next deploy) to refresh cached pages.`)
  process.exit(0)
} catch (err) {
  payload.logger.error(err)
  process.exit(1)
}
