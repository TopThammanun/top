import { RichText } from "./RichText";

export function HighlightList({ items }: { items: string[] }) {
  return (
    <ul className="max-w-[68ch] space-y-2.5 text-fg-muted">
      {items.map((item) => (
        <li key={item} className="relative pl-5">
          <span aria-hidden className="absolute left-0 font-mono text-accent">
            –
          </span>
          <RichText text={item} />
        </li>
      ))}
    </ul>
  );
}
