import type { Access, ClientUser, FieldAccess, PayloadRequest } from 'payload'

/**
 * Roles (set on each user in Settings → Users):
 * - admin, editor: manage the whole website, including Careers and the brand guide.
 * - hr: sees and manages only the Careers section (job openings, applications, CVs).
 * - designer: can only open the brand guide at /brand. No access to the CMS at all.
 */
type MaybeUser = PayloadRequest['user'] | ClientUser | null | undefined

const roleOf = (user: MaybeUser) => (user as { role?: string } | null | undefined)?.role

const isHR = (user: MaybeUser) => roleOf(user) === 'hr'
const isDesigner = (user: MaybeUser) => roleOf(user) === 'designer'
/** Admins and editors: signed in and not one of the limited roles. */
const isWebsiteStaff = (user: MaybeUser) => Boolean(user) && !isHR(user) && !isDesigner(user)

export const anyone: Access = () => true

/** Who may use the CMS at /admin: everyone signed in except designers. */
export const canUseCMS = ({ req: { user } }: { req: PayloadRequest }) => Boolean(user) && !isDesigner(user)

/** Who may open the brand guide at /brand: admins, editors and designers. */
export const canSeeBrandGuide = (user: MaybeUser) => Boolean(user) && !isHR(user)

/** The Careers collections: admins, editors and HR. */
export const careersStaff: Access = ({ req: { user } }) => Boolean(user) && !isDesigner(user)

/** Everything else in the CMS: admins and editors. */
export const websiteStaff: Access = ({ req: { user } }) => isWebsiteStaff(user)

export const websiteStaffField: FieldAccess = ({ req: { user } }) => isWebsiteStaff(user)

/** Admins and editors see drafts; everyone else only sees published documents. */
export const websiteStaffOrPublished: Access = ({ req: { user } }) => {
  if (isWebsiteStaff(user)) return true
  return { _status: { equals: 'published' } }
}

/** Admins and editors can reach every user; HR and designers can only reach their own account. */
export const websiteStaffOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  return isWebsiteStaff(user) ? true : { id: { equals: user.id } }
}

/** Keeps everything outside Careers out of the HR user's menu and dashboard. */
export const hiddenFromLimitedRoles = ({ user }: { user: MaybeUser }) => !isWebsiteStaff(user)
