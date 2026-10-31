import type { Metadata, Viewport } from 'next'
import { Archivo, Figtree } from 'next/font/google'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { BrandNav } from '@/brand/BrandNav'
import { LogoMark } from '@/components/layout/Logo'
import { getPayloadClient } from '@/lib/payload'

import '../../(frontend)/globals.css'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' })
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', axes: ['wdth'], display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Brand guide | SS Unicom', template: '%s | SS Unicom brand guide' },
  robots: { index: false, follow: false },
}
export const viewport: Viewport = { themeColor: '#13294b' }
export const dynamic = 'force-dynamic'

// Internal: only people who can sign in to the website's CMS can open the brand guide.
export default async function BrandLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) redirect('/admin/login?redirect=%2Fbrand')

  return (
    <html lang="en-IN" className={`${figtree.variable} ${archivo.variable}`}>
      <body className="bg-mist-50">
        <div className="lg:grid lg:min-h-dvh lg:grid-cols-[17rem_minmax(0,1fr)]">
          <aside className="relative overflow-hidden bg-navy-900 text-white lg:sticky lg:top-0 lg:h-dvh">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(24,122,123,0.5),transparent_60%)]" />
            <div className="relative flex flex-col gap-5 px-5 py-5 lg:h-full lg:gap-10 lg:px-6 lg:py-8">
              <Link href="/brand" className="flex items-center gap-3">
                <LogoMark tone="light" className="h-9 w-auto" />
                <span className="leading-none">
                  <span className="block text-lg font-extrabold tracking-tight">SS Unicom</span>
                  <span className="mt-1 block text-[0.6rem] font-bold tracking-[0.18em] text-white/60 uppercase">Brand guide · Internal</span>
                </span>
              </Link>
              <BrandNav />
              <div className="mt-auto hidden text-sm text-white/55 lg:block">
                <p>Signed in as {user.email}</p>
                <p className="mt-3">
                  <Link href="/" className="font-semibold text-brand-300 hover:text-white">
                    Open the website
                  </Link>
                  <span aria-hidden> · </span>
                  <Link href="/admin" className="font-semibold text-brand-300 hover:text-white">
                    CMS
                  </Link>
                </p>
              </div>
            </div>
          </aside>
          <main id="main" className="min-w-0 px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            <div className="mx-auto max-w-[64rem]">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
