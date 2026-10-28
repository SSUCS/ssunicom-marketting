// Renders one piece of site artwork with three.js. Driven by scripts/art/render.mjs.
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

const params = new URLSearchParams(location.search)
const name = params.get('scene')
const W = +params.get('w') || 1600
const H = +params.get('h') || 1000

const C = {
  cobalt: '#187a7b',
  cobaltDeep: '#115254',
  sky: '#6cc6c0',
  ice: '#cfeeeb',
  teal: '#4fc4a4',
  mint: '#aae8d3',
  amber: '#6f9fb3',
  orange: '#4f879c',
  peach: '#bcd6e1',
  pink: '#5fb8a8',
  violet: '#4d8fa6',
  navy: '#0b2e31',
  white: '#FFFFFF',
  stone: '#e8f0f0',
}

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
renderer.setPixelRatio(1)
renderer.setSize(W, H)
renderer.toneMapping = THREE.NeutralToneMapping
renderer.toneMappingExposure = 0.95
renderer.outputColorSpace = THREE.SRGBColorSpace
document.getElementById('stage').appendChild(renderer.domElement)

const scene = new THREE.Scene()
const pmrem = new THREE.PMREMGenerator(renderer)
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 200)

function light() {
  const key = new THREE.DirectionalLight('#ffffff', 2.2)
  key.position.set(4, 8, 6)
  scene.add(key)
  const rim = new THREE.DirectionalLight('#c8f0ec', 1.2)
  rim.position.set(-6, 3, -4)
  scene.add(rim)
  scene.add(new THREE.AmbientLight('#ffffff', 0.35))
}

const glossy = (color, extra = {}) =>
  new THREE.MeshPhysicalMaterial({ color, roughness: 0.22, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.12, ...extra })

const glass = (tint = '#e2f5f3') =>
  new THREE.MeshPhysicalMaterial({
    color: tint,
    roughness: 0.06,
    metalness: 0,
    transmission: 0.92,
    thickness: 0.6,
    ior: 1.45,
    transparent: true,
    opacity: 0.95,
    clearcoat: 1,
  })

function setBackground(css) {
  document.getElementById('stage').style.background = css
}

function extrude(shape, depth = 0.35, bevel = 0.08) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 8,
    curveSegments: 48,
  })
  g.center()
  return g
}

function roundedRectShape(w, h, r) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

/* ───────────── glyph builders (one hero object per tile) ───────────── */

const glyphs = {
  cross() {
    const s = new THREE.Shape()
    const a = 0.42
    const b = 1.25
    const r = 0.14
    s.moveTo(-a + r, b)
    s.lineTo(a - r, b)
    s.quadraticCurveTo(a, b, a, b - r)
    s.lineTo(a, a)
    s.lineTo(b - r, a)
    s.quadraticCurveTo(b, a, b, a - r)
    s.lineTo(b, -a + r)
    s.quadraticCurveTo(b, -a, b - r, -a)
    s.lineTo(a, -a)
    s.lineTo(a, -b + r)
    s.quadraticCurveTo(a, -b, a - r, -b)
    s.lineTo(-a + r, -b)
    s.quadraticCurveTo(-a, -b, -a, -b + r)
    s.lineTo(-a, -a)
    s.lineTo(-b + r, -a)
    s.quadraticCurveTo(-b, -a, -b, -a + r)
    s.lineTo(-b, a - r)
    s.quadraticCurveTo(-b, a, -b + r, a)
    s.lineTo(-a, a)
    s.lineTo(-a, b - r)
    s.quadraticCurveTo(-a, b, -a + r, b)
    const g = new THREE.Group()
    g.add(new THREE.Mesh(extrude(s, 0.5, 0.12), glossy(C.white)))
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.07, 32, 160), glossy(C.cobalt))
    ring.rotation.x = 1.2
    g.add(ring)
    return g
  },
  shield() {
    const s = new THREE.Shape()
    s.moveTo(0, 1.45)
    s.bezierCurveTo(0.55, 1.15, 0.95, 1.1, 1.2, 1.1)
    s.bezierCurveTo(1.25, 0.1, 0.9, -0.85, 0, -1.45)
    s.bezierCurveTo(-0.9, -0.85, -1.25, 0.1, -1.2, 1.1)
    s.bezierCurveTo(-0.95, 1.1, -0.55, 1.15, 0, 1.45)
    const g = new THREE.Group()
    g.add(new THREE.Mesh(extrude(s, 0.45, 0.12), glossy(C.cobalt)))
    const tick = new THREE.Shape()
    tick.moveTo(-0.55, 0.05)
    tick.lineTo(-0.15, -0.35)
    tick.lineTo(0.6, 0.45)
    tick.lineTo(0.45, 0.6)
    tick.lineTo(-0.15, -0.05)
    tick.lineTo(-0.4, -0.1 + 0.3)
    tick.lineTo(-0.55, 0.05)
    const t = new THREE.Mesh(extrude(tick, 0.2, 0.05), glossy(C.white))
    t.position.z = 0.42
    g.add(t)
    return g
  },
  house() {
    const s = new THREE.Shape()
    s.moveTo(-1.1, -1)
    s.lineTo(1.1, -1)
    s.lineTo(1.1, 0.35)
    s.lineTo(0, 1.3)
    s.lineTo(-1.1, 0.35)
    s.lineTo(-1.1, -1)
    const door = roundedRectShape(0.5, 0.8, 0.12)
    door.translate?.(0, -0.6)
    const hole = new THREE.Path()
    hole.moveTo(-0.25, -1)
    hole.lineTo(0.25, -1)
    hole.lineTo(0.25, -0.25)
    hole.quadraticCurveTo(0.25, -0.05, 0, -0.05)
    hole.quadraticCurveTo(-0.25, -0.05, -0.25, -0.25)
    hole.lineTo(-0.25, -1)
    s.holes.push(hole)
    const g = new THREE.Group()
    g.add(new THREE.Mesh(extrude(s, 0.9, 0.1), glossy(C.white)))
    const roof = new THREE.Shape()
    roof.moveTo(-1.35, 0.3)
    roof.lineTo(0, 1.5)
    roof.lineTo(1.35, 0.3)
    roof.lineTo(1.15, 0.12)
    roof.lineTo(0, 1.15)
    roof.lineTo(-1.15, 0.12)
    roof.lineTo(-1.35, 0.3)
    const r = new THREE.Mesh(extrude(roof, 1.05, 0.06), glossy(C.amber))
    r.position.y = 0.42
    g.add(r)
    return g
  },
  pillars() {
    const g = new THREE.Group()
    const base = new THREE.Mesh(new RoundedBoxGeometry(2.8, 0.22, 1.3, 4, 0.06), glossy(C.white))
    base.position.y = -1.1
    g.add(base)
    const top = new THREE.Mesh(new RoundedBoxGeometry(2.8, 0.22, 1.3, 4, 0.06), glossy(C.white))
    top.position.y = 0.85
    g.add(top)
    const roof = new THREE.Shape()
    roof.moveTo(-1.5, 0)
    roof.lineTo(1.5, 0)
    roof.lineTo(0, 0.6)
    roof.lineTo(-1.5, 0)
    const r = new THREE.Mesh(extrude(roof, 1.1, 0.05), glossy(C.cobalt))
    r.position.y = 1.25
    g.add(r)
    for (let i = 0; i < 4; i++) {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 1.75, 48), glossy(C.white))
      c.position.set(-1.05 + i * 0.7, -0.12, 0)
      g.add(c)
    }
    return g
  },
  coins() {
    const g = new THREE.Group()
    const heights = [7, 5, 3]
    heights.forEach((n, col) => {
      for (let i = 0; i < n; i++) {
        const c = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.16, 64), glossy(i % 2 ? '#9fc6d3' : C.amber, { metalness: 0.5, roughness: 0.25 }))
        c.position.set(-1.2 + col * 1.2, -1 + i * 0.19, col === 1 ? 0.4 : 0)
        g.add(c)
      }
    })
    const arrow = new THREE.Shape()
    arrow.moveTo(-1.6, -0.2)
    arrow.lineTo(-0.4, 0.6)
    arrow.lineTo(0.3, 0.15)
    arrow.lineTo(1.2, 1.0)
    arrow.lineTo(1.0, 1.2)
    arrow.lineTo(1.65, 1.35)
    arrow.lineTo(1.5, 0.7)
    arrow.lineTo(1.35, 0.85)
    arrow.lineTo(0.3, -0.1)
    arrow.lineTo(-0.4, 0.35)
    arrow.lineTo(-1.5, -0.4)
    const a = new THREE.Mesh(extrude(arrow, 0.18, 0.04), glossy(C.cobalt))
    a.position.set(0, 0.9, 0.6)
    g.add(a)
    return g
  },
  bag() {
    const g = new THREE.Group()
    const body = new THREE.Mesh(new RoundedBoxGeometry(2, 2.1, 1, 6, 0.14), glossy(C.pink))
    g.add(body)
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.07, 24, 96, Math.PI), glossy(C.white))
    handle.position.set(0, 1.05, 0)
    g.add(handle)
    const box = new THREE.Mesh(new RoundedBoxGeometry(1.1, 0.9, 1.1, 6, 0.08), glossy(C.peach))
    box.position.set(1.35, -0.6, 0.6)
    box.rotation.y = 0.5
    g.add(box)
    return g
  },
  chip() {
    const g = new THREE.Group()
    const board = new THREE.Mesh(new RoundedBoxGeometry(2.3, 0.3, 2.3, 6, 0.1), glossy(C.navy))
    g.add(board)
    const die = new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.25, 1.2, 6, 0.06), glossy(C.teal))
    die.position.y = 0.25
    g.add(die)
    for (let i = 0; i < 5; i++) {
      for (const side of [-1, 1]) {
        const p = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.08, 0.5, 2, 0.03), glossy('#E6E6E6', { metalness: 0.8 }))
        p.position.set(-0.8 + i * 0.4, 0, side * 1.35)
        g.add(p)
        const q = p.clone()
        q.rotation.y = Math.PI / 2
        q.position.set(side * 1.35, 0, -0.8 + i * 0.4)
        g.add(q)
      }
    }
    g.rotation.x = 0.55
    return g
  },
  containers() {
    const g = new THREE.Group()
    const colors = [C.cobalt, C.amber, C.teal, C.white, C.cobaltDeep, C.peach]
    const pos = [
      [-0.9, -0.7, 0], [0.9, -0.7, 0], [0, -0.7, -1.1], [-0.9, 0.15, 0], [0.9, 0.15, 0], [0, 1.0, 0],
    ]
    pos.forEach((p, i) => {
      const m = new THREE.Mesh(new RoundedBoxGeometry(1.7, 0.8, 0.95, 4, 0.06), glossy(colors[i % colors.length]))
      m.position.set(...p)
      g.add(m)
    })
    return g
  },
  bubbles() {
    const g = new THREE.Group()
    const make = (w, h, color, tailLeft) => {
      const s = roundedRectShape(w, h, 0.4)
      const t = new THREE.Shape()
      const x = tailLeft ? -w / 2 + 0.4 : w / 2 - 0.4
      t.moveTo(x - 0.2, -h / 2 + 0.05)
      t.lineTo(x + (tailLeft ? -0.35 : 0.35), -h / 2 - 0.45)
      t.lineTo(x + 0.25, -h / 2 + 0.05)
      const m = new THREE.Group()
      m.add(new THREE.Mesh(extrude(s, 0.3, 0.1), glossy(color)))
      const tail = new THREE.Mesh(extrude(t, 0.3, 0.08), glossy(color))
      tail.position.set(x, -h / 2 - 0.15, 0)
      m.add(tail)
      return m
    }
    const a = make(2.2, 1.3, C.cobalt, true)
    a.position.set(-0.55, 0.45, 0)
    g.add(a)
    const b = make(1.8, 1.05, C.white, false)
    b.position.set(0.75, -0.65, 0.5)
    g.add(b)
    for (let i = 0; i < 3; i++) {
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.12, 32, 32), glossy(C.white))
      d.position.set(-1.05 + i * 0.45, 0.45, 0.32)
      g.add(d)
    }
    return g
  },
  documents() {
    const g = new THREE.Group()
    for (let i = 0; i < 4; i++) {
      const m = new THREE.Mesh(new RoundedBoxGeometry(1.7, 2.2, 0.08, 4, 0.03), glossy(i === 3 ? C.white : ['#e0f3f1', '#cdebe7', '#b6e0da'][i]))
      m.position.set(-0.45 + i * 0.3, -0.15 + i * 0.1, -0.6 + i * 0.3)
      m.rotation.z = 0.12 - i * 0.06
      g.add(m)
    }
    for (let l = 0; l < 4; l++) {
      const line = new THREE.Mesh(new RoundedBoxGeometry(l === 0 ? 0.8 : 1.15, 0.1, 0.04, 2, 0.02), glossy(l === 0 ? C.cobalt : '#b6c9c9'))
      line.position.set(0.5 - (l === 0 ? 0.17 : 0), 0.65 - l * 0.3, 0.38)
      line.rotation.z = -0.06
      g.add(line)
    }
    const check = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.1, 24, 80), glossy(C.teal))
    check.position.set(1.15, -0.8, 0.6)
    g.add(check)
    return g
  },
  gear() {
    const s = new THREE.Shape()
    const teeth = 10
    for (let i = 0; i <= teeth * 4; i++) {
      const a = (i / (teeth * 4)) * Math.PI * 2
      const r = i % 4 < 2 ? 1.35 : 1.08
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)
    }
    const hole = new THREE.Path()
    hole.absarc(0, 0, 0.45, 0, Math.PI * 2, true)
    s.holes.push(hole)
    const g = new THREE.Group()
    const a = new THREE.Mesh(extrude(s, 0.4, 0.06), glossy(C.cobalt))
    g.add(a)
    const b = new THREE.Mesh(extrude(s, 0.35, 0.05), glossy(C.amber))
    b.scale.setScalar(0.55)
    b.position.set(1.45, -1.0, 0.3)
    g.add(b)
    return g
  },
  code() {
    const g = new THREE.Group()
    const lt = new THREE.Shape()
    lt.moveTo(-0.2, 0.9)
    lt.lineTo(-1.0, 0)
    lt.lineTo(-0.2, -0.9)
    lt.lineTo(0.05, -0.68)
    lt.lineTo(-0.55, 0)
    lt.lineTo(0.05, 0.68)
    lt.lineTo(-0.2, 0.9)
    const l = new THREE.Mesh(extrude(lt, 0.35, 0.06), glossy(C.cobalt))
    l.position.x = -0.85
    g.add(l)
    const r = l.clone()
    r.rotation.y = Math.PI
    r.position.x = 0.85
    g.add(r)
    const slash = new THREE.Mesh(new RoundedBoxGeometry(0.22, 2.1, 0.35, 4, 0.06), glossy(C.teal))
    slash.rotation.z = -0.35
    g.add(slash)
    return g
  },
  chart() {
    const g = new THREE.Group()
    const hs = [0.8, 1.3, 1.0, 1.8, 2.4]
    hs.forEach((h, i) => {
      const m = new THREE.Mesh(new RoundedBoxGeometry(0.42, h, 0.42, 4, 0.06), glossy(i === 4 ? C.cobalt : i === 3 ? C.sky : C.white))
      m.position.set(-1.1 + i * 0.55, -1.1 + h / 2, 0)
      g.add(m)
    })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.13, 24, 80), glossy(C.amber))
    ring.position.set(1.0, 1.25, 0.2)
    ring.rotation.y = 0.6
    g.add(ring)
    return g
  },
  megaphone() {
    const g = new THREE.Group()
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.35, 1.9, 64, 1, true), glossy(C.amber, { side: THREE.DoubleSide }))
    cone.rotation.z = Math.PI / 2
    g.add(cone)
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.08, 24, 96), glossy(C.white))
    rim.rotation.y = Math.PI / 2
    rim.position.x = -0.95
    g.add(rim)
    const back = new THREE.Mesh(new RoundedBoxGeometry(0.55, 0.85, 0.85, 4, 0.12), glossy(C.cobalt))
    back.position.x = 1.15
    g.add(back)
    const handle = new THREE.Mesh(new RoundedBoxGeometry(0.28, 0.75, 0.3, 4, 0.08), glossy(C.cobalt))
    handle.position.set(0.55, -0.7, 0)
    handle.rotation.z = -0.2
    g.add(handle)
    for (let i = 0; i < 3; i++) {
      const arc = new THREE.Mesh(new THREE.TorusGeometry(1.3 + i * 0.35, 0.05, 16, 64, 1.0), glossy(C.cobalt))
      arc.rotation.z = Math.PI - 0.5
      arc.position.x = -0.3
      g.add(arc)
    }
    g.rotation.y = 0.5
    return g
  },
  headset() {
    const g = new THREE.Group()
    const band = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.13, 32, 120, Math.PI), glossy(C.navy))
    band.position.y = 0.2
    g.add(band)
    for (const s of [-1, 1]) {
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.45, 64), glossy(C.cobalt))
      cup.rotation.z = Math.PI / 2
      cup.position.set(s * 1.05, 0.05, 0)
      g.add(cup)
      const pad = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.1, 24, 64), glossy(C.white))
      pad.rotation.y = Math.PI / 2
      pad.position.set(s * 0.82, 0.05, 0)
      g.add(pad)
    }
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.05, -0.2, 0.15),
      new THREE.Vector3(-0.9, -0.85, 0.5),
      new THREE.Vector3(-0.3, -1.05, 0.7),
    ])
    g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.06, 16), glossy(C.navy)))
    const mic = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 32), glossy(C.teal))
    mic.position.set(-0.3, -1.05, 0.7)
    g.add(mic)
    g.rotation.y = -0.45
    return g
  },
  people() {
    const g = new THREE.Group()
    const person = (color, x, z, s) => {
      const p = new THREE.Group()
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.38, 48, 48), glossy(color))
      head.position.y = 0.55
      p.add(head)
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 0.5, 12, 48), glossy(color))
      body.position.y = -0.45
      body.scale.set(1, 0.85, 0.7)
      p.add(body)
      p.position.set(x, 0, z)
      p.scale.setScalar(s)
      return p
    }
    g.add(person(C.cobalt, 0, 0.4, 1.1))
    g.add(person(C.amber, -1.15, -0.4, 0.9))
    g.add(person(C.teal, 1.15, -0.4, 0.9))
    return g
  },
}

const tileBackgrounds = {
  cobalt: 'linear-gradient(160deg,#ebf7f6 0%,#a2ddd8 55%,#6cc6c0 100%)',
  amber: 'linear-gradient(160deg,#eef5f8 0%,#bcd6e1 60%,#6f9fb3 100%)',
  teal: 'linear-gradient(160deg,#effaf6 0%,#aae8d3 60%,#4fc4a4 100%)',
  pink: 'linear-gradient(160deg,#F2FBF8 0%,#d3eee7 55%,#a9dccf 100%)',
  violet: 'linear-gradient(160deg,#F0F6F8 0%,#CFE2EA 60%,#8DB6C6 100%)',
  stone: 'linear-gradient(160deg,#f5f9f9 0%,#e8f0f0 55%,#d3e0e0 100%)',
  navy: 'linear-gradient(160deg,#0d3f42 0%,#0b2e31 70%,#061D20 100%)',
}

function groundShadow(y = -1.75) {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const x = c.getContext('2d')
  const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128)
  gr.addColorStop(0, 'rgba(0,30,70,0.32)')
  gr.addColorStop(1, 'rgba(0,30,70,0)')
  x.fillStyle = gr
  x.fillRect(0, 0, 256, 256)
  const m = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.2), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }))
  m.rotation.x = -Math.PI / 2
  m.position.y = y
  scene.add(m)
}

function tile(glyph, bg) {
  setBackground(tileBackgrounds[bg])
  light()
  const obj = glyphs[glyph]()
  obj.rotation.y += -0.5
  obj.rotation.x += 0.18
  scene.add(obj)
  groundShadow()
  const box = new THREE.Box3().setFromObject(obj)
  const size = box.getSize(new THREE.Vector3()).length()
  camera.position.set(0, 0.5, size * 1.55)
  camera.lookAt(0, -0.1, 0)
  // Small floating accents
  const accents = [
    [new THREE.SphereGeometry(0.16, 32, 32), C.white, [-2.3, 1.2, -1]],
    [new THREE.TorusGeometry(0.22, 0.07, 24, 64), C.cobalt, [2.4, 1.5, -1.5]],
    [new RoundedBoxGeometry(0.3, 0.3, 0.3, 4, 0.06), C.amber, [2.1, -1.2, 0.2]],
  ]
  for (const [geo, color, p] of accents) {
    const m = new THREE.Mesh(geo, glossy(color))
    m.position.set(...p)
    m.rotation.set(0.6, 0.4, 0)
    scene.add(m)
  }
}

/* ───────────── large compositions ───────────── */

function ribbon({ colors, width = 9, length = 16, phase = 0, amp = 0.8, twist = 1.2, y = 0, z = 0, rot = 0 }) {
  const geo = new THREE.PlaneGeometry(length, width / 6, 300, 30)
  const pos = geo.attributes.position
  const col = []
  const cA = new THREE.Color(colors[0])
  const cB = new THREE.Color(colors[1])
  const cC = new THREE.Color(colors[2] || colors[1])
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const v = pos.getY(i)
    const t = (x + length / 2) / length
    const ang = Math.sin(t * Math.PI * 1.4 + phase) * twist
    const yy = Math.sin(t * Math.PI * 2 + phase) * amp + v * Math.cos(ang)
    const zz = v * Math.sin(ang) + Math.cos(t * Math.PI * 1.3 + phase) * amp * 0.8
    pos.setXYZ(i, x, yy + y, zz + z)
    const c = t < 0.5 ? cA.clone().lerp(cB, t * 2) : cB.clone().lerp(cC, (t - 0.5) * 2)
    col.push(c.r, c.g, c.b)
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3))
  geo.computeVertexNormals()
  const m = new THREE.Mesh(
    geo,
    new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.32, metalness: 0.1, clearcoat: 0.8, sheen: 1, sheenColor: new THREE.Color('#ffffff'), side: THREE.DoubleSide, iridescence: 0.35 }),
  )
  m.rotation.z = rot
  scene.add(m)
  return m
}

const compositions = {
  // Home hero: rows of glossy data blocks under a glass slab
  hero() {
    setBackground('linear-gradient(180deg,#08262A 0%,#0D3A3D 45%,#16676A 100%)')
    light()
    const palette = [C.cobaltDeep, C.cobalt, C.cobalt, C.sky, C.ice, C.white, C.white, C.teal, C.sky, C.amber]
    const rng = mulberry(7)
    const rows = 20
    const cols = 30
    const group = new THREE.Group()
    const geo = new RoundedBoxGeometry(0.34, 1, 0.9, 3, 0.06)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wave = Math.sin(c * 0.35 + r * 0.22) * 0.5 + 0.5
        const h = 0.2 + wave * wave * 2.2 + rng() * 0.5
        const pick = rng() < 0.04 ? palette.length - 1 : Math.floor((wave * 0.75 + rng() * 0.25) * (palette.length - 1)) % (palette.length - 1)
        const m = new THREE.Mesh(geo, glossy(palette[pick], { emissive: palette[pick], emissiveIntensity: 0.08 }))
        m.scale.y = h
        m.position.set(c * 0.42 - (cols * 0.42) / 2, h / 2, r * 1.0 - rows / 2)
        group.add(m)
      }
    }
    group.rotation.y = -0.62
    scene.add(group)
    const slab = new THREE.Mesh(new RoundedBoxGeometry(7.5, 0.35, 5.5, 6, 0.12), glass('#d2f1ec'))
    slab.position.set(-2.4, 2.3, 3.2)
    slab.rotation.y = -0.62
    scene.add(slab)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.13, 48, 200), glossy(C.teal, { emissive: C.teal, emissiveIntensity: 0.25 }))
    ring.position.set(3.2, 3.6, 2.5)
    ring.rotation.set(1.1, 0.3, 0.2)
    scene.add(ring)
    scene.fog = new THREE.Fog('#0d3f42', 18, 40)
    camera.fov = 32
    camera.updateProjectionMatrix()
    camera.position.set(-1, 5.2, 12.5)
    camera.lookAt(0.5, 0.6, 0)
  },
  // Warm panel with a glass ring and floating dashboard cards (Who we are)
  ring() {
    setBackground('linear-gradient(135deg,#bcd6e1 0%,#6f9fb3 45%,#3a6f84 100%)')
    light()
    const t = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.42, 64, 220), glossy(C.cobalt, { emissive: C.cobaltDeep, emissiveIntensity: 0.12 }))
    t.rotation.set(1.15, 0.2, 0.4)
    scene.add(t)
    const t2 = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.2, 48, 200), glass('#ffffff'))
    t2.rotation.set(0.3, 0.9, 0)
    t2.position.set(0.3, 0.2, 0.8)
    scene.add(t2)
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 64), glossy(C.white))
    s.position.set(-1.9, -1.2, 0.4)
    scene.add(s)
    camera.position.set(0, 0, 9)
    camera.lookAt(0, 0, 0)
  },
  // Sky-to-sunset silk (vertical)
  silk() {
    setBackground('linear-gradient(180deg,#a2ddd8 0%,#ebf7f6 45%,#bcd6e1 80%,#6f9fb3 100%)')
    light()
    ribbon({ colors: [C.white, C.peach, C.amber], phase: 0.3, y: 0.2, amp: 1.0, rot: 1.25 })
    ribbon({ colors: [C.ice, C.white, C.peach], phase: 1.6, y: -0.6, z: -1.2, amp: 0.8, rot: 1.35 })
    camera.position.set(0, 0, 11)
    camera.lookAt(0, 0, 0)
  },
  // Pink / orange silk waves (stats panel)
  waves() {
    setBackground('linear-gradient(200deg,#d3eee7 0%,#a9dccf 35%,#bcd6e1 70%,#6f9fb3 100%)')
    light()
    ribbon({ colors: ['#ffffff', '#a9dccf', C.orange], phase: 0.0, y: 0.8, amp: 0.9, rot: 0.9 })
    ribbon({ colors: ['#d3eee7', '#ffffff', C.amber], phase: 1.2, y: -0.4, z: -0.8, amp: 0.7, rot: 1.05 })
    ribbon({ colors: [C.peach, '#5fb8a8', '#ffffff'], phase: 2.3, y: -1.6, z: -1.6, amp: 0.8, rot: 1.2 })
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)
  },
  // Cobalt banner background (CTA)
  bannerCobalt() {
    setBackground('linear-gradient(110deg,#2fa39c 0%,#187a7b 55%,#115254 100%)')
    light()
    ribbon({ colors: ['#a2ddd8', '#ffffff', '#6cc6c0'], phase: 0.7, y: 0.4, amp: 0.7, rot: 0.15, width: 6 })
    ribbon({ colors: ['#6cc6c0', '#cfeeeb', '#3daea9'], phase: 2.1, y: -1.1, z: -1, amp: 0.6, rot: 0.1, width: 5 })
    scene.children.filter((o) => o.isMesh).forEach((m) => (m.material.opacity = 0.55, m.material.transparent = true))
    camera.position.set(0, 0, 9)
    camera.lookAt(0, 0, 0)
  },
  // Navy, used behind the footer and dark sections
  navyGlass() {
    setBackground('linear-gradient(135deg,#0d3f42 0%,#0b2e31 60%,#061D20 100%)')
    light()
    ribbon({ colors: ['#115254', '#3daea9', '#0b2e31'], phase: 0.9, y: 0.2, amp: 0.8, rot: 0.2, width: 6 })
    scene.children.filter((o) => o.isMesh).forEach((m) => (m.material.opacity = 0.5, m.material.transparent = true))
    camera.position.set(0, 0, 9)
    camera.lookAt(0, 0, 0)
  },
  // Ask our experts: headset on a cobalt-to-amber tile
  experts() {
    setBackground('linear-gradient(180deg,#a2ddd8 0%,#ebf7f6 50%,#bcd6e1 100%)')
    light()
    const h = glyphs.headset()
    h.scale.setScalar(1.25)
    scene.add(h)
    groundShadow(-2)
    camera.position.set(0, 0.4, 8)
    camera.lookAt(0, -0.1, 0)
  },
}

function mulberry(a) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

if (name.startsWith('tile:')) {
  const [, glyph, bg] = name.split(':')
  tile(glyph, bg)
} else {
  compositions[name]()
}

renderer.render(scene, camera)
window.__done = true
