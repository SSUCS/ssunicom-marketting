import Link from "next/link";
import type { ReactNode } from "react";
import type { Role } from "@/lib/content";
import type { Glyph } from "@/lib/placeholders";
import { Icon, type IconName } from "./Icon";
import { SampleMark, SampleTag } from "./Sample";
import { cx } from "./ui";
import { ClientLogo, IsoIcon, PixelPortrait } from "./visuals";

/** Numbered card with an isometric icon, as used for services and steps. */
export function NumberCard({
  n,
  icon,
  title,
  text,
  className,
  as: Tag = "article",
}: {
  n: number;
  icon: IconName;
  title: ReactNode;
  text?: ReactNode;
  className?: string;
  as?: "article" | "li";
}) {
  return (
    <Tag className={cx("panel flex flex-col p-4", className)}>
      <div className="flex items-center justify-between font-mono text-xs">
        <span aria-hidden className="size-1.5 bg-ink" />
        <span>{String(n).padStart(2, "0")}</span>
      </div>
      <IsoIcon name={icon} className="mx-auto mt-4 w-full max-w-[8.25rem]" />
      <h3 className="mt-auto pt-6 text-[1.0625rem] leading-snug">{title}</h3>
      {text && <p className="mt-2 text-xs leading-relaxed text-mute">{text}</p>}
    </Tag>
  );
}

/** A 2×2 grid of figures with small labels. */
export function StatGrid({ stats, className }: { stats: readonly { value: ReactNode; label: string }[]; className?: string }) {
  return (
    <dl className={cx("grid grid-cols-2", className)}>
      {stats.map((s, i) => (
        <div key={i} className={cx("px-4 py-4", i % 2 === 0 && "border-r border-line", i < 2 && "border-b border-line")}>
          <dt className="sr-only">{s.label}</dt>
          <dd className="text-lg leading-tight md:text-xl">{s.value}</dd>
          <dd aria-hidden className="mt-1.5 text-[0.6875rem] text-mute">
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Sample case study: tag tab, logo, figures and an enquiry arrow. */
export function CaseCard({
  item,
  confirmed,
  className,
}: {
  item: {
    tag: string;
    client: string;
    glyph: Glyph;
    text: string;
    stats: readonly { value: string; label: string }[];
  };
  confirmed: boolean;
  className?: string;
}) {
  return (
    <article className={cx("flex flex-col", className)}>
      <div className="flex items-end justify-between gap-3">
        <span className="border border-b-0 border-line bg-panel px-3 py-1.5 text-xs">{item.tag}</span>
        <SampleTag show={!confirmed} className="mb-1.5" />
      </div>
      <div className="panel flex flex-1 flex-col">
        <div className="flex min-h-40 flex-col items-center justify-center gap-3 border-b border-line px-6 py-8 text-center">
          <ClientLogo name={item.client} glyph={item.glyph} font="sans" />
          <p className="max-w-[17rem] text-xs leading-relaxed text-mute">{item.text}</p>
        </div>
        <div className="grid flex-1 grid-cols-[1fr_4.5rem] md:grid-cols-[1fr_5.5rem]">
          <StatGrid stats={item.stats} className="border-r border-line" />
          <Link
            href="/contact"
            className="grid place-items-center transition-colors hover:bg-ink hover:text-panel"
            aria-label={`Ask about results like ${item.client}’s`}
          >
            <Icon name="arrow-right" className="h-5 w-5" strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Testimonial: pixel portrait, attribution, quote and a quote mark column. */
export function TestimonialCard({
  item,
  seed,
  confirmed,
  className,
}: {
  item: { quote: string; role: string; org: string };
  seed: number;
  confirmed: boolean;
  className?: string;
}) {
  return (
    <figure className={cx("panel flex flex-col", className)}>
      <div className="flex items-center gap-5 p-6">
        <PixelPortrait seed={seed} className="size-[5.5rem] shrink-0 chamfer [--cut:12px]" />
        <figcaption className="min-w-0">
          <p className="text-lg leading-snug md:text-xl">{item.role}</p>
          <p className="mt-1.5 text-sm text-mute">{item.org}</p>
          <SampleTag show={!confirmed} className="mt-3" />
        </figcaption>
      </div>
      <div className="grid flex-1 grid-cols-[1fr_4.5rem] md:grid-cols-[1fr_5.5rem]">
        <blockquote className="p-6 pt-4 text-[0.875rem] leading-[1.7]">
          <p>“{item.quote}”</p>
        </blockquote>
        <div className="grid place-items-center border-l border-t border-line">
          <Icon name="quote" className="h-6 w-6 text-orange" strokeWidth={1.4} />
        </div>
      </div>
    </figure>
  );
}

/** Team member: name header, pixel portrait and a "Bio +" toggle. */
export function TeamCard({
  item,
  seed,
  confirmed,
  className,
}: {
  item: { name: string; role: string; bio: string };
  seed: number;
  confirmed: boolean;
  className?: string;
}) {
  return (
    <article className={cx("relative flex flex-col", className)}>
      <header className="border border-line bg-panel px-4 py-4 text-center">
        <h3 className="text-lg">{confirmed ? item.name : <SampleMark>{item.name}</SampleMark>}</h3>
        <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-mute">{item.role}</p>
      </header>
      <div className="mx-[10%] border-x border-line bg-panel">
        <PixelPortrait seed={seed} res={44} className="aspect-[22/19] w-full" />
      </div>
      <details className="group relative border border-line bg-panel">
        <summary className="relative flex items-center justify-center gap-2 py-4 font-mono text-xs uppercase tracking-[0.06em] hover:bg-bg">
          <span aria-hidden className="absolute left-[10%] top-0 h-full border-l border-line" />
          <span aria-hidden className="absolute right-[10%] top-0 h-full border-r border-line" />
          <span aria-hidden className="absolute left-2 top-2 size-1.5 border-l-2 border-t-2 border-orange" />
          <span aria-hidden className="absolute right-2 top-2 size-1.5 border-r-2 border-t-2 border-orange" />
          Bio
          <Icon name="plus" className="h-3.5 w-3.5 text-orange transition-transform group-open:rotate-45" strokeWidth={2.4} />
          <span className="sr-only">for {item.name}</span>
        </summary>
        <p className="absolute inset-x-0 bottom-full z-10 bg-ink p-5 text-sm leading-relaxed text-panel">{item.bio}</p>
      </details>
    </article>
  );
}

/** Job opening card with an isometric illustration. */
export function RoleCard({ role, className }: { role: Role; className?: string }) {
  return (
    <article className={cx("flex flex-col border border-line bg-panel", className)}>
      <div className="relative grid h-52 place-items-center overflow-hidden border-b border-line [background-image:radial-gradient(#cfcfcf_1px,transparent_1px)] [background-size:9px_9px]">
        <IsoIcon name={role.icon} className="w-40" />
        <span className="absolute left-3 top-3 border border-line bg-panel px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em]">
          {role.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-xl leading-snug md:text-[1.375rem]">{role.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-mute">{role.text}</p>
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between border-t border-line pt-4 text-sm">
            <span>Kanpur</span>
            <span className="text-mute">Full-time</span>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Industry card with corner marks. */
export function IndustryCard({
  icon,
  market,
  title,
  text,
  className,
  children,
}: {
  icon: IconName;
  market: string;
  title: ReactNode;
  text: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article className={cx("brackets relative flex flex-col p-8 [--b-inset:1.25rem]", className)}>
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center border border-line bg-panel">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">{market}</span>
      </div>
      <h3 className="mt-8 text-xl leading-snug">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-mute">{text}</p>
      {children}
    </article>
  );
}
