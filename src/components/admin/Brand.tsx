export function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 36, height: 36 }}>
        <Icon />
      </div>
      <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em' }}>SS Unicom</span>
    </div>
  )
}

export function Icon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 40 40" style={{ display: 'block', minWidth: 18, maxWidth: 36 }} aria-hidden="true">
      <rect width="40" height="40" rx="6" fill="#007DFF" />
      <path d="M12 26.5c1.6 1.4 3.6 2.1 5.6 2.1 3 0 4.9-1.5 4.9-3.8 0-5-9.6-3.1-9.6-8.6 0-2.4 2.1-4.3 5.3-4.3 1.9 0 3.6.6 4.9 1.6" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24.5 13.5v8.2c0 3.2 1.7 5 4.3 5" fill="none" stroke="#5CECD3" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}
