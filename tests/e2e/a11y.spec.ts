import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { scrollThrough, useTheme } from "./helpers";

const BLOCKING = new Set(["serious", "critical"]);

async function blockingViolations(page: Page, include?: string) {
  const builder = new AxeBuilder({ page });
  const { violations } = await (include ? builder.include(include) : builder).analyze();
  return violations
    .filter((v) => v.impact && BLOCKING.has(v.impact))
    .map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target.join(" ")) }));
}

for (const theme of ["dark", "light"] as const) {
  test(`has no serious accessibility violations in the ${theme} theme`, async ({ page }) => {
    await useTheme(page, theme);
    await page.goto("/", { waitUntil: "networkidle" });
    await scrollThrough(page);
    await page.waitForTimeout(600);
    expect(await blockingViolations(page)).toEqual([]);
  });

  test(`the open palette has no serious accessibility violations in the ${theme} theme`, async ({ page }) => {
    await useTheme(page, theme);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.keyboard.press("Control+K");
    await expect(page.getByRole("dialog", { name: "Command palette" })).toBeVisible();
    expect(await blockingViolations(page, "dialog")).toEqual([]);
  });
}
