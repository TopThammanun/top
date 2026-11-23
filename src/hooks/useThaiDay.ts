"use client";

import { useSyncExternalStore } from "react";
import { bangkokDay } from "@/lib/thai-calendar";

const CHECK_MS = 60_000;

function subscribe(onCheck: () => void): () => void {
  const timer = window.setInterval(onCheck, CHECK_MS);
  return () => window.clearInterval(timer);
}

const currentDay = () => bangkokDay(Date.now());
const serverDay = () => null;

export function useThaiDay(): string | null {
  return useSyncExternalStore(subscribe, currentDay, serverDay);
}
