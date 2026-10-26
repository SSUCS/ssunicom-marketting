/*
 * Renders src/components/hero-funnel.webp, the picture of the hero funnel that
 * funnelCanvas.ts draws its chips over, from the WebGL scene in
 * funnel-stage.ts. Run it again after changing the funnel's shape or lighting:
 *
 *   node scripts/render-hero-funnel.mjs
 *
 * Needs Playwright with Chromium (npm i -D playwright, npx playwright install chromium).
 */
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "src/components/hero-funnel.webp");

// Keep in step with SPRITE in funnelCanvas.ts.
const scale = 800; // pixels per unit
const frame = { left: -1.02, right: 1.02, top: 0.33, bottom: -1.08 }; // units around the rim's centre

let chromium;
try {
  ({ chromium } = createRequire(import.meta.url)("playwright"));
} catch {
  console.error("This script needs Playwright: npm i -D playwright, then npx playwright install chromium");
  process.exit(1);
}

const html = `<!doctype html>
<script type="importmap">
  { "imports": { "three": "/three/build/three.module.js", "three/examples/jsm/": "/three/examples/jsm/" } }
</script>
<script type="module">
  import { OrthographicCamera, WebGLRenderer } from "three";
  import { createStage } from "/scripts/funnel-stage";
  import { TILT } from "/src/components/funnelMotion";

  window.renderFunnel = ({ scale, frame }) => {
    const w = Math.round((frame.right - frame.left) * scale);
    const h = Math.round((frame.top - frame.bottom) * scale);
    // Render at twice the size and scale down, for smoother edges.
    const big = document.createElement("canvas");
    const renderer = new WebGLRenderer({ canvas: big, antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(1);
    renderer.setSize(w * 2, h * 2, false);
    const scene = createStage(renderer);
    const camera = new OrthographicCamera(frame.left, frame.right, frame.top, frame.bottom, 0.1, 40);
    camera.position.set(0, 10 * Math.sin(TILT), 10 * Math.cos(TILT));
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);

    const small = document.createElement("canvas");
    small.width = w;
    small.height = h;
    const ctx = small.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(big, 0, 0, w, h);
    return small.toDataURL("image/webp", 0.9);
  };
  window.funnelReady = true;
</script>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.error(e));
  await page.route("http://render.local/**", async (route) => {
    const { pathname } = new URL(route.request().url());
    if (pathname === "/") return route.fulfill({ contentType: "text/html", body: html });
    if (pathname.startsWith("/three/")) {
      return route.fulfill({ contentType: "text/javascript", body: await readFile(path.join(root, "node_modules", pathname)) });
    }
    if (pathname.startsWith("/src/") || pathname.startsWith("/scripts/")) {
      const source = await readFile(path.join(root, `${pathname}.ts`), "utf8");
      const { outputText } = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
      });
      return route.fulfill({ contentType: "text/javascript", body: outputText });
    }
    return route.fulfill({ status: 404 });
  });
  await page.goto("http://render.local/");
  await page.waitForFunction(() => window.funnelReady);
  const url = await page.evaluate((args) => window.renderFunnel(args), { scale, frame });
  await writeFile(out, Buffer.from(url.split(",")[1], "base64"));
  console.log(`Wrote ${path.relative(root, out)}`);
} finally {
  await browser.close();
}
