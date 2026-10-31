'use client'

import { useFormFields } from '@payloadcms/ui'

const norm = (v: unknown) => (typeof v === 'string' ? v.toLowerCase() : '')

/** Yoast-style on-page check shown under the focus keyword field. */
export function KeywordCheck() {
  const fields = useFormFields(([f]) => ({
    keyword: f['meta.focusKeyword']?.value,
    title: f['meta.title']?.value,
    description: f['meta.description']?.value,
    slug: f['slug']?.value,
    h1: f['hero.heading']?.value ?? f['heroHeading']?.value ?? f['title']?.value,
  }))
  const kw = norm(fields.keyword).trim()
  if (!kw) return null
  const slugKw = kw.replace(/\s+/g, '-')
  const titleLen = norm(fields.title).length
  const descLen = norm(fields.description).length
  const checks: [string, boolean][] = [
    ['Keyword in SEO title', norm(fields.title).includes(kw)],
    ['Keyword in meta description', norm(fields.description).includes(kw)],
    ['Keyword in page heading (H1)', norm(fields.h1).includes(kw)],
    ['Keyword in URL slug', norm(fields.slug).includes(slugKw)],
    [`SEO title 30–60 characters (now ${titleLen})`, titleLen >= 30 && titleLen <= 60],
    [`Meta description 100–160 characters (now ${descLen})`, descLen >= 100 && descLen <= 160],
  ]
  const score = checks.filter(([, ok]) => ok).length
  return (
    <div style={{ marginTop: 10, padding: '10px 12px', border: '1px solid var(--theme-elevation-150)', borderRadius: 6, fontSize: 13 }}>
      <strong>
        On-page check: {score}/{checks.length}
      </strong>
      <ul style={{ listStyle: 'none', margin: '6px 0 0', padding: 0 }}>
        {checks.map(([label, ok]) => (
          <li key={label} style={{ color: ok ? 'var(--theme-success-500)' : 'var(--theme-warning-600, #a35406)' }}>
            {ok ? '✓' : '•'} {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
