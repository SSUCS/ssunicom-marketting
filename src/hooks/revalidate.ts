import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Content is cross-linked everywhere (navigation, related services, footers, schema),
 * so any published change refreshes the whole site's cached pages. Pages are rebuilt
 * on their next visit, which keeps a ~70 page marketing site fresh and simple.
 */
function revalidateSite(context: Record<string, unknown>, logger: { info: (m: string) => void }) {
  if (context.disableRevalidate) return
  try {
    revalidatePath('/', 'layout')
    logger.info('Revalidated site after content change')
  } catch {
    // Not running inside Next.js (e.g. the seed script): nothing to revalidate.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  const published = !('_status' in (doc || {})) || doc._status === 'published'
  const wasPublished = previousDoc && previousDoc._status === 'published'
  if (published || wasPublished) revalidateSite(req.context, req.payload.logger)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateSite(req.context, req.payload.logger)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context, req.payload.logger)
  return doc
}
