export interface Dot {
  x: number;
  y: number;
  mask: number;
  ox: number;
  oy: number;
  glow: number;
}

export interface Point {
  x: number;
  y: number;
}

export type MaskMode = "alpha" | "luma";

export const DOT_FIELD = {
  spacing: 10,
  baseRadius: 0.9,
  maskRadius: 1.9,
  glowRadius: 0.9,
  pointerRadius: 96,
  push: 7,
  ease: 0.14,
  epsilon: 0.01,
} as const;

export type DotFieldParams = typeof DOT_FIELD;

export function createDots(width: number, height: number, spacing: number): Dot[] {
  const cols = Math.max(0, Math.floor(width / spacing));
  const rows = Math.max(0, Math.floor(height / spacing));
  const left = (width - (cols - 1) * spacing) / 2;
  const top = (height - (rows - 1) * spacing) / 2;
  const dots: Dot[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push({ x: left + col * spacing, y: top + row * spacing, mask: 0, ox: 0, oy: 0, glow: 0 });
    }
  }
  return dots;
}

export function maskValue(pixels: Uint8ClampedArray, index: number, mode: MaskMode): number {
  const alpha = (pixels[index + 3] ?? 0) / 255;
  if (mode === "alpha") return alpha;
  const r = pixels[index] ?? 0;
  const g = pixels[index + 1] ?? 0;
  const b = pixels[index + 2] ?? 0;
  return ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255) * alpha;
}

export function applyMask(
  dots: Dot[],
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  mode: MaskMode,
): void {
  for (const dot of dots) {
    const x = Math.min(width - 1, Math.max(0, Math.floor(dot.x)));
    const y = Math.min(height - 1, Math.max(0, Math.floor(dot.y)));
    dot.mask = maskValue(pixels, (y * width + x) * 4, mode);
  }
}

export function stepDots(dots: Dot[], pointer: Point | null, p: DotFieldParams = DOT_FIELD): boolean {
  let settled = true;
  for (const dot of dots) {
    let tx = 0;
    let ty = 0;
    let tg = 0;
    if (pointer) {
      const dx = dot.x - pointer.x;
      const dy = dot.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance > 0 && distance < p.pointerRadius) {
        const force = 1 - distance / p.pointerRadius;
        tx = (dx / distance) * p.push * force;
        ty = (dy / distance) * p.push * force;
        tg = force;
      }
    }
    dot.ox += (tx - dot.ox) * p.ease;
    dot.oy += (ty - dot.oy) * p.ease;
    dot.glow += (tg - dot.glow) * p.ease;
    if (
      Math.abs(tx - dot.ox) > p.epsilon ||
      Math.abs(ty - dot.oy) > p.epsilon ||
      Math.abs(tg - dot.glow) > p.epsilon
    ) {
      settled = false;
    }
  }
  return settled;
}

export function dotRadius(dot: Dot, p: DotFieldParams = DOT_FIELD): number {
  return p.baseRadius + (p.maskRadius - p.baseRadius) * dot.mask + p.glowRadius * dot.glow;
}
