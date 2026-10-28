import * as Lucide from 'lucide-react'
import type { LucideProps } from 'lucide-react'

import type { IconName } from '@/lib/iconNames'

export function Icon({ name, ...props }: { name?: IconName | string | null } & Omit<LucideProps, 'name'>) {
  const Cmp = (name && (Lucide as unknown as Record<string, React.ComponentType<LucideProps>>)[name]) || Lucide.Sparkles
  return <Cmp strokeWidth={1.5} aria-hidden="true" {...props} />
}
