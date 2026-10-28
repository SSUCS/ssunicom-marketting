/** Renders schema.org structured data. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] | null | undefined }) {
  if (!data) return null
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export const faqSchema = (items: { question: string; answer: string }[]) =>
  items.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((i) => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })),
      }
    : null
