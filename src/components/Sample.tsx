import type { ReactNode } from "react";
import { SHOW_SAMPLE_MARKERS, facts, type Fact, type FactKey } from "@/lib/placeholders";
import { cx } from "./ui";

/**
 * Renders a fact from src/lib/placeholders.ts. Unconfirmed facts get a
 * dashed outline and a "Sample" tag. Search for "<Fill" to find every use.
 */
export function Fill({ k, className }: { k: FactKey; className?: string }) {
  const f = facts[k];
  if (f.confirmed || !SHOW_SAMPLE_MARKERS) return <span className={className}>{f.value}</span>;
  return (
    <SampleMark title={`Sample: ${f.ask}`} className={className}>
      {f.value}
    </SampleMark>
  );
}

/** Inline sample marker for text that is not a single fact (list items, names). */
export function SampleMark({ children, title, className }: { children: ReactNode; title?: string; className?: string }) {
  if (!SHOW_SAMPLE_MARKERS) return <span className={className}>{children}</span>;
  return (
    <>
      <span
        title={title ?? "Sample content, to be replaced"}
        className={cx("rounded-[0.3em] border border-dashed border-sample/60 bg-sample/10 px-[0.3em] [box-decoration-break:clone]", className)}
      >
        {children}
      </span>
      <span className="sr-only">(sample)</span>
    </>
  );
}

/** Small "Sample" chip for a whole block of sample content. */
export function SampleTag({ show = true, children = "Sample", className }: { show?: boolean; children?: ReactNode; className?: string }) {
  if (!SHOW_SAMPLE_MARKERS || !show) return null;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border border-dashed border-sample/60 bg-sample/10 px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-sample",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sample" />
      {children}
    </span>
  );
}

export const isShown = (k: FactKey) => (facts[k] as Fact).hidden !== true;
