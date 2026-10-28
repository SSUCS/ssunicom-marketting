import { LinkRow } from '@/components/ui/CMSLink'
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs'
import { Media } from '@/components/ui/Media'
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

function HomeHero({ hero }: { hero: Page['hero'] }) {
  return (
    <section className="relative isolate overflow-hidden bg-cobalt-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="hero-art absolute inset-0">
          <Media resource={hero.media || hero.poster} fill priority imgClassName="object-cover object-[70%_center]" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,34,37,0.92)_0%,rgba(7,34,37,0.72)_38%,rgba(7,34,37,0.15)_75%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cobalt-950/70 to-transparent" />
      </div>
      <div className="light-sweep absolute inset-0 -z-10" />
      <div className="container-x flex min-h-[620px] flex-col justify-center py-24 sm:min-h-[700px] lg:min-h-[min(82vh,760px)]">
        <div className="max-w-[44rem]">
          {hero.eyebrow && (
            <p data-reveal className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.72rem] font-bold tracking-[0.16em] text-teal-200 uppercase backdrop-blur">
              <span className="size-1.5 animate-pulse rounded-full bg-teal-300" />
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
    <section className="relative overflow-hidden bg-stone-50">
      <div aria-hidden className="orb pointer-events-none absolute -top-32 left-1/3 size-[36rem] rounded-full bg-cobalt-100/70 blur-3xl" />
      <div aria-hidden className="orb pointer-events-none absolute top-20 -right-20 size-[22rem] rounded-full bg-amber-200/40 blur-3xl [animation-delay:-5s]" />
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
    <section className="relative overflow-hidden bg-stone-50">
      <div aria-hidden className="orb pointer-events-none absolute -top-40 right-0 size-[30rem] rounded-full bg-cobalt-100/60 blur-3xl" />
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
