import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import { toLlmsTxt } from "./llms";

describe("toLlmsTxt", () => {
  const text = toLlmsTxt(resume);

  it("starts with the name as h1", () => {
    expect(text.split("\n")[0]).toBe("# Thammanun Aikhamdaeng");
  });

  it("answers who this is in one quotable sentence", () => {
    expect(text).toContain(
      "> Thammanun Aikhamdaeng, also known as Top Thammanun (topthammanun): Full-Stack Developer based in Thailand (UTC+7).",
    );
  });

  it("lists skills by category", () => {
    expect(text).toContain("## Skills");
    expect(text).toContain("- Languages: C#, TypeScript, JavaScript, SQL, Python, GDScript");
  });

  it("links the machine-readable routes", () => {
    expect(text).toContain("https://www.topthammanun.dev/resume.json");
    expect(text).toContain("https://www.topthammanun.dev/resume.txt");
  });
});
