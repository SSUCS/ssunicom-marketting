import Link from "next/link";
import { Fragment, type CSSProperties, type ElementType, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

/** Page-width wrapper whose edges line up with the outer grid lines. */
export function Wrap({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("wrap", className)}>{children}</div>;
}

/**
 * One row of the page grid: four columns on desktop, two on tablets, one on
 * phones, with a rule along the top. Columns line up with the fixed grid lines.
 */
export function Row({
  as: Tag = "div",
  className,
  children,
  id,
  style,
  full = false,
}: {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  id?: string;
  style?: CSSProperties;
  /** A single full-width cell, e.g. for sliders. */
  full?: boolean;
}) {
  return (
    <Tag
      id={id}
      style={style}
      className={cx("border-t border-line", !full && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4", className)}
    >
      {children}
    </Tag>
  );
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** Chamfered button. Variants: orange (default), dark, or outlined. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  icon,
  className,
  newTab = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "dark" | "line";
  arrow?: boolean;
  icon?: IconName;
  className?: string;
  newTab?: boolean;
}) {
  const inner = (
    <>
      {icon && <Icon name={icon} className="h-4 w-4" />}
      {children}
      {arrow && <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2} />}
    </>
  );
  const cls = cx("btn", variant === "dark" && "btn-dark", variant === "line" && "btn-line", className);
  const content = variant === "line" ? <span>{inner}</span> : inner;
  if (isExternal(href)) {
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/** "■ Title" with an optional grey line underneath, used to introduce a block. */
export function Lead({
  title,
  sub,
  as: Tag = "p",
  className,
  size = "lg",
}: {
  title: ReactNode;
  sub?: ReactNode;
  as?: ElementType;
  className?: string;
  size?: "lg" | "md";
}) {
  return (
    <div className={className}>
      <Tag className={cx("flex items-start gap-2.5 leading-snug", size === "lg" ? "text-xl md:text-2xl" : "text-lg md:text-xl")}>
        <span aria-hidden className="mt-[0.5em] size-2 shrink-0 bg-ink" />
        <span>{title}</span>
      </Tag>
      {sub && <p className="mt-3 pl-[1.1rem] text-sm text-mute">{sub}</p>}
    </div>
  );
}

/** Small uppercase label with orange squares, e.g. "■ DIGITAL REACH". */
export function Micro({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("flex items-center gap-3 font-mono text-[0.8125rem] uppercase tracking-[0.04em]", className)}>
      <span aria-hidden className="size-3 shrink-0 bg-orange" />
      {children}
    </p>
  );
}

/**
 * Big display heading. Letters slide up when it scrolls into view.
 * Use "\n" for a line break everywhere and "|" for a break on phones only.
 */
export function DisplayHeading({
  text,
  as: Tag = "h2",
  className,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  const plain = text.replace(/\|/g, "").replace(/\n/g, " ");
  let index = 0;
  const lines = text.split("\n").map((line) =>
    line.split("|").map((segment) =>
      segment.split(" ").map((word) => [...word].map((ch) => ({ ch, i: index++ }))),
    ),
  );

  return (
    <Tag id={id} className={cx("display split", className)}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {lines.map((segments, li) => (
          <span key={li} className="block">
            {segments.map((words, si) => (
              <Fragment key={si}>
                {si > 0 && <br className="md:hidden" />}
                {words.map((chars, wi) => (
                  <Fragment key={wi}>
                    {wi > 0 && " "}
                    <span className="w">
                      {chars.map(({ ch, i }) => (
                        <span key={i} className="c" style={{ "--i": i } as CSSProperties}>
                          {ch}
                        </span>
                      ))}
                    </span>
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Heading panel used at the top of each home-page section. */
export function HeadingPanel({
  text,
  id,
  className,
  headingClassName,
  children,
}: {
  text: string;
  id?: string;
  className?: string;
  headingClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cx("panel relative z-[2] flex items-center px-6 py-10 md:px-10 lg:py-12", className)}>
      <DisplayHeading id={id} text={text} className={cx("h-section", headingClassName)} />
      {children}
    </div>
  );
}

/** Black square button with an arrow, for "see more" links. */
export function ArrowBox({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cx("grid size-11 place-items-center bg-ink text-panel transition-colors hover:bg-orange hover:text-ink", className)}
    >
      <Icon name="arrow-right" className="h-5 w-5" strokeWidth={2.2} />
    </Link>
  );
}

/** Decorative box with an X and a centre dot. */
export function Crosshair({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cx("block size-[2.65rem] border border-line bg-panel", className)}>
      <svg viewBox="0 0 42 42" className="h-full w-full text-line" fill="none" stroke="currentColor">
        <path d="M8 8l26 26M34 8 8 34" />
        <rect x="18.5" y="18.5" width="5" height="5" fill="#636363" stroke="none" />
      </svg>
    </span>
  );
}

/** Decorative box with a ringed dot. */
export function RadioDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cx("grid size-[2.65rem] place-items-center border border-line bg-panel", className)}>
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-dim" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="9.5" />
        <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

/** Four small orange squares in the corners of a positioned parent. */
export function CornerSquares({ className }: { className?: string }) {
  const sq = "absolute size-3 bg-orange";
  return (
    <span aria-hidden className={cx("pointer-events-none absolute inset-4", className)}>
      <span className={cx(sq, "left-0 top-0")} />
      <span className={cx(sq, "right-0 top-0")} />
      <span className={cx(sq, "bottom-0 left-0")} />
      <span className={cx(sq, "bottom-0 right-0")} />
    </span>
  );
}

/** The orange tick used in tag lists. */
export function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 16" aria-hidden className={cx("h-3.5 w-5 shrink-0 text-orange", className)}>
      <path d="M2 8.5 7.5 13 20 2" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square" />
    </svg>
  );
}

/** Horizontally scrolling track. Pair it with <SliderButtons target={id} />. */
export function Slider({
  id,
  label,
  className,
  children,
}: {
  id: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cx("no-scrollbar relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain", className)}
    >
      {children}
    </div>
  );
}
