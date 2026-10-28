import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/cn'
import { pathFor } from '@/lib/paths'
import type { LinkField } from '@/payload-types'

export function hrefFor(link?: Partial<LinkField> | null): string {
  if (!link) return '#'
  if (link.type === 'custom') return link.url || '#'
  const ref = link.reference
  if (ref && typeof ref.value === 'object' && ref.value && 'slug' in ref.value) {
    return pathFor(ref.relationTo, (ref.value as { slug?: string }).slug)
  }
  return link.url || '#'
}

type Props = {
  link?: Partial<LinkField> | null
  className?: string
  children?: React.ReactNode
  appearance?: LinkField['appearance'] | 'none'
  arrow?: boolean
  onClick?: () => void
}

export function CMSLink({ link, className, children, appearance, arrow }: Props) {
  if (!link) return null
  const href = hrefFor(link)
  const look = appearance ?? link.appearance ?? 'none'
  const external = /^https?:\/\//.test(href)
  const showArrow = arrow ?? (look === 'arrow' || look === 'primary' || look === 'mint' || look === 'dark')
  const cls = cn(look !== 'none' && 'btn', look !== 'none' && `btn-${look}`, className)
  const content = (
    <>
      {children ?? link.label}
      {showArrow && look !== 'none' && <ArrowRight className="size-4 shrink-0" aria-hidden="true" />}
    </>
  )
  if (external || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={cls} {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {content}
    </Link>
  )
}

export function LinkRow({ links, className }: { links?: { link: LinkField; id?: string | null }[] | null; className?: string }) {
  if (!links?.length) return null
  return (
    <div className={cn('flex flex-wrap gap-3 sm:gap-4', className)}>
      {links.map(({ link, id }) => (
        <CMSLink key={id || link.label} link={link} />
      ))}
    </div>
  )
}
