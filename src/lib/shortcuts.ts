import { SECTIONS, type SectionId } from "./sections";

export type Intent =
  | { type: "section"; id: SectionId }
  | { type: "theme" }
  | { type: "effects" }
  | { type: "help" }
  | { type: "next" }
  | { type: "prev" };

export interface ShortcutState {
  pendingG: number | null;
}

const G_WINDOW_MS = 1000;

const SINGLE_KEYS: Readonly<Record<string, Intent>> = {
  t: { type: "theme" },
  e: { type: "effects" },
  "?": { type: "help" },
  j: { type: "next" },
  k: { type: "prev" },
};

const IDLE: ShortcutState = { pendingG: null };

export interface ShortcutHelp {
  keys: string[];
  label: string;
}

export function shortcutHelp(modKey: string): ShortcutHelp[] {
  return [
    { keys: [modKey, "K"], label: "Command palette" },
    { keys: ["?"], label: "Keyboard shortcuts" },
    { keys: ["t"], label: "Toggle theme" },
    { keys: ["e"], label: "Toggle seasonal effects" },
    { keys: ["j"], label: "Next section" },
    { keys: ["k"], label: "Previous section" },
    ...SECTIONS.map((s) => ({ keys: ["g", s.key], label: `Go to ${s.label}` })),
  ];
}

export function reduceShortcut(
  state: ShortcutState,
  key: string,
  now: number,
): { state: ShortcutState; intent: Intent | null } {
  const gActive = state.pendingG !== null && now - state.pendingG <= G_WINDOW_MS;

  if (gActive) {
    const section = SECTIONS.find((s) => s.key === key);
    if (section) return { state: IDLE, intent: { type: "section", id: section.id } };
  }
  if (key === "g") return { state: { pendingG: now }, intent: null };
  return { state: IDLE, intent: gActive ? null : (SINGLE_KEYS[key] ?? null) };
}
