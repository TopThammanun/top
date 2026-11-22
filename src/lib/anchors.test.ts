import { describe, expect, it } from "vitest";
import { projectAnchor, slugFromHash } from "./anchors";

describe("anchors", () => {
  it("builds a project anchor", () => {
    expect(projectAnchor("abc")).toBe("work-abc");
  });

  it("reads a slug from a hash", () => {
    expect(slugFromHash("#work-tcg-simulator")).toBe("tcg-simulator");
    expect(slugFromHash("#work-")).toBeNull();
    expect(slugFromHash("#log")).toBeNull();
    expect(slugFromHash("")).toBeNull();
  });
});
