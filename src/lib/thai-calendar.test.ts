import { describe, expect, it } from "vitest";
import { LUNAR_FESTIVALS } from "@/content/festivals";
import {
  bangkokDay,
  describeThaiDay,
  festivalOf,
  readThaiDay,
  SCENES,
  sceneLabel,
  seasonOf,
} from "./thai-calendar";

describe("bangkokDay", () => {
  it("reads the calendar day in Thailand, seven hours ahead of UTC", () => {
    expect(bangkokDay(Date.parse("2026-11-23T16:59:59Z"))).toBe("2026-11-23");
    expect(bangkokDay(Date.parse("2026-11-23T17:00:00Z"))).toBe("2026-11-24");
  });
});

describe("seasonOf", () => {
  it.each([
    ["2027-01-10", "cool"],
    ["2027-02-15", "cool"],
    ["2027-02-16", "hot"],
    ["2027-05-15", "hot"],
    ["2027-05-16", "rainy"],
    ["2027-10-15", "rainy"],
    ["2027-10-16", "cool"],
    ["2027-12-31", "cool"],
  ])("puts %s in the %s season", (day, season) => {
    expect(seasonOf(day)).toBe(season);
  });
});

describe("festivalOf", () => {
  it.each([
    ["2026-12-31", "new-year"],
    ["2027-01-01", "new-year"],
    ["2027-04-13", "songkran"],
    ["2027-04-15", "songkran"],
    ["2026-12-01", "year-end"],
    ["2026-12-30", "year-end"],
    ["2026-11-24", "loy-krathong"],
    ["2027-11-13", "loy-krathong"],
    ["2027-02-06", "chinese-new-year"],
  ])("marks %s as %s", (day, festival) => {
    expect(festivalOf(day)).toBe(festival);
  });

  it.each(["2027-01-02", "2027-04-12", "2027-04-16", "2026-11-30", "2026-11-23", "2027-11-24"])(
    "finds no festival on %s",
    (day) => {
      expect(festivalOf(day)).toBeNull();
    },
  );

  it("takes lunar days from the table it is given", () => {
    const lunar = { "chinese-new-year": ["2031-01-23"], "loy-krathong": [] };
    expect(festivalOf("2031-01-23", lunar)).toBe("chinese-new-year");
    expect(festivalOf("2027-02-06", lunar)).toBeNull();
  });
});

describe("readThaiDay", () => {
  it("shows the festival on a festival day", () => {
    expect(readThaiDay("2026-11-24")).toEqual({
      season: "cool",
      festival: "loy-krathong",
      scene: "loy-krathong",
    });
  });

  it("shows the season on every other day", () => {
    expect(readThaiDay("2026-07-01")).toEqual({ season: "rainy", festival: null, scene: "rainy" });
  });
});

describe("describeThaiDay", () => {
  it("names the season, then the festival", () => {
    expect(describeThaiDay(readThaiDay("2026-11-24"))).toBe("cool season · Loy Krathong");
    expect(describeThaiDay(readThaiDay("2027-04-14"))).toBe("hot season · Songkran");
    expect(describeThaiDay(readThaiDay("2026-07-01"))).toBe("rainy season");
  });
});

describe("SCENES", () => {
  it("lists the three seasons before the festivals, each with a label", () => {
    expect(SCENES.map((scene) => scene.id)).toEqual([
      "cool",
      "hot",
      "rainy",
      "year-end",
      "new-year",
      "chinese-new-year",
      "songkran",
      "loy-krathong",
    ]);
    expect(sceneLabel("year-end")).toBe("year-end snow");
  });
});

describe("LUNAR_FESTIVALS", () => {
  const ranges = {
    "chinese-new-year": ["01-21", "02-20"],
    "loy-krathong": ["10-25", "11-30"],
  } as const;

  it.each(Object.entries(ranges))(
    "lists %s once a year inside its possible range",
    (festival, [from, to]) => {
      const days = LUNAR_FESTIVALS[festival as keyof typeof ranges];
      expect(days.length).toBeGreaterThan(0);
      expect([...days].sort()).toEqual([...days]);
      expect(new Set(days.map((day) => day.slice(0, 4))).size).toBe(days.length);
      for (const day of days) {
        expect(day).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(day.slice(5) >= from && day.slice(5) <= to).toBe(true);
      }
    },
  );
});
