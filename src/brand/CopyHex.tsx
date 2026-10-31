'use client'

import { useState } from 'react'

import { cn } from '@/lib/cn'

// Copies a value (hex code, class name) and confirms it inline.
export function CopyHex({ value, className, children }: { value: string; className?: string; children?: React.ReactNode }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1400)
    } catch {
      // Clipboard can be blocked; the value is still visible to select by hand.
    }
  }
  return (
    <button type="button" onClick={copy} className={cn('cursor-pointer text-left', className)} aria-label={`Copy ${value}`}>
      {children ?? value}
      <span aria-live="polite" className="sr-only">
        {done ? `Copied ${value}` : ''}
      </span>
      {done && <span className="ml-2 rounded bg-navy-900 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white">Copied</span>}
    </button>
  )
}
