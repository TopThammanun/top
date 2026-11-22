"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cx } from "@/lib/cx";
import {
  aimDots,
  containRect,
  createDots,
  gridSpacing,
  sampleMask,
  stepDots,
  type Dot,
  type Point,
  type Size,
} from "@/lib/dot-field";
import { drawDots, loadImage, readPalette, renderMasks } from "./dot-canvas";
import type { MascotArt } from "./mascot";

const MAX_PIXEL_RATIO = 2;
const ART_INSET = 0.09;
const ART_FIT = 1 - 2 * ART_INSET;
const BLINK_MIN_MS = 2600;
const BLINK_SPREAD_MS = 3400;
const BLINK_HOLD_MS = 160;

interface Masks {
  open: number[];
  closed: number[];
}

interface DotFieldProps {
  art: MascotArt;
  className?: string;
}

export function DotField({ art, className }: DotFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    let dots: Dot[] = [];
    let masks: Masks | null = null;
    let size: Size = { width: 0, height: 0 };
    let spacing = 0;
    let palette = readPalette(wrap);
    let pointer: Point | null = null;
    let frame = 0;
    let visible = false;
    let build = 0;
    let blinkTimer = 0;
    let lidTimer = 0;
    const image = loadImage(art.src).catch(() => null);

    const draw = () => drawDots(ctx, dots, spacing, palette, size);

    const loop = () => {
      frame = 0;
      const settled = stepDots(dots, pointer);
      draw();
      if (!settled && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!reduceMotion && !frame && visible) frame = requestAnimationFrame(loop);
    };

    const aim = (eyes: keyof Masks) => {
      if (masks) aimDots(dots, masks[eyes]);
      kick();
    };

    const rebuild = async () => {
      const current = ++build;
      const box = wrap.getBoundingClientRect();
      size = { width: Math.round(box.width), height: Math.round(box.height) };
      if (!size.width || !size.height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      canvas.width = size.width * ratio;
      canvas.height = size.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      spacing = gridSpacing(size.width);
      dots = createDots(size.width, size.height, spacing);
      masks = null;
      draw();

      const loaded = await image;
      if (current !== build || !loaded) return;
      const pixels = renderMasks(loaded, art, containRect(size, art.width / art.height, ART_FIT), size);
      if (!pixels) return;
      masks = {
        open: sampleMask(dots, pixels.open, size, spacing),
        closed: sampleMask(dots, pixels.closed, size, spacing),
      };
      aimDots(dots, masks.open, true);
      draw();
    };

    const blink = () => {
      blinkTimer = window.setTimeout(blink, BLINK_MIN_MS + Math.random() * BLINK_SPREAD_MS);
      if (!visible || document.hidden) return;
      aim("closed");
      lidTimer = window.setTimeout(() => aim("open"), BLINK_HOLD_MS);
    };

    const toLocal = (event: PointerEvent): Point => {
      const box = canvas.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
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
      blinkTimer = window.setTimeout(blink, BLINK_MIN_MS);
    }

    return () => {
      build++;
      cancelAnimationFrame(frame);
      clearTimeout(blinkTimer);
      clearTimeout(lidTimer);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [art, reduceMotion]);

  return (
    <div ref={wrapRef} aria-hidden className={cx("relative touch-pan-y", className)}>
      <span
        className="absolute bg-fg mask-contain mask-center mask-no-repeat js:hidden"
        style={{ inset: `${ART_INSET * 100}%`, maskImage: `url(${art.src})` }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}
