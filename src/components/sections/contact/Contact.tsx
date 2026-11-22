import { ArrowUpRight, Mail } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { DownloadButton } from "@/components/ui/DownloadButton";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { resume } from "@/content/resume";
import { machineEndpoints, profileEndpoints } from "@/lib/endpoints";
import { resumeFileName } from "@/lib/identity";
import { EndpointGroup } from "./EndpointGroup";

export function Contact() {
  const { profile } = resume;
  const endpoints = profileEndpoints(resume);
  const machine = machineEndpoints(resume);
  const languages = profile.languages.map((l) => `${l.name} (${l.level})`).join(", ");

  return (
    <Section id="contact" meta={profile.location.utcOffset}>
      <SectionIntro title="Get in touch.">
        Based in {profile.location.label} ({profile.location.utcOffset}). {languages}.
      </SectionIntro>
      <div className="mt-8 flex flex-wrap gap-3">
        <DownloadButton href="/resume.pdf" fileName={resumeFileName(profile)}>
          Download resume
        </DownloadButton>
        {profile.email ? (
          <LinkButton href={`mailto:${profile.email}`}>
            <Mail aria-hidden className="size-4" />
            Email me
          </LinkButton>
        ) : null}
        {profile.linkedin ? (
          <LinkButton href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <ArrowUpRight aria-hidden className="size-4" />
          </LinkButton>
        ) : null}
      </div>
      <div className="mt-12 grid gap-12">
        <EndpointGroup title="Profile" endpoints={endpoints} offset={0} />
        <EndpointGroup title="Machine-readable" endpoints={machine} offset={endpoints.length} />
      </div>
    </Section>
  );
}
