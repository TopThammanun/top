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
      "> Thammanun Aikhamdaeng, also known as Top Thammanun (topthammanun): Senior Full Stack Developer based in Thailand (UTC+7).",
    );
  });

  it("separates company projects from personal ones", () => {
    const company = text.indexOf("## Company projects");
    const personal = text.indexOf("## Personal projects");
    expect(company).toBeGreaterThan(0);
    expect(personal).toBeGreaterThan(company);
    expect(text.indexOf("Automated Border Control platform")).toBeLessThan(personal);
    expect(text.indexOf("TCG Simulator")).toBeGreaterThan(personal);
  });

  it("lists the career with the employer and what is known about each role", () => {
    expect(text).toContain(
      "- Senior Full Stack Developer, Chanwanich Company Limited (Mar 2026 – Present): Promoted in March 2026",
    );
    expect(text).toContain(
      "- Junior Full Stack Developer, Chanwanich Company Limited (Apr 2024 – Mar 2026): Worked on phase 1",
    );
    expect(text).toContain(
      "- Intern Full Stack Developer, Chanwanich Company Limited (Dec 2022 – Mar 2024): ",
    );
    expect(text).toContain("Technologies: React, .NET, Amazon Cognito, AWS services.");
  });

  it("lists education with the graduation month and coursework", () => {
    expect(text).toContain(
      "- Chiang Mai University: Bachelor's degree, Digital Industry Integration (DII) · First-Class Honors. Graduated Mar 2024. Coursework: Programming Logical Thinking,",
    );
  });

  it("puts the career before the projects", () => {
    expect(text.indexOf("## Career")).toBeGreaterThan(0);
    expect(text.indexOf("## Career")).toBeLessThan(text.indexOf("## Company projects"));
  });

  it("lists skills by category", () => {
    expect(text).toContain("## Skills");
    expect(text).toContain("- Languages: C#, TypeScript, JavaScript, SQL, Python, GDScript");
    expect(text).toContain("- Database performance: SQL optimization, Database indexing,");
  });

  it("writes project periods with month names", () => {
    expect(text).toContain("Senior Full Stack Developer, Jul 2026 – Present. Online permit applications");
  });

  it("links the machine-readable routes", () => {
    expect(text).toContain("https://www.topthammanun.dev/resume.json");
    expect(text).toContain("https://www.topthammanun.dev/resume.txt");
  });
});
