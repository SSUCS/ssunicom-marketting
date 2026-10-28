import type { Metadata, Viewport } from 'next'
import { Archivo, Figtree } from 'next/font/google'

import { Analytics } from '@/components/layout/Analytics'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { RevealObserver } from '@/components/motion/RevealObserver'
import { JsonLd } from '@/components/seo/JsonLd'
import { UtmCapture } from '@/components/ui/UtmCapture'
import { getGlobal } from '@/lib/payload'
import { organizationSchema } from '@/lib/seo'
import { getCanonicalURL } from '@/lib/url'

import './globals.css'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' })
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', axes: ['wdth'], display: 'swap' })

export async function generateMetadata(): Promise<Metadata> {
  const site = await getGlobal('site-settings', 0)
  return {
    metadataBase: new URL(getCanonicalURL()),
    applicationName: site.siteName,
    title: { default: site.defaultTitle, template: site.titleTemplate || '%s | SS Unicom' },
    description: site.defaultDescription,
    verification: {
      google: site.googleSiteVerification || undefined,
      other: site.bingSiteVerification ? { 'msvalidate.01': site.bingSiteVerification } : undefined,
    },
    alternates: { types: { 'application/rss+xml': '/insights/feed.xml' } },
    formatDetection: { telephone: false },
  }
}

export const viewport: Viewport = { themeColor: '#0b2e31', width: 'device-width', initialScale: 1 }

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const site = await getGlobal('site-settings', 0)
  return (
    <html lang="en-IN" className={`${figtree.variable} ${archivo.variable}`}>
      <body>
        <JsonLd data={organizationSchema(site) as unknown as Record<string, unknown>[]} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <UtmCapture />
        <Analytics
          banner={site.cookieBanner !== false}
          text={site.cookieText}
          ids={{ gtmId: site.gtmId, ga4Id: site.ga4Id, linkedinPartnerId: site.linkedinPartnerId, metaPixelId: site.metaPixelId, clarityId: site.clarityId }}
        />
      </body>
    </html>
  )
}
