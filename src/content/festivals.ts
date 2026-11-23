export type LunarFestivalId = "chinese-new-year" | "loy-krathong";

export type LunarFestivals = Readonly<Record<LunarFestivalId, readonly string[]>>;

export const LUNAR_FESTIVALS: LunarFestivals = {
  "chinese-new-year": ["2027-02-06", "2028-01-26", "2029-02-13", "2030-02-03"],
  "loy-krathong": ["2026-11-24", "2027-11-13", "2028-11-01", "2029-11-20"],
};
