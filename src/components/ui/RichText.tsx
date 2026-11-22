import { splitCode } from "@/lib/rich-text";

export function RichText({ text }: { text: string }) {
  return splitCode(text).map((run, i) =>
    run.code ? (
      <code key={i} className="rounded bg-bg-sunken px-1 py-px font-mono text-[0.875em] text-fg">
        {run.text}
      </code>
    ) : (
      run.text
    ),
  );
}
