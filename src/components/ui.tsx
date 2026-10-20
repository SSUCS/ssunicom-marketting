import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "./Icon";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>;
}

type Variant = "primary" | "secondary" | "light" | "ghost-dark";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-strong shadow-[0_1px_0_rgb(255_255_255/0.2)_inset,0_8px_20px_-10px_rgb(13_122_114/0.7)]",
  secondary: "border border-ink/15 bg-white/60 text-ink hover:border-ink/40 hover:bg-white",
  light: "bg-white text-ink hover:bg-accent-soft",
  "ghost-dark": "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
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
        <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={cx(
        "mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]",
        dark ? "text-accent-bright" : "text-accent",
      )}
    >
      <span aria-hidden className={cx("h-px w-6", dark ? "bg-accent-bright" : "bg-accent")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cx("max-w-2xl", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <Tag
        className={cx(
          "text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cx("mt-5 text-lg leading-relaxed", dark ? "text-mist" : "text-muted")}>{intro}</p>
      )}
    </div>
  );
}

/**
 * Marks content the company must confirm before launch.
 * Search the codebase for "<Placeholder" to find every instance.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-amber-600/50 bg-amber-50 px-2 py-0.5 text-sm text-amber-900">
      <span className="text-[0.65rem] font-bold uppercase tracking-wider">To confirm</span>
      <span>{children}</span>
    </span>
  );
}

export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <div
      role="note"
      className="flex gap-3 rounded-xl border border-dashed border-amber-600/50 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950"
    >
      <span className="mt-0.5 shrink-0 rounded bg-amber-200 px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider">
        Draft
      </span>
      <div>{children}</div>
    </div>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-1.5 font-semibold text-accent underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
      <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
