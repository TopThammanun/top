import { ArrowDown, Download } from "lucide-react";
import type { ReactNode } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { resume } from "@/content/resume";
import { fullName, resumeFileName } from "@/lib/identity";
import { DotField } from "./DotField";
import { LiveClock } from "./LiveClock";
import { MASCOT } from "./mascot";
import { PaletteHint } from "./PaletteHint";
import { ScrambleText } from "./ScrambleText";

const FOCUS = ".NET · TypeScript · Next.js";

export function Hero() {
  const { profile, meta } = resume;
  const facts: [string, ReactNode][] = [
    ["aka", profile.displayName],
    ["now", profile.now],
    ["loc", `${profile.location.label} · ${profile.location.utcOffset}`],
    ["time", <LiveClock key="time" timeZone={profile.location.timeZone} />],
    ["focus", FOCUS],
  ];

  return (
    <Section id="home" index="00" label="Home" heading="p" meta={`v${meta.version} · ${meta.updated}`}>
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <p className="font-mono text-sm text-fg-muted">
            <span className="text-accent">~</span>/{profile.handle}
          </p>
          <h1 className="mt-5 text-display">{fullName(profile)}</h1>
          <p className="mt-6 min-h-[3.2em] font-mono text-sm text-fg sm:min-h-[1.6em] sm:text-lg">
            <span aria-hidden className="text-accent">
              {"> "}
            </span>
            <ScrambleText phrases={profile.roles} label={profile.title} />
            <span aria-hidden className="caret ml-0.5 text-accent">
              ▍
            </span>
          </p>
          <p className="mt-5 max-w-[52ch] text-fg-muted sm:text-lg">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="#work" variant="primary">
              View work
              <ArrowDown aria-hidden className="size-4" />
            </LinkButton>
            <LinkButton href="/resume.pdf" download={resumeFileName(profile)}>
              <Download aria-hidden className="size-4" />
              Download PDF
            </LinkButton>
            <PaletteHint />
          </div>
          <dl className="mt-10 grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-2 border-t border-line pt-6 font-mono text-sm">
            {facts.map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="text-fg-muted">{key}</dt>
                <dd className="text-fg">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure aria-hidden className="-order-1 md:order-none md:col-span-5">
          <DotField
            art={MASCOT}
            className="aspect-square max-h-[40vh] w-full rounded-xl border border-line bg-bg-sunken md:max-h-none"
          />
          <figcaption className="mt-3 flex justify-between mono-label text-fg-muted">
            <span>fig. 00</span>
            <span>dot field · mascot</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
