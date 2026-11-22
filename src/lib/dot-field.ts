export interface Dot {
  x: number;
  y: number;
  mask: number;
  target: number;
  ox: number;
  oy: number;
  glow: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Point, Size {}

export const DOT_FIELD = {
  columns: 64,
  minSpacing: 5,
  baseRadius: 0.1,
  maskRadius: 0.42,
  glowRadius: 0.12,
  pointerRadius: 96,
  push: 7,
  ease: 0.14,
  epsilon: 0.01,
} as const;

export type DotFieldParams = typeof DOT_FIELD;

export function gridSpacing(width: number, p: DotFieldParams = DOT_FIELD): number {
  return Math.max(p.minSpacing, width / p.columns);
}

export function createDots(width: number, height: number, spacing: number): Dot[] {
  const cols = Math.max(0, Math.floor(width / spacing));
  const rows = Math.max(0, Math.floor(height / spacing));
  const left = (width - (cols - 1) * spacing) / 2;
  const top = (height - (rows - 1) * spacing) / 2;
  const dots: Dot[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push({
        x: left + col * spacing,
        y: top + row * spacing,
        mask: 0,
        target: 0,
        ox: 0,
        oy: 0,
        glow: 0,
      });
    }
  }
  return dots;
}

export function containRect(box: Size, aspect: number, fit: number): Rect {
  const width = Math.min(box.width, box.height * aspect) * fit;
  const height = width / aspect;
  return { x: (box.width - width) / 2, y: (box.height - height) / 2, width, height };
}

export function sampleMask(dots: Dot[], alpha: Uint8ClampedArray, size: Size, cell: number): number[] {
  const half = cell / 2;
  return dots.map((dot) => {
    const left = Math.max(0, Math.round(dot.x - half));
    const right = Math.min(size.width, Math.round(dot.x + half));
    const top = Math.max(0, Math.round(dot.y - half));
    const bottom = Math.min(size.height, Math.round(dot.y + half));
    let sum = 0;
    for (let y = top; y < bottom; y++) {
      for (let x = left; x < right; x++) sum += alpha[(y * size.width + x) * 4 + 3] ?? 0;
    }
    const pixels = (right - left) * (bottom - top);
    return pixels > 0 ? sum / (pixels * 255) : 0;
  });
}

export function aimDots(dots: Dot[], targets: number[], snap = false): void {
  dots.forEach((dot, i) => {
    dot.target = targets[i] ?? 0;
    if (snap) dot.mask = dot.target;
  });
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
    dot.mask += (dot.target - dot.mask) * p.ease;
    if (
      Math.abs(tx - dot.ox) > p.epsilon ||
      Math.abs(ty - dot.oy) > p.epsilon ||
      Math.abs(tg - dot.glow) > p.epsilon ||
      Math.abs(dot.target - dot.mask) > p.epsilon
    ) {
      settled = false;
    }
  }
  return settled;
}

export function dotRadius(dot: Dot, spacing: number, p: DotFieldParams = DOT_FIELD): number {
  const ink = Math.sqrt(Math.max(0, dot.mask));
  return spacing * (p.baseRadius + (p.maskRadius - p.baseRadius) * ink + p.glowRadius * dot.glow);
}
