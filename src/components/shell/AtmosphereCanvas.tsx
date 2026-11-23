"use client";

import { useEffect, useRef } from "react";
import { ATMOSPHERES, burstAt, createField, fitField, stepField, type Field } from "@/lib/atmosphere";
import type { Size } from "@/lib/dot-field";
import type { SceneId } from "@/lib/thai-calendar";
import { drawField, readTones } from "./atmosphere-canvas";

const MAX_PIXEL_RATIO = 2;
const MAX_STEP_S = 0.05;

export function AtmosphereCanvas({ scene }: { scene: SceneId }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const spec = ATMOSPHERES[scene];
    let size: Size = { width: 0, height: 0 };
    let field: Field | null = null;
    let tones = readTones(canvas);
    let frame = 0;
    let last = 0;

    const loop = (now: number) => {
      frame = 0;
      if (!field) return;
      stepField(field, spec, size, Math.min((now - last) / 1000, MAX_STEP_S), Math.random);
      last = now;
      drawField(ctx, field, tones, size);
      play();
    };

    const play = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      size = { width: Math.round(box.width), height: Math.round(box.height) };
      if (!size.width || !size.height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      canvas.width = size.width * ratio;
      canvas.height = size.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (field) fitField(field, spec, size, Math.random);
      else field = createField(spec, size, Math.random);
      drawField(ctx, field, tones, size);
      play();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (field && spec.burst)
        burstAt(field, spec.burst, { x: event.clientX, y: event.clientY }, Math.random);
    };

    const resizeObserver = new ResizeObserver(resize);
    const themeObserver = new MutationObserver(() => {
      tones = readTones(canvas);
    });

    resizeObserver.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    document.addEventListener("visibilitychange", play);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", play);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [scene]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-print="hide"
      data-scene={scene}
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh w-full"
    />
  );
}
