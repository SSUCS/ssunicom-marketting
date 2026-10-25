"use client";

import { useEffect, useRef, useState } from "react";
import type { FunnelScene } from "./funnel3d";
import { cx } from "./ui";
import { Funnel } from "./visuals";

/**
 * Hero funnel: the 3D scene in funnel3d.ts, loaded after the page and faded
 * in. The SVG funnel is shown instead without JavaScript or WebGL. Fill a
 * relatively positioned cell with this component.
 */
export function HeroFunnel() {
  const wrap = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const c = canvas.current;
    const w = wrap.current;
    const b = box.current;
    if (!c || !w || !b) return;
    let scene: FunnelScene | null = null;
    let cancelled = false;
    const family = getComputedStyle(w).getPropertyValue("--font-roboto-mono").trim() || "monospace";
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    Promise.all([import("./funnel3d"), document.fonts.load(`500 40px ${family}`).catch(() => [])])
      .then(([{ createFunnelScene }]) => {
        if (cancelled) return;
        scene = createFunnelScene({
          canvas: c,
          container: w,
          measure: b,
          animate,
          fontFamily: family,
          onReady: () => setReady(true),
        });
        if (!scene) setFailed(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      scene?.dispose();
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden="true" className="absolute inset-0">
      <div
        ref={box}
        className={cx(
          "absolute bottom-0 left-1/2 w-[min(94%,30rem)] -translate-x-1/2 lg:w-[42.5cqw]",
          !failed && "[html.js_&]:invisible",
        )}
      >
        <Funnel className="block h-auto w-full" />
      </div>
      <canvas
        ref={canvas}
        className={cx("absolute inset-0 size-full opacity-0 transition-opacity duration-700", ready && "opacity-100")}
      />
    </div>
  );
}
