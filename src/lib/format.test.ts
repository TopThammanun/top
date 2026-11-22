import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatDuration,
  formatFormalPeriod,
  formatIndex,
  formatNumber,
  formatPeriod,
  formatQuantity,
  formatUsage,
  monthName,
  monthsBetween,
  periodDuration,
  toYearMonth,
} from "./format";

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

  it("shows a single month once", () => {
    expect(formatPeriod({ start: "2022-11", end: "2022-11" })).toBe("2022-11");
  });
});

describe("formatFormalPeriod", () => {
  it("spells out the months", () => {
    expect(formatFormalPeriod({ start: "2024-03", end: "2026-12" })).toBe("Mar 2024 – Dec 2026");
  });

  it("shows an open end as Present", () => {
    expect(formatFormalPeriod({ start: "2026-01", end: null })).toBe("Jan 2026 – Present");
  });

  it("shows a single month once", () => {
    expect(formatFormalPeriod({ start: "2022-11", end: "2022-11" })).toBe("Nov 2022");
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

describe("formatUsage", () => {
  it("pluralises projects", () => {
    expect(formatUsage(1)).toBe("used in 1 project");
    expect(formatUsage(2)).toBe("used in 2 projects");
  });
});

describe("formatIndex", () => {
  it("pads to two digits", () => {
    expect(formatIndex(1)).toBe("01");
    expect(formatIndex(12)).toBe("12");
  });
});

describe("toYearMonth", () => {
  it("pads the month", () => {
    expect(toYearMonth(new Date(Date.UTC(2026, 0, 15)))).toBe("2026-01");
  });
});

describe("monthName", () => {
  it("names a month by its number", () => {
    expect(monthName(1)).toBe("Jan");
    expect(monthName(12)).toBe("Dec");
  });
});

describe("formatDate", () => {
  it("writes the weekday, day, month and year", () => {
    expect(formatDate("2026-07-14")).toBe("Tue 14 Jul 2026");
    expect(formatDate("2026-11-01")).toBe("Sun 1 Nov 2026");
  });
});

describe("formatNumber", () => {
  it("groups thousands", () => {
    expect(formatNumber(1738)).toBe("1,738");
    expect(formatNumber(248)).toBe("248");
  });
});

describe("formatQuantity", () => {
  it("pluralises the noun", () => {
    expect(formatQuantity(1, "commit")).toBe("1 commit");
    expect(formatQuantity(0, "commit")).toBe("0 commits");
    expect(formatQuantity(1467, "commit")).toBe("1,467 commits");
  });
});
