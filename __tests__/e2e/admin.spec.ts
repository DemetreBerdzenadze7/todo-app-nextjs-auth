import { expect, test } from "@playwright/test";
import { login, resetData, statValue, todoRow, USERS } from "./fixtures";

test.describe.configure({ mode: "serial" });

test.describe("Admin panel", () => {
  test.beforeAll(async () => {
    await resetData();
  });

  test.beforeEach(async ({ page }) => {
    await login(page, USERS.admin);
    await expect(page).toHaveURL("/admin");
  });

  test("shows real stats and every user with their task count", async ({ page }) => {
    await expect(statValue(page, "Users")).toHaveText("2");
    await expect(statValue(page, "Total tasks")).toHaveText("3");

    const giorgi = page.getByRole("listitem").filter({ hasText: "user@todo.ge" });
    await expect(giorgi).toContainText("USER");
    await expect(giorgi).toContainText("2");
  });

  test("never sends passwords to the browser", async ({ page }) => {
    const response = await page.goto("/admin");
    const html = await response!.text();

    expect(html).toContain("admin@todo.ge");
    expect(html).not.toContain("password");
    expect(html).not.toContain("1234");
  });

  test("shows the owner of every task", async ({ page }) => {
    await expect(todoRow(page, "Giorgi active task")).toContainText("Giorgi");
    await expect(todoRow(page, "Admin secret task")).toContainText("Admin");
  });

  test("filters by user and status together", async ({ page }) => {
    await page.getByLabel("Filter by user").selectOption({ label: "Giorgi" });
    await expect(page.getByText("Admin secret task")).toHaveCount(0);
    await expect(page.getByText("2 of 3")).toBeVisible();

    await page.getByLabel("Filter by user").selectOption({ label: "Admin" });
    await page.getByRole("button", { name: "Completed" }).click();
    await expect(page.getByText("No tasks found")).toBeVisible();
  });

  test("can complete and edit another user's task", async ({ page }) => {
    const row = todoRow(page, "Giorgi active task");
    await row.getByRole("button", { name: "Mark as done" }).click();
    await expect(row.getByRole("button", { name: "Mark as not done" })).toBeVisible();

    await row.getByRole("button", { name: "Edit" }).click();
    await page.getByRole("textbox", { name: "Edit task title" }).fill("Checked by admin");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(todoRow(page, "Checked by admin")).toBeVisible();
  });

  test("admin changes are visible to the task owner", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await login(page, USERS.giorgi);
    await expect(todoRow(page, "Checked by admin")).toBeVisible();
    await expect(todoRow(page, "Checked by admin").getByRole("button", { name: "Mark as not done" })).toBeVisible();

    await context.close();
  });

  test("can delete another user's task", async ({ page }) => {
    await todoRow(page, "Checked by admin").getByRole("button", { name: "Delete" }).click();

    await expect(todoRow(page, "Checked by admin")).toHaveCount(0);
    await expect(statValue(page, "Total tasks")).toHaveText("2");
  });
});
