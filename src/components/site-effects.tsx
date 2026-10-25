"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

let lenis: Lenis | null = null;

/** Stops page scrolling while an overlay (the mobile menu) is open. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/** Smooth wheel scrolling on desktop. Off for reduced-motion users and touch devices. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.12, anchors: { offset: -96 } });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}

/** Runs the first-visit preloader: counts to 100, then dissolves the pixel cover. */
export function PreloaderController() {
  useEffect(() => {
    const root = document.getElementById("preloader");
    if (!root) return;
    const html = document.documentElement;
    if (html.classList.contains("pl-skip")) {
      root.remove();
      return;
    }
    const counter = root.querySelector<HTMLElement>("[data-count]");
    const duration = 950;
    const start = performance.now();
    let raf = 0;
    let timer = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      if (counter) counter.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      root.classList.add("go");
      try {
        sessionStorage.setItem("ssu-pl", "1");
      } catch {
        /* storage unavailable: the preloader simply shows again next time */
      }
      timer = window.setTimeout(() => root.remove(), 900);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);
  return null;
}

/** Dismissible notice explaining that sample details are placeholders. */
export function PreviewNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem("ssu-preview-dismissed") === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) return;
    const t = window.setTimeout(() => setShow(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem("ssu-preview-dismissed", "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <aside
      aria-label="Preview notice"
      className="fixed bottom-3 right-3 z-[60] w-[min(24rem,calc(100vw-1.5rem))] border border-ink-2 bg-ink-2 text-panel shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)]"
    >
      <div className="p-4 pr-14 text-[0.8125rem] leading-snug">
        <p>
          <span className="text-orange">Preview build.</span> Names, numbers and quotes marked “Sample” are placeholders until
          the real details arrive.
        </p>
        <Link
          href="/placeholders"
          className="mt-3 inline-flex min-h-10 items-center bg-panel px-4 font-mono text-xs uppercase tracking-wide text-ink [--cut:8px] chamfer-br hover:bg-orange"
        >
          See the checklist
        </Link>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="absolute bottom-0 right-0 grid size-12 place-items-center border-l border-t border-mute/40 hover:bg-panel hover:text-ink"
        aria-label="Dismiss preview notice"
      >
        <Icon name="close" className="h-5 w-5" strokeWidth={2} />
      </button>
    </aside>
  );
}
