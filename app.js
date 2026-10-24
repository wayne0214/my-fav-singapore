import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { ERAS, STAT_META, MAIN_ISLAND, ISLETS, LANDMARKS, INTRO_STEPS } from './data.js';

// ---------------------------------------------------------------------------
// Projection: [lon, lat] -> world x/z. 1° ≈ 160 units.
// ---------------------------------------------------------------------------
const LON0 = 103.835, LAT0 = 1.345, K = 160;
const GROUND_Y = 1.0;
// Local magnifier around Marina Bay: real landmarks there sit within a square kilometre,
// so we gently spread everything near the bay outward (monotonic, so nothing folds).
const WARP = { c: [103.861, 1.285], R: 0.062, g: 1.8 };
function warp(lon, lat) {
  const dx = lon - WARP.c[0], dy = lat - WARP.c[1];
  const r = Math.hypot(dx, dy);
  if (r >= WARP.R) return [lon, lat];
  const k = 1 + WARP.g * Math.pow(1 - r / WARP.R, 2);
  return [WARP.c[0] + dx * k, WARP.c[1] + dy * k];
}
const proj = ([lon, lat]) => { const [a, b] = warp(lon, lat); return [(a - LON0) * K, -(b - LAT0) * K]; };
const toWorld = (lonlat, y = GROUND_Y) => { const [x, z] = proj(lonlat); return new THREE.Vector3(x, y, z); };

// ---------------------------------------------------------------------------
// Renderer, scene, camera
// ---------------------------------------------------------------------------
const stage = document.getElementById('stage');
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const labelRenderer = new CSS2DRenderer({ element: document.getElementById('labels') });

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.5, 600);
camera.position.set(-10, 48, 70);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.maxPolarAngle = Math.PI * 0.46;
controls.minDistance = 18;
controls.maxDistance = 140;
controls.target.set(0, 0, 0);

const hemi = new THREE.HemisphereLight(0xffffff, 0x8fb3c7, 0.9);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.position.set(-40, 70, 30);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -70; sun.shadow.camera.right = 70;
sun.shadow.camera.top = 50; sun.shadow.camera.bottom = -50;
sun.shadow.camera.near = 10; sun.shadow.camera.far = 200;
sun.shadow.bias = -0.0005;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xfff1dc, 0.5);
fill.position.set(40, 30, -40);
scene.add(fill);

// ---------------------------------------------------------------------------
// Sky presets
// ---------------------------------------------------------------------------
const SKIES = {
  day: { bg: 0xcfe3ea, fog: 0xcfe3ea, sea: 0x6aa9c7, hemi: [0xffffff, 0x8fb3c7, 0.9], sun: [0xffffff, 2.2], fill: 0.5, glow: 0, exposure: 1.05 },
  dusk: { bg: 0xf3c6a2, fog: 0xf3c6a2, sea: 0x7a93b5, hemi: [0xffd9b3, 0x7f8db0, 0.7], sun: [0xffb070, 1.6], fill: 0.3, glow: 0.45, exposure: 1.0 },
  night: { bg: 0x101a2e, fog: 0x101a2e, sea: 0x1b2d4d, hemi: [0x5b74b0, 0x1a2238, 0.55], sun: [0x8fa8ff, 0.5], fill: 0.1, glow: 1.0, exposure: 0.95 },
};
scene.fog = new THREE.Fog(SKIES.day.fog, 90, 230);

// ---------------------------------------------------------------------------
// Materials (shared; windows glow at night via emissive)
// ---------------------------------------------------------------------------
const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.0, ...extra });
const M = {
  land: mat(0x9ccb7a),
  landSide: mat(0xc9b48c),
  hill: mat(0x6fa85f),
  sand: mat(0xe6d9b4),
  tree: mat(0x3f8a4a),
  trunk: mat(0x7a5a3a),
  hdb: [mat(0xf2ead6), mat(0xe9dcc3), mat(0xf6f0e3), mat(0xe3d6c7)],
  hdbRoof: mat(0xc96a4b),
  tower: mat(0x9fb8c9, { roughness: 0.3, metalness: 0.4 }),
  towerDark: mat(0x5f7d94, { roughness: 0.25, metalness: 0.5 }),
  factory: mat(0xcfcfcf),
  chimney: mat(0x8a8a8a),
  concrete: mat(0xdedbd3),
  runway: mat(0x5e6166),
  crane: mat(0xe24b2b),
  dome: mat(0xc7cfd6, { roughness: 0.4, metalness: 0.3 }),
  kampong: mat(0xb07a4a),
  thatch: mat(0x8c6a3f),
  civic: mat(0xfaf7ef),
  water: mat(0x5c9ed1, { roughness: 0.2, metalness: 0.1 }),
  supertree: mat(0x7b3fa0),
  supertreeTop: mat(0x3fa06d),
  wheel: mat(0xf4f4f4),
  solar: mat(0x1f3b63, { roughness: 0.3, metalness: 0.6 }),
  future: new THREE.MeshStandardMaterial({ color: 0x8bb7ff, transparent: true, opacity: 0.45, roughness: 0.4, emissive: 0x2d5cff, emissiveIntensity: 0.25 }),
  futureLand: new THREE.MeshStandardMaterial({ color: 0xa8c8ff, transparent: true, opacity: 0.4, roughness: 0.6, emissive: 0x2d5cff, emissiveIntensity: 0.15 }),
};
const GLOW_MATS = [...M.hdb, M.tower, M.towerDark, M.civic, M.dome, M.wheel, M.supertreeTop];
GLOW_MATS.forEach((m) => { m.emissive = new THREE.Color(0xffc266); m.emissiveIntensity = 0; });

// Window textures: one tile = 6 windows x 2 floors. `color` map tints the facade, `emissive` map lights windows at night.
function windowTextures({ bg, frame, win, band, litChance }) {
  const W = 192, H = 80, cols = 6, rows = 2;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const e = document.createElement('canvas'); e.width = W; e.height = H;
  const cx = c.getContext('2d'), ex = e.getContext('2d');
  cx.fillStyle = bg; cx.fillRect(0, 0, W, H);
  ex.fillStyle = '#000'; ex.fillRect(0, 0, W, H);
  const cw = W / cols, rh = H / rows;
  for (let r = 0; r < rows; r++) {
    if (band) { cx.fillStyle = band; cx.fillRect(0, r * rh + rh - 6, W, 6); }
    for (let i = 0; i < cols; i++) {
      const x = i * cw + 6, y = r * rh + 8, w = cw - 12, h = rh - 20;
      cx.fillStyle = frame; cx.fillRect(x - 1, y - 1, w + 2, h + 2);
      cx.fillStyle = win; cx.fillRect(x, y, w, h);
      if (Math.random() < litChance) { ex.fillStyle = Math.random() < 0.5 ? '#ffd27a' : '#fff1c4'; ex.fillRect(x, y, w, h); }
    }
  }
  const mk = (cv, srgb) => { const t = new THREE.CanvasTexture(cv); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; if (srgb) t.colorSpace = THREE.SRGBColorSpace; return t; };
  return { map: mk(c, true), emissiveMap: mk(e, true) };
}
function facadeMaterial(opts, matOpts = {}) {
  const t = windowTextures(opts);
  const m = new THREE.MeshStandardMaterial({ map: t.map, emissiveMap: t.emissiveMap, emissive: 0xffffff, emissiveIntensity: 0, roughness: 0.8, metalness: 0, ...matOpts });
  GLOW_MATS.push(m);
  return m;
}
const HDB_FACADES = [
  facadeMaterial({ bg: '#f3ebd9', frame: '#d9cdb5', win: '#4c5a6b', band: '#d96a3b', litChance: 0.35 }),
  facadeMaterial({ bg: '#ece3d1', frame: '#cbbfa6', win: '#4c5a6b', band: '#3f8f8a', litChance: 0.35 }),
  facadeMaterial({ bg: '#f7f2e8', frame: '#d6cdbb', win: '#52607a', band: '#4a79b8', litChance: 0.3 }),
  facadeMaterial({ bg: '#efe4d6', frame: '#d1c2ae', win: '#4c5a6b', band: '#6a9a4f', litChance: 0.35 }),
];
const TOWER_FACADES = [
  facadeMaterial({ bg: '#6d8ba3', frame: '#5a7489', win: '#b7d3e3', band: null, litChance: 0.45 }, { roughness: 0.35, metalness: 0.35 }),
  facadeMaterial({ bg: '#4a5f73', frame: '#3b4c5c', win: '#9dbdd0', band: null, litChance: 0.5 }, { roughness: 0.3, metalness: 0.45 }),
  facadeMaterial({ bg: '#c9d4dc', frame: '#aab7c2', win: '#7ea0b8', band: null, litChance: 0.4 }, { roughness: 0.4, metalness: 0.3 }),
];
const M_GLASS = new THREE.MeshPhysicalMaterial({ color: 0xbfe3f0, transparent: true, opacity: 0.55, roughness: 0.15, metalness: 0.2, side: THREE.DoubleSide, depthWrite: false });
const M_VOID = mat(0xd8d2c4);
const M_STEEL = mat(0xe9eaec, { roughness: 0.4, metalness: 0.5 });
const M_WATERFALL = new THREE.MeshStandardMaterial({ color: 0xe8f6ff, transparent: true, opacity: 0.8, emissive: 0x9fd4ff, emissiveIntensity: 0.3 });
GLOW_MATS.push(M_WATERFALL);

// A box whose side faces carry a repeating window texture sized to the box (cols per unit width, rows per unit height).
function winBox(w, h, d, side, roof, x = 0, z = 0, y = 0, cols = 3, rows = 5) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const uv = geo.attributes.uv;
  for (let f = 0; f < 6; f++) {
    if (f === 2 || f === 3) continue;
    const fw = f < 2 ? d : w;
    const rx = Math.max(1, Math.round(fw * cols)) / 6, ry = Math.max(1, Math.round(h * rows)) / 2;
    for (let i = f * 4; i < f * 4 + 4; i++) uv.setXY(i, uv.getX(i) * rx, uv.getY(i) * ry);
  }
  const m = new THREE.Mesh(geo, [side, side, roof, roof, side, side]);
  m.position.set(x, y + h / 2, z);
  m.castShadow = m.receiveShadow = true;
  return m;
}


// ---------------------------------------------------------------------------
// Sea
// ---------------------------------------------------------------------------
const seaGeo = new THREE.PlaneGeometry(420, 320, 90, 70);
seaGeo.rotateX(-Math.PI / 2);
const seaMat = mat(SKIES.day.sea, { roughness: 0.35, metalness: 0.15 });
const sea = new THREE.Mesh(seaGeo, seaMat);
sea.position.y = 0;
sea.receiveShadow = true;
scene.add(sea);
const seaBase = seaGeo.attributes.position.array.slice();

// ---------------------------------------------------------------------------
// Island(s)
// ---------------------------------------------------------------------------
function makeIsland(pts, { future = false, depth = GROUND_Y } = {}) {
  const shape = new THREE.Shape(pts.map((p) => { const [x, z] = proj(p); return new THREE.Vector2(x, -z); }));
  const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.25, bevelSize: 0.35, bevelSegments: 2 });
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, future ? M.futureLand : [M.land, M.landSide]);
  mesh.receiveShadow = true;
  mesh.castShadow = !future;
  return mesh;
}
const islandGroup = new THREE.Group();
scene.add(islandGroup);
islandGroup.add(makeIsland(MAIN_ISLAND));
const futureIslands = [];
ISLETS.forEach((isl) => {
  const m = makeIsland(isl.pts, { future: !!isl.future, depth: isl.future ? 0.6 : 0.8 });
  if (isl.future) { m.visible = false; futureIslands.push(m); }
  islandGroup.add(m);
});

// Hills
[[103.776, 1.354, 6, 2.6], [103.81, 1.385, 9, 1.6], [103.84, 1.40, 6, 1.2], [103.70, 1.36, 5, 0.9], [103.95, 1.37, 4, 0.7]].forEach(([lon, lat, r, h]) => {
  const g = new THREE.SphereGeometry(r, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2);
  const hill = new THREE.Mesh(g, M.hill);
  hill.scale.set(1, h / r, 1);
  hill.position.copy(toWorld([lon, lat], GROUND_Y - 0.05));
  hill.castShadow = hill.receiveShadow = true;
  islandGroup.add(hill);
});

// Trees (instanced), scattered inside the main island, away from landmarks.
function pointInPoly([lon, lat], poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
{
  const landmarkPts = LANDMARKS.filter((l) => l.pos).map((l) => l.pos);
  const count = 520;
  const geo = new THREE.ConeGeometry(0.45, 1.2, 6);
  geo.translate(0, 0.6, 0);
  const trees = new THREE.InstancedMesh(geo, M.tree, count);
  trees.castShadow = true;
  const dummy = new THREE.Object3D();
  let placed = 0, tries = 0;
  while (placed < count && tries < 20000) {
    tries++;
    const lon = 103.605 + Math.random() * 0.465, lat = 1.245 + Math.random() * 0.225;
    if (!pointInPoly([lon, lat], MAIN_ISLAND)) continue;
    const [tx, tz] = proj([lon, lat]);
    if (landmarkPts.some((lp) => { const [a, b] = proj(lp); return Math.hypot(a - tx, b - tz) < 2.4; })) continue;
    dummy.position.copy(toWorld([lon, lat]));
    const s = 0.6 + Math.random() * 0.8;
    dummy.scale.set(s, s, s);
    dummy.rotation.y = Math.random() * Math.PI;
    dummy.updateMatrix();
    trees.setMatrixAt(placed++, dummy.matrix);
  }
  trees.count = placed;
  islandGroup.add(trees);
}

// ---------------------------------------------------------------------------
// Landmark builders
// ---------------------------------------------------------------------------
const rnd = (a, b) => a + Math.random() * (b - a);
function box(w, h, d, material, x = 0, z = 0, y = 0) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, 0.06), material);
  m.position.set(x, y + h / 2, z);
  m.castShadow = m.receiveShadow = true;
  return m;
}
function cyl(rTop, rBot, h, material, x = 0, z = 0, y = 0, seg = 12) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), material);
  m.position.set(x, y + h / 2, z);
  m.castShadow = m.receiveShadow = true;
  return m;
}
function scatter(n, r) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rnd(-0.4, 0.4), d = i === 0 ? 0 : rnd(r * 0.45, r);
    out.push([Math.cos(a) * d, Math.sin(a) * d]);
  }
  return out;
}

const BUILDERS = {
  hdb(l, fm) {
    const g = new THREE.Group();
    const n = l.count || 4;
    scatter(n, 1.8).forEach(([x, z], i) => {
      const point = n >= 5 && i === n - 1; // one square point block per big estate
      const h = point ? rnd(2.4, 3.0) : rnd(1.3, 2.2), rot = rnd(-0.3, 0.3);
      const w = point ? 0.7 : rnd(1.3, 1.8), d = point ? 0.7 : 0.5;
      const facade = fm || HDB_FACADES[(i + l.id.length) % HDB_FACADES.length];
      const b = fm ? box(w, h, d, fm, x, z) : winBox(w, h, d, facade, M.concrete, x, z, 0, 3, 5);
      b.rotation.y = rot; g.add(b);
      if (!fm) {
        const deck = box(w + 0.1, 0.14, d + 0.1, M_VOID, x, z); deck.rotation.y = rot; g.add(deck); // void deck
        const roof = box(w * 0.5, 0.12, d * 0.8, M.concrete, x, z, h); roof.rotation.y = rot; g.add(roof); // lift motor room
      }
    });
    return g;
  },
  tower(l, fm) {
    const g = new THREE.Group();
    const hf = l.height || 1;
    scatter(l.count || 3, 1.1).forEach(([x, z], i) => {
      const h = rnd(2.2, 3.4) * hf, w = rnd(0.55, 0.8), d = rnd(0.55, 0.8);
      const facade = fm || TOWER_FACADES[(i + l.id.length) % TOWER_FACADES.length];
      g.add(fm ? box(w, h, d, fm, x, z) : winBox(w, h, d, facade, M.towerDark, x, z, 0, 4, 6));
      if (!fm && i === 0) g.add(box(0.08, 0.5, 0.08, M_STEEL, x, z, h)); // spire
    });
    return g;
  },
  factory(l, fm) {
    const g = new THREE.Group();
    scatter(l.count || 4, 2.0).forEach(([x, z], i) => {
      g.add(box(rnd(1.0, 1.6), rnd(0.5, 0.8), rnd(0.8, 1.2), fm || M.factory, x, z));
      if (i % 2 === 0) g.add(cyl(0.08, 0.1, rnd(1.4, 2.0), fm || M.chimney, x + 0.5, z + 0.3));
    });
    return g;
  },
  airport(l, fm) {
    const g = new THREE.Group();
    const rw = box(6.5, 0.06, 0.6, fm || M.runway, 0, 1.0); rw.rotation.y = 0.35; g.add(rw);
    const rw2 = box(6.5, 0.06, 0.6, fm || M.runway, 0, -0.4); rw2.rotation.y = 0.35; g.add(rw2);
    g.add(box(2.6, 0.5, 1.0, fm || M.concrete, 0, 0.3));
    g.add(cyl(0.16, 0.12, 1.6, fm || M.concrete, 1.5, -1.0));
    g.add(cyl(0.3, 0.25, 0.3, fm || M.towerDark, 1.5, -1.0, 1.6));
    return g;
  },
  port(l, fm) {
    const g = new THREE.Group();
    g.add(box(4.2, 0.18, 1.6, fm || M.concrete, 0, 0));
    for (let i = 0; i < (l.count || 3); i++) {
      const x = -1.6 + i * (3.2 / Math.max(1, (l.count || 3) - 1));
      g.add(box(0.12, 1.2, 0.12, fm || M.crane, x - 0.3, 0.5, 0.18));
      g.add(box(0.12, 1.2, 0.12, fm || M.crane, x + 0.3, 0.5, 0.18));
      g.add(box(0.8, 0.1, 1.9, fm || M.crane, x, 0.0, 1.35));
    }
    return g;
  },
  dome(l, fm) {
    const g = new THREE.Group();
    g.add(box(1.6, 0.35, 1.6, fm || M.concrete));
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.75, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), fm || M.dome);
    d.position.y = 0.35; d.castShadow = true; g.add(d);
    return g;
  },
  garden(l, fm) {
    const g = new THREE.Group();
    scatter(6, 1.2).forEach(([x, z]) => {
      const h = rnd(1.2, 2.1);
      g.add(cyl(0.12, 0.2, h, fm || M.supertree, x, z));
      g.add(cyl(0.55, 0.05, 0.55, fm || M.supertreeTop, x, z, h - 0.3, 8));
    });
    return g;
  },
  wheel(l, fm) {
    const g = new THREE.Group();
    const R = 1.5, cy = 1.75, steel = fm || M_STEEL;
    [-0.12, 0.12].forEach((dz) => { const t = new THREE.Mesh(new THREE.TorusGeometry(R, 0.045, 8, 40), steel); t.position.set(0, cy, dz); t.castShadow = true; g.add(t); });
    for (let i = 0; i < 12; i++) { const sp = box(0.035, R * 2, 0.035, steel); sp.position.set(0, cy, 0); sp.rotation.z = (i / 12) * Math.PI; g.add(sp); }
    g.add(cyl(0.14, 0.14, 0.4, steel, 0, 0, cy - 0.2).rotateX(Math.PI / 2));
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2;
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), fm || M_GLASS);
      cap.position.set(Math.cos(a) * R, cy + Math.sin(a) * R, 0); cap.castShadow = true; g.add(cap);
    }
    [-0.3, 0.3].forEach((dz) => [-1, 1].forEach((sx) => {
      const leg = box(0.07, Math.hypot(0.9, cy), 0.07, steel); leg.position.set(sx * 0.45, cy / 2, dz); leg.rotation.z = -sx * Math.atan2(0.9, cy); g.add(leg);
    }));
    g.add(box(1.4, 0.35, 0.9, fm || M.concrete, 0, 0.3));
    return g;
  },
  kampong(l, fm) {
    const g = new THREE.Group();
    scatter(6, 1.8).forEach(([x, z]) => {
      g.add(box(0.6, 0.35, 0.5, fm || M.kampong, x, z));
      const r = cyl(0, 0.5, 0.35, fm || M.thatch, x, z, 0.35, 4); r.rotation.y = Math.PI / 4; g.add(r);
    });
    return g;
  },
  civic(l, fm) {
    const g = new THREE.Group();
    g.add(box(2.2, 0.7, 1.2, fm || M.civic));
    for (let i = 0; i < 5; i++) g.add(cyl(0.07, 0.07, 0.7, fm || M.civic, -0.8 + i * 0.4, 0.7));
    const d = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), fm || M.dome);
    d.position.y = 0.7; d.castShadow = true; g.add(d);
    return g;
  },
  park(l, fm) {
    const g = new THREE.Group();
    scatter(9, 1.6).forEach(([x, z]) => {
      const s = rnd(0.7, 1.2);
      const c = new THREE.Mesh(new THREE.ConeGeometry(0.5 * s, 1.4 * s, 6), fm || M.tree);
      c.position.set(x, 0.7 * s, z); c.castShadow = true; g.add(c);
    });
    return g;
  },
  river(l, fm) {
    const g = new THREE.Group();
    const r = box(3.2, 0.06, 0.35, fm || M.water, 0, 0); r.rotation.y = -0.4; g.add(r);
    return g;
  },
  reclaim(l, fm) {
    const g = new THREE.Group();
    g.add(box(4.5, 0.12, 3.0, fm || M.sand, 0, 0));
    return g;
  },
  reservoir(l, fm) {
    const g = new THREE.Group();
    const w = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.1, 24), fm || M.water);
    w.position.y = 0.05; g.add(w);
    scatter(5, 2.0).forEach(([x, z]) => g.add(box(0.8, rnd(0.7, 1.2), 0.5, fm || M.hdb[0], x, z)));
    return g;
  },
  barrage(l, fm) {
    const g = new THREE.Group();
    g.add(box(2.2, 0.3, 0.35, fm || M.concrete));
    return g;
  },
  mbs(l, fm) {
    const g = new THREE.Group();
    const H = 3.2, lean = -0.11, glass = fm || TOWER_FACADES[0];
    // Three slabs in a row, each leaning toward the bay (north), joined by the SkyPark.
    [-1.05, 0, 1.05].forEach((x) => {
      const t = fm ? box(0.55, H, 0.9, fm) : winBox(0.55, H, 0.9, glass, M.towerDark, 0, 0, 0, 4, 6);
      t.rotation.x = lean; t.position.set(x, H / 2 - 0.06, 0); g.add(t);
    });
    const topZ = Math.sin(lean) * H;
    const park = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 3.4, 4, 12), fm || M.concrete);
    park.rotation.z = Math.PI / 2; park.scale.set(0.45, 1, 1); park.position.set(0.45, H + 0.12, topZ); park.castShadow = true; g.add(park);
    g.add(box(3.9, 0.06, 0.6, fm || M.tree, 0.4, topZ, H + 0.3));
    // Shoppes podium and the ArtScience lotus, on the landward side.
    g.add(box(2.6, 0.28, 0.8, fm || M.concrete, 0.2, 0.95));
    const lotus = cyl(0.4, 0.14, 0.5, fm || M.civic, -1.0, 0.95, 0.28, 10); g.add(lotus);
    for (let i = 0; i < 10; i++) { const p = box(0.1, 0.45, 0.05, fm || M.civic); const a = (i / 10) * Math.PI * 2; p.position.set(-1.0 + Math.cos(a) * 0.4, 0.78, 0.95 + Math.sin(a) * 0.4); p.rotation.set(Math.sin(a) * 0.45, 0, -Math.cos(a) * 0.45); g.add(p); }
    return g;
  },
  jewel(l, fm) {
    const g = new THREE.Group();
    // Glass donut dome with an oculus, the waterfall falling through the middle into a forest.
    const profile = [[1.35, 0], [1.35, 0.35], [1.25, 0.62], [1.05, 0.82], [0.8, 0.95], [0.55, 1.02], [0.32, 1.0], [0.3, 0.9]].map(([r, y]) => new THREE.Vector2(r, y));
    const dome = new THREE.Mesh(new THREE.LatheGeometry(profile, 28), fm || M_GLASS);
    dome.castShadow = true; g.add(dome);
    g.add(cyl(1.4, 1.4, 0.15, fm || M.concrete, 0, 0, 0, 28));
    const forest = cyl(1.1, 1.1, 0.12, fm || M.tree, 0, 0, 0.15, 28); g.add(forest);
    scatter(7, 0.8).forEach(([x, z]) => { const c = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.35, 6), fm || M.tree); c.position.set(x, 0.42, z); g.add(c); });
    g.add(cyl(0.1, 0.16, 0.95, fm || M_WATERFALL, 0, 0, 0.2, 10));
    g.add(cyl(0.22, 0.22, 0.04, fm || M.water, 0, 0, 0.25, 16));
    return g;
  },
  esplanade(l, fm) {
    const g = new THREE.Group();
    g.add(box(2.4, 0.3, 1.3, fm || M.concrete));
    const spikes = [];
    [[-0.6, 0.72], [0.62, 0.64]].forEach(([x, r]) => {
      const shell = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), fm || M_GLASS);
      shell.position.set(x, 0.3, 0); shell.castShadow = true; g.add(shell);
      // The "durian" sunshades: small pyramids on every vertex of a low-poly hemisphere.
      const ico = new THREE.IcosahedronGeometry(r, 2), pos = ico.attributes.position, seen = new Set();
      for (let i = 0; i < pos.count; i++) {
        const v = new THREE.Vector3().fromBufferAttribute(pos, i);
        const key = v.toArray().map((n) => n.toFixed(2)).join(',');
        if (v.y < 0.04 || seen.has(key)) continue; seen.add(key);
        const cone = new THREE.ConeGeometry(0.055, 0.17, 4);
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize());
        cone.applyMatrix4(new THREE.Matrix4().compose(v.clone().multiplyScalar(1.04).add(new THREE.Vector3(x, 0.3, 0)), q, new THREE.Vector3(1, 1, 1)));
        spikes.push(cone);
      }
    });
    const sp = new THREE.Mesh(mergeGeometries(spikes), fm || M_STEEL); sp.castShadow = true; g.add(sp);
    return g;
  },
  solar(l, fm) {
    const g = new THREE.Group();
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) g.add(box(0.7, 0.06, 0.5, fm || M.solar, -1.2 + i * 0.8, -0.6 + j * 0.6));
    return g;
  },
};

function buildLine(l) {
  const pts = l.pts.map((p) => toWorld(p, GROUND_Y + 0.12));
  const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.3);
  const radial = 6;
  const geo = new THREE.TubeGeometry(curve, 72, 0.17, radial, false);
  const material = new THREE.MeshStandardMaterial({ color: l.color, roughness: 0.5, transparent: !!l.future, opacity: l.future ? 0.65 : 1, emissive: l.color, emissiveIntensity: 0.15 });
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = true;
  const total = geo.index.count;
  mesh.userData.setProgress = (p) => {
    const n = Math.floor((total * p) / (radial * 6)) * radial * 6;
    geo.setDrawRange(0, n);
    mesh.visible = n > 0;
  };
  mesh.userData.setProgress(0);
  const g = new THREE.Group();
  g.add(mesh);
  // Label sits at the midpoint of the line.
  g.userData.labelAnchor = curve.getPoint(0.5);
  return g;
}

// ---------------------------------------------------------------------------
// Instantiate landmarks
// ---------------------------------------------------------------------------
const landmarkObjs = [];
const landmarkById = new Map();
let labelIndex = 0;
LANDMARKS.forEach((l) => {
  const futureMat = l.future ? M.future : null;
  let g;
  if (l.type === 'line') g = buildLine(l);
  else { g = (BUILDERS[l.type] || BUILDERS.hdb)(l, futureMat); g.position.copy(toWorld(l.pos)); g.scale.setScalar(0.0001); }
  g.traverse((o) => { if (o.isMesh) o.userData.landmarkId = l.id; });
  g.visible = false;
  scene.add(g);

  let labelObj = null;
  if (l.label) {
    labelIndex++;
    const wrap = document.createElement('div');
    const el = document.createElement('button');
    el.className = 'label label--hidden' + (l.future ? ' label--future' : '') + (l.type === 'line' ? ' label--line' : '');
    el.innerHTML = `<span class="label__num">${String(labelIndex).padStart(2, '0')}</span><span class="label__text">${l.label}</span>`;
    el.addEventListener('click', (e) => { e.stopPropagation(); focusLandmark(l.id); });
    wrap.appendChild(el);
    labelObj = new CSS2DObject(wrap);
    const anchor = g.userData.labelAnchor ? g.userData.labelAnchor.clone() : toWorld(l.pos, GROUND_Y + 2.2);
    if (g.userData.labelAnchor) anchor.y += 0.6;
    labelObj.position.copy(anchor);
    labelObj.element.querySelector('.label').dataset.id = l.id;
    scene.add(labelObj);
    labelObj.visible = false;
  }
  const obj = { data: l, group: g, label: labelObj, progress: 0, target: 0, delay: 0 };
  landmarkObjs.push(obj);
  landmarkById.set(l.id, obj);
});

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let currentEra = 0;
const visited = new Set([0]);
let playTimer = null;
let activeLandmark = null;

const FOCUS = [
  { at: [103.83, 1.31], dist: 58 },
  { at: [103.84, 1.33], dist: 62 },
  { at: [103.90, 1.33], dist: 66 },
  { at: [103.80, 1.34], dist: 72 },
  { at: [103.864, 1.29], dist: 36 },
  { at: [103.862, 1.292], dist: 40 },
  { at: [103.76, 1.33], dist: 70 },
  { at: [103.83, 1.32], dist: 84 },
];

function isShown(l, era) {
  return era >= l.era && (l.removeAt == null || era < l.removeAt);
}

function setEra(index, { fly = true } = {}) {
  index = Math.max(0, Math.min(ERAS.length - 1, index));
  const prev = currentEra;
  currentEra = index;
  visited.add(index);
  const era = ERAS[index];

  // Landmark targets with a gentle stagger for ones appearing in this era.
  let k = 0;
  landmarkObjs.forEach((o) => {
    const show = isShown(o.data, index);
    o.target = show ? 1 : 0;
    o.delay = show && o.data.era === index ? 0.12 * k++ : 0;
    if (o.label) o.label.element.querySelector('.label').classList.toggle('label--old', o.data.era < index);
  });
  futureIslands.forEach((m) => { m.visible = era.isFuture; });

  closeLandmarkCard();
  renderTimeline();
  renderPanel(index, prev);
  if (fly) flyTo(FOCUS[index].at, FOCUS[index].dist);
  const badge = document.getElementById('era-badge');
  badge.querySelector('.era-badge__count').textContent = `${String(index + 1).padStart(2, '0')} / ${String(ERAS.length).padStart(2, '0')}`;
  badge.querySelector('.era-badge__year').textContent = era.years;
  document.title = `${era.label} · ${era.title} — The Little Red Dot`;
  if (location.hash.slice(1) !== era.id) history.replaceState(null, '', `#${era.id}`);
}
window.addEventListener('hashchange', () => {
  const i = ERAS.findIndex((e) => e.id === location.hash.slice(1));
  if (i >= 0 && i !== currentEra) { stopPlay(); setEra(i); }
});

// ---------------------------------------------------------------------------
// Camera tween
// ---------------------------------------------------------------------------
const tween = { active: false, t: 0, dur: 1.4, fromT: new THREE.Vector3(), toT: new THREE.Vector3(), fromP: new THREE.Vector3(), toP: new THREE.Vector3() };
function flyTo(lonlat, dist, opts) { flyToWorld(toWorld(lonlat, GROUND_Y), dist, opts); }
function flyToWorld(target, dist, { polar = 0.95, azimuth = null } = {}) {
  if (camera.aspect < 1) dist *= 1.35; // portrait phones need to stand further back
  const curAz = azimuth ?? controls.getAzimuthalAngle();
  const pos = new THREE.Vector3(Math.sin(curAz) * Math.sin(polar), Math.cos(polar), Math.cos(curAz) * Math.sin(polar)).multiplyScalar(dist).add(target);
  tween.fromT.copy(controls.target); tween.toT.copy(target);
  tween.fromP.copy(camera.position); tween.toP.copy(pos);
  tween.t = 0; tween.active = true;
}
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t) => { const c1 = 1.4, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };

// ---------------------------------------------------------------------------
// Landmark focus / card
// ---------------------------------------------------------------------------
const card = document.getElementById('landmark-card');
function focusLandmark(id, { fly = true } = {}) {
  const o = landmarkById.get(id);
  if (!o) return;
  if (!isShown(o.data, currentEra)) {
    // Jump to the era where it exists.
    setEra(o.data.era);
    setTimeout(() => focusLandmark(id), 900);
    return;
  }
  activeLandmark = id;
  document.querySelectorAll('.label--active').forEach((e) => e.classList.remove('label--active'));
  document.querySelectorAll('.milestone--active').forEach((e) => e.classList.remove('milestone--active'));
  if (o.label) o.label.element.querySelector('.label').classList.add('label--active');
  document.querySelectorAll(`.milestone[data-landmark="${id}"]`).forEach((e) => e.classList.add('milestone--active'));
  const d = o.data;
  card.hidden = false;
  card.querySelector('.landmark-card__kicker').textContent = (d.future ? 'PLANNED · ' : 'LANDMARK · ') + ERAS[d.era].label;
  card.querySelector('.landmark-card__title').textContent = d.label;
  card.querySelector('.landmark-card__body').textContent = d.blurb || (d.type === 'line' ? 'An MRT line. Click Play to watch the network grow.' : '');
  if (fly) {
    const anchor = o.group.userData.labelAnchor ? o.group.userData.labelAnchor.clone().setY(GROUND_Y) : toWorld(d.pos);
    flyToWorld(anchor, d.type === 'line' ? 42 : 26, { polar: 0.85 });
  }
}
function closeLandmarkCard() {
  card.hidden = true;
  activeLandmark = null;
  document.querySelectorAll('.label--active').forEach((e) => e.classList.remove('label--active'));
  document.querySelectorAll('.milestone--active').forEach((e) => e.classList.remove('milestone--active'));
}
card.querySelector('.landmark-card__close').addEventListener('click', closeLandmarkCard);

// Click on 3D meshes
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downAt = null;
canvas.addEventListener('pointerdown', (e) => { downAt = [e.clientX, e.clientY]; });
canvas.addEventListener('pointerup', (e) => {
  if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 5) return;
  const r = canvas.getBoundingClientRect();
  pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(landmarkObjs.filter((o) => o.group.visible).map((o) => o.group), true);
  const hit = hits.find((h) => h.object.userData.landmarkId);
  if (hit) focusLandmark(hit.object.userData.landmarkId, { fly: false });
  else closeLandmarkCard();
});

// ---------------------------------------------------------------------------
// Panel
// ---------------------------------------------------------------------------
const panelInner = document.getElementById('panel-inner');
const panel = document.getElementById('panel');
const fmt = (v, d) => v.toLocaleString('en-SG', { minimumFractionDigits: d, maximumFractionDigits: d });

function renderPanel(index, prevIndex) {
  const e = ERAS[index];
  const prevStats = ERAS[prevIndex]?.stats || e.stats;
  const milestones = e.milestones.map((m) => {
    const link = m.landmark && landmarkById.has(m.landmark);
    return `<li class="milestone${link ? ' milestone--link' : ''}" ${link ? `data-landmark="${m.landmark}" tabindex="0" role="button"` : ''}>
      <span class="milestone__year">${m.year}</span>
      <span>${m.text}${link ? '<span class="milestone__pin" title="Show on map">◎</span>' : ''}</span></li>`;
  }).join('');
  const stats = STAT_META.map((s) => {
    const cur = e.stats[s.key], prev = prevStats[s.key];
    const delta = cur - prev;
    const deltaHtml = index !== prevIndex && Math.abs(delta) >= 0.05
      ? `<div class="stat__delta${delta < 0 ? ' stat__delta--down' : ''}">${delta > 0 ? '▲' : '▼'} ${fmt(Math.abs(delta), s.decimals)} since ${ERAS[prevIndex].label}</div>` : '';
    return `<div class="stat"><div class="stat__value"><span data-stat="${s.key}" data-from="${prev}" data-to="${cur}" data-dec="${s.decimals}">${fmt(prev, s.decimals)}</span><small>${s.unit}</small></div><div class="stat__label">${s.label}${e.isFuture ? ' (projection)' : ''}</div>${deltaHtml}</div>`;
  }).join('');

  panelInner.innerHTML = `
    <div class="panel__kicker">CHAPTER ${String(index + 1).padStart(2, '0')} · ${e.label.toUpperCase()}</div>
    <div class="panel__years">${e.years}</div>
    <h1 class="panel__headline">${e.title}</h1>
    <p class="panel__mood">${e.mood}</p>
    ${e.isFuture ? '<p class="panel__future-note">Everything in this chapter comes from published government plans and speeches. Dates are targets, not promises — and the blueprint structures on the map are illustrations, not real designs.</p>' : ''}
    <section class="section"><h2 class="section__title">WHAT HAPPENED</h2><p>${e.story}</p></section>
    <section class="section two-col">
      <div class="callout callout--problem"><h4>The challenge</h4><p>${e.challenge}</p></div>
      <div class="callout callout--solve"><h4>How Singapore got through it</h4><p>${e.overcome}</p></div>
    </section>
    <section class="section"><h2 class="section__title">BY THE NUMBERS</h2><div class="stats">${stats}</div></section>
    <section class="section"><h2 class="section__title">MILESTONES · tap ◎ to see it on the map</h2><ul class="milestones">${milestones}</ul></section>
    <div class="takeaway"><div class="takeaway__kicker">FOR THE NEXT GENERATION</div><p>${e.takeaway}</p></div>
    <div class="sources">Sources: ${e.sources.join(' · ')}</div>
    <div class="panel__nav">
      <button class="btn btn--ghost" id="panel-prev" ${index === 0 ? 'disabled' : ''}>← ${ERAS[index - 1]?.label ?? ''}</button>
      <button class="btn btn--primary" id="panel-next" ${index === ERAS.length - 1 ? 'disabled' : ''}>${index === ERAS.length - 1 ? 'The end — for now' : `Next: ${ERAS[index + 1].label} →`}</button>
    </div>`;
  panel.scrollTo({ top: 0 });
  panelInner.querySelectorAll('.milestone--link').forEach((li) => {
    const go = () => focusLandmark(li.dataset.landmark);
    li.addEventListener('click', go);
    li.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); go(); } });
  });
  panelInner.querySelector('#panel-prev')?.addEventListener('click', () => setEra(index - 1));
  panelInner.querySelector('#panel-next')?.addEventListener('click', () => setEra(index + 1));
  animateStats();
}

function animateStats() {
  const els = [...panelInner.querySelectorAll('[data-stat]')];
  const start = performance.now(), dur = 1100;
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur), k = easeInOut(t);
    els.forEach((el) => {
      const from = +el.dataset.from, to = +el.dataset.to, dec = +el.dataset.dec;
      el.textContent = fmt(from + (to - from) * k, dec);
    });
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------
const track = document.getElementById('era-track');
function renderTimeline() {
  if (!track.children.length) {
    ERAS.forEach((e, i) => {
      const b = document.createElement('button');
      b.className = 'era-btn';
      b.textContent = e.label;
      b.addEventListener('click', () => { stopPlay(); setEra(i); });
      track.appendChild(b);
    });
  }
  [...track.children].forEach((b, i) => {
    b.setAttribute('aria-current', i === currentEra ? 'true' : 'false');
    b.classList.toggle('era-btn--visited', visited.has(i));
    if (i === currentEra) b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  });
}
document.getElementById('era-prev').addEventListener('click', () => { stopPlay(); setEra(currentEra - 1); });
document.getElementById('era-next').addEventListener('click', () => { stopPlay(); setEra(currentEra + 1); });
const playBtn = document.getElementById('era-play');
function startPlay() {
  if (currentEra === ERAS.length - 1) setEra(0);
  playBtn.setAttribute('aria-pressed', 'true');
  playBtn.textContent = '❚❚ Pause';
  playTimer = setInterval(() => {
    if (currentEra >= ERAS.length - 1) { stopPlay(); return; }
    setEra(currentEra + 1);
  }, 9000);
}
function stopPlay() {
  if (!playTimer) return;
  clearInterval(playTimer); playTimer = null;
  playBtn.setAttribute('aria-pressed', 'false');
  playBtn.textContent = '▶ Play';
}
playBtn.addEventListener('click', () => (playTimer ? stopPlay() : startPlay()));

window.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea')) return;
  if (e.key === 'ArrowRight') { stopPlay(); setEra(currentEra + 1); }
  else if (e.key === 'ArrowLeft') { stopPlay(); setEra(currentEra - 1); }
  else if (e.key === 'Escape') closeLandmarkCard();
  else if (e.key === ' ' && !document.getElementById('intro').classList.contains('intro--hidden') === false) { e.preventDefault(); playTimer ? stopPlay() : startPlay(); }
});

// ---------------------------------------------------------------------------
// Sky / tools
// ---------------------------------------------------------------------------
function setSky(name) {
  const s = SKIES[name];
  scene.background = new THREE.Color(s.bg);
  scene.fog.color.set(s.fog);
  stage.style.background = `#${s.bg.toString(16).padStart(6, '0')}`;
  seaMat.color.set(s.sea);
  hemi.color.set(s.hemi[0]); hemi.groundColor.set(s.hemi[1]); hemi.intensity = s.hemi[2];
  sun.color.set(s.sun[0]); sun.intensity = s.sun[1];
  fill.intensity = s.fill;
  renderer.toneMappingExposure = s.exposure;
  GLOW_MATS.forEach((m) => { m.emissiveIntensity = s.glow * (m.emissiveMap ? 0.9 : 0.18); });
  document.querySelectorAll('[data-sky]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.sky === name ? 'true' : 'false'));
  document.body.dataset.sky = name;
}
document.querySelectorAll('[data-sky]').forEach((b) => b.addEventListener('click', () => setSky(b.dataset.sky)));
setSky('day');

document.getElementById('btn-labels').addEventListener('click', (e) => {
  const on = e.currentTarget.getAttribute('aria-pressed') !== 'true';
  e.currentTarget.setAttribute('aria-pressed', String(on));
  document.body.classList.toggle('labels-off', !on);
});
document.getElementById('btn-reset').addEventListener('click', () => flyTo(FOCUS[currentEra].at, FOCUS[currentEra].dist, { azimuth: -0.15 }));
document.getElementById('btn-help').addEventListener('click', () => showIntro(0));

// ---------------------------------------------------------------------------
// Intro
// ---------------------------------------------------------------------------
const intro = document.getElementById('intro');
let introStep = 0;
function showIntro(step) {
  introStep = step;
  const s = INTRO_STEPS[step];
  intro.querySelector('.intro__kicker').textContent = s.kicker;
  intro.querySelector('.intro__title').textContent = s.title;
  intro.querySelector('.intro__body').textContent = s.body;
  document.getElementById('intro-next').textContent = step === INTRO_STEPS.length - 1 ? 'Start in 1960 →' : 'Next →';
  intro.classList.remove('intro--hidden');
}
function hideIntro() { intro.classList.add('intro--hidden'); }
document.getElementById('intro-skip').addEventListener('click', hideIntro);
document.getElementById('intro-next').addEventListener('click', () => (introStep < INTRO_STEPS.length - 1 ? showIntro(introStep + 1) : hideIntro()));

// ---------------------------------------------------------------------------
// Resize + loop
// ---------------------------------------------------------------------------
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false);
  labelRenderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

const clock = new THREE.Clock();
let elapsed = 0;
function loop() {
  const dt = Math.min(0.05, clock.getDelta());
  elapsed += dt;

  // Sea ripple
  const pos = seaGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = seaBase[i * 3], z = seaBase[i * 3 + 2];
    pos.array[i * 3 + 1] = Math.sin(x * 0.25 + elapsed * 0.9) * 0.12 + Math.cos(z * 0.3 + elapsed * 0.7) * 0.1;
  }
  pos.needsUpdate = true;

  // Landmark growth
  landmarkObjs.forEach((o) => {
    if (o.delay > 0) { o.delay -= dt; return; }
    const dir = o.target > o.progress ? 1 : o.target < o.progress ? -1 : 0;
    if (dir === 0) return;
    o.progress = Math.max(0, Math.min(1, o.progress + dir * dt * (o.data.type === 'line' ? 0.7 : 1.6)));
    const p = o.progress;
    o.group.visible = p > 0;
    if (o.label) {
      o.label.visible = p > 0.05;
      o.label.element.querySelector('.label').classList.toggle('label--hidden', p < 0.6);
    }
    if (o.data.type === 'line') o.group.children[0].userData.setProgress(p);
    else {
      const s = dir > 0 ? easeOutBack(p) : p;
      o.group.scale.set(Math.max(0.0001, 0.6 + 0.4 * s), Math.max(0.0001, s), Math.max(0.0001, 0.6 + 0.4 * s));
    }
  });

  // Camera tween
  if (tween.active) {
    tween.t = Math.min(1, tween.t + dt / tween.dur);
    const k = easeInOut(tween.t);
    controls.target.lerpVectors(tween.fromT, tween.toT, k);
    camera.position.lerpVectors(tween.fromP, tween.toP, k);
    if (tween.t >= 1) tween.active = false;
  }
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(loop);
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
const startEra = Math.max(0, ERAS.findIndex((e) => e.id === location.hash.slice(1)));
controls.target.copy(toWorld(FOCUS[0].at));
camera.position.copy(controls.target).add(new THREE.Vector3(-8, 46, 60));
setEra(startEra, { fly: true });
showIntro(0);
loop();
requestAnimationFrame(() => document.getElementById('loader').classList.add('loader--hidden'));
