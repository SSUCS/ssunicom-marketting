import type { ReactNode } from "react";
import { Container, DraftNotice, Label } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Shared layout for the legal pages: title, draft notice, contents and sections. */
export function LegalPage({ title, intro, sections }: { title: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <Container className="pt-6 sm:pt-10">
      <div className="tile bg-grid p-7 sm:p-10 lg:p-12">
        <Label>Legal</Label>
        <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <div className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{intro}</div>
        <div className="mt-8 max-w-3xl">
          <DraftNotice>
            <strong>Outline only — for the company&apos;s legal adviser to complete.</strong> Do not publish drafted legal
            text without review. Because the company contacts US consumers for clients, the review should cover US
            telemarketing rules (TCPA, Telemarketing Sales Rule) and India&apos;s Digital Personal Data Protection Act.
          </DraftNotice>
        </div>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-12">
        <nav aria-label="On this page" className="lg:col-span-4">
          <div className="tile p-6 lg:sticky lg:top-24">
            <Label>Contents</Label>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted hover:text-signal">
                    <span className="font-mono text-dim">{String(i + 1).padStart(2, "0")}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="tile p-6 sm:p-9 lg:col-span-8">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-line py-7 first:border-t-0 first:pt-0 last:pb-0">
              <h2 className="text-xl font-semibold sm:text-2xl">
                <span className="mr-2 font-mono text-base text-signal">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="mt-3 space-y-3 leading-relaxed text-fg/80 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}

/** Note for the legal adviser inside a legal section. */
export function ToDraft({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-sample/50 bg-sample/5 px-3 py-2 text-sm text-sample">
      <span className="font-mono text-[0.65rem] font-bold uppercase tracking-wider">To draft · </span>
      {children}
    </p>
  );
}
