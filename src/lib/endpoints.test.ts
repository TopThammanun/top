import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import { machineEndpoints, profileEndpoints } from "./endpoints";

describe("profileEndpoints", () => {
  it("lists the set links and skips missing email and linkedin", () => {
    expect(profileEndpoints(resume).map((e) => e.path)).toEqual(["/github", "/website"]);
  });

  it("adds email and linkedin once they are set", () => {
    const withContacts = {
      ...resume,
      profile: { ...resume.profile, email: "me@example.com", linkedin: "https://www.linkedin.com/in/me" },
    };
    const endpoints = profileEndpoints(withContacts);
    expect(endpoints.find((e) => e.path === "/email")).toMatchObject({ href: "mailto:me@example.com" });
    expect(endpoints.find((e) => e.path === "/linkedin")).toMatchObject({ value: "linkedin.com/in/me" });
  });
});

describe("machineEndpoints", () => {
  it("copies absolute urls and opens relative paths", () => {
    const [pdf] = machineEndpoints(resume);
    expect(pdf).toMatchObject({
      path: "/resume.pdf",
      href: "/resume.pdf",
      copy: "https://www.topthammanun.dev/resume.pdf",
    });
  });
});
