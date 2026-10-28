import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

import { Icon } from '@/components/ui/Icon'
import { Section, SectionHeader, stagger } from '@/components/ui/Section'
import { pathFor } from '@/lib/paths'
import { getAll } from '@/lib/payload'
import type { Service, ServiceCategory, ServiceDirectoryBlock } from '@/payload-types'

import { ServiceTabs } from './ServiceTabs'

export async function ServiceDirectory({ eyebrow, heading, intro, layout, categories, settings }: ServiceDirectoryBlock) {
  const picked = (categories || []).filter((c): c is ServiceCategory => typeof c === 'object')
  const cats = picked.length ? picked : await getAll('service-categories', 1, undefined, 'order')
  const services = await getAll('services', 0, { _status: { equals: 'published' } }, 'number')
  const groups = cats.map((c) => ({ category: c, services: services.filter((s) => (typeof s.category === 'object' ? s.category.id : s.category) === c.id) }))

  return (
    <Section settings={settings}>
      <div className="container-x">
        <SectionHeader eyebrow={eyebrow} heading={heading} intro={intro} />
        {layout === 'full' ? (
          <div className="space-y-20">
            {groups.map(({ category, services }) => (
              <div key={category.id} id={category.slug} className="scroll-mt-32">
                <div data-reveal className="mb-8 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    {category.code && <p className="eyebrow-plain mb-2">{category.code}</p>}
                    <h2 className="text-3xl sm:text-4xl">{category.title}</h2>
                    <p className="mt-3 max-w-2xl text-lg text-ink/80">{category.tagline}</p>
                  </div>
                  <Link href={pathFor('service-categories', category.slug)} className="btn btn-arrow shrink-0">
                    Explore {category.title} <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {services.map((s, i) => (
                    <ServiceListCard key={s.id} service={s} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ServiceTabs
            groups={groups.map(({ category, services }) => ({
              id: String(category.id),
              title: category.title,
              code: category.code || '',
              tagline: category.tagline,
              href: pathFor('service-categories', category.slug),
              icon: <Icon name={category.icon} className="size-6 shrink-0 text-cobalt-700" />,
              activeIcon: <Icon name={category.icon} className="size-6 shrink-0 text-teal-300" />,
              services: services.map((s) => ({
                id: String(s.id),
                number: s.number,
                title: s.title,
                text: s.shortDescription,
                href: pathFor('services', s.slug),
                icon: <Icon name={s.icon} className="size-9 shrink-0 text-cobalt-800" strokeWidth={1.3} />,
              })),
            }))}
          />
        )}
      </div>
    </Section>
  )
}

export function ServiceListCard({ service: s, index = 0 }: { service: Service; index?: number }) {
  return (
    <Link href={pathFor('services', s.slug)} data-reveal style={stagger(index % 2)} className="group lift card flex flex-col p-7 sm:p-8">
      <div className="flex items-start justify-between">
        <Icon name={s.icon} className="size-11 text-cobalt-800" strokeWidth={1.3} />
        <span className="display text-2xl text-cobalt-100 transition-colors group-hover:text-cobalt-300">{String(s.number).padStart(2, '0')}</span>
      </div>
      <h3 className="mt-5 text-[1.45rem]">{s.title}</h3>
      <p className="mt-2 text-ink/80">{s.shortDescription}</p>
      {s.deliverables?.length ? (
        <ul className="mt-5 grid gap-2 text-[0.97rem] sm:grid-cols-2">
          {s.deliverables.map((d) => (
            <li key={d.id} className="flex gap-2">
              <Check className="mt-1 size-4 shrink-0 text-teal-600" />
              {d.item}
            </li>
          ))}
        </ul>
      ) : null}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-cobalt-700">
        Discuss this service <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
