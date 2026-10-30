import type { CollectionSlug } from 'payload'

import { pathFor } from './paths'

/** Admin "Preview" links go through /next/preview, which turns on draft mode for logged-in editors. */
export function previewUrl(collection: CollectionSlug, slug?: string | null): string | null {
  if (!slug) return null
  const path = pathFor(collection, slug)
  const params = new URLSearchParams({ path })
  return `/next/preview?${params.toString()}`
}
