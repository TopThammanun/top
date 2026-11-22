import type { ReactNode } from "react";
import { resume } from "@/content/resume";
import { UiProvider } from "./ui-store";

export function Shell({ children }: { children: ReactNode }) {
  return <UiProvider initialProject={resume.projects[0]?.slug ?? null}>{children}</UiProvider>;
}
