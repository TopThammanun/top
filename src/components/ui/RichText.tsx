const CODE_SPAN = /`([^`]+)`/;

export function RichText({ text }: { text: string }) {
  return text.split(CODE_SPAN).map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded bg-bg-sunken px-1 py-px font-mono text-[0.875em] text-fg">
        {part}
      </code>
    ) : (
      part
    ),
  );
}
