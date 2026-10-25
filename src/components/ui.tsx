import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

type Variant = "primary" | "secondary" | "ghost" | "ink";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-signal-ink hover:bg-signal-strong shadow-[0_0_0_1px_rgb(196_245_74/0.4),0_10px_30px_-12px_rgb(196_245_74/0.6)]",
  secondary: "border border-line-strong bg-surface-2/60 text-fg hover:border-fg/40 hover:bg-surface-3",
  ghost: "text-fg hover:text-signal",
  ink: "bg-signal-ink text-signal hover:bg-black",
};

export function ButtonLink({
  href,
  variant = "primary",
  arrow = false,
  className,
  children,
  ...rest
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean }) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.95rem] font-semibold transition-colors duration-200",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && (
        <Icon name="arrow-up-right" className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}

/** Monospaced label, e.g. "[ 02 ] Services". */
export function Label({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cx("inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted", className)}>
      {index && <span className="text-signal">[ {index} ]</span>}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  intro,
  className,
  as: Tag = "h2",
  aside,
}: {
  index?: string;
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
  aside?: ReactNode;
}) {
  return (
    <div className={cx("flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="max-w-3xl">
        {label && <Label index={index}>{label}</Label>}
        <Tag
          className={cx(
            "mt-4 font-semibold leading-[1.04]",
            Tag === "h1" ? "text-4xl sm:text-5xl lg:text-[4.25rem]" : "text-3xl sm:text-4xl lg:text-[3.1rem]",
          )}
        >
          {title}
        </Tag>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

/** A bento tile. Spans are set by the caller with grid classes. */
export function Tile({
  className,
  children,
  as: Tag = "div",
  delay,
  id,
}: {
  className?: string;
  children: ReactNode;
  as?: "div" | "article" | "li" | "section";
  delay?: number;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cx("tile reveal p-6 sm:p-7", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

export function IconBadge({ name, className }: { name: ComponentProps<typeof Icon>["name"]; className?: string }) {
  return (
    <span className={cx("inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-signal", className)}>
      <Icon name={name} className="h-5 w-5" />
    </span>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cx("group inline-flex items-center gap-1.5 font-semibold text-signal underline-offset-4 hover:underline", className)}
    >
      {children}
      <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Bullets({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cx("space-y-2.5", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[0.97rem] leading-relaxed text-fg/85">
          <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="flex gap-3 rounded-2xl border border-dashed border-sample/50 bg-sample/5 p-4 text-sm leading-relaxed text-fg/85">
      <span className="mt-0.5 h-fit shrink-0 rounded bg-sample px-1.5 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-wider text-void">
        Draft
      </span>
      <div>{children}</div>
    </div>
  );
}
