import { expect, test } from "@playwright/test";
import { activity } from "@/content/activity";
import { resume } from "@/content/resume";
import { careerSteps } from "@/lib/career";
import { buildCalendar, describeSummary } from "@/lib/commit-calendar";
import { AI_CRAWLERS } from "@/lib/crawlers";
import { formatDate, formatQuantity } from "@/lib/format";
import { fullName } from "@/lib/identity";
import { absoluteUrl, MACHINE_ROUTES, projectPath } from "@/lib/routes";
import { SECTIONS } from "@/lib/sections";
import { companyProjects, personalProjects, projectImages } from "@/lib/selectors";
import { seoDescription, seoTitle, structuredData } from "@/lib/seo";
import { distanceFromTop, gotoHydrated } from "./helpers";

const LINKEDIN_RESUME_MAX_BYTES = 2 * 1024 * 1024;
const GALLERY_PROJECT = personalProjects(resume).find((project) => projectImages(project).length > 1);
if (!GALLERY_PROJECT) throw new Error("expected a personal project with a gallery");
const TEXT_PROJECT = personalProjects(resume).find(
  (project) => project.chapters && projectImages(project).length === 0,
);
if (!TEXT_PROJECT) throw new Error("expected a personal project with a write-up and no screenshots");
const CALENDAR = buildCalendar(activity);
const BUSY_WEEK = CALENDAR.weeks.findIndex((week) => (week[0]?.total ?? 0) > 0);

test.describe("home page", () => {
  test("renders every section and the name", async ({ page }) => {
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

  test("shows the commit calendar and reads out the day under the pointer", async ({ page }) => {
    const day = CALENDAR.weeks[BUSY_WEEK][0];
    if (!day) throw new Error("expected a Monday with commits");
    await gotoHydrated(page);
    const hero = page.locator("section#home");
    const calendar = hero.getByRole("img", { name: /^Commit calendar/ });
    await expect(calendar).toHaveAttribute("aria-label", new RegExp(`${describeSummary(CALENDAR.summary)}$`));
    await expect(calendar.locator("circle")).toHaveCount(CALENDAR.weeks.flat().filter(Boolean).length);
    await expect(
      hero.getByText(formatQuantity(CALENDAR.summary.total, "commit"), { exact: true }),
    ).toBeVisible();

    const column = calendar.locator(`[data-week="${BUSY_WEEK}"] svg`);
    const box = await column.boundingBox();
    if (!box) throw new Error("expected the week column to be laid out");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 14);
    await expect(hero.getByText(formatDate(day.date), { exact: true })).toBeVisible();
    await expect(hero.getByText(formatQuantity(day.total, "commit"), { exact: true })).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(hero.getByText(formatDate(day.date), { exact: true })).toBeHidden();
  });

  test("lists the career path from education to the current role", async ({ page }) => {
    await page.goto("/");
    const steps = page.locator("section#log ol").first().getByRole("listitem");
    const expected = careerSteps(resume);
    await expect(steps.getByRole("heading", { level: 4 })).toHaveText(expected.map((step) => step.title));
    await expect(steps.last().getByText("now", { exact: true })).toBeVisible();
    await steps.first().getByRole("link", { name: TEXT_PROJECT.name }).click();
    await expect(page).toHaveURL(new RegExp(`${projectPath(TEXT_PROJECT.slug)}$`));
  });

  test("lists the practice skills beside the technologies", async ({ page }) => {
    await page.goto("/");
    const skills = page.locator("section#stack");
    for (const competency of resume.competencies) {
      await expect(skills.getByRole("heading", { name: competency.label })).toHaveCount(1);
      await expect(skills.getByRole("list", { name: competency.label }).getByRole("listitem")).toHaveText(
        competency.items,
      );
    }
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

  test("keeps company work and personal projects in separate sections", async ({ page }) => {
    await page.goto("/");
    const work = page.locator("section#work");
    const personal = page.locator("section#personal");
    for (const project of companyProjects(resume)) {
      await expect(work.getByRole("heading", { name: project.name })).toHaveCount(1);
      await expect(personal.getByRole("heading", { name: project.name })).toHaveCount(0);
    }
    for (const project of personalProjects(resume)) {
      await expect(personal.getByRole("heading", { name: project.name })).toHaveCount(1);
      await expect(work.getByRole("heading", { name: project.name })).toHaveCount(0);
    }
  });

  test("a company project shows its highlights and opens its architecture", async ({ page }) => {
    const project = companyProjects(resume)[1];
    await gotoHydrated(page);
    await expect(page.getByText(project.highlights[0])).toBeVisible();
    const toggle = page.locator(`#work-${project.slug}-button`);
    await toggle.scrollIntoViewIfNeeded();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.locator(`#work-${project.slug}-panel`).getByRole("list", { name: "Architecture layers" }),
    ).toBeVisible();
  });

  test("a personal project card opens its own page", async ({ page }) => {
    await gotoHydrated(page);
    await page.locator("section#personal").getByRole("link", { name: GALLERY_PROJECT.name }).click();
    await expect(page).toHaveURL(new RegExp(`${projectPath(GALLERY_PROJECT.slug)}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(GALLERY_PROJECT.name);
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

test.describe("project page", () => {
  const path = projectPath(GALLERY_PROJECT.slug);

  test("shows the write-up with every screenshot and its own canonical url", async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(GALLERY_PROJECT.name);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absoluteUrl(resume, path));
    await expect(page.locator("main figure img")).toHaveCount(projectImages(GALLERY_PROJECT).length);
  });

  test("opens a screenshot in the viewer and steps through it with the keyboard", async ({ page }) => {
    const [first, second] = projectImages(GALLERY_PROJECT);
    await page.goto(path, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: `Enlarge screenshot: ${first.caption}` }).click();
    const viewer = page.getByRole("dialog", { name: "Screenshot viewer" });
    await expect(viewer).toBeVisible();
    await expect(viewer.getByText(first.caption)).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(viewer.getByText(second.caption)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(viewer).toBeHidden();
  });

  test("shows a write-up without screenshots and links its repositories", async ({ page }) => {
    await page.goto(projectPath(TEXT_PROJECT.slug));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(TEXT_PROJECT.name);
    for (const chapter of TEXT_PROJECT.chapters ?? []) {
      await expect(page.getByRole("heading", { name: chapter.title })).toBeVisible();
    }
    for (const link of TEXT_PROJECT.links ?? []) {
      await expect(page.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
    await expect(page.locator("main figure")).toHaveCount(0);
  });

  test("has no horizontal scroll at 360px and no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(path, { waitUntil: "networkidle" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0);
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

  test("/sitemap.xml lists the page, the project pages and every machine-readable route", async ({
    request,
  }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const paths = [
      "/",
      ...personalProjects(resume).map((project) => projectPath(project.slug)),
      ...MACHINE_ROUTES.map((route) => route.path),
    ];
    for (const path of paths) {
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
