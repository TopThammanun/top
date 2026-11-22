import { ArrowUpRight } from "lucide-react";
import { resume } from "@/content/resume";
import { buildInfo } from "@/lib/build-info";

export function Footer() {
  const { sourceUrl } = resume.meta;
  const parts = [
    `build ${buildInfo.sha}`,
    buildInfo.date,
    buildInfo.nextVersion && `next ${buildInfo.nextVersion}`,
    "0 cookies",
  ].filter(Boolean);

  return (
    <footer className="@container overflow-hidden border-t border-line">
      <p className="px-5 py-6 font-mono text-xs text-fg-muted sm:px-8 lg:px-12">
        {parts.join(" · ")}
        {sourceUrl ? (
          <>
            {" · "}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline"
            >
              source
              <ArrowUpRight aria-hidden className="size-3" />
            </a>
          </>
        ) : null}
      </p>
      <p
        aria-hidden
        className="h-[9.5cqw] text-center font-mono text-[13.4cqw] leading-none font-semibold tracking-tight text-transparent select-none [-webkit-text-stroke:1px_var(--line-strong)]"
      >
        {resume.profile.handle}
      </p>
    </footer>
  );
}
