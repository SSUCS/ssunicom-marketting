'use client'

import { useEffect, useRef, useState } from 'react'

/** Counts the numeric part of a value like "450+", "$2.4M" or "99.6%" up from zero when visible. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : 0
  const decimals = match?.[2].includes('.') ? match[2].split('.')[1].length : 0
  const grouped = match?.[2].includes(',')
  const [n, setN] = useState<number | null>(null)

  useEffect(() => {
    if (!match || !ref.current) return
    const el = ref.current
    let raf = 0
    setN(0)
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1800
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur)
          setN(target * (1 - Math.pow(1 - p, 4)))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (!match) return <span className={className}>{value}</span>
  const shown = n === null ? match[2] : n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: Boolean(grouped) })
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">
        {match[1]}
        {shown}
        {match[3]}
      </span>
    </span>
  )
}
