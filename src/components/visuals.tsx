/**
 * Original illustrations drawn in CSS and SVG: a 3D cube cluster, glass
 * spheres, isometric icon tiles, pixel portraits, a 3D bar chart, the hero
 * funnel and sample client logos. All decorative (aria-hidden).
 */

import type { CSSProperties, ReactNode } from "react";
import type { Glyph } from "@/lib/placeholders";
import { Icon, iconPaths, type IconName } from "./Icon";
import { SampleTag } from "./Sample";
import { cx } from "./ui";

/* ---------- Cube cluster (CSS 3D) ---------- */

type Vec = readonly [number, number, number];
const ARMS: Vec[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
const FACES: { cls: string; n: Vec }[] = [
  { cls: "f-front", n: [0, 0, 1] },
  { cls: "f-back", n: [0, 0, -1] },
  { cls: "f-right", n: [1, 0, 0] },
  { cls: "f-left", n: [-1, 0, 0] },
  { cls: "f-top", n: [0, -1, 0] },
  { cls: "f-bottom", n: [0, 1, 0] },
];
const same = (a: Vec, b: Vec) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
const opposite = (a: Vec, b: Vec) => a[0] === -b[0] && a[1] === -b[1] && a[2] === -b[2];

/** A slowly tumbling 3D cross of cubes with hollow ends. */
export function CubeCluster({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <div aria-hidden className={cx("cube-scene", className)} style={{ "--s": `${size}px` } as CSSProperties}>
      <div className="rig spin-y">
        <div className="rig spin-x">
          <div className="cube" style={{ "--x": 0, "--y": 0, "--z": 0 } as CSSProperties}>
            {FACES.map((f) => (
              <div key={f.cls} className={cx("face", f.cls)} />
            ))}
          </div>
          {ARMS.map((a) => (
            <div key={a.join()} className="cube" style={{ "--x": a[0], "--y": a[1], "--z": a[2] } as CSSProperties}>
              {FACES.filter((f) => !opposite(f.n, a)).map((f) => (
                <div key={f.cls} className={cx("face", f.cls, same(f.n, a) && "hole")} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Black tile with corner marks holding the cube cluster. */
export function CubeTile({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <div className={cx("brackets relative overflow-hidden bg-ink [--b-color:#e4e4e4]", className)}>
      <CubeCluster size={size} className="absolute inset-0" />
    </div>
  );
}

/* ---------- Spheres ---------- */

export function Sphere({ size, className, style }: { size: number; className?: string; style?: CSSProperties }) {
  return <span aria-hidden className={cx("sphere block", className)} style={{ width: size, height: size, ...style }} />;
}

/** Three glass spheres huddled together. */
export function SphereCluster({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx("relative h-[6.5rem] w-[7.5rem]", className)}>
      <Sphere size={60} className="float absolute left-0 top-7" />
      <Sphere size={66} className="float absolute right-1 top-0 [animation-delay:-2s]" />
      <Sphere size={58} className="float absolute bottom-0 left-9 [animation-delay:-4s]" />
    </div>
  );
}

/** Light tile with corner marks and a single floating sphere. */
export function SphereTile({ className }: { className?: string }) {
  return (
    <div className={cx("panel brackets relative grid place-items-center", className)}>
      <Sphere size={104} className="float" />
    </div>
  );
}

/* ---------- Isometric icon tile ---------- */

const SLAB = { c: 66, top: 26, hw: 44, hh: 25.4, t: 9 };

/** One of the line icons, extruded on top of an isometric slab. */
export function IsoIcon({ name, className }: { name: IconName; className?: string }) {
  const { c, top, hw, hh, t } = SLAB;
  const T = [c, top];
  const R = [c + hw, top + hh];
  const B = [c, top + 2 * hh];
  const L = [c - hw, top + hh];
  const pt = (p: number[], dy = 0) => `${p[0]} ${(p[1] + dy).toFixed(1)}`;
  const m = 0.14;
  const k = (1 - 2 * m) / 24;
  const matrix = (lift: number) =>
    `matrix(${(k * hw).toFixed(3)} ${(k * hh).toFixed(3)} ${(-k * hw).toFixed(3)} ${(k * hh).toFixed(3)} ${c} ${(top + 2 * m * hh - lift).toFixed(2)})`;

  return (
    <svg viewBox="0 0 132 120" aria-hidden="true" focusable="false" className={className} fill="none">
      <path d="M10 .5H131.5V102L113.5 119.5H.5V10Z" fill="#e4e4e4" stroke="#bebebe" />
      <g stroke="#1b1b1b" strokeLinejoin="round">
        <path d={`M${pt(L)}L${pt(B)}L${pt(B, t)}L${pt(L, t)}Z`} fill="#dadada" />
        <path d={`M${pt(B)}L${pt(R)}L${pt(R, t)}L${pt(B, t)}Z`} fill="#c3c3c3" />
        <path d={`M${pt(T)}L${pt(R)}L${pt(B)}L${pt(L)}Z`} fill="#fbfbfb" />
      </g>
      <g className="iso-glyph" strokeLinecap="round" strokeLinejoin="round">
        {[0, 1.5, 3, 4.5].map((lift) => (
          <g key={lift} transform={matrix(lift)} stroke="#b4b4b4" strokeWidth={1.3}>
            {iconPaths[name]}
          </g>
        ))}
        <g transform={matrix(6)} stroke="#111111" strokeWidth={1.45}>
          {iconPaths[name]}
        </g>
      </g>
    </svg>
  );
}

/** A row of isometric icon tiles with captions. */
export function IsoRow({ items, className }: { items: readonly { icon: IconName; label: string }[]; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx("grid items-center gap-[1.5cqw] px-[2cqw]", className)}
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center gap-3 text-center">
          <IsoIcon name={it.icon} className="w-full max-w-[9rem]" />
          <span className="font-mono text-[0.6875rem] uppercase leading-snug tracking-[0.08em] text-mute">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Numbered stations on a line, with an orange light travelling through them. */
export function ProcessRail({ items, className }: { items: readonly { title: string; icon: IconName }[]; className?: string }) {
  const edge = 50 / items.length;
  return (
    <div aria-hidden="true" className={className}>
      <div className="relative grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        <span className="absolute top-8 h-px bg-ink" style={{ left: `${edge}%`, right: `${edge}%` }} />
        <span
          className="rail-dot absolute top-8 -ml-1.5 size-3 -translate-y-1/2 bg-orange"
          style={{ left: `${edge}%`, "--from": `${edge}%`, "--to": `${100 - edge}%` } as CSSProperties}
        />
        {items.map((s, i) => (
          <div key={s.title} className="relative flex flex-col items-center gap-3 px-1 text-center">
            <span className="grid size-16 place-items-center border border-line bg-panel">
              <Icon name={s.icon} className="h-6 w-6" />
            </span>
            <span className="font-mono text-[0.6875rem] uppercase leading-snug tracking-[0.04em]">
              <span className="text-orange-deep">{String(i + 1).padStart(2, "0")}</span>
              <br />
              {s.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Stand-in for a real photo: a hatched panel with a caption. */
export function PhotoSlot({ label, confirmed = false, className }: { label: string; confirmed?: boolean; className?: string }) {
  return (
    <figure className={cx("photo-slot brackets relative flex min-h-56 flex-col justify-between p-5 [--b-inset:0.75rem]", className)}>
      <SampleTag show={!confirmed} className="self-end">
        Photo to come
      </SampleTag>
      <figcaption className="font-mono text-xs uppercase tracking-[0.06em]">{label}</figcaption>
    </figure>
  );
}

/* ---------- Pixel portrait ---------- */

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const TONES = ["#141414", "#3f3f3f", "#6e6e6e", "#9f9f9f", "#cdcdcd", "#f1f1f1"];

function random(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A dithered pixel silhouette of a head and shoulders, lit from the left. It
 * stands in for a photo until real ones arrive; each seed gives a different
 * build and hairstyle.
 */
export function PixelPortrait({ seed, className, res = 24 }: { seed: number; className?: string; res?: number }) {
  const N = res;
  const r = random(seed * 9973 + 17);
  const hx = 0.5 + (r() - 0.5) * 0.06;
  const hy = 0.39 + (r() - 0.5) * 0.04;
  const rx = 0.165 + r() * 0.025;
  const ry = rx * (1.14 + r() * 0.08);
  const sw = 0.4 + r() * 0.08;
  const hair = Math.floor(r() * 4);
  const bg = 0.88 + r() * 0.06;

  const person = (u: number, v: number) => {
    const ex = (u - hx) / rx;
    const ey = (v - hy) / ry;
    if (ex * ex + ey * ey <= 1) return true;
    if (Math.abs(u - hx) < rx * 0.5 && v > hy && v < 0.82) return true;
    if (((u - 0.5) / sw) ** 2 + ((v - 1.07) / 0.36) ** 2 <= 1) return true;
    const ell = (sx: number, sy: number, oy: number) => ((u - hx) / (rx * sx)) ** 2 + ((v - hy + oy) / (ry * sy)) ** 2 <= 1;
    if (hair === 0) return v < hy && ell(1.08, 1.04, 0.02);
    if (hair === 1) return ell(1.12, 1.05, 0.015) || (Math.abs(u - hx) < rx * 1.1 && v >= hy && v < hy + ry * 1.5);
    if (hair === 2) return (u - hx) ** 2 + (v - (hy - ry - 0.015)) ** 2 <= 0.07 ** 2;
    return v < hy + ry * 0.3 && ell(1.2, 1.1, 0.03);
  };

  const mask = new Array<boolean>(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) mask[y * N + x] = person((x + 0.5) / N, (y + 0.5) / N);
  const at = (x: number, y: number) => x >= 0 && y >= 0 && x < N && y < N && mask[y * N + x];
  const rim = Math.max(2, Math.round(N / 12));

  const paths = TONES.map(() => "");
  for (let y = 0; y < N; y++) {
    let run = -1;
    let from = 0;
    for (let x = 0; x <= N; x++) {
      let level = -1;
      if (x < N) {
        const u = (x + 0.5) / N;
        const v = (y + 0.5) / N;
        let t: number;
        if (at(x, y)) {
          t = 0.08 + 0.1 * Math.max(0, (hx - u) / sw);
          // Rim light along the left edge, about the same width at any resolution.
          for (let d = 1; d <= rim; d++) {
            if (!at(x - d, y)) {
              t = 0.68 - (0.3 * (d - 1)) / rim;
              break;
            }
          }
          if (!at(x, y - 1)) t = Math.max(t, 0.4);
        } else {
          const glow = Math.max(0, 1 - Math.hypot((u - 0.42) / 0.62, (v - 0.36) / 0.62));
          t = bg - 0.2 * v + 0.08 * glow;
        }
        level = Math.max(0, Math.min(TONES.length - 1, Math.floor(t * (TONES.length - 1) + BAYER[y % 4][x % 4] / 16)));
      }
      if (level !== run) {
        if (run >= 0) paths[run] += `M${from} ${y}h${x - from}v1h-${x - from}z`;
        run = level;
        from = x;
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      shapeRendering="crispEdges"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths.map((d, i) => (d ? <path key={i} d={d} fill={TONES[i]} /> : null))}
    </svg>
  );
}

/* ---------- Isometric 3D bar chart ---------- */

const U = 22;
const iso = (x: number, y: number, z: number) => [(x - y) * 0.866 * U, (x + y) * 0.5 * U - z * U];

function isoBox(x: number, y: number, z: number, w: number, d: number, h: number) {
  const p = (X: number, Y: number, Z: number) =>
    iso(X, Y, Z)
      .map((n) => n.toFixed(1))
      .join(",");
  return {
    top: [p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)].join(" "),
    left: [p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)].join(" "),
    right: [p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)].join(" "),
  };
}

const BARS = [1.3, 2.2, 3.1, 4.4];

/** Four rising bars on a plate, the tallest in orange. Bars grow in on reveal. */
export function Bars3D({ className }: { className?: string }) {
  const base = isoBox(-0.6, -0.6, -0.35, 6.6, 2.2, 0.35);
  return (
    <svg viewBox="-46 -64 182 160" aria-hidden="true" focusable="false" className={cx("bars", className)} data-reveal="bars">
      <g stroke="rgb(0 0 0 / 0.22)" strokeWidth="0.6" strokeLinejoin="round">
        <polygon points={base.left} fill="#d6d6d6" />
        <polygon points={base.right} fill="#bdbdbd" />
        <polygon points={base.top} fill="#f4f4f4" />
        {BARS.map((h, i) => {
          const b = isoBox(i * 1.5, 0, 0, 1, 1, h);
          const hot = i === BARS.length - 1;
          return (
            <g key={i} className="bar" style={{ "--i": i } as CSSProperties}>
              <polygon points={b.left} fill={hot ? "#e7600f" : "#e0e0e0"} />
              <polygon points={b.right} fill={hot ? "#c24f0a" : "#c6c6c6"} />
              <polygon points={b.top} fill={hot ? "#ff8a45" : "#ffffff"} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ---------- Hero funnel ---------- */

/**
 * A white funnel seen from slightly above. Its spout is drawn to match the
 * width of the lead tube below it (53% of the funnel's width).
 */
export function Funnel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 320" aria-hidden="true" focusable="false" className={className} preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="fn-body" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#b3b3b3" />
          <stop offset="0.1" stopColor="#dedede" />
          <stop offset="0.3" stopColor="#fbfbfb" />
          <stop offset="0.45" stopColor="#ffffff" />
          <stop offset="0.66" stopColor="#ebebeb" />
          <stop offset="0.86" stopColor="#cdcdcd" />
          <stop offset="1" stopColor="#a5a5a5" />
        </linearGradient>
        <radialGradient id="fn-inside" cx="0.5" cy="0.62" r="0.62">
          <stop offset="0" stopColor="#7a7a7a" />
          <stop offset="0.35" stopColor="#b7b7b7" />
          <stop offset="0.75" stopColor="#dcdcdc" />
          <stop offset="1" stopColor="#efefef" />
        </radialGradient>
        <linearGradient id="fn-band" x1="0" x2="1">
          <stop offset="0" stopColor="#8f3300" />
          <stop offset="0.14" stopColor="#ff7120" />
          <stop offset="0.32" stopColor="#ffb88a" />
          <stop offset="0.55" stopColor="#ff7a2c" />
          <stop offset="0.85" stopColor="#ff7120" />
          <stop offset="1" stopColor="#8a3100" />
        </linearGradient>
        <filter id="fn-glow" x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Spout and collar, continuing into the tube */}
      <rect x="141" y="200" width="318" height="120" fill="url(#fn-body)" />
      <rect x="126" y="262" width="348" height="58" fill="url(#fn-body)" />
      <path d="M126 262h348" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M300 262v58" stroke="rgb(0 0 0 / 0.12)" />
      <rect x="126" y="290" width="348" height="6" fill="#ff7120" filter="url(#fn-glow)" opacity="0.7" />
      <rect x="126" y="290" width="348" height="6" fill="url(#fn-band)" />

      {/* Cone */}
      <path d="M14 58 L141 206 A159 22 0 0 0 459 206 L586 58 A286 46 0 0 1 14 58 Z" fill="url(#fn-body)" />
      <path d="M141 206 A159 22 0 0 0 459 206" fill="none" stroke="rgb(0 0 0 / 0.12)" />

      {/* Opening */}
      <ellipse cx="300" cy="58" rx="286" ry="46" fill="#f7f7f7" />
      <ellipse cx="300" cy="60" rx="276" ry="40" fill="url(#fn-inside)" />
      <ellipse cx="300" cy="74" rx="74" ry="13" fill="#2b2b2b" />
      <ellipse cx="300" cy="72" rx="74" ry="11" fill="none" stroke="rgb(255 255 255 / 0.35)" />
      <ellipse cx="300" cy="58" rx="286" ry="46" fill="none" stroke="#9e9e9e" />
    </svg>
  );
}

/* ---------- Sample client logos ---------- */

const GLYPHS: Record<Glyph, ReactNode> = {
  hex: <path fillRule="evenodd" d="M16 2 28.1 9v14L16 30 3.9 23V9L16 2Zm0 6.2L9.3 12v8l6.7 3.8 6.7-3.8v-8L16 8.2Z" />,
  tri: <path fillRule="evenodd" d="M2.5 5h27L16 29 2.5 5Zm7.2 4.2L16 20.6l6.3-11.4H9.7Z" />,
  cube: (
    <>
      <path d="M16 2.5 27.5 9 16 15.5 4.5 9 16 2.5Z" />
      <path d="M3.5 10.8 15 17.3v12.2L3.5 23V10.8Z" opacity="0.7" />
      <path d="M28.5 10.8 17 17.3v12.2L28.5 23V10.8Z" opacity="0.45" />
    </>
  ),
  ring: <path fillRule="evenodd" d="M16 3a13 13 0 1 0 12.5 16.5h-6A7.2 7.2 0 1 1 22.6 12.5h6A13 13 0 0 0 16 3Zm8 11.5h5v3h-5v-3Z" />,
  diamond: <path fillRule="evenodd" d="M16 1.5 30.5 16 16 30.5 1.5 16 16 1.5Zm0 8.3L9.8 16l6.2 6.2 6.2-6.2L16 9.8Z" />,
  bars: (
    <>
      <rect x="3" y="17" width="6" height="12" />
      <rect x="13" y="10" width="6" height="19" />
      <rect x="23" y="3" width="6" height="26" />
    </>
  ),
  chevrons: <path d="M3 4h7.5l12 12-12 12H3l12-12L3 4Zm11 0h7.5l9 12-9 12H14l9-12-9-12Z" />,
  grid: (
    <>
      <rect x="3" y="3" width="11" height="11" />
      <rect x="18" y="3" width="11" height="11" opacity="0.55" />
      <rect x="3" y="18" width="11" height="11" opacity="0.55" />
      <rect x="18" y="18" width="11" height="11" />
    </>
  ),
};

export function ClientGlyph({ glyph, className }: { glyph: Glyph; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {GLYPHS[glyph]}
    </svg>
  );
}

/** A sample wordmark: glyph plus name in one of three type styles. */
export function ClientLogo({
  name,
  glyph,
  font,
  className,
}: {
  name: string;
  glyph: Glyph;
  font: "sans" | "display" | "mono";
  className?: string;
}) {
  return (
    <span className={cx("flex items-center gap-2.5", className)}>
      <ClientGlyph glyph={glyph} className="size-8 shrink-0" />
      <span
        className={cx(
          "whitespace-nowrap",
          font === "display" && "display text-[1.3rem]",
          font === "mono" && "font-mono text-[1.05rem] font-bold tracking-tight",
          font === "sans" && "font-sans text-[1.2rem] font-bold tracking-[-0.02em]",
        )}
      >
        {name}
      </span>
    </span>
  );
}
