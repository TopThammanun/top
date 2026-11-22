import { Section } from "@/components/ui/Section";
import { SECTIONS } from "@/lib/sections";

export default function Home() {
  return (
    <div className="px-4 pb-32 sm:px-6">
      <main className="mx-auto min-h-dvh max-w-[1200px] border-x border-line">
        {SECTIONS.map((s) => (
          <Section
            key={s.id}
            id={s.id}
            index={s.index}
            label={s.label}
            heading={s.id === "home" ? "p" : "h2"}
          />
        ))}
      </main>
    </div>
  );
}
