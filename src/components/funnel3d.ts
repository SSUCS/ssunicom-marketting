import {
  CanvasTexture,
  CylinderGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  FrontSide,
  Group,
  LatheGeometry,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  OrthographicCamera,
  PCFSoftShadowMap,
  PMREMGenerator,
  Quaternion,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Material,
  type Texture,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/*
 * The hero funnel, in WebGL. Lead sources (search, ads, social…) drop into a
 * white funnel, swirl down the inside and disappear through the throat; the
 * orange band on the collar flares each time one goes through, and a ring of
 * light runs down the spout towards the lead tube.
 *
 * All sizes are relative to the funnel's rim radius (1). The camera is
 * orthographic, so the spout keeps exactly the width of the lead tube below
 * it: 53% of the measuring box, as in the SVG fallback.
 */

const TILT = (16 * Math.PI) / 180; // camera angle above the horizon
const RIM = 1;
const SPOUT = 0.592; // outer spout radius
const THROAT_Y = -0.54; // where the cone meets the spout
const WALL = Math.atan((RIM - SPOUT) / -THROAT_Y); // cone wall, measured from vertical
const THICK = 0.045; // wall thickness
const COLLAR_R = SPOUT * 1.222; // same ratio as the tube collars (27.5cqw / 22.5cqw)
const COLLAR_TOP = THROAT_Y - 0.035;
const COLLAR_H = 0.13;
const BAND_Y = COLLAR_TOP - COLLAR_H / 2;

const CHIP_W = 0.44;
const CHIP_T = 0.05;
const CHIP_D = 0.14;

const FALL = 0.65;
const SPIN = 2.7;
const DROP = 0.45;
const LIFE = FALL + SPIN + DROP;
const INTERVAL = 0.55;
const CHIPS = 8;

const ORANGE = 0xff7120;
const TURN = Math.PI * 2.6; // how far a chip swirls on its way down

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

export type FunnelScene = { dispose: () => void };

type Options = {
  canvas: HTMLCanvasElement;
  /** Element the canvas fills; its size sets the canvas size. */
  container: HTMLElement;
  /** Box the old SVG funnel sat in: the spout is 53% of its width. */
  measure: HTMLElement;
  animate: boolean;
  fontFamily: string;
  onReady: () => void;
};

/* ---------- Profile helpers ---------- */

type P = [number, number];

/** Rounds every interior corner of a polyline with a quadratic curve. */
function rounded(pts: P[], radius: number, steps = 8): P[] {
  const out: P[] = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const d1 = Math.hypot(cx - px, cy - py);
    const d2 = Math.hypot(nx - cx, ny - cy);
    const f = Math.min(radius, d1 / 2, d2 / 2);
    const ax = cx + ((px - cx) / d1) * f;
    const ay = cy + ((py - cy) / d1) * f;
    const bx = cx + ((nx - cx) / d2) * f;
    const by = cy + ((ny - cy) / d2) * f;
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const u = 1 - t;
      out.push([u * u * ax + 2 * u * t * cx + t * t * bx, u * u * ay + 2 * u * t * cy + t * t * by]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

/** Splits long segments so vertex colours can change smoothly along them. */
function subdivide(pts: P[], max: number): P[] {
  const out: P[] = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i];
    const n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / max));
    for (let k = 1; k <= n; k++) out.push([ax + ((bx - ax) * k) / n, ay + ((by - ay) * k) / n]);
  }
  return out;
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Lathe with a per-profile-point grey level baked into vertex colours (cheap ambient occlusion). */
function lathe(profile: P[], shade: (p: P, i: number) => number, segments = 160) {
  const geo = new LatheGeometry(
    profile.map(([r, y]) => new Vector2(r, y)),
    segments,
  );
  const n = profile.length;
  const colors = new Float32Array(geo.attributes.position.count * 3);
  for (let i = 0; i < geo.attributes.position.count; i++) {
    const j = i % n;
    const g = shade(profile[j], j);
    colors.set([g, g, g], i * 3);
  }
  geo.setAttribute("color", new Float32BufferAttribute(colors, 3));
  return geo;
}

/* ---------- Funnel ---------- */

function buildFunnel(white: MeshStandardMaterial) {
  const group = new Group();
  const n: P = [-Math.cos(WALL), Math.sin(WALL)]; // inner wall normal in (r, y)
  const d: P = [Math.sin(WALL), Math.cos(WALL)]; // up the wall

  // Outer surface, bottom to rim.
  const outer = subdivide(rounded([[SPOUT, -4], [SPOUT, THROAT_Y], [RIM, 0]], 0.08), 0.04);

  // Rolled lip from the outer to the inner surface.
  const mid: P = [RIM + (n[0] * THICK) / 2, (n[1] * THICK) / 2];
  const lip: P[] = [];
  for (let k = 1; k < 12; k++) {
    const t = (k / 12) * Math.PI;
    lip.push([
      mid[0] + (THICK / 2) * (-Math.cos(t) * n[0] + Math.sin(t) * d[0]),
      mid[1] + (THICK / 2) * (-Math.cos(t) * n[1] + Math.sin(t) * d[1]),
    ]);
  }

  // Inner surface, rim to bottom.
  const innerTop: P = [RIM + n[0] * THICK, n[1] * THICK];
  const innerR = SPOUT - THICK;
  const s = (innerTop[0] - innerR) / Math.sin(WALL);
  const innerThroat: P = [innerR, innerTop[1] - s * Math.cos(WALL)];
  const inner = subdivide(rounded([innerTop, innerThroat, [innerR, -4]], 0.1), 0.03);

  const profile = [...outer, ...lip, ...inner];
  const innerStart = outer.length + lip.length;
  const depth = -innerThroat[1];

  const shell = new Mesh(
    lathe(profile, ([, y], i) => {
      if (i < innerStart) return 1 - 0.12 * smooth(THROAT_Y + 0.2, THROAT_Y, y);
      if (y >= innerThroat[1]) {
        const q = Math.min(1, Math.max(0, -y / depth));
        return 0.94 - 0.86 * Math.pow(q, 0.6);
      }
      return 0.45 * Math.exp((y - innerThroat[1]) / 0.09);
    }),
    white,
  );
  shell.castShadow = true;
  shell.receiveShadow = true;
  group.add(shell);

  // Collar around the spout, like the ones on the tube.
  const bottom = COLLAR_TOP - COLLAR_H;
  const collar = new Mesh(
    lathe(
      rounded(
        [
          [SPOUT - 0.002, bottom],
          [COLLAR_R, bottom],
          [COLLAR_R, COLLAR_TOP],
          [SPOUT - 0.002, COLLAR_TOP],
        ],
        0.03,
      ),
      ([r, y]) => (y < bottom + 0.01 && r < COLLAR_R - 0.02 ? 0.7 : 1),
    ),
    white,
  );
  collar.castShadow = true;
  collar.receiveShadow = true;
  group.add(collar);

  return { group, innerR, innerTop };
}

/* ---------- Textures ---------- */

function labelTexture(src: FunnelSource, family: string, maxAniso: number): Texture {
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
  ctx.fillStyle = "#ff7120";
  ctx.fillRect(W - H * 0.36 - sq, (H - sq) / 2, sq, sq);

  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = maxAniso;
  return tex;
}

/** Soft vertical fade for the glow around the orange band. */
function glowTexture(): Texture {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, "rgba(255,255,255,0)");
  g.addColorStop(0.5, "rgba(255,255,255,1)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 4, 128);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

/* ---------- Motion ---------- */

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Flight = { mesh: Mesh; born: number; theta0: number; dir: number; drift: Vector2; tumble: Quaternion; fired: boolean };

export function createFunnelScene({ canvas, container, measure, animate, fontFamily, onReady }: Options): FunnelScene | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.55;

  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 40);

  const key = new DirectionalLight(0xffffff, 2);
  key.position.set(-2.2, 3, 2.4);
  key.target.position.set(0, -0.2, 0);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -1.5, right: 1.5, top: 1.5, bottom: -1.5, near: 0.5, far: 9 });
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.02;
  const rim = new DirectionalLight(0xffffff, 0.7);
  rim.position.set(2.5, 1, -2);
  scene.add(key, key.target, rim);

  const white = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.38, metalness: 0, vertexColors: true });
  const funnel = buildFunnel(white);
  scene.add(funnel.group);

  // Orange band and its glow.
  const bandMat = new MeshStandardMaterial({ color: ORANGE, emissive: 0xff5a0a, emissiveIntensity: 0.8, roughness: 0.35 });
  const bandProfile: P[] = [];
  for (let k = 0; k <= 10; k++) {
    const t = -Math.PI / 2 + (k / 10) * Math.PI;
    bandProfile.push([COLLAR_R - 0.004 + 0.016 * Math.cos(t), BAND_Y + 0.016 * Math.sin(t)]);
  }
  const band = new Mesh(new LatheGeometry(bandProfile.map(([r, y]) => new Vector2(r, y)), 160), bandMat);
  scene.add(band);

  const glowTex = glowTexture();
  const glowMat = new MeshBasicMaterial({
    color: ORANGE,
    map: glowTex,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    side: FrontSide,
    toneMapped: false,
  });
  const glow = new Mesh(new CylinderGeometry(COLLAR_R + 0.03, COLLAR_R + 0.03, 0.2, 128, 1, true), glowMat);
  glow.position.y = BAND_Y;
  scene.add(glow);

  // Lead-source chips.
  const sideMat = new MeshStandardMaterial({ color: 0xf4f4f4, roughness: 0.45 });
  const chipGeo = new RoundedBoxGeometry(CHIP_W, CHIP_T, CHIP_D, 3, 0.016);
  const aniso = renderer.capabilities.getMaxAnisotropy();
  const textures = funnelSources.map((src) => labelTexture(src, fontFamily, aniso));
  const tops = textures.map((map) => new MeshStandardMaterial({ map, roughness: 0.45 }));
  const flights: Flight[] = Array.from({ length: CHIPS }, (_, i) => {
    // BoxGeometry face order: +x, -x, +y, -y, +z, -z.
    const top = tops[i % tops.length];
    const mesh = new Mesh(chipGeo, [sideMat, sideMat, top, sideMat, sideMat, sideMat]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.visible = false;
    scene.add(mesh);
    return { mesh, born: -99, theta0: 0, dir: 1, drift: new Vector2(), tumble: new Quaternion(), fired: false };
  });

  // Rings of light that run down the spout towards the lead tube.
  const ringProfile: P[] = [];
  for (let k = 0; k <= 8; k++) {
    const t = -Math.PI / 2 + (k / 8) * Math.PI;
    ringProfile.push([SPOUT - 0.004 + 0.01 * Math.cos(t), 0.01 * Math.sin(t)]);
  }
  const ringGeo = new LatheGeometry(ringProfile.map(([r, y]) => new Vector2(r, y)), 128);
  const ringGlowGeo = new CylinderGeometry(SPOUT + 0.02, SPOUT + 0.02, 0.16, 96, 1, true);
  type Ring = { group: Group; core: MeshBasicMaterial; halo: MeshBasicMaterial; y: number; on: boolean };
  const rings: Ring[] = Array.from({ length: 3 }, () => {
    const core = new MeshBasicMaterial({ color: ORANGE, transparent: true, toneMapped: false });
    const halo = glowMat.clone();
    const group = new Group();
    group.add(new Mesh(ringGeo, core), new Mesh(ringGlowGeo, halo));
    group.visible = false;
    scene.add(group);
    return { group, core, halo, y: 0, on: false };
  });
  let ringNext = 0;
  const sendRing = () => {
    const r = rings[ringNext];
    ringNext = (ringNext + 1) % rings.length;
    r.y = COLLAR_TOP - COLLAR_H - 0.02;
    r.on = true;
  };
  const moveRing = (r: Ring, dt: number) => {
    if (!r.on) return;
    r.y -= dt * 0.4;
    const start = COLLAR_TOP - COLLAR_H - 0.02;
    const end = lookY - (topU + 0.1) / Math.cos(TILT);
    const k = (start - r.y) / (start - end);
    if (k >= 1) {
      r.on = false;
      r.group.visible = false;
      return;
    }
    r.group.visible = true;
    r.group.position.y = r.y;
    const fade = Math.min(1, k * 8) * (1 - k);
    r.core.opacity = 0.9 * fade;
    r.halo.opacity = 0.4 * fade;
  };

  /* ----- Layout ----- */

  let scale = 100; // px per unit
  let topU = 1; // half the canvas height, in units
  let lookY = 0;

  const layout = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return false;
    scale = (0.265 * measure.offsetWidth) / SPOUT;
    renderer.setSize(w, h, false);
    const hw = w / 2 / scale;
    topU = h / 2 / scale;
    camera.left = -hw;
    camera.right = hw;
    camera.top = topU;
    camera.bottom = -topU;
    // Put the bottom of the collar a little above the bottom edge; the spout runs on below.
    const gap = Math.min(0.14, 26 / scale);
    lookY = COLLAR_TOP - COLLAR_H - (-topU + gap + COLLAR_R * Math.sin(TILT)) / Math.cos(TILT);
    camera.position.set(0, lookY + 10 * Math.sin(TILT), 10 * Math.cos(TILT));
    camera.lookAt(0, lookY, 0);
    camera.updateProjectionMatrix();
    return true;
  };

  /* ----- Paths ----- */

  const LAND_R = 0.84;
  const END_R = funnel.innerR - 0.02;
  const wallY = (r: number) => funnel.innerTop[1] - (funnel.innerTop[0] - r) / Math.tan(WALL);
  const normalAt = (theta: number, out: Vector3) =>
    out.set(-Math.cos(WALL) * Math.cos(theta), Math.sin(WALL), -Math.cos(WALL) * Math.sin(theta));
  const lift = (r: number) => CHIP_T / 2 + 0.004 + ((0.55 * CHIP_W * CHIP_W) / (8 * r)) * Math.cos(WALL);

  const tmpN = new Vector3();
  const tmpA = new Vector3();
  const tmpB = new Vector3();
  const tmpX = new Vector3();
  const tmpZ = new Vector3();
  const mat = new Matrix4();

  // Slow and high on the far wall at first, then faster and deeper.
  const angleAt = (f: Flight, u: number) => f.theta0 + f.dir * TURN * Math.pow(Math.min(u, 1), 1.7);

  const spiral = (f: Flight, u: number, out: Vector3) => {
    const r = LAND_R - (LAND_R - END_R) * Math.pow(u, 1.1);
    const theta = angleAt(f, u);
    normalAt(theta, tmpN);
    return out.set(r * Math.cos(theta), wallY(r), r * Math.sin(theta)).addScaledVector(tmpN, lift(r));
  };

  /** Orientation lying on the wall, long side along the direction of travel. */
  const wallFrame = (f: Flight, u: number, q: Quaternion) => {
    const theta = angleAt(f, u);
    normalAt(theta, tmpN);
    spiral(f, Math.max(0, u - 0.01), tmpA);
    spiral(f, Math.min(1, u + 0.01) + (u >= 0.99 ? 0.0001 : 0), tmpB);
    tmpX.subVectors(tmpB, tmpA);
    tmpX.addScaledVector(tmpN, -tmpX.dot(tmpN));
    if (tmpX.lengthSq() < 1e-8) tmpX.set(-Math.sin(theta), 0, Math.cos(theta));
    tmpX.normalize();
    tmpZ.crossVectors(tmpX, tmpN);
    mat.makeBasis(tmpX, tmpN, tmpZ);
    return q.setFromRotationMatrix(mat);
  };

  const qLand = new Quaternion();
  const qEnd = new Quaternion();
  const qDrop = new Quaternion();
  const pos = new Vector3();

  let pulse = 0;
  let passed = 0;

  const place = (f: Flight, age: number) => {
    const m = f.mesh;
    if (age < 0 || age >= LIFE) {
      m.visible = false;
      return;
    }
    m.visible = true;
    if (age < FALL) {
      const t = age / FALL;
      spiral(f, 0, pos);
      wallFrame(f, 0, qLand);
      // Start just above the top edge, then fall with gravity.
      const startY = lookY + (topU + 0.2 + pos.z * Math.sin(TILT)) / Math.cos(TILT);
      m.position.set(pos.x + f.drift.x * (1 - t), startY + (pos.y - startY) * t * t, pos.z + f.drift.y * (1 - t));
      m.quaternion.slerpQuaternions(f.tumble, qLand, easeInOut(Math.min(1, t * 1.1)));
      return;
    }
    if (age < FALL + SPIN) {
      const u = (age - FALL) / SPIN;
      spiral(f, u, m.position);
      wallFrame(f, u, m.quaternion);
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
    m.position.set(r * Math.cos(a), pos.y - 0.75 * v * v - 0.05 * v, r * Math.sin(a));
    // Tip over so the chip falls edge first.
    tmpN.set(-Math.cos(a), 0, -Math.sin(a));
    tmpX.set(0, -1, 0);
    tmpZ.crossVectors(tmpX, tmpN);
    mat.makeBasis(tmpX, tmpN, tmpZ);
    qDrop.setFromRotationMatrix(mat);
    m.quaternion.slerpQuaternions(qEnd, qDrop, easeInOut(Math.min(1, v * 1.6)));
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
  const there = new Vector3();
  const landing = new Vector3();
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
    f.drift.set((rand() - 0.5) * 0.3, (rand() - 0.5) * 0.2);
    f.tumble.setFromAxisAngle(tmpA.set(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize(), 0.6 + rand() * 1.1);
  };

  let time = 0;
  const step = (dt: number) => {
    time += dt;
    while (time - lastLaunch >= INTERVAL) {
      lastLaunch += INTERVAL;
      launch(flights[next], lastLaunch);
      next = (next + 1) % flights.length;
    }
    for (const f of flights) place(f, time - f.born);
    for (const r of rings) moveRing(r, dt);
    pulse *= Math.exp(-dt * 3.2);
    bandMat.emissiveIntensity = 0.9 + 0.9 * pulse;
    glowMat.opacity = 0.32 + 0.22 * pulse;
  };

  time = LIFE + 0.01;
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
    // A still: four chips spread over the visible back wall.
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

  /* ----- Loop ----- */

  let raf = 0;
  let running = false;
  let visible = true;
  let last = 0;
  let ready = false;

  const render = () => {
    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      onReady();
    }
  };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    // rAF timestamps can run slightly behind performance.now(), so never step backwards.
    const dt = Math.min(Math.max((now - last) / 1000, 0), 0.05);
    last = now;
    step(dt);
    render();
  };

  const sync = () => {
    const should = animate && visible && document.visibilityState === "visible";
    if (should && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!should && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  };

  const resize = () => {
    if (!layout()) return;
    if (!running) {
      step(0);
      render();
    }
  };

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  ro.observe(measure);
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    sync();
  });
  io.observe(container);
  document.addEventListener("visibilitychange", sync);

  resize();
  sync();

  return {
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      scene.traverse((o) => {
        if (o instanceof Mesh) {
          o.geometry.dispose();
          const mats: Material[] = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => m.dispose());
        }
      });
      textures.forEach((t) => t.dispose());
      glowTex.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
