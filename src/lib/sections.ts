export type SectionId = "home" | "work" | "personal" | "log" | "stack" | "agents" | "contact";

export interface SectionInfo {
  id: SectionId;
  index: string;
  label: string;
  key: string;
}

export const SECTIONS: readonly SectionInfo[] = [
  { id: "home", index: "00", label: "Home", key: "h" },
  { id: "work", index: "01", label: "Work", key: "w" },
  { id: "personal", index: "02", label: "Personal", key: "p" },
  { id: "log", index: "03", label: "Timeline", key: "t" },
  { id: "stack", index: "04", label: "Skills", key: "s" },
  { id: "agents", index: "05", label: "Agents", key: "a" },
  { id: "contact", index: "06", label: "Contact", key: "c" },
];

export function sectionInfo(id: SectionId): SectionInfo {
  const section = SECTIONS.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown section: ${id}`);
  return section;
}
