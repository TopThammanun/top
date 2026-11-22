import type { ReactNode } from "react";
import { resume } from "@/content/resume";
import { buildCommands } from "@/lib/commands";
import { absoluteUrl, linkHref } from "@/lib/routes";
import { ShellControls } from "./ShellControls";
import { UiProvider } from "./ui-store";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <UiProvider initialProject={resume.projects[0]?.slug ?? null}>
      {children}
      <ShellControls
        commands={buildCommands(resume)}
        greeting={{
          name: resume.profile.displayName,
          github: linkHref(resume, "github"),
          json: absoluteUrl(resume, "/resume.json"),
        }}
      />
    </UiProvider>
  );
}
