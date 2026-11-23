import type { Point, Size } from "./dot-field";
import type { SceneId } from "./thai-calendar";

export type Tone = "ink" | "accent" | "violet";
export type Shape = "dot" | "glow" | "streak" | "flake";
export type Range = readonly [min: number, max: number];
export type Random = () => number;

interface Look {
  shape: Shape;
  tones: readonly Tone[];
  size: Range;
  alpha: Range;
}

export interface Emitter extends Look {
  vx: Range;
  vy: Range;
  sway: number;
  flicker: number;
}

export interface Burst extends Look {
  count: Range;
  speed: Range;
  heading: number;
  spread: number;
  gravity: number;
  drag: number;
  life: Range;
  every: Range | null;
  zone: Range;
}

export interface Scene {
  density: number;
  ambient: Emitter | null;
  burst: Burst | null;
}

export interface Particle {
  shape: Shape;
  tone: Tone;
  size: number;
  alpha: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  sway: number;
  flicker: number;
  gravity: number;
  drag: number;
  age: number;
  life: number;
}

export interface Field {
  particles: Particle[];
  age: number;
  nextBurst: number;
}

export const ATMOSPHERE = {
  margin: 24,
  maxAmbient: 140,
  maxTransient: 320,
  swayRate: 1.1,
  flickerRate: 2.4,
} as const;

const TAU = Math.PI * 2;
const UP = -Math.PI / 2;
const MEGAPIXEL = 1_000_000;

export const ATMOSPHERES: Readonly<Record<SceneId, Scene>> = {
  cool: {
    density: 40,
    ambient: {
      shape: "dot",
      tones: ["ink"],
      size: [1, 2.3],
      alpha: [0.35, 0.8],
      vx: [12, 30],
      vy: [-3, 5],
      sway: 4,
      flicker: 0.55,
    },
    burst: null,
  },
  hot: {
    density: 26,
    ambient: {
      shape: "glow",
      tones: ["accent"],
      size: [1.2, 2.4],
      alpha: [0.45, 0.9],
      vx: [-4, 4],
      vy: [-22, -8],
      sway: 10,
      flicker: 0.6,
    },
    burst: null,
  },
  rainy: {
    density: 70,
    ambient: {
      shape: "streak",
      tones: ["ink"],
      size: [12, 22],
      alpha: [0.2, 0.42],
      vx: [-90, -70],
      vy: [620, 820],
      sway: 0,
      flicker: 0,
    },
    burst: null,
  },
  "year-end": {
    density: 60,
    ambient: {
      shape: "dot",
      tones: ["ink"],
      size: [1, 2.8],
      alpha: [0.35, 0.85],
      vx: [-8, 8],
      vy: [22, 58],
      sway: 16,
      flicker: 0,
    },
    burst: null,
  },
  "new-year": {
    density: 0,
    ambient: null,
    burst: {
      shape: "dot",
      tones: ["accent", "violet", "ink"],
      size: [1.3, 2.4],
      alpha: [0.8, 1],
      count: [34, 52],
      speed: [120, 380],
      heading: UP,
      spread: TAU,
      gravity: 46,
      drag: 1.7,
      life: [1.3, 2.1],
      every: [0.5, 1.3],
      zone: [0.1, 0.55],
    },
  },
  "chinese-new-year": {
    density: 30,
    ambient: {
      shape: "flake",
      tones: ["accent"],
      size: [2.2, 4],
      alpha: [0.5, 0.9],
      vx: [-10, 10],
      vy: [26, 54],
      sway: 22,
      flicker: 0.5,
    },
    burst: {
      shape: "dot",
      tones: ["accent"],
      size: [1, 1.8],
      alpha: [0.8, 1],
      count: [10, 18],
      speed: [80, 230],
      heading: UP,
      spread: TAU,
      gravity: 140,
      drag: 2.6,
      life: [0.5, 0.9],
      every: [0.8, 1.9],
      zone: [0.2, 0.85],
    },
  },
  songkran: {
    density: 14,
    ambient: {
      shape: "dot",
      tones: ["ink"],
      size: [1.4, 2.6],
      alpha: [0.35, 0.7],
      vx: [-20, 20],
      vy: [260, 420],
      sway: 0,
      flicker: 0,
    },
    burst: {
      shape: "dot",
      tones: ["ink"],
      size: [1.4, 3.2],
      alpha: [0.55, 0.95],
      count: [22, 36],
      speed: [200, 520],
      heading: UP,
      spread: 1.3,
      gravity: 720,
      drag: 0.5,
      life: [0.9, 1.5],
      every: [0.5, 1.2],
      zone: [0.4, 1],
    },
  },
  "loy-krathong": {
    density: 22,
    ambient: {
      shape: "glow",
      tones: ["accent"],
      size: [2, 3.8],
      alpha: [0.5, 0.95],
      vx: [-6, 10],
      vy: [-34, -14],
      sway: 8,
      flicker: 0.35,
    },
    burst: {
      shape: "glow",
      tones: ["accent"],
      size: [2.4, 3.6],
      alpha: [0.85, 1],
      count: [1, 1],
      speed: [26, 40],
      heading: UP,
      spread: 0.5,
      gravity: 0,
      drag: 0,
      life: [14, 20],
      every: null,
      zone: [0, 1],
    },
  },
};

function pick([min, max]: Range, random: Random): number {
  return min + (max - min) * random();
}

function pickTone(tones: readonly Tone[], random: Random): Tone {
  return tones[Math.floor(random() * tones.length)];
}

function isAmbient(particle: Particle): boolean {
  return particle.life === Infinity;
}

function spawnAmbient(emitter: Emitter, size: Size, random: Random): Particle {
  return {
    shape: emitter.shape,
    tone: pickTone(emitter.tones, random),
    size: pick(emitter.size, random),
    alpha: pick(emitter.alpha, random),
    x: random() * size.width,
    y: random() * size.height,
    vx: pick(emitter.vx, random),
    vy: pick(emitter.vy, random),
    phase: random() * TAU,
    sway: emitter.sway,
    flicker: emitter.flicker,
    gravity: 0,
    drag: 0,
    age: 0,
    life: Infinity,
  };
}

function scheduleBurst(scene: Scene, from: number, random: Random): number {
  return scene.burst?.every ? from + pick(scene.burst.every, random) : Infinity;
}

export function ambientCount(scene: Scene, size: Size): number {
  if (!scene.ambient) return 0;
  const count = Math.round((scene.density * size.width * size.height) / MEGAPIXEL);
  return Math.min(ATMOSPHERE.maxAmbient, count);
}

export function createField(scene: Scene, size: Size, random: Random): Field {
  const field: Field = { particles: [], age: 0, nextBurst: scheduleBurst(scene, 0, random) };
  fitField(field, scene, size, random);
  return field;
}

export function fitField(field: Field, scene: Scene, size: Size, random: Random): void {
  const target = ambientCount(scene, size);
  const ambient = field.particles.filter(isAmbient);
  const transient = field.particles.filter((particle) => !isAmbient(particle));
  while (scene.ambient && ambient.length < target) ambient.push(spawnAmbient(scene.ambient, size, random));
  field.particles = [...ambient.slice(0, target), ...transient];
}

export function burstAt(field: Field, burst: Burst, point: Point, random: Random): void {
  const transient = field.particles.length - field.particles.filter(isAmbient).length;
  const count = Math.min(Math.round(pick(burst.count, random)), ATMOSPHERE.maxTransient - transient);
  const tone = pickTone(burst.tones, random);
  for (let i = 0; i < count; i++) {
    const angle = burst.heading + (random() - 0.5) * burst.spread;
    const speed = pick(burst.speed, random);
    field.particles.push({
      shape: burst.shape,
      tone,
      size: pick(burst.size, random),
      alpha: pick(burst.alpha, random),
      x: point.x,
      y: point.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      phase: random() * TAU,
      sway: 0,
      flicker: 0,
      gravity: burst.gravity,
      drag: burst.drag,
      age: 0,
      life: pick(burst.life, random),
    });
  }
}

function wrap(particle: Particle, size: Size, random: Random): void {
  const { margin } = ATMOSPHERE;
  if (particle.y > size.height + margin || particle.y < -margin) {
    particle.y = particle.y < 0 ? size.height + margin : -margin;
    particle.x = random() * size.width;
  }
  if (particle.x > size.width + margin || particle.x < -margin) {
    particle.x = particle.x < 0 ? size.width + margin : -margin;
    particle.y = random() * size.height;
  }
}

export function stepField(field: Field, scene: Scene, size: Size, dt: number, random: Random): void {
  field.age += dt;
  for (const particle of field.particles) {
    particle.age += dt;
    const slow = Math.exp(-particle.drag * dt);
    particle.vx *= slow;
    particle.vy = (particle.vy + particle.gravity * dt) * slow;
    const swing = particle.sway * Math.sin(particle.phase + particle.age * ATMOSPHERE.swayRate);
    particle.x += (particle.vx + swing) * dt;
    particle.y += particle.vy * dt;
    if (isAmbient(particle)) wrap(particle, size, random);
  }
  field.particles = field.particles.filter((particle) => particle.age < particle.life);
  if (scene.burst && field.age >= field.nextBurst) {
    const point = { x: random() * size.width, y: pick(scene.burst.zone, random) * size.height };
    burstAt(field, scene.burst, point, random);
    field.nextBurst = scheduleBurst(scene, field.age, random);
  }
}

export function particleAlpha(particle: Particle): number {
  if (!isAmbient(particle)) return particle.alpha * (1 - (particle.age / particle.life) ** 2);
  const wave = 0.5 + 0.5 * Math.sin(particle.phase + particle.age * ATMOSPHERE.flickerRate);
  return particle.alpha * (1 - particle.flicker * wave);
}
