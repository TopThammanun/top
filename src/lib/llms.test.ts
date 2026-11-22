import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import { toLlmsTxt } from "./llms";

describe("toLlmsTxt", () => {
  const text = toLlmsTxt(resume);

  it("starts with the name as h1", () => {
    expect(text.split("\n")[0]).toBe("# Top Thammanun");
  });

  it("links the machine-readable routes", () => {
    expect(text).toContain("https://www.topthammanun.com/resume.json");
    expect(text).toContain("https://www.topthammanun.com/resume.txt");
  });
});
