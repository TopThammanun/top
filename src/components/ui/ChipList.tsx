import { Chip } from "./Chip";

interface ChipListProps {
  label: string;
  items: string[];
}

export function ChipList({ label, items }: ChipListProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Chip tone="muted">{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
