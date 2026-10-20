import type { ReactNode } from "react";
import { Container, DraftNotice, Eyebrow } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Shared layout for the legal pages: title, draft notice, contents and sections. */
export function LegalPage({
  title,
  intro,
  lastUpdated,
  sections,
}: {
  title: string;
  intro: ReactNode;
  lastUpdated: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-muted">Last updated: {lastUpdated}</p>
        <div className="mt-8">
          <DraftNotice>
            <strong>Draft — requires company and legal review.</strong> This page is a structured placeholder. Items
            marked &ldquo;To confirm&rdquo; must be completed by SS Unicom Service and the full text reviewed by a
            qualified legal adviser before the website is published.
          </DraftNotice>
        </div>
        <div className="mt-8 text-lg leading-relaxed text-muted">{intro}</div>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Contents</h2>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted hover:text-accent">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="max-w-3xl lg:col-span-9">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-line py-8 first:border-t-0 first:pt-0">
              <h2 className="text-2xl font-bold">
                <span className="mr-2 text-accent">{i + 1}.</span>
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-ink/80 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
