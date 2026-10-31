import Link from 'next/link'

import { Media } from '@/components/ui/Media'
import { pathFor } from '@/lib/paths'
import type { Post } from '@/payload-types'

export const formatDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

export function PostCard({ post, style }: { post: Post; style?: React.CSSProperties }) {
  const topic = post.categories?.find((c) => typeof c === 'object')
  return (
    <Link href={pathFor('posts', post.slug)} data-reveal style={style} className="group lift card flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-50">
        <Media resource={post.heroImage} fill imgClassName="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width:1024px) 400px, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[0.72rem] font-bold tracking-[0.14em] text-ink/50 uppercase">
          {topic && typeof topic === 'object' ? `${topic.title} · ` : ''}
          {formatDate(post.publishedAt)}
        </p>
        <h3 className="mt-3 text-xl leading-snug group-hover:text-brand-800">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-ink/75">{post.excerpt}</p>
      </div>
    </Link>
  )
}
