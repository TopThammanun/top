"use client";

import { Pause, Play } from "lucide-react";
import { toggleEffects, useEffectsEnabled } from "@/components/shell/effects";
import { useScene } from "@/components/shell/useScene";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { describeThaiDay, sceneLabel } from "@/lib/thai-calendar";

const PLACEHOLDER = "—";

export function SeasonStatus() {
  const { today, scene, preview } = useScene();
  const enabled = useEffectsEnabled();
  const reduceMotion = usePrefersReducedMotion();

  if (!today || !scene) return <span>{PLACEHOLDER}</span>;

  const Icon = enabled ? Pause : Play;
  const verb = enabled ? "Pause" : "Play";

  return (
    <span className="flex flex-wrap items-center gap-x-3">
      <span>{preview ? `${sceneLabel(scene)} · preview` : describeThaiDay(today)}</span>
      {reduceMotion ? null : (
        <button
          type="button"
          aria-label={`${verb} seasonal effects`}
          onClick={toggleEffects}
          className="inline-flex h-6 cursor-pointer items-center gap-1 text-fg-muted underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline"
        >
          <Icon aria-hidden className="size-3" />
          {verb.toLowerCase()}
        </button>
      )}
    </span>
  );
}
