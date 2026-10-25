"use client";

import { useEffect, useRef, useState } from "react";
import { journeyStages } from "@/lib/content";
import { Icon } from "./Icon";
import { ButtonLink, Container, Label, cx } from "./ui";

/**
 * "From first click to qualified call" — the homepage's signature scroll scene.
 *
 * How it works:
 * - A tall track gives the section scroll distance; the bento panel inside
 *   is `position: sticky`, so normal page scrolling drives it (no scroll
 *   hijacking).
 * - Scroll progress (0–1) is read once per animation frame and written
 *   straight to the SVG (line dash offset, lead-node position). React state
 *   only changes when the active stage changes.
 * - Server render, no-JS and prefers-reduced-motion all get the "static"
 *   mode: the completed line plus a tile for every stage and the end card.
 *
 * Tuning: TRACK_VH (scroll length), STAGE_SHARE (portion of the scroll used
 * by the six stages) and the PATH / NODES geometry below.
 */

const TRACK_VH = 560;
const STAGE_SHARE = 0.88;

const NODES = [
  { x: 90, y: 130 },
  { x: 252, y: 80 },
  { x: 414, y: 140 },
  { x: 576, y: 80 },
  { x: 738, y: 140 },
  { x: 900, y: 90 },
] as const;

const PATH =
  "M10 130 L90 130 " +
  NODES.slice(1)
    .map((n, i) => {
      const p = NODES[i];
      const mid = (p.x + n.x) / 2;
      return `C${mid} ${p.y} ${mid} ${n.y} ${n.x} ${n.y}`;
    })
    .join(" ") +
  " L990 90";

type Mode = "static" | "animated";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function LeadJourney() {
  const n = journeyStages.length;
  const [mode, setMode] = useState<Mode>("static");
  const [active, setActive] = useState(n - 1);
  const [complete, setComplete] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const tokenRef = useRef<SVGGElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMode(mq.matches ? "static" : "animated");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const draw = drawRef.current;
    const token = tokenRef.current;
    if (!path || !draw || !token) return;

    const total = path.getTotalLength();
    draw.style.strokeDasharray = `${total}`;

    // Distance along the path of each node, found by sampling.
    const nodeLengths = NODES.map(({ x, y }) => {
      let best = 0;
      let bestDist = Infinity;
      for (let l = 0; l <= total; l += 1.5) {
        const p = path.getPointAtLength(l);
        const d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < bestDist) {
          bestDist = d;
          best = l;
        }
      }
      return best;
    });

    const place = (len: number, drawLen: number) => {
      const pt = path.getPointAtLength(len);
      token.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      draw.style.strokeDashoffset = `${total - drawLen}`;
    };

    if (mode === "static") {
      place(total, total);
      setActive(n - 1);
      setComplete(true);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    const windowSize = STAGE_SHARE / n;
    let frame = 0;
    let lastActive = -1;
    let lastComplete: boolean | null = null;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? clamp(-rect.top / distance) : 1;
      const done = progress >= STAGE_SHARE + 0.03;

      let stage: number;
      let tokenLen: number;
      if (progress < STAGE_SHARE) {
        stage = Math.min(n - 1, Math.floor(progress / windowSize));
        const local = (progress - stage * windowSize) / windowSize;
        const from = stage === 0 ? 0 : nodeLengths[stage - 1];
        tokenLen = from + (nodeLengths[stage] - from) * easeInOut(clamp(local / 0.5));
      } else {
        stage = n - 1;
        const tail = clamp((progress - STAGE_SHARE) / 0.08);
        tokenLen = nodeLengths[n - 1] + (total - nodeLengths[n - 1]) * easeInOut(tail);
      }

      place(tokenLen, tokenLen);
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      if (stage !== lastActive) {
        lastActive = stage;
        setActive(stage);
      }
      if (done !== lastComplete) {
        lastComplete = done;
        setComplete(done);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [mode, n]);

  const animated = mode === "animated";
  const stageState = (i: number) => (complete || i < active ? "done" : i === active ? "active" : "upcoming");
  const current = journeyStages[active];

  const svg = (
    <svg viewBox="0 0 1000 220" className="block h-auto w-full" aria-hidden="true">
      <path ref={pathRef} d={PATH} fill="none" stroke="#1f242b" strokeWidth="2" />
      <path d={PATH} fill="none" stroke="#2e353f" strokeWidth="2" strokeDasharray="2 10" />
      <path
        ref={drawRef}
        d={PATH}
        fill="none"
        stroke="#c4f54a"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ strokeDasharray: 3000, strokeDashoffset: 0, filter: "drop-shadow(0 0 6px rgb(196 245 74 / 0.5))" }}
      />
      {NODES.map((node, i) => {
        const state = stageState(i);
        const labelAbove = node.y < 110;
        return (
          <g key={i} transform={`translate(${node.x} ${node.y})`}>
            {state === "active" && <circle r="26" fill="#c4f54a" opacity="0.12" />}
            <circle
              r="15"
              fill={state === "done" ? "#c4f54a" : "#0d0f12"}
              stroke={state === "upcoming" ? "#2e353f" : "#c4f54a"}
              strokeWidth="2"
              className="transition-[fill,stroke] duration-300"
            />
            {state === "done" ? (
              <path d="m-5.5 0 3.5 3.5 7-7.5" fill="none" stroke="#10140a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <text y="4.5" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="var(--font-code)" fill={state === "active" ? "#c4f54a" : "#5c6570"}>
                {i + 1}
              </text>
            )}
            <text
              y={labelAbove ? -30 : 44}
              textAnchor="middle"
              fontSize="17"
              fontWeight="600"
              fontFamily="var(--font-heading)"
              fill={state === "upcoming" ? "#5c6570" : "#f2f4f5"}
              className="transition-[fill] duration-300"
            >
              {journeyStages[i].title}
            </text>
          </g>
        );
      })}
      <g ref={tokenRef} transform="translate(990 90)">
        <circle r="11" fill="#c4f54a" opacity="0.25" className="animate-blink" />
        <circle r="7" fill="#c4f54a" />
        <circle r="3" fill="#10140a" />
      </g>
    </svg>
  );

  const endCard = (
    <div>
      <Label>End of the line</Label>
      <p className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">
        One partner from first click to qualified call.
      </p>
      <div className="mt-6">
        <ButtonLink href="/contact" arrow>
          Free Consultation
        </ButtonLink>
      </div>
    </div>
  );

  const heading = (
    <Container className="pt-24 sm:pt-32">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Label index="03">Signature scene</Label>
          <h2 id="journey-title" className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.04] sm:text-4xl lg:text-[3.1rem]">
            From first click to qualified call
          </h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-muted">
          One line runs from your website to your sales team.{animated ? " Scroll to follow a lead along it." : ""}
        </p>
      </div>
    </Container>
  );

  if (!animated) {
    return (
      <section aria-labelledby="journey-title">
        {heading}
        <Container className="mt-10">
          <div className="tile bg-grid px-3 py-6 sm:px-6">{svg}</div>
          <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {journeyStages.map((stage, i) => (
              <li key={stage.title} className="tile p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-signal">0{i + 1}</span>
                  <Icon name={stage.icon} className="h-5 w-5 text-muted" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{stage.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{stage.text}</p>
              </li>
            ))}
          </ol>
          <div className="tile mt-3 border-signal/30 p-7 sm:p-9">{endCard}</div>
        </Container>
      </section>
    );
  }

  return (
    <section aria-labelledby="journey-title">
      {heading}
      <div ref={trackRef} className="relative" style={{ height: `${TRACK_VH}vh` }}>
        <div className="sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] flex-col justify-center py-4">
          <Container>
            <div className="grid gap-3 md:grid-cols-12">
              <div className="tile bg-grid px-3 pb-4 pt-5 sm:px-6 md:col-span-12">
                <div className="mb-2 flex items-center justify-between px-2">
                  <Label>Lead path</Label>
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {complete ? "Complete" : `Stage 0${active + 1} / 0${n}`}
                  </span>
                </div>
                {svg}
              </div>

              <div className="tile min-h-56 p-6 sm:p-8 md:col-span-7" aria-live="polite">
                {complete ? (
                  endCard
                ) : (
                  <div key={active} className="animate-[fade-up_0.45s_ease-out]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-signal">0{active + 1}</span>
                      <Icon name={current.icon} className="h-5 w-5 text-muted" />
                    </div>
                    <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">{current.title}</h3>
                    <p className="mt-3 max-w-lg text-lg leading-relaxed text-muted">{current.text}</p>
                  </div>
                )}
              </div>

              <div className="tile hidden p-6 md:col-span-5 md:block">
                <div className="flex items-center justify-between">
                  <Label>Lead record</Label>
                  <span className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                    #L-0042
                  </span>
                </div>
                <ul className="mt-5 space-y-2">
                  {journeyStages.map((stage, i) => {
                    const state = stageState(i);
                    return (
                      <li
                        key={stage.title}
                        className={cx(
                          "flex items-center justify-between rounded-xl border px-3.5 py-2 text-sm transition-colors duration-300",
                          state === "active" ? "border-signal/50 bg-signal/10" : "border-line bg-surface-2",
                          state === "upcoming" && "opacity-45",
                        )}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon name={stage.icon} className={cx("h-4 w-4", state === "upcoming" ? "text-dim" : "text-signal")} />
                          {stage.title}
                        </span>
                        <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                          {state === "done" ? "Done" : state === "active" ? "In progress" : "Queued"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Container>
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5" aria-hidden>
            <div ref={barRef} className="h-full origin-left bg-signal/70" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
