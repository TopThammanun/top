import { Agents } from "@/components/sections/agents/Agents";
import { Contact } from "@/components/sections/contact/Contact";
import { Footer } from "@/components/sections/footer/Footer";
import { Hero } from "@/components/sections/hero/Hero";
import { Log } from "@/components/sections/log/Log";
import { Stack } from "@/components/sections/stack/Stack";
import { Work } from "@/components/sections/work/Work";

export default function Home() {
  return (
    <div className="px-4 pb-28 sm:px-6">
      <div className="mx-auto max-w-[1200px] border-x border-line">
        <main>
          <Hero />
          <Work />
          <Log />
          <Stack />
          <Agents />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
