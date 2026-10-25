import type { CSSProperties } from "react";
import { PIXEL_DELAYS } from "@/lib/pixels";
import { LogoMark } from "./Logo";
import { site } from "@/lib/site";

/**
 * First-visit loading screen. It is server-rendered so it covers the page from
 * the first paint; PreloaderController counts it up and dissolves it. An inline
 * script in <head> hides it on repeat visits and for reduced-motion users.
 */
export function Preloader() {
  return (
    <div id="preloader" className="px-cover" aria-hidden="true">
      {PIXEL_DELAYS.map((d, i) => (
        <i key={i} style={{ "--d": `${d}ms` } as CSSProperties} />
      ))}
      <div className="pl-ui fixed inset-0">
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-5">
            <LogoMark className="size-16" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-mute">Loading</p>
          </div>
        </div>
        <p data-count className="display absolute bottom-[var(--gutter)] left-[var(--gutter)] text-[clamp(5rem,22vh,14rem)] leading-[0.78]">
          000
        </p>
        <p className="absolute bottom-[var(--gutter)] right-[var(--gutter)] hidden font-mono text-xs uppercase tracking-[0.2em] text-mute md:block">
          {site.tagline}
        </p>
      </div>
    </div>
  );
}
