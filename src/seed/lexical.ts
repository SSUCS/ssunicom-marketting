/**
 * Tiny Markdown-ish → Lexical converter for seed content.
 * Supports: paragraphs, "## " / "### " headings, "- " bullet lists, "1. " numbered lists,
 * "> " quotes, **bold** and [link](/path).
 */
type Node = Record<string, unknown>

const text = (t: string, format = 0): Node => ({ type: 'text', text: t, format, detail: 0, mode: 'normal', style: '', version: 1 })

function inline(src: string): Node[] {
  const out: Node[] = []
  const re = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    if (m.index > last) out.push(text(src.slice(last, m.index)))
    if (m[1]) out.push(text(m[2], 1))
    else
      out.push({
        type: 'link',
        version: 3,
        direction: 'ltr',
        format: '',
        indent: 0,
        fields: { linkType: 'custom', url: m[5], newTab: false },
        children: [text(m[4])],
      })
    last = m.index + m[0].length
  }
  if (last < src.length) out.push(text(src.slice(last)))
  return out
}

const block = (type: string, children: Node[], extra: Node = {}): Node => ({ type, version: 1, direction: 'ltr', format: '', indent: 0, children, ...extra })

export function lexical(md: string) {
  const children: Node[] = []
  const lines = md.trim().split('\n')
  let i = 0
  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) {
      i++
      continue
    }
    if (line.startsWith('### ') || line.startsWith('## ')) {
      const tag = line.startsWith('### ') ? 'h3' : 'h2'
      children.push(block('heading', inline(line.replace(/^#+ /, '')), { tag }))
      i++
    } else if (line.startsWith('> ')) {
      children.push(block('quote', inline(line.slice(2))))
      i++
    } else if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line)
      const items: Node[] = []
      while (i < lines.length && /^(- |\d+\. )/.test(lines[i].trim())) {
        items.push(block('listitem', inline(lines[i].trim().replace(/^(- |\d+\. )/, '')), { value: items.length + 1 }))
        i++
      }
      children.push(block('list', items, { listType: ordered ? 'number' : 'bullet', start: 1, tag: ordered ? 'ol' : 'ul' }))
    } else {
      const para: string[] = []
      while (i < lines.length && lines[i].trim() && !/^(#|- |\d+\. |> )/.test(lines[i].trim())) {
        para.push(lines[i].trim())
        i++
      }
      children.push(block('paragraph', inline(para.join(' ')), { textFormat: 0, textStyle: '' }))
    }
  }
  return { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } } as never
}
