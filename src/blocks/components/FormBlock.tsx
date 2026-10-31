import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { FormRenderer } from '@/components/forms/FormRenderer'
import { RichText } from '@/components/ui/RichText'
import { Section, stagger } from '@/components/ui/Section'
import { pathFor } from '@/lib/paths'
import { getGlobal } from '@/lib/payload'
import type { FormBlockBlock } from '@/payload-types'

export async function FormBlock({ eyebrow, heading, intro, form, showContactDetails, settings }: FormBlockBlock) {
  if (!form || typeof form !== 'object') return null
  const site = await getGlobal('site-settings')
  const redirect = form.redirect?.reference?.value
  const redirectTo =
    form.redirect?.type === 'custom' ? form.redirect.url : redirect && typeof redirect === 'object' ? pathFor('pages', redirect.slug) : null
  const a = site.address
  return (
    <Section settings={{ background: 'white', ...settings }}>
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          {eyebrow && (
            <p data-reveal className="mb-4">
              <span className="eyebrow">{eyebrow}</span>
            </p>
          )}
          {heading && (
            <h2 data-reveal style={stagger(1)} className="h-section">
              {heading}
            </h2>
          )}
          {intro && (
            <p data-reveal style={stagger(2)} className="mt-5 text-lg text-ink/85">
              {intro}
            </p>
          )}
          {showContactDetails && (
            <ul data-reveal style={stagger(3)} className="mt-10 space-y-5 text-[1.02rem]">
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-brand-700" />
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="font-semibold text-navy-900 hover:text-brand-700">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-brand-700" />
                <a href={`mailto:${site.email}`} className="font-semibold text-navy-900 hover:text-brand-700">
                  {site.email}
                </a>
              </li>
              {a?.street && (
                <li className="flex gap-4">
                  <MapPin className="mt-1 size-5 shrink-0 text-brand-700" />
                  <span>
                    {site.legalName}
                    <br />
                    {a.street}, {a.locality}, {a.region} {a.postalCode}
                  </span>
                </li>
              )}
              {site.hours && (
                <li className="flex gap-4">
                  <Clock className="mt-1 size-5 shrink-0 text-brand-700" />
                  <span>{site.hours}</span>
                </li>
              )}
            </ul>
          )}
        </div>
        <div id="form" data-reveal style={stagger(1)} className="relative scroll-mt-32 rounded-lg border border-line bg-mist-50 p-6 sm:p-10">
          <FormRenderer form={form} redirectTo={redirectTo} confirmation={<RichText data={form.confirmationMessage} />} />
        </div>
      </div>
    </Section>
  )
}
