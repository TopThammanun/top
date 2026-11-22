import { describe, expect, it } from "vitest";
import { activity } from "@/content/activity";
import type { CommitActivity } from "@/content/types";
import {
  buildCalendar,
  describeRange,
  describeSpan,
  describeSummary,
  levelOf,
  levelThresholds,
  monthLabels,
  summarize,
  type CalendarDay,
  type CalendarWeek,
} from "./commit-calendar";
import { parseDay } from "./days";

const sample: CommitActivity = {
  from: "2026-11-09",
  to: "2026-11-22",
  days: {
    "2026-11-09": [2, 0],
    "2026-11-10": [1, 3],
    "2026-11-11": [0, 1],
    "2026-11-14": [8, 0],
  },
};

function day(date: string, company: number, personal: number): CalendarDay {
  return { date, company, personal, total: company + personal, level: 0, group: null };
}

describe("levelThresholds", () => {
  it("takes the quartiles of the active days", () => {
    expect(levelThresholds([0, 1, 1, 2, 3, 5, 8, 13, 21, 0])).toEqual([1, 3, 8]);
  });

  it("is all zeros without activity", () => {
    expect(levelThresholds([0, 0])).toEqual([0, 0, 0]);
  });
});

describe("levelOf", () => {
  const thresholds = [1, 3, 8];

  it.each([
    [0, 0],
    [1, 1],
    [3, 2],
    [4, 3],
    [8, 3],
    [9, 4],
  ])("%i commits -> level %i", (total, level) => {
    expect(levelOf(total, thresholds)).toBe(level);
  });
});

describe("buildCalendar", () => {
  const calendar = buildCalendar(sample);

  it("lays the days out in Monday-first weeks", () => {
    expect(calendar.weeks).toHaveLength(2);
    expect(calendar.weeks.every((week) => week.length === 7)).toBe(true);
    expect(calendar.weeks[0][0]?.date).toBe("2026-11-09");
    expect(calendar.weeks[1][6]?.date).toBe("2026-11-22");
  });

  it("pads a window that does not start on a Monday", () => {
    const { weeks } = buildCalendar({ from: "2026-11-11", to: "2026-11-17", days: {} });
    expect(weeks.map((week) => week.map((cell) => cell?.date.slice(8) ?? null))).toEqual([
      [null, null, "11", "12", "13", "14", "15"],
      ["16", "17", null, null, null, null, null],
    ]);
  });

  it("colours a day by the group with more commits", () => {
    const [monday, tuesday, wednesday, thursday] = calendar.weeks[0];
    expect(monday?.group).toBe("company");
    expect(tuesday?.group).toBe("personal");
    expect(wednesday?.group).toBe("personal");
    expect(thursday?.group).toBeNull();
  });

  it("ranks days against each other", () => {
    expect(calendar.weeks[0].map((cell) => cell?.level)).toEqual([2, 3, 1, 0, 0, 4, 0]);
  });

  it("summarises the window", () => {
    expect(calendar.summary).toEqual({
      total: 15,
      company: 11,
      personal: 4,
      activeDays: 4,
      longestStreak: 3,
    });
  });
});

describe("summarize", () => {
  it("finds the longest run of active days", () => {
    const days = [1, 1, 0, 1, 1, 1, 0].map((count, i) => day(`2026-11-${10 + i}`, count, 0));
    expect(summarize(days).longestStreak).toBe(3);
  });
});

describe("monthLabels", () => {
  function weekOf(date: string): CalendarWeek {
    return [day(date, 0, 0), null, null, null, null, null, null];
  }

  it("labels the first week that starts in a month", () => {
    const weeks = ["2026-01-05", "2026-01-12", "2026-01-19", "2026-01-26", "2026-02-02", "2026-02-09"].map(
      weekOf,
    );
    expect(monthLabels([...weeks, weekOf("2026-02-16")])).toEqual([
      { label: "Jan", week: 0 },
      { label: "Feb", week: 4 },
    ]);
  });

  it("drops a label with no room before the next one or the end", () => {
    const weeks = ["2025-11-17", "2025-11-24", "2025-12-01", "2025-12-08", "2025-12-15", "2025-12-29"].map(
      weekOf,
    );
    expect(monthLabels([...weeks, weekOf("2026-01-05")])).toEqual([{ label: "Dec", week: 2 }]);
  });
});

describe("describeSummary", () => {
  it("lists commits, active days and the longest streak", () => {
    expect(
      describeSummary({ total: 1738, company: 1467, personal: 271, activeDays: 248, longestStreak: 1 }),
    ).toBe("1,738 commits · 248 active days · longest streak 1 day");
  });
});

describe("describeRange", () => {
  it("names both ends of the window", () => {
    expect(describeRange(sample)).toBe("Mon 9 Nov 2026 to Sun 22 Nov 2026");
  });
});

describe("describeSpan", () => {
  it("names the first and last month", () => {
    expect(describeSpan({ from: "2025-11-17", to: "2026-11-22", days: {} })).toBe("Nov 2025 – Nov 2026");
  });
});

describe("commit activity content", () => {
  it("starts on a Monday and holds only days inside the window", () => {
    expect(buildCalendar(activity).weeks[0][0]?.date).toBe(activity.from);
    for (const date of Object.keys(activity.days)) {
      expect(parseDay(date)).toBeGreaterThanOrEqual(parseDay(activity.from));
      expect(parseDay(date)).toBeLessThanOrEqual(parseDay(activity.to));
    }
  });

  it("has no empty or negative day", () => {
    for (const [company, personal] of Object.values(activity.days)) {
      expect(Math.min(company, personal)).toBeGreaterThanOrEqual(0);
      expect(company + personal).toBeGreaterThan(0);
    }
  });
});
