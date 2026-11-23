"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "effects";
const OFF = "off";

function readEffects(): boolean {
  return document.documentElement.dataset.effects !== OFF;
}

export function setEffects(enabled: boolean): void {
  try {
    if (enabled) {
      delete document.documentElement.dataset.effects;
      localStorage.removeItem(STORAGE_KEY);
    } else {
      document.documentElement.dataset.effects = OFF;
      localStorage.setItem(STORAGE_KEY, OFF);
    }
  } catch {}
}

export function toggleEffects(): boolean {
  const next = !readEffects();
  setEffects(next);
  return next;
}

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-effects"] });
  return () => observer.disconnect();
}

export function useEffectsEnabled(): boolean {
  return useSyncExternalStore(subscribe, readEffects, () => true);
}
