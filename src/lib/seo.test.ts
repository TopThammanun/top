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

const SITE = "https://www.topthammanun.com/";

function hasEmptyValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.some(hasEmptyValue);
  if (typeof value === "object") return Object.values(value).some(hasEmptyValue);
  return false;
}

describe("seo text", () => {
  it("leads the title with the full name and the handle", () => {
    expect(seoTitle(resume)).toBe("Thammanun Aikhamdaeng (topthammanun) — Full-Stack Developer");
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
      jobTitle: "Full-Stack Developer",
      url: SITE,
    });
  });

  it("links other profiles but not the site itself", () => {
    expect(node("Person").sameAs).toEqual(["https://github.com/TopThammanun"]);
  });

  it("only claims technology used in more than one project", () => {
    expect(node("Person").knowsAbout).toContain("TypeScript");
    expect(node("Person").knowsAbout).not.toContain("GDScript");
  });

  it("names the site after the person and points the profile page at them", () => {
    expect(node("WebSite")).toMatchObject({ name: "Thammanun Aikhamdaeng", url: SITE });
    expect(node("ProfilePage")).toMatchObject({
      mainEntity: { "@id": `${SITE}#person` },
      isPartOf: { "@id": `${SITE}#website` },
      dateModified: resume.meta.updated,
    });
  });

  it("has no empty values and no email while it is pending", () => {
    expect(hasEmptyValue(data)).toBe(false);
    expect(node("Person")).not.toHaveProperty("email");
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
