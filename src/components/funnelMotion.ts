/*
 * The hero funnel's shape and motion, used by the canvas that draws it
 * (funnelCanvas.ts) and by the WebGL scene that renders the funnel's picture
 * (scripts/funnel-stage.ts). Plain maths, no three.js.
 *
 * Lead sources (search, ads, social…) drop into a white funnel, swirl down the
 * inside and disappear through the throat; the orange band on the collar flares
 * each time one goes through, and a ring of light runs down the spout towards
 * the lead tube.
 *
 * All sizes are relative to the funnel's rim radius (1), with y up. The camera
 * is orthographic and looks at the funnel from +z, TILT above the horizon, so
 * the spout keeps exactly the width of the lead tube below it: 53% of the
 * measuring box, as in the SVG fallback.
 */

export const TILT = (16 * Math.PI) / 180; // camera angle above the horizon
export const RIM = 1;
export const SPOUT = 0.592; // outer spout radius
export const THROAT_Y = -0.54; // where the cone meets the spout
export const WALL = Math.atan((RIM - SPOUT) / -THROAT_Y); // cone wall, measured from vertical
export const THICK = 0.045; // wall thickness
export const COLLAR_R = SPOUT * 1.222; // same ratio as the tube collars (27.5cqw / 22.5cqw)
export const COLLAR_TOP = THROAT_Y - 0.035;
export const COLLAR_H = 0.13;
export const BAND_Y = COLLAR_TOP - COLLAR_H / 2;

/** Top of the inner wall, as (radius, y), and the inner radius of the spout. */
export const INNER_TOP: [number, number] = [RIM - Math.cos(WALL) * THICK, Math.sin(WALL) * THICK];
export const INNER_R = SPOUT - THICK;

export const CHIP_W = 0.44;
export const CHIP_T = 0.05;
export const CHIP_D = 0.14;
export const CHIP_RADIUS = 0.016;

export const ORANGE = "#ff7120";

/** Where the key light comes from; it points at (0, -0.2, 0). */
export const KEY_LIGHT: [number, number, number] = [-2.2, 3, 2.4];

const FALL = 0.65;
const SPIN = 2.7;
const DROP = 0.45;
const LIFE = FALL + SPIN + DROP;
const INTERVAL = 0.55;
const CHIPS = 8;
const TURN = Math.PI * 2.6; // how far a chip swirls on its way down

/* ---------- Vectors ---------- */

export class Vec3 {
  constructor(
    public x = 0,
    public y = 0,
    public z = 0,
  ) {}
  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  copy(v: Vec3) {
    return this.set(v.x, v.y, v.z);
  }
  addScaled(v: Vec3, s: number) {
    return this.set(this.x + v.x * s, this.y + v.y * s, this.z + v.z * s);
  }
  subVectors(a: Vec3, b: Vec3) {
    return this.set(a.x - b.x, a.y - b.y, a.z - b.z);
  }
  crossVectors(a: Vec3, b: Vec3) {
    return this.set(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
  }
  dot(v: Vec3) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  lengthSq() {
    return this.dot(this);
  }
  normalize() {
    const l = Math.sqrt(this.lengthSq()) || 1;
    return this.set(this.x / l, this.y / l, this.z / l);
  }
  distanceTo(v: Vec3) {
    return Math.hypot(this.x - v.x, this.y - v.y, this.z - v.z);
  }
}

export class Quat {
  constructor(
    public x = 0,
    public y = 0,
    public z = 0,
    public w = 1,
  ) {}
  set(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
  setFromAxisAngle(axis: Vec3, angle: number) {
    const s = Math.sin(angle / 2);
    return this.set(axis.x * s, axis.y * s, axis.z * s, Math.cos(angle / 2));
  }
  /** The rotation that turns the x, y and z axes into ax, ay and az (orthonormal). */
  setFromAxes(ax: Vec3, ay: Vec3, az: Vec3) {
    const trace = ax.x + ay.y + az.z;
    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1);
      return this.set((ay.z - az.y) * s, (az.x - ax.z) * s, (ax.y - ay.x) * s, 0.25 / s);
    }
    if (ax.x > ay.y && ax.x > az.z) {
      const s = 2 * Math.sqrt(1 + ax.x - ay.y - az.z);
      return this.set(0.25 * s, (ay.x + ax.y) / s, (az.x + ax.z) / s, (ay.z - az.y) / s);
    }
    if (ay.y > az.z) {
      const s = 2 * Math.sqrt(1 + ay.y - ax.x - az.z);
      return this.set((ay.x + ax.y) / s, 0.25 * s, (az.y + ay.z) / s, (az.x - ax.z) / s);
    }
    const s = 2 * Math.sqrt(1 + az.z - ax.x - ay.y);
    return this.set((az.x + ax.z) / s, (az.y + ay.z) / s, 0.25 * s, (ax.y - ay.x) / s);
  }
  /** Spherical interpolation from a (t = 0) to b (t = 1). */
  slerp(a: Quat, b: Quat, t: number) {
    let cos = a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    const sign = cos < 0 ? -1 : 1;
    cos *= sign;
    let ka = 1 - t;
    let kb = t;
    if (cos < 0.9999) {
      const half = Math.acos(cos);
      const sin = Math.sin(half);
      ka = Math.sin(ka * half) / sin;
      kb = Math.sin(kb * half) / sin;
    }
    kb *= sign;
    this.set(a.x * ka + b.x * kb, a.y * ka + b.y * kb, a.z * ka + b.z * kb, a.w * ka + b.w * kb);
    const l = Math.hypot(this.x, this.y, this.z, this.w) || 1;
    return this.set(this.x / l, this.y / l, this.z / l, this.w / l);
  }
  /** The rotated x, y and z axes. */
  axes(ax: Vec3, ay: Vec3, az: Vec3) {
    const { x, y, z, w } = this;
    ax.set(1 - 2 * (y * y + z * z), 2 * (x * y + w * z), 2 * (x * z - w * y));
    ay.set(2 * (x * y - w * z), 1 - 2 * (x * x + z * z), 2 * (y * z + w * x));
    az.set(2 * (x * z + w * y), 2 * (y * z - w * x), 1 - 2 * (x * x + y * y));
  }
}

/* ---------- Framing ---------- */

export type View = {
  /** CSS pixels per unit. */
  scale: number;
  /** Half the canvas height, in units. */
  topU: number;
  /** Height the camera looks at. */
  lookY: number;
};

/** Framing for a canvas of w × h CSS pixels, scaled so the spout is 53% of the measuring box. */
export function viewFor(w: number, h: number, measureWidth: number): View {
  const scale = (0.265 * measureWidth) / SPOUT;
  const topU = h / 2 / scale;
  // Put the bottom of the collar a little above the bottom edge; the spout runs on below.
  const gap = Math.min(0.14, 26 / scale);
  const lookY = COLLAR_TOP - COLLAR_H - (-topU + gap + COLLAR_R * Math.sin(TILT)) / Math.cos(TILT);
  return { scale, topU, lookY };
}

/* ---------- Chip labels ---------- */

type FunnelSource = { label: string; icon: string[] };

/** Chip labels with icon paths copied from Icon.tsx (canvas needs plain path strings). */
const funnelSources: FunnelSource[] = [
  { label: "Search", icon: ["M17.5 11a6.5 6.5 0 1 1-13 0a6.5 6.5 0 1 1 13 0Z", "m16 16 4.5 4.5"] },
  { label: "Ads", icon: ["M4 10v4h3l8 4.5v-13L7 10H4Z", "M18.5 9.5a3.5 3.5 0 0 1 0 5M8 14l1 5h2.5l-1-4.2"] },
  {
    label: "Social",
    icon: ["M12 8a3 3 0 1 1-6 0a3 3 0 1 1 6 0Z", "M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.5M17.5 14.5A5.5 5.5 0 0 1 20.5 19"],
  },
  {
    label: "Web form",
    icon: [
      "M4.5 4.5h15a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V6a1.5 1.5 0 0 1 1.5-1.5Z",
      "M3 9h18M6.2 6.8h.01M8.7 6.8h.01M7 13h6M7 16h9",
    ],
  },
  { label: "Email", icon: ["M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z", "m4 7 8 6 8-6"] },
  {
    label: "Calls",
    icon: ["M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"],
  },
];

/**
 * The tops of the chips: icon, letter-spaced name and an orange square. The
 * image's x runs along the chip's x axis and its y along the chip's z axis.
 */
export function chipLabels(family: string): HTMLCanvasElement[] {
  return funnelSources.map((src) => {
    const W = 512;
    const H = Math.round((W * CHIP_D) / CHIP_W);
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, W, H);

    const icon = H * 0.44;
    const x0 = H * 0.36;
    ctx.save();
    ctx.translate(x0, (H - icon) / 2);
    ctx.scale(icon / 24, icon / 24);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#141414";
    for (const p of src.icon) ctx.stroke(new Path2D(p));
    ctx.restore();

    const size = H * 0.28;
    ctx.font = `500 ${size}px ${family}`;
    ctx.fillStyle = "#141414";
    ctx.textBaseline = "middle";
    let x = x0 + icon + H * 0.2;
    for (const ch of src.label.toUpperCase()) {
      ctx.fillText(ch, x, H / 2 + size * 0.06);
      x += ctx.measureText(ch).width + size * 0.12;
    }

    const sq = H * 0.13;
    ctx.fillStyle = ORANGE;
    ctx.fillRect(W - H * 0.36 - sq, (H - sq) / 2, sq, sq);
    return c;
  });
}

/* ---------- Motion ---------- */

/** A lead-source chip: which label it shows, and where it is. */
export type Chip = { label: number; visible: boolean; pos: Vec3; quat: Quat };

/** A ring of light on its way down the spout. */
export type Ring = { on: boolean; y: number; fade: number };

type Flight = Chip & { born: number; theta0: number; dir: number; dx: number; dz: number; tumble: Quat; fired: boolean };

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const LAND_R = 0.84;
const END_R = INNER_R - 0.02;
const RING_START = COLLAR_TOP - COLLAR_H - 0.02;

const wallY = (r: number) => INNER_TOP[1] - (INNER_TOP[0] - r) / Math.tan(WALL);
const normalAt = (theta: number, out: Vec3) =>
  out.set(-Math.cos(WALL) * Math.cos(theta), Math.sin(WALL), -Math.cos(WALL) * Math.sin(theta));
const lift = (r: number) => CHIP_T / 2 + 0.004 + ((0.55 * CHIP_W * CHIP_W) / (8 * r)) * Math.cos(WALL);

/**
 * The chips, rings and band pulse over time. With `animate` off it holds a
 * still: four chips spread over the visible back wall.
 */
export function createFlow(animate: boolean) {
  const flights: Flight[] = Array.from({ length: CHIPS }, (_, i) => ({
    label: i % funnelSources.length,
    visible: false,
    pos: new Vec3(),
    quat: new Quat(),
    born: -99,
    theta0: 0,
    dir: 1,
    dx: 0,
    dz: 0,
    tumble: new Quat(),
    fired: false,
  }));
  const rings: Ring[] = Array.from({ length: 3 }, () => ({ on: false, y: 0, fade: 0 }));

  let view: View = { scale: 100, topU: 1, lookY: 0 };
  let pulse = 0;
  let passed = 0;
  let ringNext = 0;

  const sendRing = () => {
    const r = rings[ringNext];
    ringNext = (ringNext + 1) % rings.length;
    r.y = RING_START;
    r.on = true;
  };
  const moveRing = (r: Ring, dt: number) => {
    if (!r.on) return;
    r.y -= dt * 0.4;
    const end = view.lookY - (view.topU + 0.1) / Math.cos(TILT);
    const k = (RING_START - r.y) / (RING_START - end);
    if (k >= 1) {
      r.on = false;
      r.fade = 0;
      return;
    }
    r.fade = Math.min(1, k * 8) * (1 - k);
  };

  /* ----- Paths ----- */

  const tmpN = new Vec3();
  const tmpA = new Vec3();
  const tmpB = new Vec3();
  const tmpX = new Vec3();
  const tmpZ = new Vec3();

  // Slow and high on the far wall at first, then faster and deeper.
  const angleAt = (f: Flight, u: number) => f.theta0 + f.dir * TURN * Math.pow(Math.min(u, 1), 1.7);

  const spiral = (f: Flight, u: number, out: Vec3) => {
    const r = LAND_R - (LAND_R - END_R) * Math.pow(u, 1.1);
    const theta = angleAt(f, u);
    normalAt(theta, tmpN);
    return out.set(r * Math.cos(theta), wallY(r), r * Math.sin(theta)).addScaled(tmpN, lift(r));
  };

  /** Orientation lying on the wall, long side along the direction of travel. */
  const wallFrame = (f: Flight, u: number, q: Quat) => {
    const theta = angleAt(f, u);
    normalAt(theta, tmpN);
    spiral(f, Math.max(0, u - 0.01), tmpA);
    spiral(f, Math.min(1, u + 0.01) + (u >= 0.99 ? 0.0001 : 0), tmpB);
    tmpX.subVectors(tmpB, tmpA);
    tmpX.addScaled(tmpN, -tmpX.dot(tmpN));
    if (tmpX.lengthSq() < 1e-8) tmpX.set(-Math.sin(theta), 0, Math.cos(theta));
    tmpX.normalize();
    tmpZ.crossVectors(tmpX, tmpN);
    return q.setFromAxes(tmpX, tmpN, tmpZ);
  };

  const qLand = new Quat();
  const qEnd = new Quat();
  const qDrop = new Quat();
  const pos = new Vec3();

  const place = (f: Flight, age: number) => {
    if (age < 0 || age >= LIFE) {
      f.visible = false;
      return;
    }
    f.visible = true;
    if (age < FALL) {
      const t = age / FALL;
      spiral(f, 0, pos);
      wallFrame(f, 0, qLand);
      // Start just above the top edge, then fall with gravity.
      const startY = view.lookY + (view.topU + 0.2 + pos.z * Math.sin(TILT)) / Math.cos(TILT);
      f.pos.set(pos.x + f.dx * (1 - t), startY + (pos.y - startY) * t * t, pos.z + f.dz * (1 - t));
      f.quat.slerp(f.tumble, qLand, easeInOut(Math.min(1, t * 1.1)));
      return;
    }
    if (age < FALL + SPIN) {
      const u = (age - FALL) / SPIN;
      spiral(f, u, f.pos);
      wallFrame(f, u, f.quat);
      return;
    }
    // Over the edge of the throat and down the spout.
    const v = (age - FALL - SPIN) / DROP;
    if (!f.fired) {
      f.fired = true;
      pulse = 1;
      if (++passed % 2 === 0) sendRing();
    }
    spiral(f, 1, pos);
    wallFrame(f, 1, qEnd);
    const theta = angleAt(f, 1);
    const r = END_R * (1 - 0.45 * v);
    const a = theta + f.dir * 0.7 * v;
    f.pos.set(r * Math.cos(a), pos.y - 0.75 * v * v - 0.05 * v, r * Math.sin(a));
    // Tip over so the chip falls edge first.
    tmpN.set(-Math.cos(a), 0, -Math.sin(a));
    tmpX.set(0, -1, 0);
    tmpZ.crossVectors(tmpX, tmpN);
    qDrop.setFromAxes(tmpX, tmpN, tmpZ);
    f.quat.slerp(qEnd, qDrop, easeInOut(Math.min(1, v * 1.6)));
  };

  /* ----- Timeline ----- */

  let next = 0; // index of the next chip to launch
  let lastLaunch = -INTERVAL;
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  // Land on the far side of the rim, where the inside of the funnel is in view,
  // in the spot furthest from the chips already sliding down there.
  const probe = { theta0: 0, dir: 1 } as Flight;
  const there = new Vec3();
  const landing = new Vec3();
  const pickAngle = (at: number) => {
    let best = -Math.PI / 2;
    let bestScore = -1;
    for (let k = 0; k < 14; k++) {
      probe.theta0 = -Math.PI * (0.16 + (0.68 * k) / 13);
      let gap = 9;
      // Compare paths over the first second and a half after landing.
      for (let ahead = 0; ahead <= 1.5; ahead += 0.3) {
        spiral(probe, ahead / SPIN, landing);
        for (const f of flights) {
          const age = at + FALL + ahead - f.born;
          if (f.born > at || age < 0 || age >= FALL + SPIN) continue;
          spiral(f, Math.max(0, (age - FALL) / SPIN), there);
          gap = Math.min(gap, there.distanceTo(landing));
        }
      }
      const score = gap + rand() * 0.06;
      if (score > bestScore) {
        bestScore = score;
        best = probe.theta0;
      }
    }
    return best;
  };

  const launch = (f: Flight, at: number) => {
    f.born = at;
    f.fired = false;
    f.dir = 1;
    f.theta0 = pickAngle(at);
    f.dx = (rand() - 0.5) * 0.3;
    f.dz = (rand() - 0.5) * 0.2;
    f.tumble.setFromAxisAngle(tmpA.set(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(), 0.6 + rand() * 1.1);
  };

  let time = LIFE + 0.01;
  if (animate) {
    // Start mid-flow, with chips already on their way down.
    const warm = Math.min(CHIPS, Math.ceil(LIFE / INTERVAL));
    lastLaunch = time - INTERVAL * warm;
    for (let k = 0; k < warm; k++) {
      launch(flights[k], lastLaunch + k * INTERVAL);
      flights[k].fired = time - flights[k].born > FALL + SPIN;
    }
    next = warm % CHIPS;
  } else {
    lastLaunch = Infinity;
    [
      [0.04, -0.7],
      [0.18, -0.28],
      [0.34, -0.5],
      [0.5, -0.8],
    ].forEach(([u, at], k) => {
      const f = flights[k];
      f.born = time - FALL - u * SPIN;
      f.theta0 = Math.PI * at - TURN * Math.pow(u, 1.7);
    });
  }

  return {
    chips: flights as Chip[],
    rings,
    /** How brightly the band glows: 1 as a chip goes through, fading to 0. */
    get pulse() {
      return pulse;
    },
    /** Moves everything on by dt seconds, framed by `v`. */
    step(dt: number, v: View) {
      view = v;
      time += dt;
      while (time - lastLaunch >= INTERVAL) {
        lastLaunch += INTERVAL;
        launch(flights[next], lastLaunch);
        next = (next + 1) % flights.length;
      }
      for (const f of flights) place(f, time - f.born);
      for (const r of rings) moveRing(r, dt);
      pulse *= Math.exp(-dt * 3.2);
    },
  };
}
