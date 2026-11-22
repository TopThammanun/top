export type SectionId = "home" | "work" | "log" | "stack" | "agents" | "contact";

export const SECTIONS: readonly { id: SectionId; index: string; label: string; key: string }[] = [
  { id: "home", index: "00", label: "Home", key: "h" },
  { id: "work", index: "01", label: "Work", key: "w" },
  { id: "log", index: "02", label: "Log", key: "l" },
  { id: "stack", index: "03", label: "Stack", key: "s" },
  { id: "agents", index: "04", label: "Agents", key: "a" },
  { id: "contact", index: "05", label: "Contact", key: "c" },
];
