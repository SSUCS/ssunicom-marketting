import { LinkRow } from '@/components/ui/CMSLink'
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs'
import { Media, isVideoMedia } from '@/components/ui/Media'
import { stagger } from '@/components/ui/Section'
import type { Page } from '@/payload-types'

function Words({ text }: { text: string }) {
  return (
    <span className="word-up">
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ '--w': i } as React.CSSProperties}>
          {w}
          {' '}
        </span>
      ))}
    </span>
  )
}

export function Hero({ hero, crumbs }: { hero: Page['hero']; crumbs?: Crumb[] }) {
  if (!hero || hero.type === 'none') return null
  if (hero.type === 'home') return <HomeHero hero={hero} />
  if (hero.type === 'simple') return <SimpleHero hero={hero} crumbs={crumbs} />
  return <StandardHero hero={hero} crumbs={crumbs} />
}

function Eyebrow({ text }: { text: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.72rem] font-bold tracking-[0.16em] text-brand-200 uppercase backdrop-blur">
      <span className="size-1.5 animate-pulse rounded-full bg-brand-300" />
      {text}
    </p>
  )
}

/**
 * Home hero when the media is a film with its own words in it: the film leads at full width and
 * is never cropped at the sides, so its centred text stays whole. The page H1 is still in the
 * HTML (search engines, screen readers); it shows under the film on phones and is visually hidden
 * from tablet up, where the eyebrow and buttons sit along the bottom edge of the film.
 */
function VideoHero({ hero }: { hero: Page['hero'] }) {
  const poster = hero.poster && typeof hero.poster === 'object' && hero.poster.url ? hero.poster.url : undefined
  return (
    <section className="relative isolate bg-navy-900 text-white">
      <div className="relative aspect-video max-h-[calc(100svh-7rem)] w-full overflow-hidden">
        <Media resource={hero.media} poster={poster} fill priority imgClassName="object-cover" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-44 bg-gradient-to-t from-navy-900/80 to-transparent md:block" />
        <div className="container-x absolute inset-x-0 bottom-0 hidden items-end justify-between gap-6 pb-8 md:flex">
          {hero.eyebrow ? <Eyebrow text={hero.eyebrow} /> : <span />}
          <LinkRow links={hero.links} />
        </div>
      </div>
      <div className="container-x py-8 md:py-0">
        {hero.eyebrow && (
          <div className="mb-4 md:hidden">
            <Eyebrow text={hero.eyebrow} />
          </div>
        )}
        {hero.heading && <h1 className="text-[2rem] leading-[1.08] font-bold text-white md:sr-only">{hero.heading}</h1>}
        {hero.text && <p className="mt-4 text-base leading-relaxed text-white/85 md:hidden">{hero.text}</p>}
        <LinkRow links={hero.links} className="mt-6 md:hidden" />
      </div>
    </section>
  )
}

function HomeHero({ hero }: { hero: Page['hero'] }) {
  if (isVideoMedia(hero.media)) return <VideoHero hero={hero} />
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="hero-art absolute inset-0">
          <Media resource={hero.media || hero.poster} fill priority imgClassName="object-cover object-[70%_center]" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,26,51,0.92)_0%,rgba(11,26,51,0.72)_38%,rgba(11,26,51,0.15)_75%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-900/70 to-transparent" />
      </div>
      <div className="light-sweep absolute inset-0 -z-10" />
      <div className="container-x flex min-h-[620px] flex-col justify-center py-24 sm:min-h-[700px] lg:min-h-[min(82vh,760px)]">
        <div className="max-w-[44rem]">
          {hero.eyebrow && (
            <p data-reveal className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.72rem] font-bold tracking-[0.16em] text-brand-200 uppercase backdrop-blur">
              <span className="size-1.5 animate-pulse rounded-full bg-brand-300" />
              {hero.eyebrow}
            </p>
          )}
          {hero.heading && (
            <h1 className="text-[2.6rem] leading-[1.04] font-bold text-white sm:text-[3.6rem] lg:text-[4.4rem]">
              <Words text={hero.heading} />
            </h1>
          )}
          {hero.text && (
            <p data-reveal style={stagger(4)} className="mt-6 max-w-[36rem] text-lg leading-relaxed text-white/85 sm:text-xl">
              {hero.text}
            </p>
          )}
          <div data-reveal style={stagger(6)}>
            <LinkRow links={hero.links} className="mt-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StandardHero({ hero, crumbs }: { hero: Page['hero']; crumbs?: Crumb[] }) {
  return (
    <section className="relative overflow-hidden bg-mist-50">
      <div aria-hidden className="orb pointer-events-none absolute -top-32 left-1/3 size-[36rem] rounded-full bg-brand-100/70 blur-3xl" />
      <div aria-hidden className="orb pointer-events-none absolute top-20 -right-20 size-[22rem] rounded-full bg-coral-200/40 blur-3xl [animation-delay:-5s]" />
      <div className="container-x relative grid items-center gap-10 pt-10 pb-16 sm:pt-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pb-24">
        <div>
          {crumbs && <Breadcrumbs items={crumbs} />}
          {hero.eyebrow && (
            <p data-reveal className="mt-8 mb-5">
              <span className="eyebrow">{hero.eyebrow}</span>
            </p>
          )}
          {hero.heading && (
            <h1 className="mt-4 text-[2.4rem] leading-[1.06] sm:text-[3.2rem] lg:text-[3.8rem]">
              <Words text={hero.heading} />
            </h1>
          )}
          {hero.text && (
            <p data-reveal style={stagger(4)} className="lead mt-6 max-w-2xl">
              {hero.text}
            </p>
          )}
          <div data-reveal style={stagger(6)}>
            <LinkRow links={hero.links} className="mt-9" />
          </div>
        </div>
        {hero.media && (
          <div data-reveal="scale" style={stagger(2)} className="card-frame">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Media resource={hero.media} fill priority imgClassName="object-cover hero-art" sizes="(min-width:1024px) 560px, 100vw" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function SimpleHero({ hero, crumbs }: { hero: Page['hero']; crumbs?: Crumb[] }) {
  return (
    <section className="relative overflow-hidden bg-mist-50">
      <div aria-hidden className="orb pointer-events-none absolute -top-40 right-0 size-[30rem] rounded-full bg-brand-100/60 blur-3xl" />
      <div className="container-x relative pt-10 pb-12 sm:pt-14 sm:pb-16">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {hero.eyebrow && (
          <p data-reveal className="mt-8 mb-4">
            <span className="eyebrow">{hero.eyebrow}</span>
          </p>
        )}
        {hero.heading && <h1 className="mt-4 max-w-4xl text-[2.3rem] leading-[1.08] sm:text-[3rem]">{hero.heading}</h1>}
        {hero.text && <p className="lead mt-5 max-w-3xl">{hero.text}</p>}
      </div>
    </section>
  )
}
