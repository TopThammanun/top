import { ArrowDown } from "lucide-react";
import type { ReactNode } from "react";
import { LinkButton } from "@/components/ui/Button";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Section } from "@/components/ui/Section";
import { resume } from "@/content/resume";
import { careerLadder, currentRole, educationHeadline } from "@/lib/career";
import { fullName, resumeFileName } from "@/lib/identity";
import { CareerStats } from "./CareerStats";
import { CommitCalendar } from "./CommitCalendar";
import { DotField } from "./DotField";
import { LiveClock } from "./LiveClock";
import { MASCOT } from "./mascot";
import { PaletteHint } from "./PaletteHint";
import { ScrambleText } from "./ScrambleText";

const FOCUS = ".NET · TypeScript · Next.js";

export function Hero() {
  const { profile, meta } = resume;
  const career: [string, string | null | undefined][] = [
    ["at", currentRole(resume)?.employer],
    ["path", careerLadder(resume)],
    ["edu", resume.education.map(educationHeadline)[0]],
  ];
  const facts: [string, ReactNode][] = [
    ["aka", profile.displayName],
    ...career.filter((fact): fact is [string, string] => Boolean(fact[1])),
    ["now", profile.now],
    ["loc", `${profile.location.label} · ${profile.location.utcOffset}`],
    ["time", <LiveClock key="time" timeZone={profile.location.timeZone} />],
    ["focus", FOCUS],
  ];

  return (
    <Section id="home" heading="p" meta={`v${meta.version} · ${meta.updated}`}>
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="flex flex-col md:col-span-7">
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
            <DownloadButton href="/resume.pdf" fileName={resumeFileName(profile)}>
              Download resume
            </DownloadButton>
            <LinkButton href="#work">
              View company work
              <ArrowDown aria-hidden className="size-4" />
            </LinkButton>
            <PaletteHint />
          </div>
          <dl className="mt-10 grid grid-cols-[4.5rem_1fr] gap-x-4 gap-y-2 border-t border-line pt-6 font-mono text-sm lg:mt-auto">
            {facts.map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="text-fg-muted">{key}</dt>
                <dd className="text-fg">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="contents lg:col-span-5 lg:flex lg:flex-col lg:gap-8">
          <figure aria-hidden className="-order-1 md:order-none md:col-span-5">
            <DotField
              art={MASCOT}
              className="aspect-square max-h-[40vh] w-full rounded-xl border border-line bg-bg-sunken md:max-h-none lg:aspect-3/2"
            />
            <figcaption className="mt-3 flex justify-between mono-label text-fg-muted">
              <span>fig. 00</span>
              <span>dot field · mascot</span>
            </figcaption>
          </figure>
          <CommitCalendar className="md:col-span-12" />
        </div>
      </div>
      <CareerStats />
    </Section>
  );
}
