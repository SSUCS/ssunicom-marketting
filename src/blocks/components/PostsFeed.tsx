import { PostCard } from '@/components/cards/PostCard'
import { Section, SectionHeader, stagger } from '@/components/ui/Section'
import { getAll } from '@/lib/payload'
import type { PostsFeedBlock } from '@/payload-types'

export async function PostsFeed({ eyebrow, heading, intro, limit, showAll, settings }: PostsFeedBlock) {
  const posts = await getAll('posts', 1, { _status: { equals: 'published' } }, '-publishedAt')
  const list = showAll ? posts : posts.slice(0, limit || 3)
  return (
    <Section settings={settings}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <PostCard key={p.id} post={p} style={stagger(i % 3)} />
          ))}
        </div>
      </div>
    </Section>
  )
}
