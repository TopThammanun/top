import { describe, expect, it } from "vitest";
import { sectionInfo, SECTIONS } from "./sections";

describe("SECTIONS", () => {
  it("lists the sections in page order with unique keys", () => {
    expect(SECTIONS.map((s) => `${s.index}:${s.id}:${s.key}`)).toEqual([
      "00:home:h",
      "01:work:w",
      "02:personal:p",
      "03:log:t",
      "04:stack:s",
      "05:agents:a",
      "06:contact:c",
    ]);
  });

  it("looks a section up by id", () => {
    expect(sectionInfo("stack")).toMatchObject({ index: "04", label: "Skills" });
  });
});
