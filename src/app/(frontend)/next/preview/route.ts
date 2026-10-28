import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'

/** Turns on draft mode for logged-in CMS users, then opens the requested page. */
export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  if (searchParams.get('previewSecret') !== (process.env.PREVIEW_SECRET || '')) return new Response('Not allowed', { status: 403 })
  if (!path || !path.startsWith('/') || path.startsWith('//')) return new Response('Bad path', { status: 400 })
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: req.headers })
  const draft = await draftMode()
  if (!user) {
    draft.disable()
    return new Response('Log in to the CMS to preview drafts', { status: 403 })
  }
  draft.enable()
  redirect(path)
}
