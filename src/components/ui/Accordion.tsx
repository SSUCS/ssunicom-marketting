'use client'

import { Plus } from 'lucide-react'
import { useId, useState } from 'react'

import { cn } from '@/lib/cn'

export type AccordionItem = { question: string; answer: React.ReactNode; expert?: string | null }

export function Accordion({ items, firstOpen = true, tone = 'sky' }: { items: AccordionItem[]; firstOpen?: boolean; tone?: 'sky' | 'white' }) {
  const [open, setOpen] = useState<number | null>(firstOpen ? 0 : null)
  const base = useId()
  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className={cn('rounded-md transition-colors', tone === 'sky' ? 'bg-cobalt-100/70' : 'border border-line bg-white')}>
            <h3 className="m-0">
              <button
                type="button"
                id={`${base}-h${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-6 text-left text-lg font-semibold text-cobalt-950 sm:px-6 sm:text-xl"
              >
                {item.question}
                <Plus className={cn('size-5 shrink-0 transition-transform duration-500', isOpen && 'rotate-45')} />
              </button>
            </h3>
            <div id={`${base}-p${i}`} role="region" aria-labelledby={`${base}-h${i}`} className="accordion-panel" data-open={isOpen}>
              <div>
                <div className={cn('mx-4 mb-4 rounded-sm p-5 text-[1.02rem] leading-relaxed sm:p-7', tone === 'sky' ? 'bg-cobalt-50' : 'bg-stone-50')}>
                  {item.answer}
                  {item.expert && <p className="mt-4 text-sm font-semibold text-cobalt-900">— {item.expert}</p>}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
