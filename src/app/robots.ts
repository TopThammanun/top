import type { MetadataRoute } from "next";
import { resume } from "@/content/resume";
import { absoluteUrl } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl(resume, "/sitemap.xml"),
  };
}
