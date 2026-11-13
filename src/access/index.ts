import type { Access, ClientUser, FieldAccess, PayloadRequest } from 'payload'

/**
 * Roles (set on each user in Settings → Users):
 * - admin, editor: manage the whole website, including Careers.
 * - hr: sees and manages only the Careers section (job openings, applications, CVs).
 */
type MaybeUser = PayloadRequest['user'] | ClientUser | null | undefined

const isHR = (user: MaybeUser) => (user as { role?: string } | null | undefined)?.role === 'hr'

export const anyone: Access = () => true

/** Anyone signed in, HR included. Used by the Careers collections. */
export const careersStaff: Access = ({ req: { user } }) => Boolean(user)

/** Signed in and not limited to Careers: admins and editors. */
export const websiteStaff: Access = ({ req: { user } }) => Boolean(user) && !isHR(user)

export const websiteStaffField: FieldAccess = ({ req: { user } }) => Boolean(user) && !isHR(user)

/** Admins and editors see drafts; everyone else only sees published documents. */
export const websiteStaffOrPublished: Access = ({ req: { user } }) => {
  if (user && !isHR(user)) return true
  return { _status: { equals: 'published' } }
}

/** Admins and editors can reach every user; HR can only reach their own account. */
export const websiteStaffOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  return isHR(user) ? { id: { equals: user.id } } : true
}

/** Keeps everything outside Careers out of the HR user's menu and dashboard. */
export const hiddenFromHR = ({ user }: { user: MaybeUser }) => isHR(user)
