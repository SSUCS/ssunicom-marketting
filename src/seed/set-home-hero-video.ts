/**
 * Puts a film in the home page hero: uploads the MP4 and a poster still to Media (UploadThing in
 * production) and publishes only hero.media and hero.poster on the "home" page. Everything else on
 * the page stays as published. Stops without changing anything if the home page has an unpublished
 * draft newer than the live version, so nobody's work in progress goes live by accident.
 *
 *   HERO_VIDEO=path/to/film.mp4 HERO_POSTER=path/to/still.jpg npm run hero:video[:production]
 *
 * The ids of the hero media it replaces are logged, so the old artwork can be put back from the CMS.
 */
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

const video = process.env.HERO_VIDEO && path.resolve(process.env.HERO_VIDEO)
const poster = process.env.HERO_POSTER && path.resolve(process.env.HERO_POSTER)
const videoAlt = 'SS Universal brand film: dependable people and disciplined process'
const posterAlt = 'Teal light streaks, the opening frame of the SS Universal brand film'

const payload = await getPayload({ config })
try {
  if (!video || !poster || !fs.existsSync(video) || !fs.existsSync(poster)) {
    throw new Error('Hero video: set HERO_VIDEO and HERO_POSTER to existing files.')
  }
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

  const was = (v: unknown) => (v && typeof v === 'object' ? (v as { id: unknown }).id : v) ?? 'none'
  payload.logger.info(`Hero video: home page #${home.id}, hero media was #${was(home.hero?.media)}, poster was #${was(home.hero?.poster)}`)

  const film = await payload.create({ collection: 'media', data: { alt: videoAlt }, filePath: video, context: { disableRevalidate: true } })
  const still = await payload.create({ collection: 'media', data: { alt: posterAlt }, filePath: poster, context: { disableRevalidate: true } })
  payload.logger.info(`Hero video: uploaded film #${film.id} (${film.url}) and poster #${still.id} (${still.url})`)

  await payload.update({
    collection: 'pages',
    id: home.id,
    draft: false,
    depth: 0,
    data: { hero: { ...home.hero, type: 'home', media: film.id, poster: still.id } },
    context: { disableRevalidate: true },
  })
  payload.logger.info('Hero video: done. The home hero plays the film. Redeploy (or wait for the next deploy) to refresh cached pages.')
  process.exit(0)
} catch (err) {
  payload.logger.error(err)
  process.exit(1)
}
