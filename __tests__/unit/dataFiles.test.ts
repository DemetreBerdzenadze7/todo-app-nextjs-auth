import { getTodos, saveTodos } from "@/lib/tasks";
import { getUsers } from "@/lib/users";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("fs/promises", () => ({ readFile: vi.fn(), writeFile: vi.fn() }));

const todo: Todos = { id: "1", title: "Test", done: false, userId: "2", createdAt: "2026-11-22T10:00:00.000Z" };

beforeEach(() => {
  vi.clearAllMocks();
});

describe("lib/tasks", () => {
  it("reads and parses data/todos.json", async () => {
    vi.mocked(readFile).mockResolvedValue(JSON.stringify([todo]));

    expect(await getTodos()).toEqual([todo]);
    expect(readFile).toHaveBeenCalledWith(path.join(process.cwd(), "data", "todos.json"), "utf-8");
  });

  it("writes the whole list as pretty JSON", async () => {
    await saveTodos([todo]);

    expect(writeFile).toHaveBeenCalledWith(
      path.join(process.cwd(), "data", "todos.json"),
      JSON.stringify([todo], null, 2),
    );
  });
});

describe("lib/users", () => {
  it("reads and parses data/users.json", async () => {
    const users = [{ id: "1", name: "Admin", email: "a@b.c", password: "x", role: "ADMIN" }];
    vi.mocked(readFile).mockResolvedValue(JSON.stringify(users));

    expect(await getUsers()).toEqual(users);
    expect(readFile).toHaveBeenCalledWith(path.join(process.cwd(), "data", "users.json"), "utf-8");
  });
});
