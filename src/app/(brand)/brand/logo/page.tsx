import { LOGO_FILES } from '@/brand/logoSvg'
import { Block, DoDont, NextLink, PageHead } from '@/brand/ui'
import { Logo, LogoMark } from '@/components/layout/Logo'

export const metadata = { title: 'Logo' }

export default function LogoPage() {
  return (
    <>
      <PageHead
        eyebrow="Logo"
        title="The crown mark"
        intro="Our mark is a line-drawn crown that also reads as a lotus: a promise of quality, drawn with an open, technical line. It comes in two tones, one for light backgrounds and one for dark."
      />

      <Block title="Versions">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-line bg-white p-8">
            <Logo />
          </div>
          <div className="flex min-h-48 items-center justify-center rounded-lg bg-navy-900 p-8">
            <Logo tone="light" />
          </div>
          <div className="flex min-h-40 items-center justify-center rounded-lg border border-line bg-mist-100 p-8">
            <LogoMark className="h-24 w-auto" />
          </div>
          <div className="flex min-h-40 items-center justify-center rounded-lg bg-brand-950 p-8">
            <LogoMark tone="light" className="h-24 w-auto" />
          </div>
        </div>
        <p className="mt-4 text-muted">Use the full logo wherever there is room. Use the crown mark alone for favicons, app icons, social avatars and small stamps.</p>
      </Block>

      <Block title="Clear space and size" intro="Keep an empty margin around the logo equal to the height of the crown’s centre diamond (about a quarter of the mark’s height). Never print the mark smaller than these sizes.">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="flex items-center justify-center rounded-lg border border-line bg-white p-10">
            <div className="relative border border-dashed border-coral-500 p-6">
              <Logo />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-1 text-xs font-semibold text-coral-600">clear space</span>
            </div>
          </div>
          <ul className="grid gap-3">
            {[
              ['Full logo, screen', '120 px wide'],
              ['Full logo, print', '30 mm wide'],
              ['Crown mark, screen', '24 px wide'],
              ['Crown mark, print', '8 mm wide'],
            ].map(([k, v]) => (
              <li key={k} className="flex items-baseline justify-between gap-4 rounded-lg border border-line bg-white px-5 py-4">
                <span className="font-semibold text-navy-900">{k}</span>
                <span className="text-muted tabular-nums">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </Block>

      <Block title="Do and don’t">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DoDont kind="do" caption="Use the colour logo on white or Mist backgrounds.">
            <Logo />
          </DoDont>
          <DoDont kind="do" caption="Use the light logo on Navy or dark teal.">
            <div className="rounded bg-navy-900 p-4">
              <Logo tone="light" />
            </div>
          </DoDont>
          <DoDont kind="dont" caption="Don’t recolour the crown, for example in coral or black.">
            <LogoMark className="h-20 w-auto [filter:hue-rotate(160deg)_saturate(2)]" />
          </DoDont>
          <DoDont kind="dont" caption="Don’t stretch, squash or rotate the logo.">
            <LogoMark className="h-20 w-40 [transform:rotate(-12deg)]" />
          </DoDont>
          <DoDont kind="dont" caption="Don’t put the colour logo on busy photos or mid-tone colours.">
            <div className="rounded bg-brand-500 p-4">
              <Logo />
            </div>
          </DoDont>
          <DoDont kind="dont" caption="Don’t add shadows, outlines or effects.">
            <LogoMark className="h-20 w-auto drop-shadow-[4px_6px_0_rgba(194,65,45,0.8)]" />
          </DoDont>
        </div>
      </Block>

      <Block title="Download" intro="SVG files scale to any size. The full logo uses the Figtree typeface for the name, so install Figtree before opening it in a design tool.">
        <ul className="grid gap-3 sm:grid-cols-2">
          {Object.entries(LOGO_FILES).map(([file, f]) => (
            <li key={file}>
              <a href={`/brand/assets/${file}`} download className="flex items-center justify-between gap-4 rounded-lg border border-line bg-white px-5 py-4 hover:border-brand-300">
                <span>
                  <span className="block font-semibold text-navy-900">{f.label}</span>
                  <span className="text-sm text-muted">{file}</span>
                </span>
                <span className="text-sm font-semibold text-brand-700">Download</span>
              </a>
            </li>
          ))}
        </ul>
      </Block>

      <NextLink href="/brand/colour" label="Colour" />
    </>
  )
}
