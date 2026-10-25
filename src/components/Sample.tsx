import type { ReactNode } from "react";
import { SHOW_SAMPLE_MARKERS, facts, type Fact, type FactKey } from "@/lib/placeholders";
import { cx } from "./ui";

/**
 * Renders a fact from src/lib/placeholders.ts. Unconfirmed facts get a
 * dotted orange underline. Search for "<Fill" to find every use.
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

/** Inline sample marker for text that is not a single fact (names, list items). */
export function SampleMark({ children, title, className }: { children: ReactNode; title?: string; className?: string }) {
  if (!SHOW_SAMPLE_MARKERS) return <span className={className}>{children}</span>;
  return (
    <>
      <span title={title ?? "Sample content, to be replaced"} className={cx("sample-mark", className)}>
        {children}
      </span>
      <span className="sr-only"> (sample)</span>
    </>
  );
}

/** Small "Sample" chip for a whole card or block of sample content. */
export function SampleTag({
  show = true,
  children = "Sample",
  className,
}: {
  show?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  if (!SHOW_SAMPLE_MARKERS || !show) return null;
  return (
    <span
      className={cx(
        "inline-flex shrink-0 items-center gap-1.5 border border-orange bg-panel px-1.5 py-[3px] font-mono text-[0.625rem] leading-none uppercase tracking-[0.12em] text-ink",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 bg-orange" />
      {children}
    </span>
  );
}

export const isShown = (k: FactKey) => (facts[k] as Fact).hidden !== true;
