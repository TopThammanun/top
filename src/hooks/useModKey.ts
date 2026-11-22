"use client";

import { useSyncExternalStore } from "react";

export type ModKey = "⌘" | "Ctrl";

const subscribe = () => () => {};
const clientModKey = (): ModKey => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl");
const serverModKey = (): ModKey => "Ctrl";

export function useModKey(): ModKey {
  return useSyncExternalStore(subscribe, clientModKey, serverModKey);
}
