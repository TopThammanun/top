import { describe, expect, it } from "vitest";
import {
  aimDots,
  containRect,
  createDots,
  DOT_FIELD,
  dotRadius,
  gridSpacing,
  sampleMask,
  stepDots,
} from "./dot-field";

function alphaPixels(values: number[]): Uint8ClampedArray {
  return new Uint8ClampedArray(values.flatMap((alpha) => [255, 255, 255, alpha]));
}

describe("gridSpacing", () => {
  it("fits a fixed number of columns into the width", () => {
    expect(gridSpacing(DOT_FIELD.columns * 7)).toBe(7);
  });

  it("never goes below the minimum spacing", () => {
    expect(gridSpacing(10)).toBe(DOT_FIELD.minSpacing);
  });
});

describe("createDots", () => {
  it("centres a grid in the box", () => {
    const dots = createDots(30, 20, 10);
    expect(dots).toHaveLength(6);
    expect(dots[0]).toMatchObject({ x: 5, y: 5 });
    expect(dots[5]).toMatchObject({ x: 25, y: 15 });
  });
});

describe("containRect", () => {
  it("fits a wide image to the box width and centres it", () => {
    expect(containRect({ width: 200, height: 200 }, 2, 1)).toEqual({ x: 0, y: 50, width: 200, height: 100 });
  });

  it("fits a tall image to the box height", () => {
    expect(containRect({ width: 200, height: 100 }, 0.5, 1)).toEqual({ x: 75, y: 0, width: 50, height: 100 });
  });

  it("shrinks by the fit ratio", () => {
    expect(containRect({ width: 100, height: 100 }, 1, 0.8)).toEqual({ x: 10, y: 10, width: 80, height: 80 });
  });
});

describe("sampleMask", () => {
  it("averages the alpha of the cell around each dot", () => {
    const dots = createDots(4, 2, 2);
    const alpha = alphaPixels([255, 255, 0, 255, 255, 255, 0, 0]);
    expect(sampleMask(dots, alpha, { width: 4, height: 2 }, 2)).toEqual([1, 0.25]);
  });

  it("clips cells at the edge of the image", () => {
    const [dot] = createDots(2, 2, 2);
    expect(sampleMask([dot], alphaPixels([255, 255, 255, 255]), { width: 2, height: 2 }, 8)).toEqual([1]);
  });
});

describe("aimDots", () => {
  it("sets targets and leaves the current mask to ease", () => {
    const dots = createDots(20, 10, 10);
    aimDots(dots, [1, 0.5]);
    expect(dots.map((d) => [d.target, d.mask])).toEqual([
      [1, 0],
      [0.5, 0],
    ]);
  });

  it("snaps the mask when asked", () => {
    const dots = createDots(20, 10, 10);
    aimDots(dots, [1, 0.5], true);
    expect(dots.map((d) => d.mask)).toEqual([1, 0.5]);
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

  it("eases the mask towards its target", () => {
    const dots = createDots(12, 12, 12);
    aimDots(dots, [1]);
    expect(stepDots(dots, null)).toBe(false);
    expect(dots[0].mask).toBeCloseTo(DOT_FIELD.ease);
    let settled = false;
    for (let i = 0; i < 200 && !settled; i++) settled = stepDots(dots, null);
    expect(dots[0].mask).toBeGreaterThan(1 - DOT_FIELD.epsilon * 2);
  });
});

describe("dotRadius", () => {
  it("scales with the spacing and grows with the mask", () => {
    const [dot] = createDots(12, 12, 12);
    expect(dotRadius(dot, 10)).toBeCloseTo(10 * DOT_FIELD.baseRadius);
    dot.mask = 1;
    expect(dotRadius(dot, 10)).toBeCloseTo(10 * DOT_FIELD.maskRadius);
  });
});
