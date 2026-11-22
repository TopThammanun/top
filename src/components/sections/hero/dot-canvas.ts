import { DOT_FIELD, dotRadius, type Dot, type Rect, type Size } from "@/lib/dot-field";
import type { MascotArt } from "./mascot";

const INK_THRESHOLD = 0.12;
const EYE_ERASE_SCALE = 1.2;
const LID_THICKNESS = 0.7;

export interface Palette {
  paper: string;
  ink: string;
  accent: string;
}

export interface MaskPixels {
  open: Uint8ClampedArray;
  closed: Uint8ClampedArray;
}

export function readPalette(el: Element): Palette {
  const style = getComputedStyle(el);
  return {
    paper: style.getPropertyValue("--fg-faint").trim(),
    ink: style.getPropertyValue("--fg").trim(),
    accent: style.getPropertyValue("--accent-fill").trim(),
  };
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export function renderMasks(
  image: HTMLImageElement,
  art: MascotArt,
  rect: Rect,
  size: Size,
): MaskPixels | null {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  const read = () => ctx.getImageData(0, 0, size.width, size.height).data;

  ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height);
  const open = read();

  const scale = rect.width / art.width;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#fff";
  for (const eye of art.eyes) {
    const x = rect.x + eye.x * scale;
    const y = rect.y + eye.y * scale;
    const radius = eye.radius * scale;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius * EYE_ERASE_SCALE, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = radius * LID_THICKNESS;
    ctx.beginPath();
    ctx.moveTo(x - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.stroke();
  }
  return { open, closed: read() };
}

export function drawDots(
  ctx: CanvasRenderingContext2D,
  dots: Dot[],
  spacing: number,
  palette: Palette,
  size: Size,
): void {
  ctx.clearRect(0, 0, size.width, size.height);
  for (const [color, alpha, inked] of [
    [palette.paper, 0.55, false],
    [palette.ink, 0.92, true],
  ] as const) {
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    for (const dot of dots) {
      if (dot.mask >= INK_THRESHOLD !== inked) continue;
      const radius = dotRadius(dot, spacing);
      ctx.moveTo(dot.x + dot.ox + radius, dot.y + dot.oy);
      ctx.arc(dot.x + dot.ox, dot.y + dot.oy, radius, 0, Math.PI * 2);
    }
    ctx.fill();
  }
  ctx.fillStyle = palette.accent;
  for (const dot of dots) {
    if (dot.glow < DOT_FIELD.epsilon) continue;
    ctx.globalAlpha = Math.min(1, dot.glow * 1.4);
    ctx.beginPath();
    ctx.arc(dot.x + dot.ox, dot.y + dot.oy, dotRadius(dot, spacing), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}
