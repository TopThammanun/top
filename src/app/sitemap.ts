import type { MetadataRoute } from "next";
import { resume } from "@/content/resume";
import { absoluteUrl, MACHINE_ROUTES, projectPath } from "@/lib/routes";
import { personalProjects } from "@/lib/selectors";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = resume.meta.updated;
  const entry = (path: string, priority: number) => ({
    url: absoluteUrl(resume, path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  });

  return [
    entry("/", 1),
    ...personalProjects(resume).map((project) => entry(projectPath(project.slug), 0.7)),
    ...MACHINE_ROUTES.map((route) => entry(route.path, 0.5)),
  ];
}
