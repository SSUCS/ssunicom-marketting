"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { tubeStages } from "@/lib/content";
import { scrambleText } from "./motion";
import { cx } from "./ui";
import { PixelPortrait } from "./visuals";

/*
 * The lead tube: a glass tube that runs down the middle of the home page.
 * A lead card travels down it as you scroll and changes status each time it
 * passes a collar ([data-tube-marker]). Sizes use container units, so the
 * page section that holds the tube must be a size container (`@container`).
 */

function LeadCard({ stage, className, style }: { stage: number; className?: string; style?: CSSProperties }) {
  const label = useRef<HTMLParagraphElement>(null);
  const first = useRef(true);
  const s = tubeStages[stage];

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (label.current) scrambleText(label.current, s.label.toUpperCase(), 380);
  }, [s.label]);

  return (
    <div
      className={cx("chamfer bg-panel p-3 shadow-[0_18px_30px_-16px_rgb(0_0_0/0.45)] [--cut:9px]", className)}
      style={style}
    >
      <div className="flex items-center justify-between font-mono text-[0.625rem] uppercase tracking-[0.12em] text-mute">
        <span>Lead #0142</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse bg-orange" />
          Live
        </span>
      </div>
      <div className="mt-2.5 flex items-center gap-3">
        <PixelPortrait seed={11} className="size-10 shrink-0" />
        <div className="min-w-0">
          <p ref={label} className="display text-[1.05rem] leading-none">
            {s.label.toUpperCase()}
          </p>
          <p className="mt-1.5 truncate text-[0.6875rem] text-mute">{s.note}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1">
        {tubeStages.map((_, i) => (
          <span key={i} className={cx("h-1.5 transition-colors duration-500", i <= stage ? "bg-orange" : "bg-line-2")} />
        ))}
      </div>
    </div>
  );
}

/** Desktop tube. Place inside a relative, `@container` wrapper; it fills the wrapper's height. */
export function LeadTube() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el || el.offsetParent === null) return;
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      let passed = 0;
      document.querySelectorAll<HTMLElement>("[data-tube-marker]").forEach((m) => {
        const mr = m.getBoundingClientRect();
        if (mr.top + mr.height / 2 < mid) passed++;
      });
      setStage(Math.min(passed, tubeStages.length - 1));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] hidden w-[var(--tube-w)] -translate-x-1/2 lg:block"
    >
      <div className="tube-glass" />
      <div className="absolute inset-x-0 bottom-[16%] h-[26rem] overflow-hidden [--h:26rem]">
        {[
          { x: "18%", d: "0s", t: "7s", sz: "8px" },
          { x: "34%", d: "-2.4s", t: "8.5s", sz: "5px" },
          { x: "61%", d: "-4.1s", t: "6.4s", sz: "9px" },
          { x: "77%", d: "-1.2s", t: "9s", sz: "6px" },
          { x: "48%", d: "-5.6s", t: "7.6s", sz: "4px" },
        ].map((b) => (
          <span key={b.x} className="bubble" style={{ "--x": b.x, "--d": b.d, "--t": b.t, "--sz": b.sz } as CSSProperties} />
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 bottom-[11rem]">
        <div ref={ref} className="sticky top-[calc(50vh-3.5rem)] mx-auto mt-28 w-[min(84%,15.5rem)]">
          <LeadCard stage={stage} className="float" />
        </div>
      </div>
    </div>
  );
}

/**
 * A collar ring around the tube; `band` adds the glowing orange ring. Place it
 * directly inside a full-width, relatively positioned row. With `marker`, the
 * lead card changes status as it passes.
 */
export function TubeCollar({
  band = false,
  marker = true,
  className,
}: {
  band?: boolean;
  marker?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      data-tube-marker={marker ? "" : undefined}
      className={cx("pointer-events-none absolute left-1/2 z-[1] hidden h-14 lg:block", className)}
    >
      <div className="collar top-0 h-14" />
      {band && <div className="band top-[1.55rem]" />}
    </div>
  );
}

/** The platform the tube ends in: where qualified leads reach the client's team. */
export function TubeBase({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx("pointer-events-none relative z-[2] mx-auto h-[14rem] w-[calc(var(--collar-w)*1.18)]", className)}
    >
      <div className="collar left-1/2 top-0 h-10" />
      <div
        className="absolute inset-x-0 top-10 bottom-0"
        style={{
          clipPath: "polygon(6% 0, 94% 0, 100% 20%, 100% 84%, 93% 100%, 7% 100%, 0 84%, 0 20%)",
          background:
            "linear-gradient(90deg, #b4b4b4 0%, #dcdcdc 7%, #f6f6f6 20%, #ffffff 34%, #efefef 55%, #d9d9d9 76%, #c6c6c6 90%, #a4a4a4 100%)",
        }}
      >
        <div className="band left-1/2 top-[22%] w-full" />
        <div className="absolute inset-x-0 top-[48%] text-center font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-mute">
          Your sales team
        </div>
        <div className="absolute inset-y-0 left-1/2 w-px bg-black/10" />
      </div>
    </div>
  );
}

/** Phones and tablets: a short tube where the lead card cycles through its stages. */
export function TubeShowcase({ className }: { className?: string }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setStage((s) => (s + 1) % tubeStages.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cx("relative mx-auto h-[22rem] w-[min(72%,17rem)] [--collar-w:120%] lg:hidden", className)}
    >
      <div className="tube-glass" />
      <div className="collar top-6 h-11" />
      <div className="collar bottom-8 h-11" />
      <div className="band bottom-[3.15rem]" />
      <div className="absolute inset-x-0 top-1/2 mx-auto w-[86%] -translate-y-1/2">
        <LeadCard stage={stage} className="float" />
      </div>
    </div>
  );
}
