import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import { buildCommands } from "./commands";
import { SECTIONS } from "./sections";

describe("buildCommands", () => {
  const commands = buildCommands(resume);

  it("has unique ids", () => {
    const ids = commands.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("navigates to every section", () => {
    expect(commands.filter((c) => c.group === "Navigate")).toHaveLength(SECTIONS.length);
  });

  it("opens each project", () => {
    const projects = commands.filter((c) => c.group === "Projects");
    expect(projects.map((c) => c.action)).toEqual(
      resume.projects.map((p) => ({ type: "project", slug: p.slug })),
    );
  });

  it("labels each project as company or personal work", () => {
    const hints = commands.filter((c) => c.group === "Projects").map((c) => c.hint);
    expect(hints).toEqual(resume.projects.map((p) => (p.kind === "client" ? "company" : "personal")));
  });

  it("has no command for missing contact fields", () => {
    const serialized = JSON.stringify(commands);
    expect(serialized).not.toContain("mailto:");
    expect(serialized).not.toMatch(/linkedin/i);
    expect(serialized).not.toContain("null");
  });

  it("offers the help view", () => {
    expect(commands.find((c) => c.group === "Help")?.action).toEqual({ type: "help" });
  });
});
