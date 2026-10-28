import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

import { getGlobal } from '@/lib/payload'

export async function ContactCta({ heading = 'Have a process you want off your plate?', text = 'Tell us what you need. You will get a scoped proposal and a pilot plan within two business days.', href = '/contact#form' }: { heading?: string; text?: string; href?: string }) {
  const site = await getGlobal('site-settings', 0)
  return (
    <section className="cta-gradient light-sweep relative overflow-hidden py-16 text-center text-white sm:py-20">
      <div className="container-x relative">
        <h2 data-reveal className="display text-[1.9rem] text-white sm:text-[2.6rem]">
          {heading}
        </h2>
        <p data-reveal className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          {text}
        </p>
        <div data-reveal className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={href} className="btn btn-mint">
            Talk with our team <ArrowRight className="size-4" />
          </Link>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn btn-outline text-white">
            <Phone className="size-4" /> {site.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
