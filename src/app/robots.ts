import type { MetadataRoute } from "next";
import { resume } from "@/content/resume";
import { AI_CRAWLERS } from "@/lib/crawlers";
import { absoluteUrl } from "@/lib/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: [...AI_CRAWLERS], allow: "/" },
    ],
    sitemap: absoluteUrl(resume, "/sitemap.xml"),
  };
}
