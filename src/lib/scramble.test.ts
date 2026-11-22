import { describe, expect, it } from "vitest";
import { DEFAULT_CHARSET, scrambleFrame } from "./scramble";

const target = "Full-Stack Developer";

describe("scrambleFrame", () => {
  it("returns the target when done", () => {
    expect(scrambleFrame(target, 1, Math.random)).toBe(target);
  });

  it("keeps length and spaces and draws from the charset", () => {
    const frame = scrambleFrame(target, 0, () => 0);
    expect(frame).toHaveLength(target.length);
    [...frame].forEach((ch, i) => {
      expect(ch).toBe(target[i] === " " ? " " : DEFAULT_CHARSET[0]);
    });
  });

  it("reveals the target from the left", () => {
    const frame = scrambleFrame("abcdefghij", 0.5, () => 0);
    expect(frame.slice(0, 5)).toBe("abcde");
    expect(frame.slice(5)).toBe(DEFAULT_CHARSET[0].repeat(5));
  });

  it("uses a custom charset", () => {
    expect(scrambleFrame("ab", 0, () => 0, "x")).toBe("xx");
  });
});
