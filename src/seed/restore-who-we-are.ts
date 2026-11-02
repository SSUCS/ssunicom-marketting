/**
 * Puts the "who we are" photo back into the media item that was overwritten with the SVG logo
 * on 31 Oct 2026 (the Who we are blocks showed a broken image, as the image optimiser refuses SVG).
 * Same media id, so every block that uses it shows the photo again. Same approach as recolour-media.ts.
 * Only touches a media item that is currently an SVG whose alt text mentions "company logo".
 */
import config from '@payload-config'
import path from 'path'
import { getPayload } from 'payload'

const art = path.resolve(process.cwd(), 'src/seed/art/who-we-are.webp')
const alt = 'Soft glass shapes in warm light, representing a connected team'
const usesCloudStorage = Boolean(process.env.UPLOADTHING_TOKEN)

const payload = await getPayload({ config })
try {
  const { docs } = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 10,
    pagination: false,
    where: { and: [{ mimeType: { equals: 'image/svg+xml' } }, { alt: { like: 'company logo' } }] },
  })
  if (docs.length !== 1) {
    payload.logger.info(`Restore: expected 1 SVG logo media item, found ${docs.length}. Nothing changed.`)
    process.exit(docs.length ? 1 : 0)
  }
  const doc = docs[0]
  payload.logger.info(`Restore: media #${doc.id} "${doc.filename}" → who-we-are.webp`)
  const fresh = await payload.create({ collection: 'media', data: { alt }, filePath: art, context: { disableRevalidate: true } })
  const stored = await payload.db.findOne({ collection: 'media', where: { id: { equals: fresh.id } } })
  const { id: _id, alt: _alt, caption: _caption, createdAt: _createdAt, updatedAt: _updatedAt, ...fileFields } = stored as unknown as Record<string, unknown>
  if (usesCloudStorage && !fileFields._key) throw new Error('Restore: photo uploaded but no storage key was saved')
  await payload.db.deleteOne({ collection: 'media', where: { id: { equals: fresh.id } } })
  await payload.db.updateOne({ collection: 'media', id: doc.id, data: { ...fileFields, alt } })
  payload.logger.info(`Restore: done. Media #${doc.id} is the photo again. Redeploy (or wait for the next deploy) to refresh cached pages.`)
  process.exit(0)
} catch (err) {
  payload.logger.error(err)
  process.exit(1)
}
