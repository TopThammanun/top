import { describe, expect, it } from "vitest";
import { reduceShortcut, shortcutHelp, type ShortcutState } from "./shortcuts";

const idle: ShortcutState = { pendingG: null };

describe("reduceShortcut", () => {
  it("jumps to a section with g then a key within 1000ms", () => {
    const first = reduceShortcut(idle, "g", 0);
    expect(first).toEqual({ state: { pendingG: 0 }, intent: null });
    expect(reduceShortcut(first.state, "w", 1000)).toEqual({
      state: idle,
      intent: { type: "section", id: "work" },
    });
  });

  it("forgets g after 1000ms", () => {
    const { state } = reduceShortcut(idle, "g", 0);
    expect(reduceShortcut(state, "w", 1001)).toEqual({ state: idle, intent: null });
  });

  it.each([
    ["t", { type: "theme" }],
    ["?", { type: "help" }],
    ["j", { type: "next" }],
    ["k", { type: "prev" }],
  ])("maps %s", (key, intent) => {
    expect(reduceShortcut(idle, key, 0)).toEqual({ state: idle, intent });
  });

  it("ignores other keys", () => {
    expect(reduceShortcut(idle, "x", 0)).toEqual({ state: idle, intent: null });
  });
});

describe("shortcutHelp", () => {
  it("lists the palette key and a g-jump per section", () => {
    const help = shortcutHelp("⌘");
    expect(help[0]).toEqual({ keys: ["⌘", "K"], label: "Command palette" });
    expect(help.filter((h) => h.keys[0] === "g")).toHaveLength(6);
    expect(help.at(-1)).toEqual({ keys: ["g", "c"], label: "Go to Contact" });
  });
});
