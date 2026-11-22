import { describe, expect, it } from "vitest";
import { resume } from "@/content/resume";
import {
  alternateTypes,
  seoDescription,
  seoKeywords,
  seoTitle,
  serializeJsonLd,
  structuredData,
  type JsonLdNode,
} from "./seo";

const SITE = "https://www.topthammanun.dev/";

function hasEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.some(hasEmptyValue);
  if (typeof value === "object") return Object.values(value).some(hasEmptyValue);
  return false;
}

describe("seo text", () => {
  it("leads the title with the full name and the handle", () => {
    expect(seoTitle(resume)).toBe("Thammanun Aikhamdaeng (topthammanun) — Senior Full Stack Developer");
  });

  it("leads the description with every name people search for", () => {
    expect(seoDescription(resume)).toMatch(/^Thammanun Aikhamdaeng \(Top Thammanun, topthammanun\)\. \S/);
  });

  it("lists name keywords without duplicates", () => {
    const keywords = seoKeywords(resume);
    expect(keywords).toEqual(
      expect.arrayContaining(["Thammanun Aikhamdaeng", "topthammanun", "Thammanun", "Aikhamdaeng"]),
    );
    expect(new Set(keywords).size).toBe(keywords.length);
  });
});

describe("alternateTypes", () => {
  it("groups the machine-readable routes by media type", () => {
    expect(alternateTypes()).toEqual({
      "application/pdf": [{ url: "/resume.pdf", title: "Resume (PDF)" }],
      "application/json": [{ url: "/resume.json", title: "Resume (JSON Resume)" }],
      "text/plain": [
        { url: "/resume.txt", title: "Resume (plain text)" },
        { url: "/llms.txt", title: "Summary for LLMs" },
      ],
    });
  });
});

describe("structuredData", () => {
  const data = structuredData(resume);
  const node = (type: string) => data["@graph"].find((n) => n["@type"] === type) as JsonLdNode;

  it("describes the person by real name with the handle as an alternate name", () => {
    expect(node("Person")).toMatchObject({
      "@id": `${SITE}#person`,
      name: "Thammanun Aikhamdaeng",
      givenName: "Thammanun",
      familyName: "Aikhamdaeng",
      alternateName: ["topthammanun", "Top Thammanun", "Top"],
      jobTitle: "Senior Full Stack Developer",
      url: SITE,
    });
  });

  it("links other profiles but not the site itself", () => {
    expect(node("Person").sameAs).toEqual(["https://github.com/TopThammanun", resume.profile.linkedin]);
  });

  it("only claims technology used in more than one project", () => {
    expect(node("Person").knowsAbout).toContain("TypeScript");
    expect(node("Person").knowsAbout).not.toContain("GDScript");
  });

  it("claims the practice skills", () => {
    expect(node("Person").knowsAbout).toEqual(
      expect.arrayContaining(["Git workflow", "Database performance"]),
    );
  });

  it("names the employer and the university", () => {
    expect(node("Person")).toMatchObject({
      worksFor: { "@type": "Organization", name: "Chanwanich Company Limited" },
      alumniOf: [{ "@type": "CollegeOrUniversity", name: "Chiang Mai University" }],
    });
  });

  it("leaves the employer and university out when they are unknown", () => {
    const person = structuredData({ ...resume, career: [], education: [] })["@graph"].find(
      (n) => n["@type"] === "Person",
    );
    expect(person).not.toHaveProperty("worksFor");
    expect(person).not.toHaveProperty("alumniOf");
  });

  it("names the site after the person and points the profile page at them", () => {
    expect(node("WebSite")).toMatchObject({ name: "Thammanun Aikhamdaeng", url: SITE });
    expect(node("ProfilePage")).toMatchObject({
      mainEntity: { "@id": `${SITE}#person` },
      isPartOf: { "@id": `${SITE}#website` },
      dateModified: resume.meta.updated,
    });
  });

  it("gives the email as a mailto link", () => {
    expect(node("Person").email).toBe(`mailto:${resume.profile.email}`);
  });

  it("has no empty values, and no email when it is not set", () => {
    const anonymous = structuredData({ ...resume, profile: { ...resume.profile, email: null } });
    expect(hasEmptyValue(data)).toBe(false);
    expect(hasEmptyValue(anonymous)).toBe(false);
    expect(anonymous["@graph"].find((n) => n["@type"] === "Person")).not.toHaveProperty("email");
  });
});

describe("serializeJsonLd", () => {
  it("escapes angle brackets so the payload cannot close its script tag", () => {
    const data = structuredData(resume);
    data["@graph"][0].name = "</script>";
    expect(serializeJsonLd(data)).not.toContain("<");
    expect(JSON.parse(serializeJsonLd(data))["@graph"][0].name).toBe("</script>");
  });
});
