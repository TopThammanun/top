import { describe, expect, it } from "vitest";
import { applyMask, createDots, DOT_FIELD, dotRadius, maskValue, stepDots } from "./dot-field";

describe("createDots", () => {
  it("centres a grid in the box", () => {
    const dots = createDots(30, 20, 10);
    expect(dots).toHaveLength(6);
    expect(dots[0]).toMatchObject({ x: 5, y: 5 });
    expect(dots[5]).toMatchObject({ x: 25, y: 15 });
  });
});

describe("maskValue", () => {
  const white = new Uint8ClampedArray([255, 255, 255, 255]);
  const clear = new Uint8ClampedArray([255, 255, 255, 0]);

  it("reads alpha", () => {
    expect(maskValue(white, 0, "alpha")).toBe(1);
    expect(maskValue(clear, 0, "alpha")).toBe(0);
  });

  it("reads luminance weighted by alpha", () => {
    expect(maskValue(white, 0, "luma")).toBeCloseTo(1);
    expect(maskValue(new Uint8ClampedArray([0, 0, 0, 255]), 0, "luma")).toBe(0);
  });
});

describe("applyMask", () => {
  it("samples the pixel under each dot", () => {
    const dots = createDots(2, 1, 1);
    applyMask(dots, new Uint8ClampedArray([0, 0, 0, 0, 0, 0, 0, 255]), 2, 1, "alpha");
    expect(dots.map((d) => d.mask)).toEqual([0, 1]);
  });
});

describe("stepDots", () => {
  it("pushes dots near the pointer away and lights them", () => {
    const dots = createDots(24, 12, 12);
    stepDots(dots, { x: 0, y: 6 });
    expect(dots[0].ox).toBeGreaterThan(0);
    expect(dots[0].glow).toBeGreaterThan(0);
  });

  it("settles back without a pointer", () => {
    const dots = createDots(12, 12, 12);
    dots[0].ox = 4;
    let settled = false;
    for (let i = 0; i < 200 && !settled; i++) settled = stepDots(dots, null);
    expect(settled).toBe(true);
    expect(Math.abs(dots[0].ox)).toBeLessThan(DOT_FIELD.epsilon * 2);
  });
});

describe("dotRadius", () => {
  it("grows with the mask", () => {
    const [dot] = createDots(12, 12, 12);
    const base = dotRadius(dot);
    dot.mask = 1;
    expect(dotRadius(dot)).toBeCloseTo(DOT_FIELD.maskRadius);
    expect(base).toBe(DOT_FIELD.baseRadius);
  });
});
