import { expect, test, type Page } from "@playwright/test";
import { describeThaiDay, readThaiDay, sceneLabel } from "@/lib/thai-calendar";
import { gotoHydrated } from "./helpers";

const LOY_KRATHONG = "2026-11-24";
const DECEMBER = "2026-12-10";
const RAINY = "2027-07-01";

async function gotoOn(page: Page, instant: string): Promise<void> {
  await page.clock.setFixedTime(new Date(instant));
  await gotoHydrated(page);
}

async function runCommand(page: Page, query: string): Promise<void> {
  const palette = page.getByRole("dialog", { name: "Command palette" });
  await page.keyboard.press("Control+K");
  await expect(palette.getByRole("combobox")).toBeFocused();
  await page.keyboard.type(query);
  await page.keyboard.press("Enter");
  await expect(palette).toBeHidden();
}

const noon = (day: string) => `${day}T05:00:00Z`;
const layer = (page: Page) => page.locator("canvas[data-scene]");
const status = (page: Page) => page.locator("section#home dl");

test.describe("seasonal layer", () => {
  test.use({ timezoneId: "America/Los_Angeles" });

  for (const day of [LOY_KRATHONG, DECEMBER, RAINY]) {
    test(`shows the scene and the label for ${day}`, async ({ page }) => {
      const today = readThaiDay(day);
      await gotoOn(page, noon(day));
      await expect(layer(page)).toHaveAttribute("data-scene", today.scene);
      await expect(status(page).getByText(describeThaiDay(today), { exact: true })).toBeVisible();
    });
  }

  test("follows the calendar day in Thailand, not the visitor's", async ({ page }) => {
    await gotoOn(page, "2026-11-23T17:00:00Z");
    await expect(layer(page)).toHaveAttribute("data-scene", "loy-krathong");
  });

  test("stays behind the content and out of the way of clicks", async ({ page }) => {
    await gotoOn(page, noon(DECEMBER));
    await expect(layer(page)).toHaveCSS("pointer-events", "none");
    await expect(layer(page)).toHaveAttribute("aria-hidden", "true");
    await page.getByRole("link", { name: "View company work" }).click();
    await expect(page).toHaveURL(/#work$/);
  });

  test("pauses, remembers the choice after a reload and plays again", async ({ page }) => {
    await gotoOn(page, noon(DECEMBER));
    await page.getByRole("button", { name: "Pause seasonal effects" }).click();
    await expect(layer(page)).toHaveCount(0);
    await page.reload();
    await expect(page.getByRole("button", { name: "Play seasonal effects" })).toBeVisible();
    await expect(layer(page)).toHaveCount(0);
    await page.getByRole("button", { name: "Play seasonal effects" }).click();
    await expect(layer(page)).toHaveAttribute("data-scene", "year-end");
  });

  test("e toggles the effects", async ({ page }) => {
    await gotoOn(page, noon(DECEMBER));
    await expect(layer(page)).toHaveCount(1);
    await page.keyboard.press("e");
    await expect(layer(page)).toHaveCount(0);
    await page.keyboard.press("e");
    await expect(layer(page)).toHaveCount(1);
  });

  test("previews a scene from the palette and returns to today", async ({ page }) => {
    await gotoOn(page, noon(RAINY));
    await runCommand(page, "songkran");
    await expect(layer(page)).toHaveAttribute("data-scene", "songkran");
    await expect(
      status(page).getByText(`${sceneLabel("songkran")} · preview`, { exact: true }),
    ).toBeVisible();
    await runCommand(page, "today's season");
    await expect(layer(page)).toHaveAttribute("data-scene", "rainy");
  });

  test("a preview turns paused effects back on", async ({ page }) => {
    await gotoOn(page, noon(RAINY));
    await page.keyboard.press("e");
    await expect(layer(page)).toHaveCount(0);
    await runCommand(page, "loy krathong");
    await expect(layer(page)).toHaveAttribute("data-scene", "loy-krathong");
  });

  test("draws nothing for a visitor who prefers reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoOn(page, noon(LOY_KRATHONG));
    await expect(
      status(page).getByText(describeThaiDay(readThaiDay(LOY_KRATHONG)), { exact: true }),
    ).toBeVisible();
    await expect(layer(page)).toHaveCount(0);
    await expect(page.getByRole("button", { name: /seasonal effects/ })).toHaveCount(0);
  });
});
