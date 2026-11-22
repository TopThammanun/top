import { describe, expect, it } from "vitest";
import { addDays, eachDay, formatDay, parseDay, weekStart, weekdayIndex } from "./days";

describe("parseDay and formatDay", () => {
  it("round-trips an ISO day", () => {
    expect(formatDay(parseDay("2026-11-22"))).toBe("2026-11-22");
  });
});

describe("addDays", () => {
  it("crosses month and year boundaries", () => {
    expect(addDays("2025-12-31", 1)).toBe("2026-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });
});

describe("weekdayIndex", () => {
  it("counts from Monday", () => {
    expect(weekdayIndex("2026-11-16")).toBe(0);
    expect(weekdayIndex("2026-11-22")).toBe(6);
  });
});

describe("weekStart", () => {
  it("returns the Monday of the week", () => {
    expect(weekStart("2026-11-22")).toBe("2026-11-16");
    expect(weekStart("2026-11-16")).toBe("2026-11-16");
  });
});

describe("eachDay", () => {
  it("lists both ends", () => {
    expect(eachDay("2026-02-27", "2026-03-01")).toEqual(["2026-02-27", "2026-02-28", "2026-03-01"]);
  });

  it("is empty when the range is reversed", () => {
    expect(eachDay("2026-03-02", "2026-03-01")).toEqual([]);
  });
});
