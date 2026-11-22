import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import { absoluteUrl, linkHref, MACHINE_ROUTES } from "./routes";

describe("routes", () => {
  it("builds absolute urls from the site url", () => {
    expect(absoluteUrl(resume, "/resume.json")).toBe("https://www.topthammanun.dev/resume.json");
  });

  it("lists the four machine-readable routes", () => {
    expect(MACHINE_ROUTES.map((r) => r.path)).toEqual([
      "/resume.pdf",
      "/resume.json",
      "/resume.txt",
      "/llms.txt",
    ]);
  });

  it("finds a profile link by id", () => {
    expect(linkHref(resume, "github")).toBe("https://github.com/TopThammanun");
    expect(linkHref(resume, "email")).toBeNull();
  });
});
