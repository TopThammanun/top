import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { resume } from "@/content/resume";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[1200px] flex-col justify-center px-5 py-24 sm:px-8 lg:px-12">
      <p className="font-mono text-sm text-fg-muted">
        <span className="text-accent">~</span>/{resume.profile.handle}
      </p>
      <h1 className="mt-5 text-display">404</h1>
      <p className="mt-6 max-w-[52ch] text-fg-muted sm:text-lg">Nothing lives at this address.</p>
      <p className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md font-mono text-sm text-fg hover:text-accent"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back to the resume
        </Link>
      </p>
    </main>
  );
}
