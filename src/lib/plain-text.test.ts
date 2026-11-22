import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import { toPlainText, wrap } from "./plain-text";

describe("wrap", () => {
  it("breaks on spaces within the width", () => {
    expect(wrap("aaa bbb ccc", 7)).toEqual(["aaa bbb", "ccc"]);
  });

  it("splits a word longer than the width", () => {
    expect(wrap("abcdefghij", 4)).toEqual(["abcd", "efgh", "ij"]);
  });
});

describe("toPlainText", () => {
  const text = toPlainText(resume, "2026-11");
  const lines = text.split("\n");

  it("keeps every line within 80 columns", () => {
    const long = lines.filter((line) => line.length > 80);
    expect(long).toEqual([]);
  });

  it("contains every project", () => {
    resume.projects.forEach((p) => expect(text).toContain(p.name));
  });

  it("lists the roles with their employer", () => {
    resume.career.forEach((role) => expect(text).toContain(role.title));
    expect(lines).toContain("  Chanwanich Company Limited");
    expect(lines).toContain("  Stack: React, .NET, Amazon Cognito, AWS services");
  });

  it("puts experience first and education after skills", () => {
    const order = ["EXPERIENCE", "COMPANY PROJECTS", "PERSONAL PROJECTS", "SKILLS", "EDUCATION"];
    const positions = order.map((title) => lines.indexOf(title));
    expect(positions.every((position) => position > 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it("writes education with the graduation month", () => {
    expect(text).toMatch(/Chiang Mai University +Graduated Mar 2024/);
    expect(lines).toContain("  Digital Industry Integration (DII) · First-Class Honors");
  });

  it("starts with the name", () => {
    expect(lines[0]).toBe("THAMMANUN AIKHAMDAENG");
  });
});
