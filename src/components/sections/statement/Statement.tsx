import { Band } from "@/components/ui/Band";
import { WordReveal } from "@/components/ui/WordReveal";
import { resume } from "@/content/resume";

export function Statement() {
  const [lead] = resume.profile.summary;
  if (!lead) return null;

  return (
    <Band aria-label="Summary">
      <WordReveal text={lead} className="max-w-[30ch] text-statement" />
    </Band>
  );
}
