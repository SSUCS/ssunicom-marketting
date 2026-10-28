import { Quote } from 'lucide-react'

import { Section, stagger } from '@/components/ui/Section'
import { getAll } from '@/lib/payload'
import type { Testimonial as T, TestimonialBlock } from '@/payload-types'

export async function Testimonial({ testimonials, settings }: TestimonialBlock) {
  const picked = (testimonials || []).filter((t): t is T => typeof t === 'object')
  const list = picked.length ? picked : (await getAll('testimonials', 0, { featured: { equals: true } })).slice(0, 3)
  if (!list.length) return null
  return (
    <Section settings={{ background: 'navy', ...settings }}>
      <div aria-hidden className="orb pointer-events-none absolute -top-40 right-0 size-[34rem] rounded-full bg-cobalt-700/30 blur-3xl" />
      <div className="container-x grid gap-6 lg:grid-cols-3">
        {list.map((t, i) => (
          <figure key={t.id} data-reveal style={stagger(i)} className="flex flex-col rounded-lg border border-white/10 bg-white/[0.04] p-7 backdrop-blur sm:p-8">
            <Quote className="size-8 text-teal-300" />
            <blockquote className="mt-5 text-lg leading-relaxed text-white/90">“{t.quote}”</blockquote>
            <figcaption className="mt-auto pt-6">
              <span className="block font-semibold text-white">{t.name}</span>
              <span className="text-sm text-white/60">{[t.role, t.company].filter(Boolean).join(', ')}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
