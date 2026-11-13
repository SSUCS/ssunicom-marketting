type Props = { user?: { role?: string | null } | null }

const box = { marginBottom: 24, padding: '18px 20px', borderRadius: 8, background: 'var(--theme-elevation-50)', border: '1px solid var(--theme-elevation-150)' }

export function Welcome({ user }: Props) {
  if (user?.role === 'hr') {
    return (
      <div style={box}>
        <h3 style={{ margin: '0 0 6px' }}>Welcome to the SS Universal careers panel</h3>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          Add or close roles in <strong>Careers → Job openings</strong>. Candidates who apply on the website appear in{' '}
          <strong>Careers → Job applications</strong>, with their CV attached. Set a status on each application to track it.
        </p>
      </div>
    )
  }
  return (
    <div style={box}>
      <h3 style={{ margin: '0 0 6px' }}>Welcome to the SS Universal website CMS</h3>
      <p style={{ margin: 0, lineHeight: 1.6 }}>
        Edit pages in <strong>Content → Pages</strong>, services in <strong>Services</strong>, menus and company details in{' '}
        <strong>Settings</strong>, and track target search terms in <strong>SEO → Keyword map</strong>. Every page has an SEO tab with
        a focus-keyword check. Use <strong>Preview</strong> before you publish; published changes go live within seconds.
      </p>
    </div>
  )
}
