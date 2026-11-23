import { LUNAR_FESTIVALS, type LunarFestivalId, type LunarFestivals } from "@/content/festivals";
import { formatDay } from "./days";

export type SeasonId = "cool" | "hot" | "rainy";
export type FestivalId = LunarFestivalId | "year-end" | "new-year" | "songkran";
export type SceneId = SeasonId | FestivalId;

export interface ThaiDay {
  season: SeasonId;
  festival: FestivalId | null;
  scene: SceneId;
}

export interface SceneInfo {
  id: SceneId;
  label: string;
}

export const SCENES: readonly SceneInfo[] = [
  { id: "cool", label: "cool season" },
  { id: "hot", label: "hot season" },
  { id: "rainy", label: "rainy season" },
  { id: "year-end", label: "year-end snow" },
  { id: "new-year", label: "New Year" },
  { id: "chinese-new-year", label: "Chinese New Year" },
  { id: "songkran", label: "Songkran" },
  { id: "loy-krathong", label: "Loy Krathong" },
];

const BANGKOK_OFFSET_MS = 7 * 3_600_000;
const HOT_FROM = "02-16";
const RAINY_FROM = "05-16";
const COOL_FROM = "10-16";

const FIXED_FESTIVALS: readonly { id: FestivalId; from: string; to: string }[] = [
  { id: "new-year", from: "12-31", to: "12-31" },
  { id: "new-year", from: "01-01", to: "01-01" },
  { id: "songkran", from: "04-13", to: "04-15" },
  { id: "year-end", from: "12-01", to: "12-30" },
];

const LUNAR_IDS: readonly LunarFestivalId[] = ["chinese-new-year", "loy-krathong"];

export function bangkokDay(time: number): string {
  return formatDay(time + BANGKOK_OFFSET_MS);
}

export function seasonOf(day: string): SeasonId {
  const monthDay = day.slice(5);
  if (monthDay >= HOT_FROM && monthDay < RAINY_FROM) return "hot";
  if (monthDay >= RAINY_FROM && monthDay < COOL_FROM) return "rainy";
  return "cool";
}

export function festivalOf(day: string, lunar: LunarFestivals = LUNAR_FESTIVALS): FestivalId | null {
  const monthDay = day.slice(5);
  const lunarId = LUNAR_IDS.find((id) => lunar[id].includes(day));
  if (lunarId) return lunarId;
  return FIXED_FESTIVALS.find((festival) => monthDay >= festival.from && monthDay <= festival.to)?.id ?? null;
}

export function readThaiDay(day: string): ThaiDay {
  const season = seasonOf(day);
  const festival = festivalOf(day);
  return { season, festival, scene: festival ?? season };
}

export function sceneLabel(id: SceneId): string {
  return SCENES.find((scene) => scene.id === id)?.label ?? id;
}

export function describeThaiDay({ season, festival }: ThaiDay): string {
  return [season, festival]
    .filter((id): id is SceneId => id !== null)
    .map(sceneLabel)
    .join(" · ");
}
