import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import { alternateNames, fullName, resumeFileName } from "./identity";

describe("identity", () => {
  const { profile } = resume;

  it("joins the given and family name", () => {
    expect(fullName(profile)).toBe("Thammanun Aikhamdaeng");
  });

  it("lists the handle, display name and nickname as alternate names", () => {
    expect(alternateNames(profile)).toEqual(["topthammanun", "Top Thammanun", "Top"]);
  });

  it("names the downloaded resume after the person", () => {
    expect(resumeFileName(profile)).toBe("Thammanun-Aikhamdaeng-Resume.pdf");
  });
});
