import { describe, expect, it } from "vitest";
import { formatDuration, formatPeriod, monthsBetween, periodDuration, toYearMonth } from "./format";

describe("monthsBetween", () => {
  it("counts both ends", () => {
    expect(monthsBetween("2024-03", "2026-07")).toBe(29);
    expect(monthsBetween("2026-07", "2026-07")).toBe(1);
  });
});

describe("formatDuration", () => {
  it.each([
    [29, "2y 5m"],
    [12, "1y"],
    [5, "5m"],
    [0, "1m"],
  ])("%i months -> %s", (months, expected) => {
    expect(formatDuration(months)).toBe(expected);
  });
});

describe("formatPeriod", () => {
  it("shows both ends", () => {
    expect(formatPeriod({ start: "2024-03", end: "2026-07" })).toBe("2024-03 → 2026-07");
  });

  it("shows an open end as now", () => {
    expect(formatPeriod({ start: "2026-07", end: null })).toBe("2026-07 → now");
  });
});

describe("periodDuration", () => {
  it("measures an open period up to now", () => {
    expect(periodDuration({ start: "2026-07", end: null }, "2026-11")).toBe("5m");
  });

  it("ignores now for a closed period", () => {
    expect(periodDuration({ start: "2024-03", end: "2026-07" }, "2030-01")).toBe("2y 5m");
  });
});

describe("toYearMonth", () => {
  it("pads the month", () => {
    expect(toYearMonth(new Date(Date.UTC(2026, 0, 15)))).toBe("2026-01");
  });
});
