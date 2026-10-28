import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { type JSXConvertersFunction, LinkJSXConverter, RichText as Lexical } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/cn'
import { pathFor } from '@/lib/paths'

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({
    internalDocToHref: ({ linkNode }) => {
      const doc = linkNode.fields.doc
      if (!doc || typeof doc.value !== 'object') return '#'
      return pathFor(doc.relationTo, (doc.value as { slug?: string }).slug)
    },
  }),
})

export function RichText({ data, className }: { data?: SerializedEditorState | null | Record<string, unknown>; className?: string }) {
  if (!data) return null
  return <Lexical data={data as SerializedEditorState} converters={converters} className={cn('prose-cms', className)} />
}
