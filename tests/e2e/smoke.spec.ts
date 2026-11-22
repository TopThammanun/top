import { expect, test } from "@playwright/test";
import { resume } from "@/content/resume";
import { AI_CRAWLERS } from "@/lib/crawlers";
import { fullName } from "@/lib/identity";
import { absoluteUrl, MACHINE_ROUTES } from "@/lib/routes";
import { SECTIONS } from "@/lib/sections";
import { seoDescription, seoTitle, structuredData } from "@/lib/seo";
import { distanceFromTop, gotoHydrated } from "./helpers";

const LINKEDIN_RESUME_MAX_BYTES = 2 * 1024 * 1024;

test.describe("home page", () => {
  test("renders the six sections and the name", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(fullName(resume.profile));
    for (const section of SECTIONS) {
      await expect(page.locator(`section#${section.id}`)).toHaveCount(1);
    }
  });

  test("exposes the real name to search engines", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(seoTitle(resume));
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", seoDescription(resume));
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", resume.meta.siteUrl);
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(jsonLd ?? "null")).toEqual(structuredData(resume));
  });

  test("loads the mascot for the hero dot field", async ({ page }) => {
    const mascot = page.waitForResponse((response) => response.url().endsWith("/mascot.png"));
    await page.goto("/");
    expect((await mascot).ok()).toBe(true);
  });

  test("palette opens with Control+K and jumps to Work", async ({ page }) => {
    await gotoHydrated(page);
    await page.keyboard.press("Control+K");
    const palette = page.getByRole("dialog", { name: "Command palette" });
    await expect(palette).toBeVisible();
    await expect(palette.getByRole("combobox")).toBeFocused();
    await page.keyboard.type("work");
    await page.keyboard.press("Enter");
    await expect(palette).toBeHidden();
    await expect.poll(() => distanceFromTop(page, "work")).toBe(0);
  });

  test("palette closes with Escape and returns focus", async ({ page }) => {
    await gotoHydrated(page);
    const trigger = page.getByRole("button", { name: "Open command palette" });
    await trigger.click();
    await expect(page.getByRole("dialog", { name: "Command palette" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Command palette" })).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("g then w jumps to Work", async ({ page }) => {
    await gotoHydrated(page);
    await page.keyboard.press("g");
    await page.keyboard.press("w");
    await expect.poll(() => distanceFromTop(page, "work")).toBe(0);
  });

  test("theme toggle persists after reload", async ({ page }) => {
    await gotoHydrated(page);
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "light");
  });

  test("opening a project row shows its highlights", async ({ page }) => {
    const project = resume.projects[1];
    await gotoHydrated(page);
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
    expect(body.basics.name).toBe(fullName(resume.profile));
  });

  test("/sitemap.xml lists the page and every machine-readable route", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const path of ["/", ...MACHINE_ROUTES.map((route) => route.path)]) {
      expect(xml).toContain(`<loc>${absoluteUrl(resume, path)}</loc>`);
    }
  });

  test("/robots.txt welcomes AI crawlers and links the sitemap", async ({ request }) => {
    const text = await (await request.get("/robots.txt")).text();
    for (const agent of AI_CRAWLERS) expect(text).toContain(`User-Agent: ${agent}`);
    expect(text).not.toContain("Disallow");
    expect(text).toContain(`Sitemap: ${absoluteUrl(resume, "/sitemap.xml")}`);
  });

  test("/resume.pdf is a PDF small enough to upload to LinkedIn", async ({ request }) => {
    const response = await request.get("/resume.pdf");
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toBe("application/pdf");
    const body = await response.body();
    expect(body.subarray(0, 5).toString()).toBe("%PDF-");
    expect(body.byteLength).toBeLessThan(LINKEDIN_RESUME_MAX_BYTES);
  });

  test("/resume.txt and /llms.txt are plain text", async ({ request }) => {
    for (const path of ["/resume.txt", "/llms.txt"]) {
      const response = await request.get(path);
      expect(response.ok()).toBe(true);
      expect(response.headers()["content-type"]).toContain("text/plain");
    }
  });
});
