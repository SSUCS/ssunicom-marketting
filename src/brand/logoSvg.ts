import { MARK_PATHS, MARK_STOPS, MARK_VIEWBOX } from '@/components/layout/Logo'

export const LOGO_FILES = {
  'ssunicom-mark.svg': { label: 'Crown mark, colour', tone: 'dark', wordmark: false },
  'ssunicom-mark-white.svg': { label: 'Crown mark, for dark backgrounds', tone: 'light', wordmark: false },
  'ssunicom-logo.svg': { label: 'Full logo, colour', tone: 'dark', wordmark: true },
  'ssunicom-logo-white.svg': { label: 'Full logo, for dark backgrounds', tone: 'light', wordmark: true },
} as const

export type LogoFile = keyof typeof LOGO_FILES

// Builds a standalone SVG of the logo. The wordmark uses Figtree, so install it to view the full logo exactly.
export function logoSvg(file: LogoFile) {
  const { tone, wordmark } = LOGO_FILES[file]
  const [a, b, c] = MARK_STOPS[tone]
  const grad = `<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="12" y1="110" x2="138" y2="24"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs>`
  const mark = `<g fill="none" stroke="url(#g)" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">${MARK_PATHS.map((d) => `<path d="${d}"/>`).join('')}</g>`
  if (!wordmark) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}" width="268" height="188">${grad}${mark}</svg>`
  }
  const name = tone === 'light' ? '#ffffff' : '#13294b'
  const sub = tone === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(17,24,39,0.5)'
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="8 20 470 94" width="940" height="188">${grad}${mark}<text x="160" y="72" font-family="Figtree, Arial, sans-serif" font-weight="800" font-size="44" letter-spacing="-0.6" fill="${name}">SS Unicom</text><text x="162" y="100" font-family="Figtree, Arial, sans-serif" font-weight="700" font-size="14" letter-spacing="3.4" fill="${sub}">OUTSOURCING · KANPUR</text></svg>`
}
