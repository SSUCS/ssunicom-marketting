"use client";

import { useEffect, useRef, useState } from "react";
import type { FunnelScene } from "./funnelCanvas";
import { cx } from "./ui";
import { Funnel } from "./visuals";

/** Resolves when the promise settles or after `ms`, whichever comes first. */
const settle = (p: Promise<unknown>, ms: number) =>
  Promise.race([p.catch(() => undefined), new Promise((r) => setTimeout(r, ms))]);

/**
 * Hero funnel: lead sources dropping in and swirling down, drawn on a canvas
 * by funnelCanvas.ts (a still under reduced motion), loaded after the page and
 * faded in. The SVG funnel shows without JavaScript, or if the canvas version
 * fails. Fill a relatively positioned cell with this component.
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
    let done = false;
    const fail = () => {
      if (done) return;
      done = true;
      scene?.dispose();
      scene = null;
      setReady(false);
      setFailed(true);
    };
    const family = getComputedStyle(w).getPropertyValue("--font-roboto-mono").trim() || "monospace";

    // Labels look best in the site font, but never hold the funnel back for it.
    Promise.all([import("./funnelCanvas"), settle(document.fonts.load(`500 40px ${family}`), 1500)])
      .then(([{ createFunnelCanvas }]) => {
        if (done) return;
        scene = createFunnelCanvas({
          canvas: c,
          container: w,
          measure: b,
          animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          fontFamily: family,
          onReady: () => {
            if (!done) setReady(true);
          },
          onFail: fail,
        });
        if (!scene) fail();
      })
      .catch(fail);

    return () => {
      done = true;
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
