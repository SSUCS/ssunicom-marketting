import { permanentRedirect, redirect } from 'next/navigation'

import { pathFor } from '@/lib/paths'
import { getPayloadClient } from '@/lib/payload'

/** Applies redirects managed in the CMS (SEO → Redirects). Call before notFound(). */
export async function PayloadRedirects({ url }: { url: string }) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'redirects',
    depth: 1,
    limit: 1,
    pagination: false,
    where: { from: { in: [url, `${url}/`] } },
  })
  const match = docs[0]
  if (!match?.to) return null
  const go = match.type === '302' ? redirect : permanentRedirect
  if (match.to.type === 'custom' && match.to.url) go(match.to.url)
  const ref = match.to.reference
  if (ref && typeof ref.value === 'object' && ref.value && 'slug' in ref.value) go(pathFor(ref.relationTo, ref.value.slug as string))
  return null
}
