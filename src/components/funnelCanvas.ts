import funnelImage from "./hero-funnel.webp";
import {
  BAND_Y,
  CHIP_D,
  CHIP_RADIUS,
  CHIP_T,
  CHIP_W,
  COLLAR_R,
  INNER_TOP,
  KEY_LIGHT,
  ORANGE,
  SPOUT,
  TILT,
  WALL,
  Vec3,
  chipLabels,
  createFlow,
  viewFor,
  type Chip,
  type View,
} from "./funnelMotion";

/*
 * The hero funnel, drawn on a 2D canvas so it runs in every browser. The
 * funnel itself is a picture rendered in WebGL (scripts/render-hero-funnel.mjs);
 * the chips, their shadows, the band's flare and the rings are drawn over it
 * each frame. The camera is orthographic, so every flat face of a chip lands
 * on screen through a plain 2D transform.
 */

export type FunnelScene = { dispose: () => void };

type FunnelOptions = {
  canvas: HTMLCanvasElement;
  /** Element the canvas fills; its size sets the canvas size. */
  container: HTMLElement;
  /** Box the SVG funnel sits in: the spout is 53% of its width. */
  measure: HTMLElement;
  fontFamily: string;
  /** Called after the first frame is drawn. */
  onReady: () => void;
  /** Called if the funnel picture doesn't load or drawing fails. */
  onFail: () => void;
};

/** The funnel picture: pixels per unit, and where the rim's centre is in it. */
const SPRITE = { scale: 800, x: 816, y: 264 };

const COS_T = Math.cos(TILT);
const SIN_T = Math.sin(TILT);
const TO_CAMERA = new Vec3(0, SIN_T, COS_T);
const TO_LIGHT = new Vec3(KEY_LIGHT[0], KEY_LIGHT[1] + 0.2, KEY_LIGHT[2]).normalize();

/** Inner edge of the rolled lip: everything inside the funnel shows through it. */
const OPENING_R = 0.97;
const OPENING_Y = 0.035;

// The cone's inner wall as radius = CONE_A + CONE_B * y.
const CONE_B = Math.tan(WALL);
const CONE_A = INNER_TOP[0] - INNER_TOP[1] * CONE_B;

const clamp = (x: number) => Math.min(1, Math.max(0, x));

/** How much key light reaches a point: none once the funnel's near wall is in the way. */
function lightAt(p: Vec3) {
  if (p.y >= OPENING_Y) return 1;
  const t = (OPENING_Y - p.y) / TO_LIGHT.y;
  const r = Math.hypot(p.x + TO_LIGHT.x * t, p.z + TO_LIGHT.z * t);
  return clamp((OPENING_R + 0.02 - r) / 0.06);
}

/** Where the ray from p away from the light meets the inner wall, or null. */
function onWall(p: Vec3, out: Vec3) {
  const dx = -TO_LIGHT.x;
  const dy = -TO_LIGHT.y;
  const dz = -TO_LIGHT.z;
  const r0 = CONE_A + CONE_B * p.y;
  const a = dx * dx + dz * dz - CONE_B * CONE_B * dy * dy;
  const b = 2 * (p.x * dx + p.z * dz - r0 * CONE_B * dy);
  const c = p.x * p.x + p.z * p.z - r0 * r0;
  const disc = b * b - 4 * a * c;
  if (disc < 0) return null;
  const s = Math.sqrt(disc);
  for (const t of [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((m, n) => m - n)) {
    if (t <= 0) continue;
    out.set(p.x + dx * t, p.y + dy * t, p.z + dz * t);
    if (CONE_A + CONE_B * out.y > 0) return out;
  }
  return null;
}

/** Convex hull of 2D points (monotone chain), counter-clockwise. */
function hull(pts: [number, number][]) {
  pts.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
  const cross = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: [number, number][] = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** A soft-edged rounded rectangle the size of a chip, with a margin, for the chips' shadows. */
function shadowSprite() {
  const s = 128 / CHIP_W; // pixels per unit
  const pad = Math.round(0.03 * s);
  const rw = Math.round(CHIP_W * s);
  const rh = Math.round(CHIP_D * s);
  const c = document.createElement("canvas");
  c.width = rw + 2 * pad;
  c.height = rh + 2 * pad;
  const g = c.getContext("2d")!;
  g.beginPath();
  roundedRect(g, pad, pad, rw, rh, CHIP_RADIUS * s);
  g.fill();
  // Three box blurs of the alpha, close to a Gaussian.
  const { width: w, height: h } = c;
  const img = g.getImageData(0, 0, w, h);
  let a = Float32Array.from({ length: w * h }, (_, i) => img.data[i * 4 + 3]);
  const r = Math.round(0.008 * s);
  for (let pass = 0; pass < 6; pass++) {
    const out = new Float32Array(w * h);
    const across = pass % 2 === 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sum = 0;
        for (let k = -r; k <= r; k++) {
          const xx = across ? x + k : x;
          const yy = across ? y : y + k;
          if (xx >= 0 && xx < w && yy >= 0 && yy < h) sum += a[yy * w + xx];
        }
        out[y * w + x] = sum / (2 * r + 1);
      }
    }
    a = out;
  }
  a.forEach((v, i) => (img.data[i * 4 + 3] = v));
  g.putImageData(img, 0, 0);
  return { canvas: c, pad, rw, rh };
}

/** Starts the canvas funnel, or returns null without a 2D canvas. */
export function createFunnelCanvas({
  canvas,
  container,
  measure,
  fontFamily,
  onReady,
  onFail,
}: FunnelOptions): FunnelScene | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const bg = document.createElement("canvas");
  const labels = chipLabels(fontFamily);
  const flow = createFlow();
  const img = new Image();

  let view: View = { scale: 100, topU: 1, lookY: 0 };
  let w = 0;
  let h = 0;
  let dpr = 1;

  /* ----- Projection (CSS pixels) ----- */

  const sx = (p: Vec3) => w / 2 + p.x * view.scale;
  const sy = (p: Vec3) => h / 2 - ((p.y - view.lookY) * COS_T - p.z * SIN_T) * view.scale;
  const vx = (v: Vec3) => v.x * view.scale;
  const vy = (v: Vec3) => -(v.y * COS_T - v.z * SIN_T) * view.scale;

  /** Lower (front) half of a horizontal circle, from right to left. */
  const frontArc = (r: number, y: number) => {
    ctx.ellipse(w / 2, h / 2 - (y - view.lookY) * COS_T * view.scale, r * view.scale, r * SIN_T * view.scale, 0, 0, Math.PI);
  };

  /** A band of light around a cylinder: brightest in the middle, fading out above and below. */
  const glowBand = (r: number, y: number, height: number, alpha: number) => {
    const n = 10;
    ctx.lineWidth = (height / n) * COS_T * view.scale + 1;
    ctx.strokeStyle = ORANGE;
    for (let i = 0; i < n; i++) {
      const v = (i + 0.5) / n;
      ctx.globalAlpha = alpha * (1 - Math.abs(2 * v - 1));
      ctx.beginPath();
      frontArc(r, y + (v - 0.5) * height);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  /** The funnel's opening, plus everything above its middle when `above` is set. */
  const opening = (above: boolean) => {
    ctx.beginPath();
    const cy = h / 2 - (OPENING_Y - view.lookY) * COS_T * view.scale;
    ctx.ellipse(w / 2, cy, OPENING_R * view.scale, OPENING_R * SIN_T * view.scale, 0, 0, Math.PI * 2);
    if (above) ctx.rect(-w, -h, 3 * w, cy + h);
  };

  /* ----- Chips ----- */

  const ax = new Vec3();
  const ay = new Vec3();
  const az = new Vec3();
  const n = new Vec3();
  const p = new Vec3();
  const q = new Vec3();

  // Brightness of a face facing `normal` at `at`, matched by eye to the WebGL scene, where
  // the room light from all around does most of the work and the key light adds a little.
  const faceLight = (normal: Vec3, at: Vec3) => 0.965 + 0.07 * lightAt(at) * Math.max(0, normal.dot(TO_LIGHT));
  const sideLight = (normal: Vec3, at: Vec3) => 0.86 + 0.08 * lightAt(at) * Math.max(0, normal.dot(TO_LIGHT));

  const shadow = shadowSprite();
  const corner = new Vec3();
  const along = new Vec3();
  const across = new Vec3();

  /** The chip's shadow on the inner wall, cast away from the key light. */
  const drawShadow = (chip: Chip) => {
    chip.quat.axes(ax, ay, az);
    const ends = [corner, along, across];
    for (const [k, [i, j]] of [
      [-1, -1],
      [1, -1],
      [-1, 1],
    ].entries()) {
      p.copy(chip.pos).addScaled(ax, (i * CHIP_W) / 2).addScaled(az, (j * CHIP_D) / 2);
      if (!onWall(p, ends[k])) return;
    }
    if (!onWall(chip.pos, q)) return;
    // Fainter for chips still in the air.
    const alpha = 0.28 * lightAt(q) * clamp(1.2 - q.distanceTo(chip.pos) * 1.2);
    if (alpha < 0.01) return;
    // Map the soft rectangle onto the three cast corners.
    const { canvas: img, pad, rw, rh } = shadow;
    const ux = (sx(along) - sx(corner)) / rw;
    const uy = (sy(along) - sy(corner)) / rw;
    const wx = (sx(across) - sx(corner)) / rh;
    const wy = (sy(across) - sy(corner)) / rh;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.transform(ux, uy, wx, wy, sx(corner) - pad * (ux + wx), sy(corner) - pad * (uy + wy));
    ctx.drawImage(img, 0, 0);
    ctx.restore();
  };

  const drawChip = (chip: Chip) => {
    const { pos } = chip;
    chip.quat.axes(ax, ay, az);
    const r = CHIP_RADIUS;

    // Outline: the box with its edges pulled in by the corner radius, grown back by the radius.
    const corners: [number, number][] = [];
    for (let k = 0; k < 8; k++) {
      p.copy(pos)
        .addScaled(ax, (k & 1 ? 1 : -1) * (CHIP_W / 2 - r))
        .addScaled(ay, (k & 2 ? 1 : -1) * (CHIP_T / 2 - r))
        .addScaled(az, (k & 4 ? 1 : -1) * (CHIP_D / 2 - r));
      corners.push([sx(p), sy(p)]);
    }
    // The sides take the light of the one that shows most: a long side or an end.
    n.copy(Math.abs(az.dot(TO_CAMERA)) * CHIP_W > Math.abs(ax.dot(TO_CAMERA)) * CHIP_D ? az : ax);
    if (n.dot(TO_CAMERA) < 0) n.set(-n.x, -n.y, -n.z);
    const g = Math.round(244 * sideLight(n, pos));
    ctx.fillStyle = ctx.strokeStyle = `rgb(${g},${g},${g})`;
    ctx.lineWidth = 2 * r * view.scale;
    ctx.lineJoin = "round";
    ctx.beginPath();
    hull(corners).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Top (with the label) or bottom, whichever faces the camera.
    const top = ay.dot(TO_CAMERA) >= 0;
    const s = top ? 1 : -1;
    n.set(ay.x * s, ay.y * s, ay.z * s);
    p.copy(pos).addScaled(n, CHIP_T / 2);
    const label = labels[chip.label];
    const lw = label.width;
    const lh = label.height;
    const fx = CHIP_W / lw;
    const fz = CHIP_D / lh;
    q.copy(p)
      .addScaled(ax, -CHIP_W / 2)
      .addScaled(az, -CHIP_D / 2);
    ctx.save();
    ctx.imageSmoothingQuality = "high";
    ctx.transform(vx(ax) * fx, vy(ax) * fx, vx(az) * fz, vy(az) * fz, sx(q), sy(q));
    ctx.beginPath();
    roundedRect(ctx, r / fx / 4, r / fz / 4, lw - r / fx / 2, lh - r / fz / 2, r / fx);
    ctx.clip();
    if (top) ctx.drawImage(label, 0, 0);
    else {
      ctx.fillStyle = "#f4f4f4";
      ctx.fillRect(0, 0, lw, lh);
    }
    const light = faceLight(n, pos);
    ctx.fillStyle = light < 1 ? `rgba(0,0,0,${1 - light})` : `rgba(255,255,255,${light - 1})`;
    ctx.fillRect(0, 0, lw, lh);
    ctx.restore();
  };

  const depth = (c: Chip) => (c.pos.y - view.lookY) * SIN_T + c.pos.z * COS_T;

  /* ----- Frame ----- */

  const draw = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const chips = flow.chips.filter((c) => c.visible).sort((a, b) => depth(a) - depth(b));

    ctx.save();
    opening(false);
    ctx.clip();
    chips.forEach(drawShadow);
    ctx.restore();

    ctx.save();
    opening(true);
    ctx.clip();
    chips.forEach(drawChip);
    ctx.restore();

    // The band flares as a chip goes through.
    const pulse = flow.pulse;
    if (pulse > 0.01) {
      glowBand(COLLAR_R + 0.03, BAND_Y, 0.2, 0.3 * pulse);
      ctx.globalAlpha = 0.55 * pulse;
      ctx.strokeStyle = "#ffb27a";
      ctx.lineWidth = 0.022 * view.scale;
      ctx.beginPath();
      frontArc(COLLAR_R + 0.008, BAND_Y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Rings of light running down the spout.
    for (const ring of flow.rings) {
      if (!ring.on || ring.fade < 0.01) continue;
      glowBand(SPOUT + 0.02, ring.y, 0.16, 0.4 * ring.fade);
      ctx.globalAlpha = 0.9 * ring.fade;
      ctx.strokeStyle = ORANGE;
      ctx.lineWidth = 0.02 * view.scale;
      ctx.beginPath();
      frontArc(SPOUT + 0.006, ring.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  };

  /* ----- Layout ----- */

  const layout = () => {
    w = container.clientWidth;
    h = container.clientHeight;
    if (!w || !h) return false;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    view = viewFor(w, h, measure.offsetWidth);
    canvas.width = bg.width = Math.round(w * dpr);
    canvas.height = bg.height = Math.round(h * dpr);
    // The funnel picture, scaled and placed once per size.
    const b = bg.getContext("2d")!;
    const k = view.scale / SPRITE.scale;
    b.imageSmoothingQuality = "high";
    b.setTransform(dpr, 0, 0, dpr, 0, 0);
    b.drawImage(
      img,
      w / 2 - SPRITE.x * k,
      h / 2 + view.lookY * COS_T * view.scale - SPRITE.y * k,
      img.naturalWidth * k,
      img.naturalHeight * k,
    );
    return true;
  };

  /* ----- Loop ----- */

  let raf = 0;
  let running = false;
  let visible = true;
  let loaded = false;
  let last = 0;
  let ready = false;
  let dead = false;

  const render = () => {
    draw();
    if (!ready) {
      ready = true;
      onReady();
    }
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const die = () => {
    if (dead) return;
    dead = true;
    stop();
    onFail();
  };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    // rAF timestamps can run slightly behind performance.now(), so never step backwards.
    const dt = Math.min(Math.max((now - last) / 1000, 0), 0.05);
    last = now;
    try {
      flow.step(dt, view);
      render();
    } catch {
      die();
    }
  };

  const sync = () => {
    const should = !dead && loaded && visible && document.visibilityState === "visible";
    if (should && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!should && running) {
      stop();
    }
  };

  const resize = () => {
    if (dead || !loaded || !layout() || running) return;
    try {
      flow.step(0, view);
      render();
    } catch {
      die();
    }
  };

  const ro = new ResizeObserver(resize);
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    sync();
  });

  img.onload = () => {
    if (dead) return;
    loaded = true;
    ro.observe(container);
    ro.observe(measure);
    io.observe(container);
    document.addEventListener("visibilitychange", sync);
    resize();
    sync();
  };
  img.onerror = die;
  img.src = funnelImage.src;

  return {
    dispose() {
      dead = true;
      stop();
      img.onload = img.onerror = null;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    },
  };
}
