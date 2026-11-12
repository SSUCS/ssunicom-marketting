'use client'

import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { experienceOptions } from '@/collections/JobApplications'
import { cn } from '@/lib/cn'

type Props = { jobId: number; jobTitle: string }

const MAX_CV_BYTES = 4 * 1024 * 1024

const inputCls =
  'w-full rounded-sm border border-line bg-white px-4 py-3 text-[1rem] text-ink outline-none transition focus:border-brand-700 focus:ring-4 focus:ring-brand-100'
const labelCls = 'mb-1.5 block text-sm font-semibold text-navy-900'

export function JobApplicationForm({ jobId, jobTitle }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const cv = fd.get('resume')
    if (cv instanceof File && cv.size > MAX_CV_BYTES) {
      setError('Your CV is larger than 4 MB. Please upload a smaller file.')
      setState('error')
      return
    }
    fd.set('job', String(jobId))
    fd.set('pageUrl', window.location.href)
    setState('sending')
    setError('')
    try {
      const res = await fetch('/next/apply', { method: 'POST', body: fd })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.message || 'Something went wrong. Please try again.')
      }
      const w = window as unknown as { dataLayer?: unknown[] }
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({ event: 'job_application', job_title: jobTitle })
      setState('done')
    } catch (err) {
      setError((err as Error).message)
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-md bg-brand-50 p-8">
        <CheckCircle2 className="size-10 text-brand-600" />
        <div>
          <p className="text-xl font-semibold text-navy-900">Application received</p>
          <p className="mt-2 text-ink/80">Thank you for applying for {jobTitle}. Our team will review your details and call you if there is a match.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-6 gap-x-5 gap-y-5">
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="apply-name" className={labelCls}>
          Full name <span className="text-coral-600">*</span>
        </label>
        <input id="apply-name" name="name" required minLength={2} maxLength={120} autoComplete="name" className={inputCls} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="apply-phone" className={labelCls}>
          Phone number <span className="text-coral-600">*</span>
        </label>
        <input id="apply-phone" name="phone" type="tel" required maxLength={30} autoComplete="tel" className={inputCls} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="apply-email" className={labelCls}>
          Email
        </label>
        <input id="apply-email" name="email" type="email" maxLength={200} autoComplete="email" className={inputCls} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="apply-city" className={labelCls}>
          Current city
        </label>
        <input id="apply-city" name="city" maxLength={120} autoComplete="address-level2" className={inputCls} />
      </div>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="apply-experience" className={labelCls}>
          Experience
        </label>
        <select id="apply-experience" name="experience" defaultValue="" className={cn(inputCls, 'appearance-auto')}>
          <option value="">Select…</option>
          {experienceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="apply-resume" className={labelCls}>
          CV
        </label>
        <input
          id="apply-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full rounded-sm border border-line bg-white px-3 py-2.5 text-[0.95rem] text-ink file:mr-3 file:rounded-sm file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:font-semibold file:text-brand-800"
        />
        <p className="mt-1.5 text-sm text-ink/60">PDF or Word, up to 4 MB.</p>
      </div>
      <div className="col-span-6">
        <label htmlFor="apply-message" className={labelCls}>
          Anything you would like us to know
        </label>
        <textarea id="apply-message" name="message" rows={4} maxLength={3000} className={inputCls} />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="col-span-6 flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" disabled={state === 'sending'} className="btn btn-primary min-w-44 disabled:opacity-70">
          {state === 'sending' ? <Loader2 className="size-4 animate-spin" /> : null}
          {state === 'sending' ? 'Sending…' : 'Submit application'}
          {state !== 'sending' && <ArrowRight className="size-4" />}
        </button>
        {state === 'error' && (
          <p role="alert" className="text-[0.95rem] text-danger">
            {error}
          </p>
        )}
      </div>
    </form>
  )
}
