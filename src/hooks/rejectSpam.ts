import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

/** Bots fill the hidden "website" field; people never see it. */
export const rejectSpam: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' && !req.user && data?.website) {
    throw new APIError('Submission rejected.', 400)
  }
  return data
}
