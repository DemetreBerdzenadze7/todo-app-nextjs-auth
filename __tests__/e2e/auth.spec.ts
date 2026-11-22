import { expect, test } from "@playwright/test";
import { login, resetData, USERS } from "./fixtures";

test.describe("Authentication & roles", () => {
  test.beforeAll(async () => {
    await resetData();
  });

  test("redirects a guest to the login page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login/);

    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login/);
  });

  test("shows an error for a wrong password and clears it", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Username").fill(USERS.giorgi.username);
    await page.getByLabel("Password").fill("wrong-password");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByText("Invalid username or password")).toBeVisible();
    await expect(page.getByLabel("Password")).toHaveValue("");
    await expect(page).toHaveURL(/\/login/);
  });

  test("can log in using only the keyboard", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Username").focus();
    await page.keyboard.type(USERS.giorgi.username);
    await page.keyboard.press("Tab");
    await page.keyboard.type(USERS.giorgi.password);
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL("/");
  });

  test("USER sees only their own tasks and no admin UI", async ({ page }) => {
    await login(page, USERS.giorgi);

    await expect(page).toHaveURL("/");
    await expect(page.getByText("Hello, Giorgi")).toBeVisible();
    await expect(page.getByText("Giorgi active task")).toBeVisible();
    await expect(page.getByText("Admin secret task")).toHaveCount(0);
    await expect(page.getByRole("banner").getByText("ADMIN", { exact: true })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /admin panel/i })).toHaveCount(0);
  });

  test("USER cannot open the admin panel", async ({ page }) => {
    await login(page, USERS.giorgi);

    await page.goto("/admin");
    await expect(page).toHaveURL("/");
  });

  test("ADMIN is sent to the admin panel, even from the home page", async ({ page }) => {
    await login(page, USERS.admin);
    await expect(page).toHaveURL("/admin");

    await page.goto("/");
    await expect(page).toHaveURL("/admin");
    await expect(page.getByRole("banner").getByText("ADMIN", { exact: true })).toBeVisible();
  });

  test("logging out returns to the login page and protects pages again", async ({ page }) => {
    await login(page, USERS.giorgi);

    await page.getByRole("button", { name: "Log out" }).click();
    await expect(page).toHaveURL(/\/login/);

    await page.goto("/");
    await expect(page).toHaveURL(/\/login/);
  });

  test("the old todo API is gone", async ({ request }) => {
    expect((await request.get("/api")).status()).toBe(404);
  });
});
