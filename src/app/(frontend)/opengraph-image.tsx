import { ImageResponse } from 'next/og'

import { getSiteHost } from '@/lib/url'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'SS Unicom: outsourcing for customer experience, back office and technology'

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: 'linear-gradient(135deg,#002551 0%,#0057B3 60%,#007DFF 100%)', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 72, background: '#007DFF', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 800, border: '2px solid rgba(255,255,255,0.4)' }}>S</div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>SS Unicom</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 950 }}>Outsourcing your customers and auditors can trust.</div>
          <div style={{ fontSize: 30, marginTop: 24, color: '#98F7E3' }}>Customer experience · Back office · Industry operations · Technology</div>
        </div>
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.75)' }}>{`${getSiteHost()} · Kanpur, India`}</div>
      </div>
    ),
    size,
  )
}
