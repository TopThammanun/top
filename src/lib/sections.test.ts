import { describe, expect, it } from "vitest";
import { SECTIONS } from "./sections";

describe("SECTIONS", () => {
  it("lists the six sections in page order with unique keys", () => {
    expect(SECTIONS.map((s) => `${s.index}:${s.id}:${s.key}`)).toEqual([
      "00:home:h",
      "01:work:w",
      "02:log:l",
      "03:stack:s",
      "04:agents:a",
      "05:contact:c",
    ]);
  });
});
