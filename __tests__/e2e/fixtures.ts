import { expect, type Page } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export const TODOS_FILE = path.join(process.cwd(), "data", "todos.json");
export const BACKUP_FILE = path.join(os.tmpdir(), "todo-list-e2e-todos.backup.json");

export const USERS = {
  admin: { username: "Admin", password: "1234" },
  giorgi: { username: "Giorgi", password: "123" },
};

export const SEED_TODOS: Todos[] = [
  { id: "e2e-1", title: "Admin secret task", done: false, userId: "1", createdAt: "2026-11-20T10:00:00.000Z" },
  { id: "e2e-2", title: "Giorgi active task", done: false, userId: "2", createdAt: "2026-11-21T10:00:00.000Z" },
  { id: "e2e-3", title: "Giorgi finished task", done: true, userId: "2", createdAt: "2026-11-22T10:00:00.000Z" },
];

export async function resetData(todos: Todos[] = SEED_TODOS) {
  await writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
}

export async function login(page: Page, user: { username: string; password: string }) {
  await page.goto("/login");
  await page.getByLabel("Username").fill(user.username);
  await page.getByLabel("Password").fill(user.password);
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page).not.toHaveURL(/\/login/);
}

export function todoRow(page: Page, title: string) {
  return page.getByRole("listitem").filter({ hasText: title });
}

export function statValue(page: Page, label: string) {
  return page.locator("section").getByText(label, { exact: true }).locator("xpath=following-sibling::p[1]");
}
