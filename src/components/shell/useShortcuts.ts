"use client";

import { useEffect, useRef } from "react";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { reduceShortcut, type Intent, type ShortcutState } from "@/lib/shortcuts";
import { toggleEffects } from "./effects";
import { scrollToId } from "./navigation";
import { toggleTheme } from "./theme";
import { useUi } from "./ui-store";

function ignoresShortcuts(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
    target.closest("dialog") !== null
  );
}

function neighbour(active: SectionId, step: 1 | -1): SectionId {
  const index = SECTIONS.findIndex((s) => s.id === active);
  const next = Math.min(SECTIONS.length - 1, Math.max(0, index + step));
  return SECTIONS[next].id;
}

export function useShortcuts(active: SectionId): void {
  const { paletteOpen, setPaletteOpen, setPaletteView } = useUi();
  const state = useRef<ShortcutState>({ pendingG: null });

  useEffect(() => {
    const perform = (intent: Intent) => {
      switch (intent.type) {
        case "section":
          return scrollToId(intent.id);
        case "next":
          return scrollToId(neighbour(active, 1));
        case "prev":
          return scrollToId(neighbour(active, -1));
        case "theme":
          return toggleTheme();
        case "effects":
          return void toggleEffects();
        case "help":
          setPaletteView("help");
          return setPaletteOpen(true);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setPaletteView("root");
        setPaletteOpen(!paletteOpen);
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey || ignoresShortcuts(event.target)) return;
      const result = reduceShortcut(state.current, event.key, event.timeStamp);
      state.current = result.state;
      if (!result.intent) return;
      event.preventDefault();
      perform(result.intent);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, paletteOpen, setPaletteOpen, setPaletteView]);
}
