/** Single source of truth for the public URL of every kind of document. */
export const pathPrefixes: Record<string, string> = {
  pages: '',
  services: '/services',
  'service-categories': '/services',
  industries: '/industries',
  posts: '/insights',
  'case-studies': '/case-studies',
  jobs: '/careers',
}

export function pathFor(collection: string, slug?: string | null): string {
  if (!slug) return '/'
  if (collection === 'pages') return slug === 'home' ? '/' : `/${slug}`
  return `${pathPrefixes[collection] ?? ''}/${slug}`
}
