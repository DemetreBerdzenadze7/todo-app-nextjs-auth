import { expect, test } from "@playwright/test";
import { login, resetData, statValue, todoRow, USERS } from "./fixtures";

test.describe.configure({ mode: "serial" });

test.describe("Managing todos as a USER", () => {
  test.beforeAll(async () => {
    await resetData();
  });

  test.beforeEach(async ({ page }) => {
    await login(page, USERS.giorgi);
  });

  test("shows an error when adding an empty task", async ({ page }) => {
    await page.getByRole("button", { name: "+ Add" }).click();
    await expect(page.getByText("Task can't be empty. Please type something first.")).toBeVisible();
  });

  test("adds a task, shows a message for 2 seconds and updates the stats", async ({ page }) => {
    await expect(statValue(page, "Total")).toHaveText("2");

    await page.getByPlaceholder("New task...").fill("Buy milk");
    await page.getByRole("button", { name: "+ Add" }).click();

    await expect(page.getByRole("status")).toContainText('"Buy milk" was added');
    await expect(todoRow(page, "Buy milk")).toBeVisible();
    await expect(page.getByPlaceholder("New task...")).toHaveValue("");
    await expect(statValue(page, "Total")).toHaveText("3");
    await expect(page.getByRole("status")).toBeHidden({ timeout: 4000 });
  });

  test("adds a task with the Enter key", async ({ page }) => {
    await page.getByPlaceholder("New task...").fill("Keyboard task");
    await page.getByPlaceholder("New task...").press("Enter");

    await expect(todoRow(page, "Keyboard task")).toBeVisible();
  });

  test("marking a task done updates stats and progress", async ({ page }) => {
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "25");

    await todoRow(page, "Giorgi active task").getByRole("button", { name: "Mark as done" }).click();

    await expect(
      todoRow(page, "Giorgi active task").getByRole("button", { name: "Mark as not done" }),
    ).toBeVisible();
    await expect(statValue(page, "Done")).toHaveText("2");
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "50");
  });

  test("filters by status and shows a filter-specific empty state", async ({ page }) => {
    await page.getByRole("button", { name: "Completed" }).click();
    await expect(todoRow(page, "Giorgi active task")).toBeVisible();
    await expect(todoRow(page, "Buy milk")).toHaveCount(0);

    await todoRow(page, "Giorgi active task").getByRole("button", { name: "Mark as not done" }).click();
    await todoRow(page, "Giorgi finished task").getByRole("button", { name: "Mark as not done" }).click();
    await expect(page.getByText("No completed tasks")).toBeVisible();
  });

  test("edits a task title and keeps it after a reload", async ({ page }) => {
    await todoRow(page, "Buy milk").getByRole("button", { name: "Edit" }).click();
    const input = page.getByRole("textbox", { name: "Edit task title" });
    await expect(input).toBeFocused();
    await input.fill("Buy oat milk");
    await input.press("Enter");

    await expect(todoRow(page, "Buy oat milk")).toBeVisible();
    await page.reload();
    await expect(todoRow(page, "Buy oat milk")).toBeVisible();
  });

  test("Escape cancels editing without saving", async ({ page }) => {
    await todoRow(page, "Buy oat milk").getByRole("button", { name: "Edit" }).click();
    const input = page.getByRole("textbox", { name: "Edit task title" });
    await input.fill("This should not be saved");
    await input.press("Escape");

    await expect(todoRow(page, "Buy oat milk")).toBeVisible();
    await page.reload();
    await expect(page.getByText("This should not be saved")).toHaveCount(0);
  });

  test("shows the server error when saving an empty title", async ({ page }) => {
    await todoRow(page, "Buy oat milk").getByRole("button", { name: "Edit" }).click();
    await page.getByRole("textbox", { name: "Edit task title" }).fill("   ");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Task can't be empty. Please type something first.")).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Edit task title" })).toBeVisible();
  });

  test("deleting every task shows the empty state", async ({ page }) => {
    for (const title of ["Buy oat milk", "Keyboard task", "Giorgi active task", "Giorgi finished task"]) {
      await todoRow(page, title).getByRole("button", { name: "Delete" }).click();
      await expect(todoRow(page, title)).toHaveCount(0);
    }

    await expect(page.getByText("No tasks yet", { exact: true })).toBeVisible();
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });
});
