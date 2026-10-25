import { cx } from "./ui";

// Pixel "SS" monogram: two 5×7 letters with a one-pixel gap.
const S = [".####", "#....", "#....", ".###.", "....#", "....#", "####."];
const PX = 2.6;
const MONOGRAM = (() => {
  const rows = S.map((row) => `${row}.${row}`);
  const width = rows[0].length * PX;
  const height = rows.length * PX;
  const ox = (40 - width) / 2;
  const oy = (40 - height) / 2;
  let d = "";
  rows.forEach((row, y) =>
    [...row].forEach((cell, x) => {
      if (cell === "#") d += `M${(ox + x * PX).toFixed(2)} ${(oy + y * PX).toFixed(2)}h${PX - 0.3}v${PX - 0.3}h-${PX - 0.3}z`;
    }),
  );
  return d;
})();

/** The orange chamfered "SS" mark on its own. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path d="M8 0H40V32L32 40H0V8Z" fill="#ff7120" />
      <path d={MONOGRAM} fill="#0e0e0e" />
    </svg>
  );
}

/** Mark plus wordmark. The parent link supplies the accessible name. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cx("flex items-center gap-3", className)}>
      <LogoMark className={cx("shrink-0", compact ? "size-9" : "size-10")} />
      <span aria-hidden className="flex flex-col leading-none">
        <span className={cx("display tracking-[0.02em]", compact ? "text-[1.15rem]" : "text-[1.32rem]")}>SS Unicom</span>
        <span className="mt-[5px] font-mono text-[0.6rem] uppercase tracking-[0.46em] text-mute">Service</span>
      </span>
    </span>
  );
}
