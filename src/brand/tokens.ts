// Single source for the brand guide at /brand.
// The website's Tailwind tokens live in src/app/(frontend)/globals.css. Keep the two in step:
// if you change a hex value here, change the matching --color-* line there too.

export type Swatch = { step: string; hex: string; note?: string }
export type ColourFamily = {
  id: string
  name: string
  role: string
  token: string // Tailwind prefix, e.g. "brand" gives bg-brand-700
  main: string // the step people should reach for first
  swatches: Swatch[]
}

export const COLOURS: ColourFamily[] = [
  {
    id: 'brand',
    name: 'Unicom Teal',
    role: 'Primary. Taken from the crown logo. Buttons, links, key numbers, icons.',
    token: 'brand',
    main: '700',
    swatches: [
      { step: '50', hex: '#ebf7f6', note: 'Tinted panels, eyebrow pills' },
      { step: '100', hex: '#cfeeeb' },
      { step: '200', hex: '#a2ddd8', note: 'Text selection' },
      { step: '300', hex: '#6cc6c0', note: 'Highlights on navy' },
      { step: '400', hex: '#3daea9', note: 'Focus ring' },
      { step: '500', hex: '#27999a' },
      { step: '600', hex: '#1f8b8c' },
      { step: '700', hex: '#187a7b', note: 'Main brand colour' },
      { step: '800', hex: '#146667' },
      { step: '900', hex: '#115254', note: 'Button hover' },
      { step: '950', hex: '#0b2e31' },
    ],
  },
  {
    id: 'navy',
    name: 'Kanpur Navy',
    role: 'Secondary. Headings, dark sections, footer, the hero overlay.',
    token: 'navy',
    main: '900',
    swatches: [
      { step: '50', hex: '#f0f4fa' },
      { step: '100', hex: '#dfe6f1' },
      { step: '200', hex: '#bccbe2' },
      { step: '300', hex: '#8ea6c9' },
      { step: '500', hex: '#34507e' },
      { step: '700', hex: '#1f3a64' },
      { step: '800', hex: '#182f55', note: 'Hover on navy cards' },
      { step: '900', hex: '#13294b', note: 'Headings, dark bands' },
      { step: '950', hex: '#0b1a33', note: 'Deepest shadow, OG image' },
    ],
  },
  {
    id: 'coral',
    name: 'Signal Coral',
    role: 'Accent. Use sparingly: one highlight per screen, required-field stars, special offers.',
    token: 'coral',
    main: '600',
    swatches: [
      { step: '50', hex: '#fef3f0' },
      { step: '200', hex: '#fbc5b9' },
      { step: '400', hex: '#ee8a76' },
      { step: '500', hex: '#e8664f', note: 'Decoration only, never behind text' },
      { step: '600', hex: '#c2412d', note: 'Coral text, coral buttons' },
      { step: '700', hex: '#a2321f' },
    ],
  },
  {
    id: 'mist',
    name: 'Mist',
    role: 'Neutrals. Page backgrounds, borders, secondary text.',
    token: 'mist',
    main: '50',
    swatches: [
      { step: '50', hex: '#f7f9fb', note: 'Page background' },
      { step: '100', hex: '#edf1f5', note: 'Alternate sections' },
      { step: '200', hex: '#d9e0e8', note: 'Borders and dividers' },
      { step: '300', hex: '#b7c2cf' },
      { step: '500', hex: '#7a8696', note: 'Placeholder text, icons' },
      { step: '700', hex: '#4a5565', note: 'Secondary text' },
    ],
  },
]

export const TEXT_COLOURS = [
  { name: 'Ink', token: 'ink', hex: '#111827', note: 'Body text' },
  { name: 'Muted', token: 'muted', hex: '#4a5565', note: 'Captions, secondary text' },
  { name: 'Line', token: 'line', hex: '#d9e0e8', note: 'Hairlines and card borders' },
  { name: 'White', token: 'white', hex: '#ffffff', note: 'Cards, header, text on dark' },
]

export const STATUS_COLOURS = [
  { name: 'Success', token: 'success', hex: '#1a7f4b', tint: '#e3f4ea', note: 'Form sent, saved' },
  { name: 'Warning', token: 'warning', hex: '#a35406', tint: '#fdf0dc', note: 'Needs attention' },
  { name: 'Error', token: 'danger', hex: '#c0352b', tint: '#fbe4e1', note: 'Failed, invalid field' },
  { name: 'Info', token: 'info', hex: '#2a64c5', tint: '#e3ecfa', note: 'Tips and notices' },
]

// Pairings the site actually uses, checked against WCAG 2.2.
export const PAIRINGS: { label: string; fg: string; bg: string; use: string }[] = [
  { label: 'Body text on page', fg: '#111827', bg: '#f7f9fb', use: 'Paragraphs' },
  { label: 'Secondary text on page', fg: '#4a5565', bg: '#f7f9fb', use: 'Captions, meta' },
  { label: 'Heading on page', fg: '#13294b', bg: '#f7f9fb', use: 'All headings' },
  { label: 'Link on page', fg: '#187a7b', bg: '#f7f9fb', use: 'Text links' },
  { label: 'White on teal button', fg: '#ffffff', bg: '#187a7b', use: 'Primary button' },
  { label: 'White on navy', fg: '#ffffff', bg: '#13294b', use: 'Dark sections, footer' },
  { label: 'Teal 300 on navy', fg: '#6cc6c0', bg: '#13294b', use: 'Eyebrows and icons on dark' },
  { label: 'Navy on teal 300', fg: '#13294b', bg: '#6cc6c0', use: 'Mint button' },
  { label: 'White on coral 600', fg: '#ffffff', bg: '#c2412d', use: 'Coral button' },
  { label: 'Coral 600 on white', fg: '#c2412d', bg: '#ffffff', use: 'Error and accent text' },
  { label: 'White on coral 500', fg: '#ffffff', bg: '#e8664f', use: 'Do not use for text' },
  { label: 'Teal 500 on white', fg: '#27999a', bg: '#ffffff', use: 'Large text and icons only' },
]

export const FONTS = [
  {
    name: 'Archivo',
    role: 'Display',
    cssVar: '--font-display',
    usage: 'Big headlines and statistics. Set at 125% width, weight 800.',
    weights: '600 to 800, width 62 to 125%',
    link: 'https://fonts.google.com/specimen/Archivo',
    sample: 'Outsourcing your customers can count on.',
  },
  {
    name: 'Figtree',
    role: 'Text and interface',
    cssVar: '--font-sans',
    usage: 'Everything else: section headings, body copy, buttons, navigation, forms.',
    weights: '400 regular, 500 medium, 600 semibold, 700 bold, 800 extra bold',
    link: 'https://fonts.google.com/specimen/Figtree',
    sample: 'Dependable people. Disciplined process.',
  },
]

export const TYPE_SCALE = [
  { name: 'Display', className: 'display text-[3.25rem] sm:text-[4rem]', spec: 'Archivo 800 · 52–64px · line 1.0', sample: '99.6%' },
  { name: 'Heading 1', className: 'text-[2.6rem] font-bold leading-[1.1]', spec: 'Figtree 700 · 42px · line 1.1', sample: 'Measured by outcomes' },
  { name: 'Section heading', className: 'text-[2rem] font-bold leading-[1.1]', spec: 'Figtree 700 · 32–48px · line 1.1', sample: 'Industries we serve' },
  { name: 'Heading 3', className: 'text-xl font-bold', spec: 'Figtree 700 · 20px · line 1.12', sample: 'Medical billing and coding' },
  { name: 'Lead', className: 'lead', spec: 'Figtree 400 · 18–20px · line 1.6', sample: 'Teams that work as an extension of yours.' },
  { name: 'Body', className: 'text-[1.0625rem]', spec: 'Figtree 400 · 17px · line 1.6', sample: 'Every engagement is built around numbers you can check.' },
  { name: 'Eyebrow', className: 'eyebrow-plain', spec: 'Figtree 700 · 11.5px · caps · tracking 0.14em', sample: 'Who we are' },
]

export function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string) {
  const x = luminance(a)
  const y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

export function grade(ratio: number): { label: string; tone: 'pass' | 'large' | 'fail' } {
  if (ratio >= 7) return { label: 'AAA', tone: 'pass' }
  if (ratio >= 4.5) return { label: 'AA', tone: 'pass' }
  if (ratio >= 3) return { label: 'Large text only', tone: 'large' }
  return { label: 'Fails', tone: 'fail' }
}

// Best text colour (white or ink) to print on top of a swatch.
export const onColour = (hex: string) => (contrast('#ffffff', hex) >= contrast('#111827', hex) ? '#ffffff' : '#111827')
