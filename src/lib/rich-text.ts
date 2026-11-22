export interface TextRun {
  text: string;
  code: boolean;
}

const CODE_SPAN = /`([^`]+)`/;

export function splitCode(text: string): TextRun[] {
  return text
    .split(CODE_SPAN)
    .map((part, i) => ({ text: part, code: i % 2 === 1 }))
    .filter((run) => run.text !== "");
}
