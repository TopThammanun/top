import { describe, expect, it } from "vitest";
import { splitCode } from "./rich-text";

describe("splitCode", () => {
  it("separates backtick code spans", () => {
    expect(splitCode("typed with no `any`.")).toEqual([
      { text: "typed with no ", code: false },
      { text: "any", code: true },
      { text: ".", code: false },
    ]);
  });

  it("returns plain text as one run", () => {
    expect(splitCode("plain")).toEqual([{ text: "plain", code: false }]);
  });
});
