import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import type { CollectionSlug, Where } from 'payload'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Config } from '@/payload-types'

export const getPayloadClient = () => getPayload({ config: configPromise })

async function isDraft() {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

type DocBySlug<S extends CollectionSlug> = Config['collections'][S]

/** One published document by slug (or the latest draft for a logged-in editor in preview). */
export const getDocBySlug = cache(async <S extends CollectionSlug>(collection: S, slug: string, depth = 2): Promise<DocBySlug<S> | null> => {
  const draft = await isDraft()
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection,
    draft,
    overrideAccess: draft,
    limit: 1,
    pagination: false,
    depth,
    where: { slug: { equals: slug } } as Where,
  })
  return (res.docs[0] as DocBySlug<S>) ?? null
})

export const getAll = cache(async <S extends CollectionSlug>(collection: S, depth = 1, where?: Where, sort?: string): Promise<DocBySlug<S>[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection, depth, limit: 500, pagination: false, where, sort })
  return res.docs as DocBySlug<S>[]
})

export const getSlugs = async (collection: CollectionSlug): Promise<string[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection, depth: 0, limit: 1000, pagination: false, select: { slug: true } as never })
  return res.docs.map((d) => (d as unknown as { slug: string }).slug).filter(Boolean)
}

export const getGlobal = cache(async <G extends keyof Config['globals']>(slug: G, depth = 1): Promise<Config['globals'][G]> => {
  const payload = await getPayloadClient()
  return (await payload.findGlobal({ slug, depth })) as Config['globals'][G]
})
