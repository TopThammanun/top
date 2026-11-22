import type { Page } from "@playwright/test";

export async function scrollThrough(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

export async function useTheme(page: Page, theme: "dark" | "light"): Promise<void> {
  await page.addInitScript((value) => localStorage.setItem("theme", value), theme);
}
