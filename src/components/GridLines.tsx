import { cx } from "./ui";

/**
 * The fixed vertical rules behind every page: five on desktop, three on
 * tablets and two on phones. Panels and rows are laid out to land on them.
 */
export function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 z-[-1]" style={{ left: "var(--gutter)", right: "var(--gutter)" }}>
      {[0, 25, 50, 75, 100].map((p) => (
        <span
          key={p}
          className={cx("absolute inset-y-0 w-px bg-line", (p === 25 || p === 75) && "max-lg:hidden", p === 50 && "max-md:hidden")}
          style={{ left: `${p}%` }}
        />
      ))}
    </div>
  );
}
