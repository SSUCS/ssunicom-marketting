import type { ReactNode } from "react";
import { SampleTag } from "./Sample";
import { PageHero, Spacer } from "./sections";
import { Row } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };

const pad = (n: number) => String(n).padStart(2, "0");

/** Shared layout for the legal pages: title, draft notice, contents and numbered sections. */
export function LegalPage({ title, intro, sections }: { title: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <div className="wrap @container">
      <PageHero
        size="md"
        label="Legal"
        title={title}
        intro={intro}
        aside={
          <div role="note" className="flex h-full flex-col justify-end gap-4 p-6 md:p-7 lg:py-9">
            <SampleTag className="self-start">Outline only</SampleTag>
            <p className="text-sm leading-relaxed">
              For the company’s legal adviser to complete before launch. Because we call US consumers for clients, the
              review should cover US telemarketing rules (TCPA, Telemarketing Sales Rule) and India’s Digital Personal
              Data Protection Act.
            </p>
          </div>
        }
      />

      <Spacer />
      <Row>
        <nav aria-label="On this page" className="p-6 max-lg:hidden md:p-8">
          <div className="sticky top-28">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-mute">Contents</p>
            <ol className="mt-5 space-y-3 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 leading-snug transition-colors hover:text-orange-deep">
                    <span className="font-mono text-mute">{pad(i + 1)}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="panel relative z-[2] md:col-span-2 lg:col-span-3">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-line p-6 first:border-t-0 md:p-10">
              <h2 className="flex items-baseline gap-3 text-xl leading-snug md:text-2xl">
                <span className="font-mono text-sm text-orange-deep">{pad(i + 1)}</span>
                {s.title}
              </h2>
              <div className="mt-4 max-w-3xl space-y-3 leading-relaxed text-ink/80 [&_a]:underline [&_a]:decoration-orange [&_a]:underline-offset-4 [&_a:hover]:text-orange-deep [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </Row>
    </div>
  );
}

/** Note for the legal adviser inside a legal section. */
export function ToDraft({ children }: { children: ReactNode }) {
  return (
    <p className="border border-dashed border-orange bg-bg px-3 py-2 text-sm text-ink">
      <span className="font-mono text-[0.625rem] font-bold uppercase tracking-wider text-orange-deep">To draft · </span>
      {children}
    </p>
  );
}
