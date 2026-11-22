import { resume } from "@/content/resume";
import { buildInfo } from "@/lib/build-info";

export function Footer() {
  const parts = [
    `build ${buildInfo.sha}`,
    buildInfo.date,
    buildInfo.nextVersion && `next ${buildInfo.nextVersion}`,
    "0 trackers",
  ].filter(Boolean);

  return (
    <footer className="@container overflow-hidden border-t border-line">
      <p className="px-5 py-6 font-mono text-xs text-fg-muted sm:px-8 lg:px-12">{parts.join(" · ")}</p>
      <p
        aria-hidden
        className="h-[9.5cqw] text-center font-mono text-[13.4cqw] leading-none font-semibold tracking-tight text-transparent select-none [-webkit-text-stroke:1px_var(--line-strong)]"
      >
        {resume.profile.handle}
      </p>
    </footer>
  );
}
