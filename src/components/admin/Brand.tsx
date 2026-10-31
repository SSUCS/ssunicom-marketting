import { LogoMark } from '@/components/layout/Logo'

export function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 48, display: 'flex' }}>
        <LogoMark className="ssu-admin-mark" />
      </div>
      <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em' }}>SS Unicom</span>
    </div>
  )
}

export function Icon() {
  return (
    <div style={{ width: '100%', height: '100%', minWidth: 18, maxWidth: 36, display: 'flex', alignItems: 'center' }}>
      <LogoMark className="ssu-admin-mark" />
    </div>
  )
}
