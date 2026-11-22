import { describe, expect, it } from "vitest";
import { litWords, WORD_REVEAL } from "./word-reveal";

const VIEWPORT = 1000;
const WORDS = 10;

describe("litWords", () => {
  it("lights nothing until the text reaches the start line", () => {
    expect(litWords(VIEWPORT, VIEWPORT, WORDS)).toBe(0);
    expect(litWords(VIEWPORT * WORD_REVEAL.start, VIEWPORT, WORDS)).toBe(0);
  });

  it("lights words in step with the scroll between the two lines", () => {
    expect(litWords(600, VIEWPORT, WORDS)).toBe(5);
    expect(litWords(599, VIEWPORT, WORDS)).toBe(6);
  });

  it("lights every word at the finish line and beyond", () => {
    expect(litWords(VIEWPORT * WORD_REVEAL.finish, VIEWPORT, WORDS)).toBe(WORDS);
    expect(litWords(-400, VIEWPORT, WORDS)).toBe(WORDS);
  });

  it("returns zero without a viewport or words", () => {
    expect(litWords(0, 0, WORDS)).toBe(0);
    expect(litWords(0, VIEWPORT, 0)).toBe(0);
  });
});
