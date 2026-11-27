/**
 * Puts a film in the home page hero: uploads the files given to Media (UploadThing in production)
 * and publishes only those hero fields on the "home" page. Everything else on the page stays as
 * published. Stops without changing anything if the home page has an unpublished draft newer than
 * the live version, so nobody's work in progress goes live by accident.
 *
 *   HERO_VIDEO=film.mp4               → hero.media (16:9 film)
 *   HERO_POSTER=still.jpg             → hero.poster
 *   HERO_VIDEO_MOBILE=film-square.mp4 → hero.mediaMobile (square cut for phones)
 *   npm run hero:video[:production]   (set any one or more)
 *
 * The ids of the hero media it replaces are logged, so the old files can be put back from the CMS.
 */
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

const fileFrom = (name: string) => (process.env[name] ? path.resolve(process.env[name]!) : undefined)
const uploads = [
  { field: 'media', file: fileFrom('HERO_VIDEO'), alt: 'SSUCS brand film: dependable people and disciplined process' },
  { field: 'poster', file: fileFrom('HERO_POSTER'), alt: 'Teal light streaks, the opening frame of the SSUCS brand film' },
  { field: 'mediaMobile', file: fileFrom('HERO_VIDEO_MOBILE'), alt: 'SSUCS brand film, square cut for phones' },
] as const

const payload = await getPayload({ config })
try {
  const given = uploads.filter((u) => u.file)
  if (!given.length) throw new Error('Hero video: set HERO_VIDEO, HERO_POSTER and/or HERO_VIDEO_MOBILE.')
  for (const u of given) if (!fs.existsSync(u.file!)) throw new Error(`Hero video: ${u.file} does not exist.`)
  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, depth: 0, limit: 1, draft: false })
  const home = docs[0]
  if (!home) throw new Error('Hero video: no page with slug "home".')

  const { docs: versions } = await payload.findVersions({
    collection: 'pages',
    where: { parent: { equals: home.id } },
    sort: '-updatedAt',
    limit: 1,
    depth: 0,
  })
  const latest = versions[0]
  if (latest && latest.version._status === 'draft' && new Date(latest.updatedAt) > new Date(home.updatedAt)) {
    payload.logger.info(`Hero video: the home page has an unpublished draft from ${latest.updatedAt}. Publish or discard it first. Nothing changed.`)
    process.exit(1)
  }

  const hero: Record<string, unknown> = { ...home.hero, type: 'home' }
  for (const u of given) {
    const was = hero[u.field]
    const doc = await payload.create({ collection: 'media', data: { alt: u.alt }, filePath: u.file!, context: { disableRevalidate: true } })
    hero[u.field] = doc.id
    payload.logger.info(`Hero video: ${u.field} was #${(was && typeof was === 'object' ? (was as { id: unknown }).id : was) ?? 'none'}, now #${doc.id}`)
  }

  await payload.update({
    collection: 'pages',
    id: home.id,
    draft: false,
    depth: 0,
    data: { hero: hero as typeof home.hero },
    context: { disableRevalidate: true },
  })
  payload.logger.info('Hero video: done. Redeploy (or wait for the next deploy) to refresh cached pages.')
  process.exit(0)
} catch (err) {
  payload.logger.error(err)
  process.exit(1)
}
