'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'

type Ids = {
  gtmId?: string | null
  ga4Id?: string | null
  linkedinPartnerId?: string | null
  metaPixelId?: string | null
  clarityId?: string | null
}

const KEY = 'ssu-consent'

/**
 * Cookie consent + marketing tags. Nothing that sets cookies loads until the visitor accepts
 * (Google Consent Mode v2 "basic" implementation). Tag IDs come from Site settings in the CMS.
 */
export function Analytics({ ids, banner, text }: { ids: Ids; banner: boolean; text?: string | null }) {
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null)
  const [ready, setReady] = useState(false)
  // No banner is needed while no tracking tags are configured.
  const hasTags = Boolean(ids.gtmId || ids.ga4Id || ids.linkedinPartnerId || ids.metaPixelId || ids.clarityId)

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY)
      if (v === 'granted' || v === 'denied') setConsent(v)
    } catch {}
    setReady(true)
  }, [])

  const choose = (v: 'granted' | 'denied') => {
    try {
      localStorage.setItem(KEY, v)
    } catch {}
    setConsent(v)
  }

  const load = consent === 'granted' || (!banner && ready)

  return (
    <>
      {load && ids.gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${ids.gtmId}');`}
        </Script>
      )}
      {load && ids.ga4Id && !ids.gtmId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ids.ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ids.ga4Id}');`}
          </Script>
        </>
      )}
      {load && ids.linkedinPartnerId && (
        <Script id="li" strategy="lazyOnload">
          {`_linkedin_partner_id="${ids.linkedinPartnerId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`}
        </Script>
      )}
      {load && ids.metaPixelId && (
        <Script id="fbq" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${ids.metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
      {load && ids.clarityId && (
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${ids.clarityId}");`}
        </Script>
      )}

      {banner && hasTags && ready && consent === null && (
        <div role="dialog" aria-live="polite" aria-label="Cookie preferences" className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl rounded-lg border border-line bg-white p-5 shadow-2xl shadow-cobalt-950/20 sm:inset-x-6 sm:bottom-6 sm:flex sm:items-center sm:gap-6">
          <p className="text-[0.95rem] leading-relaxed text-ink/85">
            {text || 'We use cookies to measure how the site is used and to improve it.'}{' '}
            <Link href="/cookie-policy" className="font-semibold text-cobalt-800 underline">
              Cookie policy
            </Link>
          </p>
          <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
            <button type="button" onClick={() => choose('denied')} className="btn btn-outline !py-2.5 text-cobalt-950">
              Reject
            </button>
            <button type="button" onClick={() => choose('granted')} className="btn btn-primary !py-2.5">
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  )
}
