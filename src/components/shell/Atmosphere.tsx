"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { AtmosphereCanvas } from "./AtmosphereCanvas";
import { useEffectsEnabled } from "./effects";
import { useScene } from "./useScene";

export function Atmosphere() {
  const { scene } = useScene();
  const enabled = useEffectsEnabled();
  const reduceMotion = usePrefersReducedMotion();

  if (!scene || !enabled || reduceMotion) return null;
  return <AtmosphereCanvas key={scene} scene={scene} />;
}
