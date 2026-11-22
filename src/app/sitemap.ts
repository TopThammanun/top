import type { MetadataRoute } from "next";
import { resume } from "@/content/resume";
import { absoluteUrl, MACHINE_ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = resume.meta.updated;

  return [
    { url: absoluteUrl(resume, "/"), lastModified, changeFrequency: "monthly", priority: 1 },
    ...MACHINE_ROUTES.map((route) => ({
      url: absoluteUrl(resume, route.path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
