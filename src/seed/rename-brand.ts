/**
 * The short brand name is "SSUCS" (never "SS Unicom" or "SS Universal"), and Kanpur appears only in
 * the company address; everywhere else the site says India. Used by rename-brand-content.ts to fix
 * content already in the CMS. The registered legal name (SS Universal Communication Services Pvt Ltd),
 * the domain and the email addresses are left alone.
 */

/** Phrase rewrites for Kanpur, longest first. Addresses ("Civil Lines, Kanpur, Uttar Pradesh") never match. */
export const KANPUR_PHRASES: [string, string][] = [
  ['Business process outsourcing · Kanpur, India', 'Business process outsourcing · India'],
  ['outsourcing company in Kanpur, India', 'outsourcing company in India'],
  ['Outsourcing Company in Kanpur, India', 'Outsourcing Company in India'],
  ['is a Kanpur-based outsourcing company', 'is an India-based outsourcing company'],
  ['A Kanpur outsourcing company built', 'An Indian outsourcing company built'],
  ['from our Kanpur delivery centre', 'from our delivery centre in India'],
  ['’s Kanpur delivery centre', '’s delivery centre in India'],
  ['from our Kanpur centre', 'from our centre in India'],
  ['visits to our Kanpur centre', 'visits to our centre in India'],
  ['audit our Kanpur centre', 'audit our centre in India'],
  ['Our Kanpur teams work', 'Our teams in India work'],
  ['Join a Kanpur team', 'Join a team in India'],
  ['started in Kanpur with', 'started in India with'],
  ['Founded in Kanpur', 'Founded in India'],
  ['from Kanpur, India', 'from India'],
  ['in Kanpur, India', 'in India'],
  ['outsourcing company in Kanpur', 'outsourcing company in India'],
  ['BPO company in Kanpur', 'BPO company India'],
  ['call center in Kanpur', 'call center company India'],
  ['outsourcing company Uttar Pradesh', 'outsourcing company India'],
  ['Jobs in Kanpur', 'Jobs in India'],
  ['jobs in Kanpur', 'jobs in India'],
  ['job in Kanpur', 'job in India'],
  ['jobs Kanpur', 'jobs India'],
  ['SS Unicom in Kanpur.', 'SS Unicom in India.'],
  ['SS Unicom Service', 'SS Universal BPO'],
]

/** Whole-value rewrites (the old job location default is also part of the street address, so it is matched exactly). */
export const EXACT_VALUES: Record<string, string> = {
  'Kanpur, Uttar Pradesh': 'India',
}

export const OLD_SLUG = 'why-ss-universal'
export const NEW_SLUG = 'why-ssucs'

/** The registered company name keeps its full form; it is protected while the short name changes. */
const LEGAL_NAMES = ['SS Universal Communication Services Pvt Ltd', 'SS Universal Communication Services']

export function renameText(value: string): string {
  if (value in EXACT_VALUES) return EXACT_VALUES[value]
  let out = value
  for (const [from, to] of KANPUR_PHRASES) out = out.split(from).join(to)
  out = out.split('SS Unicom').join('SS Universal').split('ss-unicom').join('ss-universal')
  LEGAL_NAMES.forEach((name, i) => (out = out.split(name).join(`\u0000${i}\u0000`)))
  out = out.split('SS Universal').join('SSUCS').split('why-ss-universal').join('why-ssucs').split('ss-universal').join('ssucs')
  LEGAL_NAMES.forEach((name, i) => (out = out.split(`\u0000${i}\u0000`).join(name)))
  return out
}
