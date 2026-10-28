import { ImageResponse } from 'next/og'

import { MARK_PATHS, MARK_VIEWBOX } from '@/components/layout/Logo'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'SS Unicom: outsourcing for customer experience, back office and technology'

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: 'linear-gradient(135deg,#0b2e31 0%,#115254 60%,#187a7b 100%)', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="96" height="68" viewBox={MARK_VIEWBOX}>
            {MARK_PATHS.map((d) => (
              <path key={d} d={d} fill="none" stroke="#a2ddd8" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
            ))}
          </svg>
          <div style={{ fontSize: 40, fontWeight: 800 }}>SS Unicom</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 950 }}>Outsourcing your customers and auditors can trust.</div>
          <div style={{ fontSize: 30, marginTop: 24, color: '#aae8d3' }}>Customer experience · Back office · Industry operations · Technology</div>
        </div>
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.75)' }}>ssunicomservice.com · Kanpur, India</div>
      </div>
    ),
    size,
  )
}
