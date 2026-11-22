"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cx } from "@/lib/cx";
import {
  applyMask,
  createDots,
  DOT_FIELD,
  dotRadius,
  stepDots,
  type Dot,
  type MaskMode,
  type Point,
} from "@/lib/dot-field";

const MAX_PIXEL_RATIO = 2;
const WORD_WIDTH_RATIO = 0.84;
const WORD_HEIGHT_RATIO = 0.62;
const MASK_THRESHOLD = 0.5;
const WORD_WEIGHT = 800;

interface Palette {
  faint: string;
  fg: string;
  accent: string;
}

function readPalette(el: Element): Palette {
  const style = getComputedStyle(el);
  return {
    faint: style.getPropertyValue("--fg-faint").trim(),
    fg: style.getPropertyValue("--fg").trim(),
    accent: style.getPropertyValue("--accent-fill").trim(),
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function renderMask(
  width: number,
  height: number,
  source: { word: string; font: string } | { portrait: string },
): Promise<Uint8ClampedArray> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return new Uint8ClampedArray(width * height * 4);

  if ("portrait" in source) {
    const image = await loadImage(source.portrait);
    const scale = Math.max(width / image.width, height / image.height);
    const w = image.width * scale;
    const h = image.height * scale;
    ctx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
  } else {
    await document.fonts.ready;
    ctx.font = `${WORD_WEIGHT} 100px ${source.font}`;
    const measured = ctx.measureText(source.word).width || 1;
    const size = Math.min((width * WORD_WIDTH_RATIO * 100) / measured, height * WORD_HEIGHT_RATIO);
    ctx.font = `${WORD_WEIGHT} ${size}px ${source.font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(source.word, width / 2, height / 2);
  }
  return ctx.getImageData(0, 0, width, height).data;
}

function drawDots(
  ctx: CanvasRenderingContext2D,
  dots: Dot[],
  palette: Palette,
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height);
  for (const [color, alpha, inMask] of [
    [palette.faint, 0.55, false],
    [palette.fg, 0.9, true],
  ] as const) {
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    for (const dot of dots) {
      if (dot.mask >= MASK_THRESHOLD !== inMask) continue;
      const r = dotRadius(dot);
      ctx.moveTo(dot.x + dot.ox + r, dot.y + dot.oy);
      ctx.arc(dot.x + dot.ox, dot.y + dot.oy, r, 0, Math.PI * 2);
    }
    ctx.fill();
  }
  ctx.fillStyle = palette.accent;
  for (const dot of dots) {
    if (dot.glow < DOT_FIELD.epsilon) continue;
    ctx.globalAlpha = Math.min(1, dot.glow * 1.4);
    ctx.beginPath();
    ctx.arc(dot.x + dot.ox, dot.y + dot.oy, dotRadius(dot), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

interface DotFieldProps {
  word: string;
  portrait: string | null;
  className?: string;
}

export function DotField({ word, portrait, className }: DotFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let palette = readPalette(wrap);
    let pointer: Point | null = null;
    let frame = 0;
    let visible = false;
    let build = 0;

    const draw = () => drawDots(ctx, dots, palette, width, height);

    const loop = () => {
      frame = 0;
      const settled = stepDots(dots, pointer);
      draw();
      if (!settled && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!reduceMotion && !frame && visible) frame = requestAnimationFrame(loop);
    };

    const rebuild = async () => {
      const current = ++build;
      const rect = wrap.getBoundingClientRect();
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const next = createDots(width, height, DOT_FIELD.spacing);
      const mode: MaskMode = portrait ? "luma" : "alpha";
      const source = portrait ? { portrait } : { word, font: getComputedStyle(wrap).fontFamily };
      const pixels = await renderMask(width, height, source).catch(() => null);
      if (current !== build) return;
      if (pixels) applyMask(next, pixels, width, height, mode);
      dots = next;
      draw();
    };

    const toLocal = (event: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onPointerMove = (event: PointerEvent) => {
      pointer = toLocal(event);
      kick();
    };
    const onPointerLeave = () => {
      pointer = null;
      kick();
    };

    const resizeObserver = new ResizeObserver(() => void rebuild());
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      kick();
    });
    const themeObserver = new MutationObserver(() => {
      palette = readPalette(wrap);
      draw();
    });

    resizeObserver.observe(wrap);
    visibilityObserver.observe(wrap);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (!reduceMotion) {
      wrap.addEventListener("pointermove", onPointerMove);
      wrap.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      build++;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [word, portrait, reduceMotion]);

  return (
    <div ref={wrapRef} aria-hidden className={cx("relative touch-pan-y", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
