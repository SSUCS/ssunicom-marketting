import {
  CanvasTexture,
  CylinderGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  FrontSide,
  Group,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NeutralToneMapping,
  PCFSoftShadowMap,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector2,
  type Texture,
  type WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  BAND_Y,
  COLLAR_H,
  COLLAR_R,
  COLLAR_TOP,
  INNER_R,
  INNER_TOP,
  KEY_LIGHT,
  ORANGE,
  RIM,
  SPOUT,
  THICK,
  THROAT_Y,
  WALL,
} from "../src/components/funnelMotion";

/*
 * The hero funnel in WebGL, without its chips: lights, funnel, collar and the
 * orange band with its glow. render-hero-funnel.mjs renders it to the picture
 * that the site's canvas funnel (funnelCanvas.ts) draws its chips over.
 */

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
  const s = (INNER_TOP[0] - INNER_R) / Math.sin(WALL);
  const innerThroat: P = [INNER_R, INNER_TOP[1] - s * Math.cos(WALL)];
  const inner = subdivide(rounded([INNER_TOP, innerThroat, [INNER_R, -4]], 0.1), 0.03);

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

  return group;
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

/** Sets up the renderer and returns the scene to render. */
export function createStage(renderer: WebGLRenderer) {
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;

  const key = new DirectionalLight(0xffffff, 2);
  key.position.set(...KEY_LIGHT);
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
  scene.add(buildFunnel(white));

  // Orange band and its glow, as they are between chips (funnelCanvas.ts adds the flare).
  const band = new MeshStandardMaterial({ color: ORANGE, emissive: 0xff5a0a, emissiveIntensity: 0.9, roughness: 0.35 });
  const bandProfile: P[] = [];
  for (let k = 0; k <= 10; k++) {
    const t = -Math.PI / 2 + (k / 10) * Math.PI;
    bandProfile.push([COLLAR_R - 0.004 + 0.016 * Math.cos(t), BAND_Y + 0.016 * Math.sin(t)]);
  }
  scene.add(new Mesh(new LatheGeometry(bandProfile.map(([r, y]) => new Vector2(r, y)), 160), band));

  const glow = new Mesh(
    new CylinderGeometry(COLLAR_R + 0.03, COLLAR_R + 0.03, 0.2, 128, 1, true),
    new MeshBasicMaterial({
      color: ORANGE,
      map: glowTexture(),
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      side: FrontSide,
      toneMapped: false,
    }),
  );
  glow.position.y = BAND_Y;
  scene.add(glow);

  return scene;
}
