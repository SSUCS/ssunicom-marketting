"use client";

import { useEffect, useRef, useState } from "react";
import { journeyStages } from "@/lib/content";
import { Icon } from "./Icon";
import { ButtonLink, Container, Eyebrow, cx } from "./ui";

/**
 * "The Journey of a Lead" — the homepage's signature scroll-driven animation.
 *
 * How it works:
 * - A tall track gives the section scroll distance; the panel inside is
 *   `position: sticky`, so normal page scrolling drives the animation (no
 *   scroll hijacking).
 * - Scroll progress (0–1) is read once per animation frame and written
 *   straight to the SVG (path dash offset, token position). React state only
 *   changes when the active stage changes.
 * - Server render, no-JS and prefers-reduced-motion all get the "static"
 *   mode: the completed workflow with every stage explained.
 *
 * Tuning: TRACK_VH (scroll length), STAGE_SHARE (portion of the scroll used
 * by the four stages) and the PATH / NODES geometry below.
 */

const TRACK_VH = 420;
const STAGE_SHARE = 0.86;

const PATH = "M70 250 L110 250 C200 250 210 190 300 190 C390 190 410 270 500 270 C590 270 600 210 690 210 L790 210";
const NODES = [
  { x: 110, y: 250, visual: "below" },
  { x: 300, y: 190, visual: "above" },
  { x: 500, y: 270, visual: "below" },
  { x: 690, y: 210, visual: "above" },
] as const;
const COMPLETE_LABEL = "Qualified outcome";

type Mode = "static" | "animated";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function LeadJourney() {
  const [mode, setMode] = useState<Mode>("static");
  const [active, setActive] = useState(journeyStages.length - 1);
  const [complete, setComplete] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const tokenRef = useRef<SVGGElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Choose mode from the reduced-motion preference, and follow changes to it.
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
      place(nodeLengths[nodeLengths.length - 1], total);
      setActive(journeyStages.length - 1);
      setComplete(true);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    const n = journeyStages.length;
    const windowSize = STAGE_SHARE / n;
    let frame = 0;
    let lastActive = -1;
    let lastComplete: boolean | null = null;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? clamp(-rect.top / distance) : 1;

      let stage: number;
      let tokenLen: number;
      let drawLen: number;
      const done = progress >= STAGE_SHARE + 0.03;

      if (progress < STAGE_SHARE) {
        stage = Math.min(n - 1, Math.floor(progress / windowSize));
        const local = (progress - stage * windowSize) / windowSize;
        const from = stage === 0 ? 0 : nodeLengths[stage - 1];
        tokenLen = from + (nodeLengths[stage] - from) * easeInOut(clamp(local / 0.55));
        drawLen = tokenLen;
      } else {
        stage = n - 1;
        tokenLen = nodeLengths[n - 1];
        const tail = clamp((progress - STAGE_SHARE) / 0.08);
        drawLen = tokenLen + (total - tokenLen) * easeInOut(tail);
      }

      place(tokenLen, drawLen);
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
  }, [mode]);

  const animated = mode === "animated";
  const stageState = (i: number) => (complete || i < active ? "done" : i === active ? "active" : "upcoming");
  const tokenLabel = complete ? COMPLETE_LABEL : journeyStages[active].token;

  const heading = (
    <Container className="pb-10 pt-24 sm:pt-28">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow dark>The journey of a lead</Eyebrow>
          <h2 id="journey-title" className="text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            From raw inquiry to a measurable business outcome.
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-mist lg:col-span-5">
          Every lead passes through the same organised workflow. {animated ? "Scroll to follow one through it." : ""}
        </p>
      </div>
    </Container>
  );

  const svg = (
    <svg viewBox="0 0 800 440" className="block h-auto w-full" aria-hidden="true">
      <path ref={pathRef} d={PATH} fill="none" stroke="#1d3352" strokeWidth="2" />
      <path
        ref={drawRef}
        d={PATH}
        fill="none"
        stroke="#45d6c4"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ strokeDasharray: 2000, strokeDashoffset: 0 }}
      />

      {NODES.map((node, i) => {
        const state = stageState(i);
        const above = node.visual === "above";
        return (
          <g key={i}>
            {/* Stage visual */}
            <g
              transform={`translate(${node.x - 75} ${above ? node.y - 168 : node.y + 40})`}
              className="transition-opacity duration-500"
              style={{ opacity: !animated ? 1 : state === "active" ? 1 : state === "done" ? 0.4 : 0 }}
            >
              <rect width="150" height="120" rx="14" fill="#12233a" stroke={state === "active" ? "#45d6c4" : "#1d3352"} />
              <StageVisual index={i} />
              <path
                d={above ? "M75 120 V140" : "M75 0 V-20"}
                stroke={state === "upcoming" ? "#1d3352" : "#45d6c4"}
                strokeWidth="1.5"
                strokeDasharray="2 4"
              />
            </g>

            {/* Node */}
            <g transform={`translate(${node.x} ${node.y})`}>
              {state === "active" && <circle r="24" fill="#45d6c4" opacity="0.14" />}
              <circle
                r="14"
                fill={state === "done" ? "#0d7a72" : "#0a1626"}
                stroke={state === "upcoming" ? "#1d3352" : "#45d6c4"}
                strokeWidth="2"
                className="transition-[fill,stroke] duration-300"
              />
              {state === "done" ? (
                <path d="m-5 0 3.5 3.5 6.5-7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <text y="4" textAnchor="middle" fontSize="11" fontWeight="700" fill={state === "active" ? "#45d6c4" : "#a9b6c8"}>
                  {i + 1}
                </text>
              )}
            </g>
          </g>
        );
      })}

      {/* Travelling lead token */}
      <g ref={tokenRef} transform={`translate(${NODES[3].x} ${NODES[3].y})`}>
        <circle r="9" fill="#45d6c4" />
        <circle r="4" fill="#0a1626" />
        <g transform={`translate(0 ${NODES[active].visual === "above" ? 22 : -60})`}>
          <rect x="-62" y="0" width="124" height="28" rx="14" fill={complete ? "#45d6c4" : "#fff"} />
          <text y="18.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0a1626">
            {tokenLabel}
          </text>
        </g>
      </g>
    </svg>
  );

  const cta = (
    <div
      className={cx(
        "flex flex-wrap items-center gap-4 transition-[opacity,transform] duration-500",
        animated && !complete ? "invisible translate-y-2 opacity-0" : "visible opacity-100",
      )}
    >
      <ButtonLink href="/contact" variant="light" arrow>
        Let&apos;s Discuss Your Requirements
      </ButtonLink>
    </div>
  );

  return (
    <section aria-labelledby="journey-title" className="on-dark relative bg-ink text-white">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden />
      <div className="relative">{heading}</div>

      {animated ? (
        <div ref={trackRef} className="relative" style={{ height: `${TRACK_VH}vh` }}>
          <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden">
            <Container className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="order-2 lg:order-1 lg:col-span-4">
                <ol className="space-y-1" aria-label="Stages">
                  {journeyStages.map((stage, i) => {
                    const state = stageState(i);
                    const isActive = i === active && !complete;
                    return (
                      <li
                        key={stage.title}
                        aria-current={isActive ? "step" : undefined}
                        className={cx(
                          "border-l-2 py-2 pl-4 transition-[opacity,border-color] duration-300",
                          isActive ? "border-accent-bright opacity-100" : "border-white/10",
                          state === "done" && !isActive && "opacity-60",
                          state === "upcoming" && "opacity-40",
                          // Keep the panel compact on small screens.
                          !isActive && "max-lg:hidden",
                        )}
                      >
                        <p className="flex items-center gap-3 font-display text-base font-semibold sm:text-lg">
                          <span className="text-xs font-bold tabular-nums text-accent-bright">0{i + 1}</span>
                          {stage.title}
                          {state === "done" && <Icon name="check" className="h-4 w-4 text-accent-bright" />}
                        </p>
                        <div
                          className={cx(
                            "grid transition-[grid-template-rows] duration-500",
                            isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="pt-2 text-[0.95rem] leading-relaxed text-mist">{stage.text}</p>
                            <p className="pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-bright">
                              Output: {stage.output}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                  {complete && (
                    <li className="border-l-2 border-accent-bright py-2 pl-4 lg:hidden">
                      <p className="font-display text-lg font-semibold">Workflow complete</p>
                    </li>
                  )}
                </ol>
                <div className="mt-6">{cta}</div>
              </div>
              <div className="order-1 -mx-4 sm:mx-0 lg:order-2 lg:col-span-8">{svg}</div>
            </Container>
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5" aria-hidden>
              <div ref={barRef} className="h-full origin-left bg-accent-bright/70" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
        </div>
      ) : (
        <Container className="relative pb-24">
          <div className="rounded-[1.75rem] border border-white/10 bg-ink-2/40 p-4 sm:p-8">{svg}</div>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {journeyStages.map((stage, i) => (
              <li key={stage.title} className="border-t border-white/15 pt-5">
                <p className="text-xs font-bold tabular-nums text-accent-bright">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{stage.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{stage.text}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-bright">
                  Output: {stage.output}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12">{cta}</div>
        </Container>
      )}
    </section>
  );
}

/** Small illustrative graphic shown inside each stage's card (150×120). */
function StageVisual({ index }: { index: number }) {
  const label = (text: string) => (
    <text x="14" y="22" fontSize="9" fontWeight="700" letterSpacing="1.4" fill="#45d6c4">
      {text}
    </text>
  );
  const row = (y: number, text: string, done = true) => (
    <g key={text} transform={`translate(14 ${y})`}>
      <rect width="122" height="22" rx="6" fill="#1d3352" />
      <circle cx="11" cy="11" r="5" fill={done ? "#45d6c4" : "none"} stroke="#45d6c4" />
      <text x="22" y="15" fontSize="10" fill="#fff">
        {text}
      </text>
    </g>
  );

  switch (index) {
    case 0:
      return (
        <>
          {label("INCOMING")}
          {row(34, "Web form")}
          {row(60, "Phone call")}
          {row(86, "Campaign")}
        </>
      );
    case 1:
      return (
        <>
          {label("CLIENT CRITERIA")}
          {[
            ["Contact verified", 34],
            ["Requirement fits", 60],
            ["Details complete", 86],
          ].map(([t, y]) => (
            <g key={t} transform={`translate(14 ${y})`}>
              <rect width="14" height="14" rx="4" fill="#0d7a72" y="3" />
              <path d="m3.5 10 2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
              <text x="22" y="14" fontSize="10.5" fill="#fff">
                {t}
              </text>
            </g>
          ))}
        </>
      );
    case 2:
      return (
        <>
          {label("WORKFLOW")}
          <g transform="translate(14 34)">
            <path d="M0 0h26l10 10v38H0Z" fill="#1d3352" stroke="#45d6c4" />
            <path d="M7 18h20M7 26h20M7 34h14" stroke="#a9b6c8" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {["Follow-up", "Documents", "Scheduling"].map((t, i) => (
            <g key={t} transform={`translate(62 ${36 + i * 18})`}>
              <text fontSize="9.5" fill="#fff" y="0">
                {t}
              </text>
              <rect y="4" width="74" height="4" rx="2" fill="#1d3352" />
              <rect y="4" width={[74, 56, 40][i]} height="4" rx="2" fill="#45d6c4" />
            </g>
          ))}
          <text x="14" y="104" fontSize="9.5" fill="#a9b6c8">
            Documented procedures
          </text>
        </>
      );
    default:
      return (
        <>
          {label("STATUS & REVIEW")}
          <g transform="translate(14 36)">
            <path d="M0 60H76" stroke="#1d3352" />
            {[22, 34, 28, 44, 52].map((h, i) => (
              <rect key={i} x={i * 15 + 2} y={60 - h} width="9" height={h} rx="2" fill={i === 4 ? "#45d6c4" : "#1d3352"} />
            ))}
          </g>
          <g transform="translate(100 56)" fill="none" stroke="#45d6c4" strokeWidth="1.6" strokeLinecap="round">
            <path d="M18 8a14 14 0 1 0 3 10" />
            <path d="m22 2-1 8-8-2" />
          </g>
          <text x="96" y="104" fontSize="9.5" fill="#a9b6c8">
            Improve
          </text>
        </>
      );
  }
}
