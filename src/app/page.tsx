import { Hero } from "@/components/sections/hero/Hero";
import { Work } from "@/components/sections/work/Work";
import { Section } from "@/components/ui/Section";
import { SECTIONS } from "@/lib/sections";

const PENDING = SECTIONS.filter((s) => s.id !== "home" && s.id !== "work");

export default function Home() {
  return (
    <div className="px-4 pb-32 sm:px-6">
      <main className="mx-auto min-h-dvh max-w-[1200px] border-x border-line">
        <Hero />
        <Work />
        {PENDING.map((s) => (
          <Section key={s.id} id={s.id} index={s.index} label={s.label} />
        ))}
      </main>
    </div>
  );
}
