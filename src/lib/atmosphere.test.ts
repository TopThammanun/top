import { describe, expect, it } from "vitest";
import {
  ambientCount,
  ATMOSPHERE,
  ATMOSPHERES,
  burstAt,
  createField,
  fitField,
  particleAlpha,
  stepField,
  type Burst,
  type Emitter,
  type Scene,
} from "./atmosphere";
import { SCENES } from "./thai-calendar";

const BOX = { width: 1000, height: 800 };
const half = () => 0.5;

function seeded(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const drift: Emitter = {
  shape: "dot",
  tones: ["ink"],
  size: [1, 3],
  alpha: [0.2, 0.8],
  vx: [10, 10],
  vy: [20, 20],
  sway: 0,
  flicker: 0,
};

const pop: Burst = {
  shape: "dot",
  tones: ["accent", "violet"],
  size: [1, 2],
  alpha: [1, 1],
  count: [6, 6],
  speed: [100, 100],
  heading: -Math.PI / 2,
  spread: 0,
  gravity: 50,
  drag: 0,
  life: [1, 1],
  every: [2, 2],
  zone: [0.25, 0.5],
};

const ambientOnly: Scene = { density: 10, ambient: drift, burst: null };
const burstOnly: Scene = { density: 0, ambient: null, burst: pop };

describe("ambientCount", () => {
  it("scales with the area of the box", () => {
    expect(ambientCount(ambientOnly, BOX)).toBe(8);
    expect(ambientCount(ambientOnly, { width: 2000, height: 800 })).toBe(16);
  });

  it("stops at the cap on very large screens", () => {
    expect(ambientCount({ ...ambientOnly, density: 500 }, { width: 4000, height: 3000 })).toBe(
      ATMOSPHERE.maxAmbient,
    );
  });

  it("is zero for a scene without ambient particles", () => {
    expect(ambientCount(burstOnly, BOX)).toBe(0);
  });
});

describe("createField", () => {
  it("scatters the ambient particles across the box, inside the emitter's ranges", () => {
    const field = createField(ambientOnly, BOX, seeded(1));
    expect(field.particles).toHaveLength(8);
    for (const particle of field.particles) {
      expect(particle.x).toBeGreaterThanOrEqual(0);
      expect(particle.x).toBeLessThanOrEqual(BOX.width);
      expect(particle.y).toBeGreaterThanOrEqual(0);
      expect(particle.y).toBeLessThanOrEqual(BOX.height);
      expect(particle.size).toBeGreaterThanOrEqual(1);
      expect(particle.size).toBeLessThanOrEqual(3);
      expect(particle.alpha).toBeGreaterThanOrEqual(0.2);
      expect(particle.alpha).toBeLessThanOrEqual(0.8);
      expect(particle.life).toBe(Infinity);
    }
  });

  it("starts empty and schedules the first burst for a burst scene", () => {
    const field = createField(burstOnly, BOX, half);
    expect(field.particles).toHaveLength(0);
    expect(field.nextBurst).toBe(2);
  });

  it("never schedules a burst for a scene that only bursts on tap", () => {
    const tapOnly: Scene = { density: 0, ambient: null, burst: { ...pop, every: null } };
    expect(createField(tapOnly, BOX, half).nextBurst).toBe(Infinity);
    expect(createField(ambientOnly, BOX, half).nextBurst).toBe(Infinity);
  });
});

describe("stepField", () => {
  it("moves each particle by its velocity", () => {
    const field = createField(ambientOnly, BOX, half);
    const before = field.particles.map(({ x, y }) => ({ x, y }));
    stepField(field, ambientOnly, BOX, 0.5, half);
    field.particles.forEach((particle, i) => {
      expect(particle.x).toBeCloseTo(before[i].x + 5);
      expect(particle.y).toBeCloseTo(before[i].y + 10);
    });
    expect(field.age).toBeCloseTo(0.5);
  });

  it("brings an ambient particle back on the opposite edge once it leaves the box", () => {
    const field = createField(ambientOnly, BOX, half);
    const [particle] = field.particles;
    particle.y = BOX.height + ATMOSPHERE.margin - 1;
    stepField(field, ambientOnly, BOX, 0.5, half);
    expect(particle.y).toBe(-ATMOSPHERE.margin);
    expect(particle.x).toBe(BOX.width / 2);
    expect(field.particles).toHaveLength(8);
  });

  it("wraps sideways and upwards as well", () => {
    const rising: Scene = { ...ambientOnly, ambient: { ...drift, vx: [-10, -10], vy: [-20, -20] } };
    const field = createField(rising, BOX, half);
    const [up, left] = field.particles;
    up.y = -ATMOSPHERE.margin + 1;
    left.x = -ATMOSPHERE.margin + 1;
    stepField(field, rising, BOX, 0.5, half);
    expect(up.y).toBe(BOX.height + ATMOSPHERE.margin);
    expect(left.x).toBe(BOX.width + ATMOSPHERE.margin);
  });

  it("fires a burst inside its zone when one is due and schedules the next", () => {
    const field = createField(burstOnly, BOX, half);
    stepField(field, burstOnly, BOX, 1.9, half);
    expect(field.particles).toHaveLength(0);
    stepField(field, burstOnly, BOX, 0.2, half);
    expect(field.particles).toHaveLength(6);
    expect(field.particles[0].x).toBeCloseTo(BOX.width / 2);
    expect(field.particles[0].y).toBeCloseTo(BOX.height * 0.375);
    expect(field.nextBurst).toBeCloseTo(4.1);
  });

  it("pulls burst particles down with gravity and removes them at the end of their life", () => {
    const field = createField(burstOnly, BOX, half);
    burstAt(field, pop, { x: 100, y: 100 }, half);
    stepField(field, burstOnly, BOX, 0.5, half);
    expect(field.particles[0].vy).toBeCloseTo(-75);
    stepField(field, burstOnly, BOX, 0.6, half);
    expect(field.particles).toHaveLength(0);
  });

  it("slows burst particles down with drag", () => {
    const dragged: Burst = { ...pop, gravity: 0, drag: 1 };
    const field = createField(burstOnly, BOX, half);
    burstAt(field, dragged, { x: 100, y: 100 }, half);
    stepField(field, burstOnly, BOX, 0.5, half);
    expect(field.particles[0].vy).toBeCloseTo(-100 * Math.exp(-0.5));
  });
});

describe("burstAt", () => {
  it("throws particles from the point along the heading", () => {
    const field = createField(burstOnly, BOX, half);
    burstAt(field, pop, { x: 300, y: 400 }, seeded(2));
    expect(field.particles).toHaveLength(6);
    for (const particle of field.particles) {
      expect(particle).toMatchObject({ x: 300, y: 400, life: 1, age: 0 });
      expect(particle.vx).toBeCloseTo(0);
      expect(particle.vy).toBeCloseTo(-100);
    }
  });

  it("spreads particles over the whole cone and gives one burst a single tone", () => {
    const field = createField(burstOnly, BOX, half);
    burstAt(field, { ...pop, count: [40, 40], spread: Math.PI * 2 }, { x: 0, y: 0 }, seeded(3));
    expect(field.particles.some((particle) => particle.vy > 0)).toBe(true);
    expect(field.particles.some((particle) => particle.vx < 0)).toBe(true);
    expect(new Set(field.particles.map((particle) => particle.tone)).size).toBe(1);
  });

  it("stops adding particles at the cap", () => {
    const field = createField(burstOnly, BOX, half);
    for (let i = 0; i < 100; i++) burstAt(field, pop, { x: 0, y: 0 }, half);
    expect(field.particles).toHaveLength(ATMOSPHERE.maxTransient);
  });
});

describe("fitField", () => {
  it("adds ambient particles when the box grows and drops them when it shrinks", () => {
    const field = createField(ambientOnly, BOX, seeded(4));
    burstAt(field, pop, { x: 10, y: 10 }, half);
    fitField(field, ambientOnly, { width: 2000, height: 800 }, seeded(5));
    expect(field.particles.filter((particle) => particle.life === Infinity)).toHaveLength(16);
    fitField(field, ambientOnly, { width: 500, height: 800 }, seeded(6));
    expect(field.particles.filter((particle) => particle.life === Infinity)).toHaveLength(4);
    expect(field.particles.filter((particle) => particle.life !== Infinity)).toHaveLength(6);
  });
});

describe("particleAlpha", () => {
  it("fades a burst particle out over its life", () => {
    const field = createField(burstOnly, BOX, half);
    burstAt(field, { ...pop, gravity: 0 }, { x: 0, y: 0 }, half);
    const [particle] = field.particles;
    expect(particleAlpha(particle)).toBe(1);
    particle.age = 0.5;
    expect(particleAlpha(particle)).toBeCloseTo(0.75);
    particle.age = 1;
    expect(particleAlpha(particle)).toBe(0);
  });

  it("keeps a flickering ambient particle between its dimmest and its full alpha", () => {
    const flickering: Scene = { ...ambientOnly, ambient: { ...drift, alpha: [0.8, 0.8], flicker: 0.5 } };
    const field = createField(flickering, BOX, seeded(7));
    const [particle] = field.particles;
    for (let age = 0; age < 10; age += 0.37) {
      particle.age = age;
      expect(particleAlpha(particle)).toBeGreaterThanOrEqual(0.4 - 1e-9);
      expect(particleAlpha(particle)).toBeLessThanOrEqual(0.8 + 1e-9);
    }
  });
});

describe("ATMOSPHERES", () => {
  it.each(SCENES.map((scene) => scene.id))("gives %s something to show", (id) => {
    const scene = ATMOSPHERES[id];
    expect(scene.ambient !== null || scene.burst?.every != null).toBe(true);
    expect(ambientCount(scene, { width: 1440, height: 900 })).toBeLessThanOrEqual(110);
  });
});
