import type { ReactNode } from "react";
import { resume } from "@/content/resume";
import { buildCommands } from "@/lib/commands";
import { absoluteUrl, linkHref } from "@/lib/routes";
import { companyProjects } from "@/lib/selectors";
import { ShellControls } from "./ShellControls";
import { UiProvider } from "./ui-store";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <UiProvider initialProject={companyProjects(resume)[0]?.slug ?? null}>
      {children}
      <ShellControls
        commands={buildCommands(resume)}
        projectSlugs={resume.projects.map((project) => project.slug)}
        greeting={{
          name: resume.profile.displayName,
          github: linkHref(resume, "github"),
          json: absoluteUrl(resume, "/resume.json"),
        }}
      />
    </UiProvider>
  );
}
