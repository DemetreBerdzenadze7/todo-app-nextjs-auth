import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { login, resetData, USERS } from "./fixtures";

const scan = async (page: Page) => {
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  return violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} element(s) — ${v.help}`);
};

test.describe("Accessibility (axe, WCAG 2 AA)", () => {
  test.beforeAll(async () => {
    await resetData();
  });

  for (const colorScheme of ["light", "dark"] as const) {
    test(`login page (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto("/login");
      expect(await scan(page)).toEqual([]);
    });
  }

  test("home page", async ({ page }) => {
    await login(page, USERS.giorgi);
    await expect(page.getByText("Giorgi active task")).toBeVisible();
    expect(await scan(page)).toEqual([]);
  });

  test("admin page", async ({ page }) => {
    await login(page, USERS.admin);
    await expect(page.getByRole("heading", { name: "Admin panel" })).toBeVisible();
    expect(await scan(page)).toEqual([]);
  });
});
