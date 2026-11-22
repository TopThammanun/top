import type { MetadataRoute } from "next";
import { resume } from "@/content/resume";
import { absoluteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl(resume, "/"),
      lastModified: resume.meta.updated,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
