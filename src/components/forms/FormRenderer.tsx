'use client'

import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'
import type { Form } from '@/payload-types'

type Props = {
  form: Form
  confirmation: React.ReactNode
  redirectTo?: string | null
}

const inputCls =
  'w-full rounded-sm border border-line bg-white px-4 py-3 text-[1rem] text-ink outline-none transition focus:border-cobalt-700 focus:ring-4 focus:ring-cobalt-100'

function utm() {
  if (typeof window === 'undefined') return {}
  const q = new URLSearchParams(window.location.search)
  let stored: Record<string, string> = {}
  try {
    stored = JSON.parse(sessionStorage.getItem('utm') || '{}')
  } catch {}
  const pick = (k: string) => q.get(`utm_${k}`) || stored[k] || undefined
  return {
    utmSource: pick('source'),
    utmMedium: pick('medium'),
    utmCampaign: pick('campaign'),
    utmTerm: pick('term'),
    utmContent: pick('content'),
  }
}

export function FormRenderer({ form, confirmation, redirectTo }: Props) {
  const router = useRouter()
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const ref = useRef<HTMLFormElement>(null)

  // Links such as /contact?service=medical-billing-coding pre-select the matching option.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('service')
    const select = ref.current?.querySelector<HTMLSelectElement>('select[name="service"]')
    if (wanted && select && [...select.options].some((o) => o.value === wanted)) select.value = wanted
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setState('sending')
    setError('')
    const submissionData = (form.fields || [])
      .filter((f) => 'name' in f)
      .map((f) => {
        const name = (f as { name: string }).name
        const v = f.blockType === 'checkbox' ? (fd.get(name) ? 'Yes' : 'No') : String(fd.get(name) ?? '')
        return { field: name, value: v }
      })
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: form.id,
          submissionData,
          pageUrl: window.location.href,
          referrer: document.referrer || undefined,
          website: fd.get('website') || undefined,
          ...utm(),
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.errors?.[0]?.message || 'Something went wrong.')
      }
      const w = window as unknown as { dataLayer?: unknown[] }
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({ event: 'generate_lead', form_name: form.title })
      if (form.confirmationType === 'redirect' && redirectTo) {
        router.push(redirectTo)
        return
      }
      setState('done')
    } catch (err) {
      setError((err as Error).message)
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-md bg-teal-50 p-8">
        <CheckCircle2 className="size-10 text-teal-600" />
        <div className="prose-cms">{confirmation}</div>
      </div>
    )
  }

  return (
    <form ref={ref} onSubmit={onSubmit} className="grid grid-cols-6 gap-x-5 gap-y-5" noValidate={false}>
      {(form.fields || []).map((f, i) => {
        if (f.blockType === 'message') return null
        const width = 'width' in f && f.width ? f.width : 100
        const span = width <= 50 ? 'col-span-6 sm:col-span-3' : 'col-span-6'
        const id = `f-${form.id}-${f.name}`
        const label = (
          <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-cobalt-950">
            {f.label || f.name}
            {f.required && <span className="text-amber-600"> *</span>}
          </label>
        )
        if (f.blockType === 'checkbox') {
          return (
            <label key={i} className="col-span-6 flex items-start gap-3 text-[0.95rem] text-ink/80">
              <input id={id} name={f.name} type="checkbox" required={!!f.required} defaultChecked={!!f.defaultValue} className="mt-1 size-4 accent-cobalt-700" />
              {f.label}
            </label>
          )
        }
        return (
          <div key={i} className={span}>
            {label}
            {f.blockType === 'textarea' ? (
              <textarea id={id} name={f.name} required={!!f.required} rows={5} defaultValue={f.defaultValue || ''} className={inputCls} />
            ) : f.blockType === 'select' ? (
              <select id={id} name={f.name} required={!!f.required} defaultValue={f.defaultValue || ''} className={cn(inputCls, 'appearance-auto')}>
                <option value="" disabled>
                  {f.placeholder || 'Select…'}
                </option>
                {f.options?.map((o) => (
                  <option key={o.id || o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={f.name}
                required={!!f.required}
                type={f.blockType === 'email' ? 'email' : f.blockType === 'number' ? 'number' : f.name.toLowerCase().includes('phone') ? 'tel' : 'text'}
                autoComplete={f.blockType === 'email' ? 'email' : f.name.includes('name') ? 'name' : f.name.includes('company') ? 'organization' : f.name.includes('phone') ? 'tel' : undefined}
                defaultValue={'defaultValue' in f && f.defaultValue != null ? String(f.defaultValue) : ''}
                className={inputCls}
              />
            )}
          </div>
        )
      })}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="col-span-6 flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" disabled={state === 'sending'} className="btn btn-primary min-w-44 disabled:opacity-70">
          {state === 'sending' ? <Loader2 className="size-4 animate-spin" /> : null}
          {form.submitButtonLabel || 'Send'}
          {state !== 'sending' && <ArrowRight className="size-4" />}
        </button>
        {state === 'error' && (
          <p role="alert" className="text-[0.95rem] text-red-700">
            {error} Please try again, or email us directly.
          </p>
        )}
      </div>
    </form>
  )
}
