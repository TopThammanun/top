import { resume } from "@/content/resume";
import type { YearMonth } from "@/content/types";

export const buildInfo = {
  sha: process.env.NEXT_PUBLIC_BUILD_SHA ?? "dev",
  date: process.env.NEXT_PUBLIC_BUILD_DATE ?? resume.meta.updated,
  nextVersion: process.env.NEXT_PUBLIC_NEXT_VERSION ?? "",
};

export const buildMonth = buildInfo.date.slice(0, 7) as YearMonth;
