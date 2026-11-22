import { Section } from "@/components/ui/Section";
import { resume } from "@/content/resume";
import { machineEndpoints, profileEndpoints } from "@/lib/endpoints";
import { EndpointGroup } from "./EndpointGroup";

export function Contact() {
  const profile = profileEndpoints(resume);
  const machine = machineEndpoints(resume);

  return (
    <Section id="contact" index="05" label="Contact" meta={resume.profile.location.utcOffset}>
      <p className="text-statement">Endpoints.</p>
      <div className="mt-12 grid gap-12">
        <EndpointGroup title="Profile" endpoints={profile} offset={0} />
        <EndpointGroup title="Machine-readable" endpoints={machine} offset={profile.length} />
      </div>
    </Section>
  );
}
