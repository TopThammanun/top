import { describe, expect, it } from "vitest";
import { AI_CRAWLERS } from "./crawlers";

describe("AI_CRAWLERS", () => {
  it("names the search and assistant agents of the main AI products once each", () => {
    expect(AI_CRAWLERS).toEqual(
      expect.arrayContaining(["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "PerplexityBot"]),
    );
    expect(new Set(AI_CRAWLERS).size).toBe(AI_CRAWLERS.length);
  });

  it("uses robots.txt product tokens without spaces", () => {
    AI_CRAWLERS.forEach((agent) => expect(agent).toMatch(/^[A-Za-z0-9-]+$/));
  });
});
