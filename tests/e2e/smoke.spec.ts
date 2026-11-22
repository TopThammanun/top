import { expect, test } from "@playwright/test";
import { resume } from "@/content/resume";
import { SECTIONS } from "@/lib/sections";

test.describe("home page", () => {
  test("renders the six sections and the name", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(resume.profile.displayName);
    for (const section of SECTIONS) {
      await expect(page.locator(`section#${section.id}`)).toHaveCount(1);
    }
  });

  test("palette opens with Control+K and jumps to Work", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+K");
    const palette = page.getByRole("dialog", { name: "Command palette" });
    await expect(palette).toBeVisible();
    await expect(palette.getByRole("combobox")).toBeFocused();
    await page.keyboard.type("work");
    await page.keyboard.press("Enter");
    await expect(palette).toBeHidden();
    await expect
      .poll(() =>
        page.evaluate(() => Math.round(document.getElementById("work")?.getBoundingClientRect().top ?? -1)),
      )
      .toBe(0);
  });

  test("palette closes with Escape and returns focus", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open command palette" });
    await trigger.click();
    await expect(page.getByRole("dialog", { name: "Command palette" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Command palette" })).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("g then w jumps to Work", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("g");
    await page.keyboard.press("w");
    await expect
      .poll(() =>
        page.evaluate(() => Math.round(document.getElementById("work")?.getBoundingClientRect().top ?? -1)),
      )
      .toBe(0);
  });

  test("theme toggle persists after reload", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "light");
  });

  test("opening a project row shows its highlights", async ({ page }) => {
    const project = resume.projects[1];
    await page.goto("/");
    const row = page.locator(`#work-${project.slug}-button`);
    await row.scrollIntoViewIfNeeded();
    await expect(row).toHaveAttribute("aria-expanded", "false");
    await row.click();
    await expect(row).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(project.highlights[0])).toBeVisible();
  });

  test("has no horizontal scroll at 360px", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBe(0);
  });

  test("logs no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/", { waitUntil: "networkidle" });
    expect(errors).toEqual([]);
  });
});

test.describe("machine-readable routes", () => {
  test("/resume.json is a JSON Resume", async ({ request }) => {
    const response = await request.get("/resume.json");
    expect(response.ok()).toBe(true);
    const body = (await response.json()) as { basics: { name: string } };
    expect(body.basics.name).toBe(resume.profile.displayName);
  });

  test("/resume.pdf is a PDF", async ({ request }) => {
    const response = await request.get("/resume.pdf");
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toBe("application/pdf");
    expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
  });

  test("/resume.txt and /llms.txt are plain text", async ({ request }) => {
    for (const path of ["/resume.txt", "/llms.txt"]) {
      const response = await request.get(path);
      expect(response.ok()).toBe(true);
      expect(response.headers()["content-type"]).toContain("text/plain");
    }
  });
});
