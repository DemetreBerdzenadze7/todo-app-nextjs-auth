import { addTodo, deleteTodo, editTodo, toggleDone } from "@/lib/actions/todos";
import { getTodos, saveTodos } from "@/lib/tasks";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-auth", () => ({ getServerSession: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/app/api/auth/[...nextauth]/option", () => ({ default: {} }));
vi.mock("@/lib/tasks", () => ({ getTodos: vi.fn(), saveTodos: vi.fn() }));

const mockSession = vi.mocked(getServerSession);
const mockGetTodos = vi.mocked(getTodos);
const mockSaveTodos = vi.mocked(saveTodos);

const giorgi = { user: { id: "2", name: "Giorgi", role: "USER" }, expires: "" };
const admin = { user: { id: "1", name: "Admin", role: "ADMIN" }, expires: "" };

const makeTodos = (): Todos[] => [
  { id: "a", title: "Admin task", done: false, userId: "1", createdAt: "2026-11-22T10:00:00.000Z" },
  { id: "g", title: "Giorgi task", done: false, userId: "2", createdAt: "2026-11-22T11:00:00.000Z" },
];

const savedTodos = () => mockSaveTodos.mock.calls[0][0];

beforeEach(() => {
  vi.clearAllMocks();
  mockGetTodos.mockResolvedValue(makeTodos());
});

describe("addTodo", () => {
  it("rejects a user who is not logged in", async () => {
    mockSession.mockResolvedValue(null);

    expect(await addTodo("Buy milk")).toEqual({ error: expect.stringContaining("log in") });
    expect(mockSaveTodos).not.toHaveBeenCalled();
  });

  it("rejects an empty or whitespace-only title", async () => {
    mockSession.mockResolvedValue(giorgi);

    expect(await addTodo("   ")).toEqual({ error: expect.stringContaining("empty") });
    expect(mockSaveTodos).not.toHaveBeenCalled();
  });

  it("saves a trimmed todo owned by the logged-in user", async () => {
    mockSession.mockResolvedValue(giorgi);

    expect(await addTodo("  Buy milk  ")).toEqual({ success: true });

    const added = savedTodos().at(-1)!;
    expect(added).toMatchObject({ title: "Buy milk", done: false, userId: "2" });
    expect(added.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(new Date(added.createdAt).toISOString()).toBe(added.createdAt);
    expect(revalidatePath).toHaveBeenCalledWith("/");
  });
});

describe("deleteTodo", () => {
  it("lets a user delete their own todo", async () => {
    mockSession.mockResolvedValue(giorgi);

    expect(await deleteTodo("g")).toEqual({ success: true });
    expect(savedTodos().map((t) => t.id)).toEqual(["a"]);
  });

  it("blocks a user from deleting someone else's todo", async () => {
    mockSession.mockResolvedValue(giorgi);

    expect(await deleteTodo("a")).toEqual({ error: expect.stringContaining("permission") });
    expect(mockSaveTodos).not.toHaveBeenCalled();
  });

  it("lets an admin delete anyone's todo", async () => {
    mockSession.mockResolvedValue(admin);

    expect(await deleteTodo("g")).toEqual({ success: true });
    expect(savedTodos().map((t) => t.id)).toEqual(["a"]);
  });

  it("returns an error for a todo that does not exist", async () => {
    mockSession.mockResolvedValue(admin);

    expect(await deleteTodo("missing")).toEqual({ error: "Could not find task" });
  });
});

describe("toggleDone", () => {
  it("flips the done flag of the user's own todo", async () => {
    mockSession.mockResolvedValue(giorgi);

    expect(await toggleDone("g")).toEqual({ success: true });
    expect(savedTodos().find((t) => t.id === "g")?.done).toBe(true);
  });

  it("blocks a user from toggling someone else's todo", async () => {
    mockSession.mockResolvedValue(giorgi);

    expect(await toggleDone("a")).toEqual({ error: expect.stringContaining("permission") });
    expect(mockSaveTodos).not.toHaveBeenCalled();
  });
});

describe("editTodo", () => {
  it("updates the title of the user's own todo", async () => {
    mockSession.mockResolvedValue(giorgi);

    expect(await editTodo("g", "  New title ")).toEqual({ success: true });
    expect(savedTodos().find((t) => t.id === "g")?.title).toBe("New title");
  });

  it("rejects an empty title", async () => {
    mockSession.mockResolvedValue(giorgi);

    expect(await editTodo("g", " ")).toEqual({ error: expect.stringContaining("empty") });
    expect(mockSaveTodos).not.toHaveBeenCalled();
  });

  it("blocks a user from editing someone else's todo", async () => {
    mockSession.mockResolvedValue(giorgi);

    expect(await editTodo("a", "Hacked")).toEqual({ error: expect.stringContaining("permission") });
    expect(mockSaveTodos).not.toHaveBeenCalled();
  });

  it("lets an admin edit anyone's todo", async () => {
    mockSession.mockResolvedValue(admin);

    expect(await editTodo("g", "Fixed by admin")).toEqual({ success: true });
    expect(savedTodos().find((t) => t.id === "g")?.title).toBe("Fixed by admin");
  });
});

describe("every action", () => {
  const actions = [
    ["addTodo", () => addTodo("Buy milk")],
    ["deleteTodo", () => deleteTodo("g")],
    ["toggleDone", () => toggleDone("g")],
    ["editTodo", () => editTodo("g", "New")],
  ] as const;

  it.each(actions)("%s rejects a guest and never touches the data", async (_name, run) => {
    mockSession.mockResolvedValue(null);

    expect(await run()).toEqual({ error: expect.stringContaining("log in") });
    expect(mockGetTodos).not.toHaveBeenCalled();
    expect(mockSaveTodos).not.toHaveBeenCalled();
  });

  it.each([
    ["deleteTodo", () => deleteTodo("missing")],
    ["toggleDone", () => toggleDone("missing")],
    ["editTodo", () => editTodo("missing", "New")],
  ] as const)("%s returns an error for a missing todo", async (_name, run) => {
    mockSession.mockResolvedValue(admin);

    expect(await run()).toEqual({ error: "Could not find task" });
    expect(mockSaveTodos).not.toHaveBeenCalled();
  });
});
