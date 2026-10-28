'use client'

import { useEffect } from 'react'

/** Keeps first-touch UTM parameters for the session so forms can attribute leads to campaigns. */
export function UtmCapture() {
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search)
      const keys = ['source', 'medium', 'campaign', 'term', 'content']
      if (!keys.some((k) => q.get(`utm_${k}`)) || sessionStorage.getItem('utm')) return
      sessionStorage.setItem('utm', JSON.stringify(Object.fromEntries(keys.map((k) => [k, q.get(`utm_${k}`) || '']))))
    } catch {}
  }, [])
  return null
}
