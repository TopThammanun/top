"use client";

import { useMemo } from "react";
import { useThaiDay } from "@/hooks/useThaiDay";
import { readThaiDay, type SceneId, type ThaiDay } from "@/lib/thai-calendar";
import { useUi } from "./ui-store";

export interface SceneState {
  today: ThaiDay | null;
  scene: SceneId | null;
  preview: boolean;
}

export function useScene(): SceneState {
  const day = useThaiDay();
  const { scenePreview } = useUi();
  const today = useMemo(() => (day ? readThaiDay(day) : null), [day]);

  return { today, scene: scenePreview ?? today?.scene ?? null, preview: scenePreview !== null };
}
