"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { Icon } from "./Icon";
import { cx } from "./ui";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Adds the "in" class to [data-reveal] elements and split headings when they
 * scroll into view. Watches the DOM so content from client-side navigation
 * is picked up too.
 */
export function RevealObserver() {
  useEffect(() => {
    const selector = "[data-reveal], .split";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const watch = (root: ParentNode) => {
      root.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains("in")) io.observe(el);
      });
    };
    watch(document);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches(selector)) io.observe(node);
            watch(node);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>";
const frames = new WeakMap<HTMLElement, number>();

/** Briefly shows random characters, then resolves to `text` from left to right. */
export function scrambleText(el: HTMLElement, text: string, duration = 520) {
  if (reducedMotion()) return;
  const start = performance.now();
  cancelAnimationFrame(frames.get(el) ?? 0);
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const revealed = Math.floor(p * text.length);
    let out = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      out += i < revealed || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) frames.set(el, requestAnimationFrame(tick));
  };
  frames.set(el, requestAnimationFrame(tick));
}

/**
 * Text that scrambles when it scrolls into view or when its parent is hovered.
 * Screen readers always get the plain text.
 */
export function Scramble({
  text,
  as: Tag = "span",
  trigger = "view",
  className,
}: {
  text: string;
  as?: ElementType;
  trigger?: "view" | "hover";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (trigger === "hover") {
      const host = el.closest("a, button") ?? el.parentElement;
      if (!host) return;
      const run = () => scrambleText(el, text, 420);
      host.addEventListener("pointerenter", run);
      host.addEventListener("focus", run);
      return () => {
        host.removeEventListener("pointerenter", run);
        host.removeEventListener("focus", run);
      };
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scrambleText(el, text, 700);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, trigger]);

  return (
    <Tag className={className}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </Tag>
  );
}

/** Previous / next buttons for a <Slider>. They can sit anywhere on the page. */
export function SliderButtons({ target, className }: { target: string; className?: string }) {
  const [state, setState] = useState({ prev: false, next: true });

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    const update = () =>
      setState({
        prev: el.scrollLeft > 4,
        next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target]);

  const go = (dir: 1 | -1) => {
    const el = document.getElementById(target);
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.getBoundingClientRect().width : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: reducedMotion() ? "auto" : "smooth" });
  };

  return (
    <div className={cx("flex", className)}>
      <button type="button" className="icon-btn" onClick={() => go(-1)} disabled={!state.prev} aria-controls={target} aria-label="Previous">
        <Icon name="chevron-left" className="h-5 w-5" strokeWidth={2.6} />
      </button>
      <button type="button" className="icon-btn" onClick={() => go(1)} disabled={!state.next} aria-controls={target} aria-label="Next">
        <Icon name="chevron-right" className="h-5 w-5" strokeWidth={2.6} />
      </button>
    </div>
  );
}
