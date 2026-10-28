// Renders the site's 3D artwork into src/seed/art/*.webp (uploaded to the CMS by the seed).
// Usage: node scripts/art/render.mjs [name ...]
// Needs Playwright's Chromium (dev only; not a project dependency).
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../..')
const out = path.join(root, 'src/seed/art')
fs.mkdirSync(out, { recursive: true })

export const jobs = [
  { file: 'hero', scene: 'hero', w: 2400, h: 1100 },
  { file: 'hero-mobile', scene: 'hero', w: 1000, h: 1100 },
  { file: 'who-we-are', scene: 'ring', w: 1200, h: 1000 },
  { file: 'silk', scene: 'silk', w: 800, h: 1200 },
  { file: 'waves', scene: 'waves', w: 900, h: 1200 },
  { file: 'banner-cobalt', scene: 'bannerCobalt', w: 2000, h: 500 },
  { file: 'navy-glass', scene: 'navyGlass', w: 2000, h: 900 },
  { file: 'experts', scene: 'experts', w: 900, h: 1100 },
  // Industries
  { file: 'industry-healthcare', scene: 'tile:cross:cobalt', w: 1000, h: 700 },
  { file: 'industry-insurance', scene: 'tile:shield:teal', w: 1000, h: 700 },
  { file: 'industry-real-estate', scene: 'tile:house:amber', w: 1000, h: 700 },
  { file: 'industry-legal', scene: 'tile:pillars:violet', w: 1000, h: 700 },
  { file: 'industry-financial', scene: 'tile:coins:stone', w: 1000, h: 700 },
  { file: 'industry-retail', scene: 'tile:bag:amber', w: 1000, h: 700 },
  { file: 'industry-technology', scene: 'tile:chip:teal', w: 1000, h: 700 },
  { file: 'industry-logistics', scene: 'tile:containers:cobalt', w: 1000, h: 700 },
  // Service groups
  { file: 'group-cx', scene: 'tile:bubbles:cobalt', w: 1200, h: 900 },
  { file: 'group-back-office', scene: 'tile:documents:teal', w: 1200, h: 900 },
  { file: 'group-industry', scene: 'tile:gear:stone', w: 1200, h: 900 },
  { file: 'group-technology', scene: 'tile:code:violet', w: 1200, h: 900 },
  { file: 'group-marketing', scene: 'tile:megaphone:pink', w: 1200, h: 900 },
  // Extra tiles used on pages
  { file: 'tile-headset', scene: 'tile:headset:amber', w: 1200, h: 900 },
  { file: 'tile-people', scene: 'tile:people:cobalt', w: 1200, h: 900 },
  { file: 'tile-chart', scene: 'tile:chart:stone', w: 1200, h: 900 },
  { file: 'tile-shield', scene: 'tile:shield:cobalt', w: 1200, h: 900 },
]

const types = { '.js': 'text/javascript', '.html': 'text/html' }
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x')
  let file
  if (url.pathname === '/') file = path.join(here, 'index.html')
  else if (url.pathname.startsWith('/three/')) file = path.join(root, 'node_modules/three', url.pathname.slice(7))
  else file = path.join(here, url.pathname)
  fs.readFile(file, (err, data) => {
    if (err) return res.writeHead(404).end()
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(data)
  })
})
await new Promise((r) => server.listen(4917, r))

const only = process.argv.slice(2)
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
for (const job of jobs.filter((j) => !only.length || only.includes(j.file))) {
  const page = await browser.newPage({ viewport: { width: job.w, height: job.h } })
  page.on('pageerror', (e) => console.error(job.file, e.message))
  await page.goto(`http://localhost:4917/?scene=${encodeURIComponent(job.scene)}&w=${job.w}&h=${job.h}`)
  await page.waitForFunction(() => window.__done === true, null, { timeout: 180000, polling: 200 })
  const png = await page.locator('#stage').screenshot()
  await sharp(png).webp({ quality: 84 }).toFile(path.join(out, `${job.file}.webp`))
  console.log('rendered', job.file)
  await page.close()
}
await browser.close()
server.close()
