import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-mist-50 py-28 sm:py-36">
      <div aria-hidden className="orb pointer-events-none absolute -top-32 left-1/3 size-[36rem] rounded-full bg-brand-100/70 blur-3xl" />
      <div className="container-x relative max-w-2xl text-center">
        <p className="display text-7xl text-brand-700">404</p>
        <h1 className="mt-6 text-4xl">We couldn&apos;t find that page</h1>
        <p className="lead mt-4">It may have moved. These links will get you back on track.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary">
            Go to the homepage <ArrowRight className="size-4" />
          </Link>
          <Link href="/services" className="btn btn-outline text-navy-900">
            Browse services
          </Link>
          <Link href="/contact" className="btn btn-outline text-navy-900">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}
